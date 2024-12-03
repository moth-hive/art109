// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

let scene, camera, renderer, controls, loader;
let thing, particles;
let light;
const clock = new THREE.Clock();
let sceneContanier = document.querySelector("#scene-container");

let mouseX, mouseY = 0;

// Preliminary starter things to set up the scene and camera
function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, sceneContanier.clientWidth/sceneContanier.clientHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true
    });
    
    // scene is parented to a container and constrained to that size
    renderer.setSize(sceneContanier.clientWidth, sceneContanier.clientHeight);
    sceneContanier.appendChild(renderer.domElement);
    
    /* scene is window size and parented to the document body
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    */
    
    loadAddons();
    loadScene();
}

function loadAddons(){
    //controls = new OrbitControls(camera, renderer.domElement);
    loader = new GLTFLoader(); // to load 3d models
}

function loadScene(){
    //Geometry
    const geometry1 = new THREE.BoxGeometry(1, 1, 1);
    
    const particleGeometry = new THREE.BufferGeometry();
    const particlesCount = 50000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++){
        posArray[i] = (Math.random() - 0.5)*5;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    //Textures
    const texLoader = new THREE.TextureLoader();
    const starTex = texLoader.load("./assets/sprite_moth.png");
    
    //Material
    const material1 = new THREE.PointsMaterial({
        size: 0.01
    });
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.01,
        map: starTex,
        transparent: true,
        color: 'red'
    });
    
    //Initialization
    thing = new THREE.Points(geometry1, material1);
    scene.add(thing);
    
    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    light = new THREE.AmbientLight(0xFFFFFF);
    
    camera.position.z = 2;
    //camera.rotation.y = DegreeToRadians(30);
}

//Animation loop
function update(){
    const elapsedTime = clock.getElapsedTime();
    
    thing.rotation.y += 0.01;
    particles.rotation.y = 0.005 * (mouseX * elapsedTime);
    
    
    //Render new frame
    renderer.render(scene, camera);
    
    //Call next update frame
    requestAnimationFrame(update);
}

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

//Adjusts the camera when the window resizes
function onWindowResize(){
    camera.aspect = sceneContanier.clientWidth/sceneContanier.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(sceneContanier.clientWidth, sceneContanier.clientHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
update();


// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~


//Math thing to help me
function DegreeToRadians(degree){
    let radian = degree * (Math.PI/180);
    return radian;
}
