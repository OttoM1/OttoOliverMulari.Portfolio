document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const fadeInDuration = 800; // Duration for fade-in effect

    sections.forEach((section) => {
        section.classList.add('fade-in-up');
        setTimeout(() => {
            section.classList.add('visible');
        }, fadeInDuration);
    });

    // Binary Matrix Effect Canvas (remains unchanged from before)
    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const columns = canvas.width / 20;
    const drops = Array.from({ length: columns }).map(() => 0);

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0";
        ctx.font = "20px monospace";

        drops.forEach((y, x) => {
            const text = Math.random() > 0.9 ? String.fromCharCode(Math.random() * 255) : " ";
            ctx.fillText(text, x * 20, y * 20);
            if (y * 20 > canvas.height && Math.random() > 0.975) {
                drops[x] = 0;
            }
            drops[x]++;
        });
    }
    setInterval(draw, 50);

    // Additional Floating Cursor Trail (remains unchanged)
    let cursor = document.getElementById("cursorTrail");
    document.addEventListener("mousemove", (e) => {
        cursor.style.transform = `translate(${e.pageX - 5}px, ${e.pageY - 5}px)`;
    });
});
