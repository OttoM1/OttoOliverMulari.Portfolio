function toggleSection(sectionId) {
    const sections = document.querySelectorAll('section');
    
    // Hide all sections with fade-out animation
    sections.forEach(section => {
        section.classList.remove('fade-in');  // Remove fade-in
        section.classList.add('fade-out');    // Apply fade-out animation
        section.style.visibility = 'hidden';  // Ensure sections are not interactive while fading out
    });

    // Find and show the selected section with fade-in
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.visibility = 'visible';   // Ensure visibility when section is shown
        section.classList.remove('fade-out');   // Remove fade-out class (if previously applied)
        section.classList.add('fade-in');       // Apply fade-in animation
    }
}

// Show the "About Me" section by default when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    toggleSection('about-me');
});

// Handle link click events for navigation
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();  // Prevent default anchor click behavior
        const targetId = this.getAttribute('href').substring(1);  // Get section ID from link
        toggleSection(targetId);  // Toggle the target section
    });
});
