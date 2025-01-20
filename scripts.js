// scripts.js

// Add interactivity if needed in the future (e.g., smooth scrolling or animations)
// For now, it's left empty for simplicity

// Smooth scrolling for anchor links
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Estää tavallisen linkin toiminnan
        
        // Hakee valitun elementin id:n, johon linkki vie
        const targetId = this.getAttribute('href');
        
        // Vierittää sujuvasti kohti elementtiä
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth' // Sujuva vieritys
        });
    });
});
