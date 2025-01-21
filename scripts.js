/*
function toggleSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.remove('visible'); // Remove the visible class from all sections
        section.classList.remove('fade-in-up'); // Remove fade-up animation class
    });

    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('visible'); // Add the visible class to the selected section
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
*/

// Three.js Scene Setup
const canvas = document.getElementById('threejsCanvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Cube Creation
const geometry = new THREE.BoxGeometry();
const materials = [
    new THREE.MeshBasicMaterial({ color: 0x4CAF50, map: createTextTexture('About Me') }),
    new THREE.MeshBasicMaterial({ color: 0x4CAF50, map: createTextTexture('Skills') }),
    new THREE.MeshBasicMaterial({ color: 0x4CAF50, map: createTextTexture('Projects') }),
    new THREE.MeshBasicMaterial({ color: 0x4CAF50, map: createTextTexture('Contact') }),
    new THREE.MeshBasicMaterial({ color: 0x111111 }), // Top face
    new THREE.MeshBasicMaterial({ color: 0x111111 })  // Bottom face
];
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

// Position Camera
camera.position.z = 3;

// Animation
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Create Textures for Cube Faces
function createTextTexture(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#4CAF50';
    ctx.font = 'Bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    return new THREE.CanvasTexture(canvas);
}

// Handle Clicks to Rotate Cube and Show Sections
canvas.addEventListener('click', (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;

    if (x > 0) {
        cube.rotation.y += Math.PI / 2;
    } else {
        cube.rotation.y -= Math.PI / 2;
    }

    const sectionId = ['about-me', 'skills', 'projects', 'contact'][(Math.round(cube.rotation.y / (Math.PI / 2)) + 4) % 4];
    document.querySelectorAll('main > section').forEach(sec => sec.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
});
