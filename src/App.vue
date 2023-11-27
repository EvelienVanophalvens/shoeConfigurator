<script setup>
import Shoe from './components/shoe.vue';
import Choose from './components/Choose.vue';

</script>

<template>
  <div id="nav">
    <img src="./assets/SWEAR_Logo.png" alt="swear logo">
  </div>
  <div id="shoeinfo">
    <h1>Shoe Configurator</h1>
  </div>
  <Shoe id="shoe" />
  <div id="choose">
    <Choose />
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
