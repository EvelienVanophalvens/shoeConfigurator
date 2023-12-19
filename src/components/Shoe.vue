<script setup>
import { watch, ref, onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Quaternion, Euler } from 'three';

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
  }


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let shoe;
const renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//enable shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2;
controls.enablePan = false;

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})



//stop pan controls
controls.enablePan = false;
//minimum distance from the object
controls.minDistance = 0.3;

controls.maxDistance =0.5;

// Create a CubeTextureLoader
const cubeTextureLoader = new THREE.CubeTextureLoader();





// Use the prop
const props = defineProps({
  shoespot: Number,
  color: String,
  material: String
});

let color = props.color;

let texture = props.material;
let textureLoader;
let normalTexture;
let aoTexture;
let displacementTexture;
let roughnessTexture;
let map;
onMounted(() => {
  textureLoader = new THREE.TextureLoader();
  normalTexture = textureLoader.load('/textures/leatherMaterial/brown_leather_nor_gl_4k.jpg');
  aoTexture = textureLoader.load('/textures/leatherMaterial/brown_leather_ao_4K.jpg');
  displacementTexture = textureLoader.load('/textures/leatherMaterial/leather_disp_4k.jpg');
  roughnessTexture = textureLoader.load('/textures/leatherMaterial/brown_leather_rough_4k.jpg');
  map = textureLoader.load('/textures/leatherMaterial/brown_leather_albedo_4k.jpg');
});
//load gltf model
const gltfloader = new GLTFLoader();




gltfloader.load(
  '/models/shoe.glb',
  function (gltf) {
    shoe = gltf.scene;
    controls.target.set(shoe.position.x, shoe.position.y, shoe.position.z);
    shoe.scale.set(1, 1, 1);
    watch(() => props.material, (newMaterial) => {
  //make a switch statement to change the material of the shoe
  switch(newMaterial){
    case "Leather":
      console.log("leather");
      textureLoader = new THREE.TextureLoader();
      shoe["children"][0]["children"][0].material = new THREE.MeshStandardMaterial({ 
      normalMap:  textureLoader.load('/textures/leatherMaterial/brown_leather_nor_gl_4k.jpg'), 
      aoMap: textureLoader.load('/textures/leatherMaterial/brown_leather_ao_4K.jpg'), 
      displacementMap: textureLoader.load('/textures/leatherMaterial/leather_disp_4k.jpg'), 
      displacementScale: 0,
      roughnessMap: textureLoader.load('/textures/leatherMaterial/brown_leather_rough_4k.jpg'),
      roughness: 1,
      map: textureLoader.load('/textures/leatherMaterial/brown_leather_albedo_4k.jpg'),
     });
      
    break;
    case "Polyester":
      textureLoader = new THREE.TextureLoader();
      shoe["children"][0]["children"][0].material = new THREE.MeshStandardMaterial({ 
      normalMap: textureLoader.load('/textures/poylester/Fabric_polyester_001_normal.jpg'), 
      aoMap: textureLoader.load('/textures/poylester/Fabric_polyester_001_ambientOcclusion.jpg'), 
      displacementMap: textureLoader.load('/poylester/leatherMaterial/Fabric_polyester_001_height.png'), 
      roughnessMap: textureLoader.load('/poylester/leatherMaterial/Fabric_polyester_001_roughness.jpg'),
      roughness: 1,
      map: textureLoader.load('/textures/poylester/Fabric_polyester_001_basecolor.jpg'),
     });
    break;
  }

  
});
    //set leatherMaterial texture for shoe on inside
    
    //cast shadow to plane

    //add shadows to children
    shoe.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });

    //color the shoe
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
    //inside
    textureLoader = new THREE.TextureLoader();
      shoe["children"][0]["children"][0].material = new THREE.MeshStandardMaterial({ 
      normalMap:  textureLoader.load('/textures/leatherMaterial/brown_leather_nor_gl_4k.jpg'), 
      aoMap: textureLoader.load('/textures/leatherMaterial/brown_leather_ao_4K.jpg'), 
      displacementMap: textureLoader.load('/textures/leatherMaterial/leather_disp_4k.jpg'), 
      displacementScale: 0,
      roughnessMap: textureLoader.load('/textures/leatherMaterial/brown_leather_rough_4k.jpg'),
      roughness: 1,
      map: textureLoader.load('/textures/leatherMaterial/brown_leather_albedo_4k.jpg'),
     });
    watch(() => props.color, (newColor) => {
      color = parseInt("0x"+newColor);
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
    }
    });

   

    scene.add(shoe);
    // Load the cube textures
