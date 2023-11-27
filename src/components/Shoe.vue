<script setup>
import { watch, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let shoe;
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
        shoe = gltf.scene;
        controls.target.set(shoe.position.x, shoe.position.y, shoe.position.z); 
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

// Use the shoespot prop
const props = defineProps({
  shoespot: Number
});


//define lets
let change = false;

// Define a flag for user interaction
camera.position.z = 0.3;
camera.position.y = 0.2;
camera.rotation.x = Math.PI / -6;
let targetCameraZ = ref(0.5);
let targetCameraY = ref(0);
let targetCameraRotationX = ref(0); // Add this line
let targetShoeRotationY = ref(0); // Add this line
// Watch for changes in shoespot
watch(() => props.shoespot, (newShoespot) => {
  // Change the shoe position based on the new shoespot
  console.log(newShoespot);
  if(newShoespot == 0){
    change = true;
    targetCameraZ.value = 0.3;
    targetCameraY.value = 0.2; // Move camera up
    targetCameraRotationX.value = Math.PI / -6; // Rotate 30 degrees downward
    targetShoeRotationY.value = 0;
  }else if(newShoespot == 1){
    change = true;
    targetCameraZ.value = 0.5;
    targetCameraY.value = 0;
    targetCameraRotationX.value = 0
    targetShoeRotationY.value = Math.PI / 2; // Rotate shoe 90 degrees to the left
  }else {
    change = true;
    targetCameraZ.value = 0.5;
    targetCameraY.value = 0;
    targetCameraRotationX.value = 0;
    targetShoeRotationY.value = 0;
  }
});

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  
  // Lerp the camera position
  if (change == true) {
    controls.enabled = false;
    camera.position.z += (targetCameraZ.value - camera.position.z) * 0.2;
    camera.position.y += (targetCameraY.value - camera.position.y) * 0.2; // Add this line
    camera.rotation.x += (targetCameraRotationX.value - camera.rotation.x) * 0.2; // Add this line
    shoe.rotation.y += (targetShoeRotationY.value - shoe.rotation.y) * 0.2; // Add this line
    //wait until animation finishes
    if (Math.abs(camera.position.z - targetCameraZ.value) < 0.001 && Math.abs(camera.position.y - targetCameraY.value) < 0.001 && Math.abs(camera.rotation.x - targetCameraRotationX.value) < 0.001&& Math.abs(camera.position.y - targetCameraY.value) < 0.001 && Math.abs(camera.rotation.x - targetCameraRotationX.value) < 0.001 && Math.abs(shoe.rotation.y - targetShoeRotationY.value) < 0.001) {
      change = false;
      controls.enabled = true;
    }
  }

renderer.render(scene, camera);
}
animate();
</script>

<template>

</template>

<style scoped>
</style>
