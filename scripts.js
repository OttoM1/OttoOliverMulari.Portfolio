function toggleSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none'; // Hide all sections
        section.classList.remove('fade-in'); // Remove fade-in animation class
    });

    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block'; // Show the selected section
        section.classList.add('fade-in'); // Add fade-in animation class
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
