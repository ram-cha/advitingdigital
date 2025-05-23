// Enhanced Three.js scene setup

// --- Configuration Constants ---
const CAMERA_Z_POSITION = 10;
const SPHERE_RADIUS = 0.3;
const SPHERE_WIDTH_SEGMENTS = 16;
const SPHERE_HEIGHT_SEGMENTS = 16;
const NUM_OBJECTS = 25; // Increased from 20 for slightly denser background
const OBJECT_SPREAD = 10;
const MIN_OBJECT_SCALE = 0.5;
const MAX_OBJECT_SCALE = 1.0;

const GROUP_ROTATION_X_SPEED = 0.0005; // Slower continuous rotation
const GROUP_ROTATION_Y_SPEED = 0.0007; // Slower continuous rotation
const SCROLL_ROTATION_Z_SPEED = 0.001;

const MOUSE_PARALLAX_X_SENSITIVITY = 1.5; // Adjusted for potentially more noticeable effect
const MOUSE_PARALLAX_Y_SENSITIVITY = 1.5; // Adjusted for potentially more noticeable effect
const MOUSE_SMOOTHING_FACTOR = 0.02;

// Color Palette (example: shades of blue and purple)
const COLOR_PALETTE = [
    0x6A0DAD, // Purple
    0x4B0082, // Indigo
    0x8A2BE2, // BlueViolet
    0x7B68EE, // MediumSlateBlue
    0xADD8E6  // LightBlue
];

// --- Global Variables ---
let scene, camera, renderer, group;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let targetRotationZ = 0; // For smoothed scroll rotation

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = CAMERA_Z_POSITION;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Added for performance on high DPI
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Softer ambient light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Brighter directional light
    directionalLight.position.set(5, 10, 7.5); // Positioned to cast some shadows
    scene.add(directionalLight);

    // Create a group of objects
    group = new THREE.Group();
    const geometry = new THREE.SphereGeometry(SPHERE_RADIUS, SPHERE_WIDTH_SEGMENTS, SPHERE_HEIGHT_SEGMENTS);

    for (let i = 0; i < NUM_OBJECTS; i++) {
        const material = new THREE.MeshStandardMaterial({ 
            color: COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)],
            roughness: 0.6, // Adjusted for a less shiny, more matte look
            metalness: 0.2  // Slightly metallic
        });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = (Math.random() - 0.5) * OBJECT_SPREAD;
        mesh.position.y = (Math.random() - 0.5) * OBJECT_SPREAD;
        mesh.position.z = (Math.random() - 0.5) * OBJECT_SPREAD;

        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;
        mesh.rotation.z = Math.random() * 2 * Math.PI;
        
        const scale = Math.random() * (MAX_OBJECT_SCALE - MIN_OBJECT_SCALE) + MIN_OBJECT_SCALE;
        mesh.scale.set(scale, scale, scale);

        group.add(mesh);
    }
    scene.add(group);

    // Event Listeners
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('scroll', onScroll, false);
    document.addEventListener('mousemove', onMouseMove, false);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Group's continuous animation
    group.rotation.x += GROUP_ROTATION_X_SPEED;
    group.rotation.y += GROUP_ROTATION_Y_SPEED;

    // Smoothed scroll animation
    group.rotation.z += (targetRotationZ - group.rotation.z) * MOUSE_SMOOTHING_FACTOR; // Using MOUSE_SMOOTHING_FACTOR for general lerp

    // Subtle mouse interaction for parallax
    camera.position.x += ((mouseX * MOUSE_PARALLAX_X_SENSITIVITY) - camera.position.x) * MOUSE_SMOOTHING_FACTOR;
    camera.position.y += ((-mouseY * MOUSE_PARALLAX_Y_SENSITIVITY) - camera.position.y) * MOUSE_SMOOTHING_FACTOR;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onScroll() {
    const scrollPosition = window.scrollY;
    targetRotationZ = scrollPosition * SCROLL_ROTATION_Z_SPEED;
}

function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / windowHalfX;
    mouseY = (event.clientY - windowHalfY) / windowHalfY;
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
