const container = document.getElementById("threejs-container");

const scene = new THREE.Scene();
scene.background = null; // Transparent background

const ambientLight = new THREE.AmbientLight(0xffc0cb);
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable transparency
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement); // Append to the container

const group = new THREE.Group();
scene.add(group);

const sphereCount = 10;

for (let i = 0; i < sphereCount; i++) {
    const radius = Math.random() * 1 + 1;
    const geometry = new THREE.SphereGeometry(radius, 32, 32);

    const material = new THREE.MeshPhongMaterial({
        color: 0x352620, // Chocolatey brown color
        specular: 0x050505,
        shininess: 50,
    });

    const sphere = new THREE.Mesh(geometry, material);
    const angle = (Math.PI * 2 * i) / sphereCount;
    const distance = 5;

    sphere.position.set(
        distance * Math.cos(angle),
        distance * Math.sin(angle),
        Math.random() * 10 - 5
    );

    group.add(sphere);
}

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 15, -15);
scene.add(light);

const light2 = new THREE.PointLight(0xffffff, 1);
light2.position.set(-10, -15, 15);
scene.add(light2);

camera.position.set(0, 15, 20);
camera.lookAt(0, 0, 0);

const animate = () => {
    requestAnimationFrame(animate);
    group.rotation.z += 0.005;
    renderer.render(scene, camera);
};

animate();

window.addEventListener("resize", () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
});
