<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color( 0xffffff );

const controls = new OrbitControls( camera, renderer.domElement );
//stop pan controls
controls.enablePan = false;
//minimum distance from the object
controls.minDistance = 0.3;
//maximum distance from the object
controls.maxDistance = 0.5;

//load gltf model
const gltfloader = new GLTFLoader();


gltfloader.load(
  '/models/shoe.glb',
    function ( gltf ) {
        const shoe = gltf.scene;
        console.log(shoe["children"][0]["children"]);
        shoe.scale.set(1,1,1);
        //color the shoe
        //inside
        shoe["children"][0]["children"][0].material.color.setHex(0xff0000);
        //laces
        shoe["children"][0]["children"][1].material.color.setHex(0xff00ff);
        //outside 1
        shoe["children"][0]["children"][2].material.color.setHex(0x00ffff);
        //outside 2
        shoe["children"][0]["children"][3].material.color.setHex(0x00ff00);
        //outside 3
        shoe["children"][0]["children"][4].material.color.setHex(0xffff00);
        //soleBottom
        shoe["children"][0]["children"][5].material.color.setHex(0x0000ff);
        //soleTop + lips
        shoe["children"][0]["children"][6].material.color.setHex(0x000000);
        scene.add( shoe );
    },
);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Adjust the intensity (e.g., 0.8)
scene.add(ambientLight);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

camera.position.z = 0.5;
</script>

<template>

</template>

<style scoped>
</style>
