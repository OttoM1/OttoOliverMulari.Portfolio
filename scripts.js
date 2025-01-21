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

// Three.js Scene Setup
function toggleSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('visible');
        section.classList.remove('fade-in-up');
    });

    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('visible');
        setTimeout(() => {
            section.classList.add('fade-in-up');
        }, 10);
    }
}

// Show the "About Me" section by default and initialize animations
document.addEventListener('DOMContentLoaded', () => {
    toggleSection('about-me');
    startMatrixEffect(); // Start falling binary animation
    customCursorTrail(); // Enable custom cursor trail
    animateSVG(); // Start the SVG animation for "OM" and curvy dash on scroll
});

// Navigation smooth scrolling and section toggle
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        toggleSection(targetId);
    });
});

// Falling Binary (Matrix Effect)
function startMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrixCanvas';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = Array(256).fill(0);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = '15px monospace';

        letters.forEach((y, index) => {
            const text = String.fromCharCode(0x30A0 + Math.random() * 96);
            const x = index * 15;

            ctx.fillText(text, x, y);
            if (y > canvas.height || Math.random() > 0.95) letters[index] = 0;
            else letters[index] = y + 15;
        });
    }

    setInterval(drawMatrix, 50);
}

// Custom Cursor Trail Effect
function customCursorTrail() {
    const trail = document.createElement('div');
    trail.id = 'cursorTrail';
    document.body.appendChild(trail);

    document.addEventListener('mousemove', (e) => {
        trail.style.left = ${e.pageX}px;
        trail.style.top = ${e.pageY}px;
    });
}

// Animate the SVG paths for "OM" and the Curvy Dash
function animateSVG() {
    const signaturePaths = document.querySelectorAll('.signature, .curvy-dash');
    signaturePaths.forEach(path => {
        const rect = path.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            path.classList.add('visible');
        }
    });

    window.addEventListener('scroll', () => {
        signaturePaths.forEach(path => {
            const rect = path.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                path.classList.add('visible');
            }
        });
    });
}

// SVG Paths animation for drawing OM and curvy dash
window.addEventListener('scroll', () => {
    const signaturePaths = document.querySelectorAll('.signature, .curvy-dash');
    signaturePaths.forEach(path => {
        const rect = path.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            path.style.animation = 'drawPath 2s ease-out forwards';
        }
    });
});