cubeTextureLoader.load(
  [
    'cubemap/px.png',
    'cubemap/nx.png',
    'cubemap/py.png',
    'cubemap/ny.png',
    'cubemap/pz.png',
    'cubemap/nz.png',
  ],
  function (textureCube) {
    // Set the scene's background to the loaded cube texture
    scene.background = textureCube;
  }
);
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
// Add this after defining your directional light
directionalLight.shadow.mapSize.width = 5120; // default is 512, increase for higher resolution
directionalLight.shadow.mapSize.height = 5120; // default is 512, increase for higher resolution

// Add this after defining your directional light
directionalLight.shadow.camera.left = -1; // default is -5, increase for more spread
directionalLight.shadow.camera.right = 1; // default is 5, increase for more spread
directionalLight.shadow.camera.top = 1; // default is 5, increase for more spread
directionalLight.shadow.camera.bottom = -1; // default is -5, increase for more spread

// Always necessary after changing any of the shadow camera properties
directionalLight.shadow.camera.updateProjectionMatrix();

scene.add(directionalLight);

//define lets
let change = false;

//set initioal camera position
camera.position.set(0, 0.2, 0.35);

//set initial rotation
camera.rotation.set( Math.PI/-6, 0, 0);

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Add a method to reset the camera with smooth movement and easing
const resetCamera = () => {
  const targetPosition = new THREE.Vector3(0, 0.2, 0.35);
  const targetRotation = new THREE.Euler(Math.PI / -6, 0, 0);
  const targetQuaternion = new THREE.Quaternion().setFromEuler(targetRotation);

  const initialPosition = new THREE.Vector3().copy(camera.position);
  const initialRotation = new THREE.Euler().copy(camera.rotation);
  const initialQuaternion = new THREE.Quaternion().setFromEuler(initialRotation);

  const duration = 1; // Adjust the duration as needed
  let elapsed = 0;

  const animateReset = () => {
    elapsed += 0.016; // Assuming 60 frames per second

    const t = Math.min(elapsed / duration, 1);
    const easedT = easeInOutCubic(t);

    camera.position.lerp(targetPosition, easedT);
    
    // Use slerp for quaternion interpolation
    const newQuaternion = new THREE.Quaternion().slerp(targetQuaternion, easedT);
    camera.setRotationFromQuaternion(newQuaternion);

    controls.target.set(0, 0, 0);
    controls.update();

    if (elapsed < duration) {
      requestAnimationFrame(animateReset);
    }
  };

  // Call animateReset to start the animation
  animateReset();
};

let targetRotation = new Quaternion();

// Watch for changes in shoespot
watch(() => props.shoespot, (newShoespot) => {
  // Change the shoe rotation based on the new shoespot
  let euler = new Euler();
  if(newShoespot == 0){
    euler.set(0, 0, 0);
    resetCamera();
  } else if(newShoespot == 1){
    euler.set(0, Math.PI / 2, 0);
    resetCamera();
  } else if(newShoespot == 2){
    euler.set(0, Math.PI / 2, 0);
    resetCamera();
  } else if(newShoespot == 3){
    euler.set(0, -Math.PI / 2, 0);
    resetCamera();
  } else if(newShoespot == 4){
    euler.set(0, -Math.PI / 2, 0);
    resetCamera();
  } else if(newShoespot == 5){
    euler.set(0, Math.PI / 2, 1);
    resetCamera();
  }
  targetRotation.setFromEuler(euler);
});



function animate() {
  requestAnimationFrame(animate);

  // Check if shoe is defined before trying to access its quaternion
  if (shoe) {
    // Lerp the shoe rotation
    shoe.quaternion.slerp(targetRotation, 0.1);
  }

  renderer.render(scene, camera);
}

animate();


//picture
import html2canvas from 'html2canvas';

const screenshotDataUrl = ref(null);
const showPreview = ref(false);

const takeScreenshot = () => {
  html2canvas(document.querySelector('canvas')).then((canvas) => {
    screenshotDataUrl.value = canvas.toDataURL('image/png');
    showPreview.value = true;
  });
};

const downloadScreenshot = () => {
  if (screenshotDataUrl.value) {
    const link = document.createElement('a');
    link.download = 'screenshot.png';
    link.href = screenshotDataUrl.value;
    link.click();
  }
};

</script>

<template>
  <div class="picture" @click="takeScreenshot">
    <svg xmlns="http://www.w3.org/2000/svg" height="44" width="44" viewBox="0 0 512 512"><path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
  </div>
  <div v-if="showPreview" id="previewContainer">
    <img :src="screenshotDataUrl" id="screenshotPreview" />
    <button @click="downloadScreenshot" :disabled="!screenshotDataUrl">Download Screenshot</button>
  </div>
</template>

<style scoped>
#previewContainer {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 400px;
  padding: 20px;

  
}
#screenshotPreview {
  width: 100%;
  height: auto;
}
</style>