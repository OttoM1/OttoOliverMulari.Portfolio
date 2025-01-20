// scripts.js
// Add interactivity if needed in the future (e.g., smooth scrolling or animations)
// For now, it's left empty for simplicity

// Example of adding smooth scroll behavior
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});