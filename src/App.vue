<script setup>
import Shoe from './components/Shoe.vue';
import Choose from './components/Choose.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';



let shoespot = ref(0);
let color = ref("#ffffff");
let material = ref("");

const updateShoespot = (newShoespot) => {
  shoespot.value = newShoespot;
};
const updateColor = (newColor) => {
  color.value = newColor;
};

const updateMaterial = (newMaterial) => {
  material.value = newMaterial;
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
  <div id="choose">
    <router-view 
      v-if="$route.path === '/'" 
      @shoespot-changed="updateShoespot" 
      @color-changed="updateColor" 
      @material-changed="updateMaterial"
    />
    <router-view v-else />
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
#shoeinfo h1{
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
  background-color: #ffff;

}
</style>