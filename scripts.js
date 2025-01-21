document.addEventListener('DOMContentLoaded', () => {
    // Fade-in effect for sections
    const sections = document.querySelectorAll('section');
    const fadeInDuration = 800; // Duration for fade-in effect

    sections.forEach((section) => {
        section.classList.add('fade-in-up');
        setTimeout(() => {
            section.classList.add('visible');
        }, fadeInDuration);
    });

    // Random Alphabet Matrix Effect Canvas (non-binary)
    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const columns = canvas.width / 20; // Determine number of columns
    const drops = Array.from({ length: columns }).map(() => 0); // Initialize drop positions

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.04)"; // Background fade effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0"; // Set the color for the characters
        ctx.font = "20px monospace"; // Font style for characters

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Possible characters

        drops.forEach((y, x) => {
            const text = characters[Math.floor(Math.random() * characters.length)]; // Random character
            ctx.fillText(text, x * 20, y * 20); // Draw the character

            // Reset drop to the top if it goes past the bottom
            if (y * 20 > canvas.height && Math.random() > 0.975) {
                drops[x] = 0;
            }
            drops[x]++; // Move the drop down
        });
    }

    setInterval(draw, 50); // Redraw the matrix effect every 50ms
});
