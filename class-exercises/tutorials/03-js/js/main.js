// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

let scene, camera, renderer, controls, loader;
let grass, sun, light;

// Preliminary starter things to set up the scene and camera
function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    loadAddons();
    loadScene();
}

function loadAddons(){
    controls = new OrbitControls(camera, renderer.domElement);
    loader = new GLTFLoader(); // to load 3d models
}

function loadScene(){
    //Grass
    const geometry1 = new THREE.PlaneGeometry(16, 16);
    const texture1 = new THREE.TextureLoader().load('assets/grass.jpg');
    const material1 = new THREE.MeshBasicMaterial({map: texture1});
    grass = new THREE.Mesh(geometry1, material1);
    scene.add(grass);
    
    grass.position.y = -1;
    grass.rotation.x = DegreeToRadians(-90);
    
    //the Sun
    const geometry2 = new THREE.SphereGeometry(1, 16, 16);
    const texture2 = new THREE.TextureLoader().load('assets/sun.png');
    const material2 = new THREE.MeshBasicMaterial({map: texture2});
    sun = new THREE.Mesh(geometry2, material2);
    scene.add(sun);
    
    sun.position.z = -60;
    sun.position.y = 35;
    sun.position.x = -30;
    
    //little guy
    loader.load('assets/carbuncle.gltf', function(gltf){
        const carbuncle = gltf.scene;
        carbuncle.scale.set(2,2,2);
        carbuncle.position.set(0,-1,0);
        carbuncle.rotation.set(0,0.3,0);
        
        scene.add(carbuncle);
    });
    
    light = new THREE.AmbientLight(0xFFFFFF);
    
    camera.position.z = 5;
}

//Animation loop
function animate(){
    requestAnimationFrame(animate);
    
    sun.rotation.y += 0.002;
    
    renderer.render(scene, camera);
}

//Adjusts the camera when the window resizes
function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();


// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~


//Math thing to help me
function DegreeToRadians(degree){
    let radian = degree * (Math.PI/180);
    return radian;
}
