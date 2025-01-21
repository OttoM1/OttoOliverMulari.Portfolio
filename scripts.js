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

// Falling Binary (Matrix Effect)
function startMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrixCanvas';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 15); // Columns for binary digits
    const drops = Array(columns).fill(0); // Tracks the Y-coordinate of each column

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Background fade effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0'; // Binary color (green)
        ctx.font = '15px monospace'; // Binary font style

        drops.forEach((y, index) => {
            const binaryDigit = Math.random() > 0.5 ? '1' : '0'; // Random 0 or 1
            const x = index * 15; // X-coordinate for the column

            ctx.fillText(binaryDigit, x, y); // Draw binary digit at (x, y)

            // Reset Y-coordinate or move it downward
            if (y > canvas.height || Math.random() > 0.975) {
                drops[index] = 0; // Reset to the top of the column
            } else {
                drops[index] = y + 15; // Move down by 15 pixels
            }
        });
    }

    setInterval(drawMatrix, 50); // Redraw the matrix every 50ms

    // Update canvas size on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Custom Cursor Trail Effect
function customCursorTrail() {
    const trail = document.createElement('div');
    trail.id = 'cursorTrail';
    document.body.appendChild(trail);

    document.addEventListener('mousemove', (e) => {
        trail.style.left = `${e.pageX}px`;
        trail.style.top = `${e.pageY}px`;
    });
}

// Animate the SVG paths for "OM" and the Curvy Dash
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

// Show the "About Me" section by default and initialize animations
document.addEventListener('DOMContentLoaded', () => {
    toggleSection('about-me');
    startMatrixEffect();
    customCursorTrail();
    animateSVG();
});

// Navigation smooth scrolling and section toggle
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        toggleSection(targetId);
    });
});
