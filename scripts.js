function toggleSection(sectionId) {
    const sections = document.querySelectorAll('section');
    
    // Hide all sections with fade-out animation
    sections.forEach(section => {
        section.style.opacity = 0; // Start fading out
        setTimeout(() => {
            section.style.display = 'none'; // Hide the section after fade-out
        }, 300); // 300ms should be enough to complete the fade-out
    });

    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block'; // Show the selected section
        // Reset the section opacity and trigger the fade-in
        section.style.opacity = 0; // Ensure opacity is reset
        setTimeout(() => {
            section.classList.add('fade-in'); // Add fade-in class to trigger animation
            section.style.opacity = 1; // Apply opacity for fade-in
        }, 50); // Small delay to trigger animation
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
