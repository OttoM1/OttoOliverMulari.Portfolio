function toggleSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('fade-in-up'); // Remove fade-up animation class from all sections
    });

    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('visible'); // Make the section visible
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
