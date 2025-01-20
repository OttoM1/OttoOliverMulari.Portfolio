// script.js

// Toggle visibility of sections when navigation links are clicked
function toggleSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';  // Hide all sections
    });
    
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';  // Show the selected section
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();  // Prevent the default link action
        
        // Get the target section's ID from the link's href attribute
        const targetId = this.getAttribute('href');
        
        // Scroll smoothly to the target section
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'  // Smooth scroll effect
        });

        // If you're using toggleSection, we can also call it here
        // if the link is part of the navigation menu:
        if (targetId.startsWith('#')) {
            toggleSection(targetId.substring(1));  // Remove '#' and call toggleSection
        }
    });
});
