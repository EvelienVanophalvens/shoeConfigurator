<script setup>
import { watch, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let shoe;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0xffffff);
const controls = new OrbitControls(camera, renderer.domElement);
//stop pan controls
controls.enablePan = false;
//minimum distance from the object
controls.minDistance = 0.3;
//maximum distance from the object
controls.maxDistance = 0.5;

//load gltf model
const gltfloader = new GLTFLoader();


// Use the prop
const props = defineProps({
  shoespot: Number,
  color: String
});

let color = props.color;

gltfloader.load(
  '/models/shoe.glb',
  function (gltf) {
    shoe = gltf.scene;
    controls.target.set(shoe.position.x, shoe.position.y, shoe.position.z);
    shoe.scale.set(1, 1, 1);
    //color the shoe
    //inside
    shoe["children"][0]["children"][0].material.color.setHex(0xffffff);
    //laces
    shoe["children"][0]["children"][1].material.color.setHex(0xffffff);
    //outside 1
    shoe["children"][0]["children"][2].material.color.setHex(0xffffff);
    //outside 2
    shoe["children"][0]["children"][3].material.color.setHex(0xffffff);
    //outside 3
    shoe["children"][0]["children"][4].material.color.setHex(0xffffff);
    //soleBottom
    shoe["children"][0]["children"][5].material.color.setHex(0xffffff);
    //soleTop + lips
    shoe["children"][0]["children"][6].material.color.setHex(0xffffff);
    console.log(color);
    watch(() => props.color, (newColor) => {
      color = parseInt("0x"+newColor);
      console.log(color);
      console.log(props.shoespot);
      switch(props.shoespot) {
      case 0:
        shoe["children"][0]["children"][1].material.color.setHex(color);
        break;
      case 1:
        shoe["children"][0]["children"][5].material.color.setHex(color);
        break;
      case 2:
        shoe["children"][0]["children"][6].material.color.setHex(color);
        break;
      case 3:
        shoe["children"][0]["children"][2].material.color.setHex(color);
        break;
      case 4:
        shoe["children"][0]["children"][3].material.color.setHex(color);
        shoe["children"][0]["children"][4].material.color.setHex(color);
        break;
      case 5:
        shoe["children"][0]["children"][0].material.color.setHex(color);
        break;
    }
    });

   

    scene.add(shoe);
  },
);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Adjust the intensity (e.g., 0.8)
scene.add(ambientLight);


//define lets
let change = false;

// Define a flag for user interaction
camera.position.z = 0.3;
camera.position.y = 0.2;
camera.rotation.x = Math.PI / -6;
camera.rotation.y = 0;
let targetCameraZ = ref(0.5);
let targetCameraY = ref(0);
let targetCameraRotationX = ref(0); // Add this line
let targetShoeRotationY = ref(0); // Add this line
// Watch for changes in shoespot
watch(() => props.shoespot, (newShoespot) => {
  // Change the shoe position based on the new shoespot
  if(newShoespot == 0){
    camera.rotation.y = 0;
    change = true;
    targetCameraZ.value = 0.3; //zoom
    targetCameraY.value = 0.2; // Move camera up
    targetCameraRotationX.value = Math.PI / -6; // Rotate 30 degrees downward
    targetShoeRotationY.value = 0;
  }else if(newShoespot == 1){
    camera.rotation.y = 0;
    change = true;
    targetCameraZ.value = 0.5;
    targetCameraY.value = 0;
    targetCameraRotationX.value = 0
    targetShoeRotationY.value = Math.PI / 2; // Rotate shoe 90 degrees to the left
  }else if(newShoespot == 2){
    camera.rotation.y = 0;
    change = true;
    targetCameraZ.value = 0.3; //zoom
    targetCameraY.value = 0;
    targetCameraRotationX.value = 0;
    targetShoeRotationY.value = Math.PI/2; // Rotate shoe 180 degrees to the left
  }else if(newShoespot == 3){
    change = true;
    targetCameraZ.value = 0.3; //zoom
    targetCameraY.value = 0.2; //move up
    targetCameraRotationX.value =  Math.PI / -6; // Rotate 30 degrees downward
    targetShoeRotationY.value = Math.PI/2.8; // Rotate
  }else if(newShoespot == 4){
    change = true;
    targetCameraZ.value = 0.2; //zoom
    targetCameraY.value = 0.15; //move up
    targetCameraRotationX.value =  Math.PI / -6; // Rotate 30 degrees downward
    targetShoeRotationY.value = Math.PI/2.8; // Rotate
  }else if(newShoespot == 5){
    change = true;
    targetCameraZ.value = 0.3; //zoom
    targetCameraY.value = 0.2; //move up
    targetCameraRotationX.value =  Math.PI / -6; // Rotate 30 degrees downward
    targetShoeRotationY.value = Math.PI/2; // Rotate
  }
});

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  
  // Lerp the camera position
  if (change == true) {
    //animate shoe rotation reset
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