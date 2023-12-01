<script setup>
import Shoe from './components/Shoe.vue';
import Choose from './components/Choose.vue';
import { ref } from 'vue';

let shoespot = ref(0);
let color = ref("#ffffff");

const updateShoespot = (newShoespot) => {
  shoespot.value = newShoespot;
};
const updateColor = (newColor) => {
  color.value = newColor;
};

</script>

<template>
  <div id="nav">
    <img src="./assets/SWEAR_Logo.png" alt="swear logo">
  </div>
  <div id="shoeinfo">
    <h1>air rev nitro’s </h1>
  </div>
  <Shoe id="shoe" :shoespot="shoespot" :color="color" />
  <div id="choose">
    <Choose @shoespot-changed="updateShoespot" @color-changed="updateColor"/>
  </div>
</template>

<style scoped>
#choose {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: black;
}

#nav {
  position: absolute;
  top: 0;
  left: 0;
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
  position: absolute;
  top: 0;
  right: 0;
  width: auto;
  display: flex;
  justify-content: space-between;
  margin: 20px;
}
#shoeinfo h1{
  font-size: 24px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}
</style>
