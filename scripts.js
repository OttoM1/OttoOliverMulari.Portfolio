document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const fadeInDuration = 1000; // Slower fade-in duration

    // Apply fade-in effect with a smooth timing
    sections.forEach((section) => {
        section.classList.add('fade-in-up');
        setTimeout(() => {
            section.classList.add('visible');
        }, fadeInDuration);
    });

    // Binary Matrix Effect Canvas with Slow and Elegant Animation
    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const columns = canvas.width / 20;
    const drops = Array.from({ length: columns }).map(() => 0);

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // A lighter black for subtle background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0";
        ctx.font = "20px monospace";

        drops.forEach((y, x) => {
            const text = Math.random() > 0.9 ? String.fromCharCode(Math.random() * 255) : " ";
            ctx.fillText(text, x * 20, y * 20);

            if (y * 20 > canvas.height && Math.random() > 0.975) {
                drops[x] = 0; // Reset symbol's position when it goes off-screen
            }

            // Slow and elegant movement
            drops[x] += Math.random() > 0.95 ? 1 : 0.5; // Randomize fall speed
        });
    }

    setInterval(draw, 60); // Slower interval for a slower fall
});
