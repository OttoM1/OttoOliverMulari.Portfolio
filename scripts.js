

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    let contentElements = [];
    let index = 0;
    let isStoryMode = false;
    let storyTimeout;

    const storyModeButton = document.createElement('button');
    storyModeButton.textContent = 'Story Mode';
    storyModeButton.id = 'storyModeToggle'; 
    Object.assign(storyModeButton.style, { 
        position: 'fixed', top: '15px', right: '15px',
        flexDirection: 'column',
        padding: '12px 20px', backgroundColor: 'green',
        color: 'white', border: 'none', cursor: 'pointer',
        fontSize: '36.4px', zIndex: '1000', borderRadius: '8px',
        transition: 'background 0.3s ease'
    });
    storyModeButton.addEventListener('mouseover', () => storyModeButton.style.backgroundColor = '#004f16');
    storyModeButton.addEventListener('mouseout', () => storyModeButton.style.backgroundColor = 'green');
    document.body.appendChild(storyModeButton);

    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
        const elements = section.querySelectorAll('h1, h2, p, li, a');
        elements.forEach(el => {
            el.dataset.originalStyle = el.style.cssText;
         
            el.style.transition = 'opacity 1.2s ease-in-out, transform 1.2s ease-in-out';
            contentElements.push(el);



        });
    });

    const storyContainer = document.createElement('div');
    Object.assign(storyContainer.style, {
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.93)', display: 'none', justifyContent: 'center',
        alignItems: 'center', flexDirection: 'column', color: 'white', zIndex: '999'
    });
    document.body.appendChild(storyContainer);

    function startStoryMode() {
        index = 0;
        document.body.style.overflow = 'hidden';
        sections.forEach(section => section.style.display = 'none');
        storyContainer.style.display = 'flex';

        function revealNext() {
            storyContainer.innerHTML = '';
            if (index < contentElements.length) {
                const el = document.createElement('div');
                el.innerHTML = contentElements[index].outerHTML;
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 1s ease-in-out, transform 1s ease-in-out';
                storyContainer.appendChild(el);
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 100);
                index++;
               storyTimeout = setTimeout(revealNext, 5900);
            } else {
                setTimeout(stopStoryMode, 3000);
            }
        }
        revealNext();
    }

    function stopStoryMode() {
        clearTimeout(storyTimeout);
        document.body.style.overflow = '';
        sections.forEach(section => section.style.display = 'block');
        storyContainer.style.display = 'none';
    }

    storyModeButton.addEventListener('click', () => {
        isStoryMode = !isStoryMode;
        storyModeButton.textContent = isStoryMode ? 'Disable' : 'Story Mode';
        isStoryMode ? startStoryMode() : stopStoryMode();
    });

    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.85;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.4 + 1;
            this.speedX = (Math.random() * 0.3 - 0.6) * 0.5;
        this.speedY = (Math.random() * 0.2 - 0.4) * 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = '#00ffcc';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < 100; i++) particles.push(new Particle());
    }
    createParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
});









document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const fadeInDuration = 1000; 

    // fadee enemman tahan 
    sections.forEach((section) => {
        section.classList.add('fade-in-up');
        setTimeout(() => {
            section.classList.add('visible');
        }, fadeInDuration);
    });

    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight * 0.34;
    canvas.width = window.innerWidth;

    const columns = canvas.width / 20;
    const drops = Array.from({ length: columns }).map(() => 0);

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0";
        ctx.font = "20px monospace";

        drops.forEach((y, x) => {
            const text = Math.random() > 0.9 ? String.fromCharCode(Math.random() * 255) : " ";
            ctx.fillText(text, x * 20, y * 20);

            if (y * 20 > canvas.height && Math.random() > 0.975) {
                drops[x] = 0; 
            }

            // Hidastetaa enemma tarvittaes
            drops[x] += Math.random() > 0.95 ? 1 : 0.1; 
        });
    }

    setInterval(draw, 100); 
});
window.scrollTo(0, 0);




(function() {
    emailjs.init("f83myWnHa8CJyFiQg"); 
})();

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let nimiInput = document.getElementById("Nimi");
    let sähköpostiInput = document.getElementById("Sähköposti");
    let viestisiInput = document.getElementById("Viestisi");

    let templateParams = {
        name: nimiInput.value,        // Fixed
        email: sähköpostiInput.value, 
        message: viestisiInput.value  
    };
    
    emailjs.send("service_i1244mo", "template_ffu9jtk", templateParams)
        .then(function(response) {
            showPopup("successMessage");

            nimiInput.value = "";
            sähköpostiInput.value = "";
            viestisiInput.value = "";
        }, function(error) {
            showPopup("errorMessage");
        });
});

function showPopup(id) {
    let popup = document.getElementById(id);
    popup.style.display = "flex";
    
    popup.addEventListener("click", function() {
        popup.style.display = "none";
    });
}




document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); 
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el)); 
});


document.getElementById("poks").addEventListener("click", function() {
    let button = this;
    button.classList.add("pulse");

    setTimeout(() => {
        button.classList.remove("pulse"); 
    }, 400);
});
