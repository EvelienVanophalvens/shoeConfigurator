<script setup>
import Shoe from './components/Shoe.vue';
import Choose from './components/Choose.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';



let shoespot = ref(0);
let color = ref("#ffffff");
let material = ref("Leather");
let shoeSize = ref("");
let colorAndPlace = ref("");
let shoeOptions = ref([[["ffffff", 0], ["ffffff", 1], ["ffffff", 2], ["ffffff", 3], ["ffffff", 4], ["ffffff", 5]], undefined, undefined])

const updateShoespot = (newShoespot) => {
  shoespot.value = newShoespot;
};
const updateColor = (newColor) => {
  color.value = newColor;
  //make new array consisting of the color and the shoespot
  colorAndPlace.value = [newColor, shoespot.value];
  //remove old colorAndPlace from first array in shoeOptions and add new colorAndPlace
  if (shoespot.value >= 0 && shoespot.value <= 5) {
    shoeOptions.value[0].splice(shoespot.value, 1, colorAndPlace.value);
  }
};

const updateMaterial = (newMaterial) => {
  material.value = newMaterial;
  //add material to second array in shoeOptions
  shoeOptions.value[1] = material.value;
};
const updateShoeSize = (newShoeSize) => {
  shoeSize.value = newShoeSize;
  //add shoeSize to third array in shoeOptions
  shoeOptions.value[2] = shoeSize.value;
};

const route = useRoute()

watch(() => route.path, (newPath) => {
   const canvasElement = document.querySelector('canvas');
   if (canvasElement) {
     canvasElement.style.display = newPath === '/info' ? 'none' : 'block';
   }
 }, { immediate: true })



</script>

<template>
  <div id="header">
    <div id="nav">
      <img src="./assets/SWEAR_Logo.png" alt="swear logo">
    </div>
    <div id="shoeinfo">
      <h1>air rev nitro’s </h1>
    </div>
  </div>
  <Shoe id="shoe" :shoespot="shoespot" :color="color" :material="material" />
  <div class="choose" v-if="$route.path === '/'">
    <router-view @shoespot-changed="updateShoespot" @color-changed="updateColor"
      @material-changed="updateMaterial" />
  </div>
  <div class="choose" v-else-if="$route.path === '/shoeSize'">
    <router-view 
             @size-changed="updateShoeSize" 
             :shoeOptions="shoeOptions" />
  </div>
  <div class="info" v-else-if="$route.path === '/info'">
    <router-view/>
  </div>
</template>

<style scoped>
#nav {
  width: auto;
  background-color: #D6FF38;
  display: flex;
  justify-content: space-between;
}

#nav img {
  width: 150px;
  margin: 20px;
  height: auto;
}

#shoeinfo {
  display: inline-block;
  width: auto;
  height: 61px;
  margin-right: 20px;
  text-align: center;
  vertical-align: middle;
  line-height: 61px;


}

#shoeinfo h1 {
  font-size: 24px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

#header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 61px;
  color: white;
  background-color: black;
}
</style>