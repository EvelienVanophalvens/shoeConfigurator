<script setup>
import Shoe from './components/shoe.vue';
import Choose from './components/Choose.vue';

</script>

<template>
  <div> 
    logo
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
</style>
