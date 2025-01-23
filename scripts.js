/*
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
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const columns = canvas.width / 20;
    const drops = Array.from({ length: columns }).map(() => 0);

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; 
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
            drops[x] += Math.random() > 0.95 ? 1 : 0.5; 
        });
    }

    setInterval(draw, 60); 
});
*/



document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    let currentSectionIndex = 0;  // Track which section is currently visible

    // Function to show the current section and hide the others
    function updateSections() {
        sections.forEach((section, index) => {
            if (index === currentSectionIndex) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    }

    // Show the first section initially
    updateSections();

    // Handle the scroll event to move to the next or previous section
    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            // Scroll down: Go to the next section
            if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
                updateSections();
            }
        } else {
            // Scroll up: Go to the previous section
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
                updateSections();
            }
        }
    });
});
