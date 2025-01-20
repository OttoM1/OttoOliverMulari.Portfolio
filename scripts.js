function toggleSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });

    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block'; // Show the selected section
    }
}

// Smooth scrolling for anchor links with additional visual effects
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor click behavior

        // Get the target section ID
        const targetId = this.getAttribute('href').substring(1);

        // Smoothly scroll to the target section
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth',
        });

        // Toggle section visibility
        toggleSection(targetId);

        // Add visual effects (background color change + link rotation)
        document.body.style.transition = "background-color 0.5s ease";
        document.body.style.backgroundColor = "#4CAF50";

        setTimeout(() => {
            document.body.style.backgroundColor = "#333"; // Revert background color
        }, 1000);

        // Rotate the clicked link
        this.style.transition = "transform 0.5s ease";
        this.style.transform = "rotate(360deg)";

        setTimeout(() => {
            this.style.transform = "rotate(0deg)"; // Reset rotation
        }, 500);
    });
});

// Show the "About Me" section by default
document.addEventListener('DOMContentLoaded', () => {
    toggleSection('about-me');
});
