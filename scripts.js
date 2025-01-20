// Toggle visibility of sections when navigation links are clicked
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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor click behavior

        // Get the target section ID
        const targetId = this.getAttribute('href').substring(1);

        // Smoothly scroll to the target section
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth',
        });

        // Toggle section visibility
        toggleSection(targetId);
    });
});

// Show the "About Me" section by default
document.addEventListener('DOMContentLoaded', () => {
    toggleSection('about-me');
});
