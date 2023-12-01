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
//enable shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
scene.background = new THREE.Color(0xffffff);
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2;
controls.enablePan = false;

//stop pan controls
controls.enablePan = false;
//minimum distance from the object
controls.minDistance = 0.2;
//maximum distance from the object
controls.maxDistance = 0.5;

// Use the prop
const props = defineProps({
  shoespot: Number,
  color: String,
  material: String
});

let color = props.color;

let texture = props.material;

watch(() => props.material, (newMaterial) => {
  texture = newMaterial;
  console.log(texture);
});





//load leatherMaterial texture for shoe with displacement map, normal map, and roughness map, and ao map
/*const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('/textures/leatherMaterial/brown_leather_nor_gl_4k.jpg');
const aoTexture = textureLoader.load('/textures/leatherMaterial/brown_leather_ao_4K.jpg');
const displacementTexture = textureLoader.load('/textures/leatherMaterial/leather_disp_4k.jpg');
const roughnessTexture = textureLoader.load('/textures/leatherMaterial/brown_leather_rough_4k.jpg');
const map = textureLoader.load('/textures/leatherMaterial/brown_leather_albedo_4k.jpg');*/


//load polyester texture for shoe with displacement map, normal map, and roughness map, and ao map
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('/textures/poylester/Fabric_polyester_001_normal.jpg');
const aoTexture = textureLoader.load('/textures/poylester/Fabric_polyester_001_ambientOcclusion.jpg');
const displacementTexture = textureLoader.load('/poylester/leatherMaterial/Fabric_polyester_001_height.png');
const roughnessTexture = textureLoader.load('/poylester/leatherMaterial/Fabric_polyester_001_roughness.jpg');
const map = textureLoader.load('/textures/poylester/Fabric_polyester_001_basecolor.jpg');



//load gltf model
const gltfloader = new GLTFLoader();




gltfloader.load(
  '/models/shoe.glb',
  function (gltf) {
    shoe = gltf.scene;
    controls.target.set(shoe.position.x, shoe.position.y, shoe.position.z);
    shoe.scale.set(1, 1, 1);
    //set leatherMaterial texture for shoe on inside
      shoe["children"][0]["children"][0].material = new THREE.MeshStandardMaterial({ 
      normalMap: normalTexture, 
      aoMap: aoTexture, 
      displacementMap: displacementTexture, 
      displacementScale: 0,
      roughnessMap: roughnessTexture,
      roughness: 1,
      map: map,
     });
    shoe.scale.set(0.5, 0.5, 0.5);
    //cast shadow to plane
    console.log(shoe);

    //add shadows to children
    shoe.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });

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
    watch(() => props.color, (newColor) => {
      color = parseInt("0x"+newColor);
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


const geometry = new THREE.PlaneGeometry( 2000, 2000 );
geometry.rotateX( - Math.PI / 2 );

const material = new THREE.ShadowMaterial();
material.opacity = 0.4;

const plane = new THREE.Mesh( geometry, material );
plane.receiveShadow = true;
plane.position.y = -0.05;
scene.add( plane );


const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Adjust the intensity (e.g., 0.8)
scene.add(ambientLight);

//add directional light with shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
//add helper

directionalLight.castShadow = true


scene.add(directionalLight);

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