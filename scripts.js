/*
function toggleSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('visible'); // Remove the visible class from all sections
        section.classList.remove('fade-in-up'); // Remove fade-up animation class
    });

    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('visible'); // Add the visible class to the selected section
        setTimeout(() => {
            section.classList.add('fade-in-up'); // Add fade-up animation after making it visible
        }, 10);  // Slight delay to ensure the element is shown before animation starts
    }
}

// Show the "About Me" section by default
document.addEventListener('DOMContentLoaded', () => {
    toggleSection('about-me');
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor click behavior
        const targetId = this.getAttribute('href').substring(1);
        toggleSection(targetId);
    });
});
*/

// Animate SVG Signature
function animateSVG() {
    const signaturePaths = document.querySelectorAll('.signature, .curvy-dash');

    function handleScroll() {
        signaturePaths.forEach(path => {
            const rect = path.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                path.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('DOMContentLoaded', handleScroll);
}

// Custom Cursor Trail
function customCursorTrail() {
    const trail = document.createElement('div');
    trail.id = 'cursorTrail';
    document.body.appendChild(trail);

    document.addEventListener('mousemove', (e) => {
        trail.style.left = `${e.pageX}px`;
        trail.style.top = `${e.pageY}px`;
    });
}

// Falling Binary (Matrix Effect)
function startMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrixCanvas';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 15);
    const drops = Array(columns).fill(0);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = '15px monospace';

        drops.forEach((y, index) => {
            const binaryDigit = Math.random() > 0.5 ? '1' : '0';
            const x = index * 15;

            ctx.fillText(binaryDigit, x, y);

            if (y > canvas.height || Math.random() > 0.975) {
                drops[index] = 0;
            } else {
                drops[index] = y + 15;
            }
        });
    }

    setInterval(drawMatrix, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize All Animations
document.addEventListener('DOMContentLoaded', () => {
    startMatrixEffect();
    customCursorTrail();
    animateSVG();
});
