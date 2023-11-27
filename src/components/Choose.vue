<script setup>
    import { ref, defineEmits } from 'vue';
    const shoespots = ["Laces", "Outsole", "Midsole", "Outer material", "Mid material", "Inner material", "Tongue"];
    let shoespot = ref(0);
    //define emit function
    const emit = defineEmits(['shoespot-changed']);
    const next = () => {
        if (shoespot.value < shoespots.length -1) {
            shoespot.value++;
        } else{
            shoespot.value = 0;
        }
        emit('shoespot-changed', shoespot.value);
        document.getElementById("shoespotindicator").innerHTML = shoespots[shoespot.value];
    }
    const back = () => {
        if (shoespot.value > 0) {
            shoespot.value--;
        } else {
            shoespot.value = shoespots.length - 1;
        }
        emit('shoespot-changed', shoespot.value);
        document.getElementById("shoespotindicator").innerHTML = shoespots[shoespot.value];
    }
</script>
<template>
    <div class="side"> 
        <svg class="pointer" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" @click="next"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
        <p id="shoespotindicator">Laces</p>
        <svg class="pointer" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" @click="back"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
    </div>
</template>
<style scoped>

svg {
    width: 2em;
    height: 2em;
    margin: 0.5em;
    fill: #D6FF38;
}
p {
    color: #D6FF38;
    font-size: 2em;
    margin: 0;
    padding: 0;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
}
.side {
   display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
}   
.pointer {
    cursor: pointer;
}
#shoespotindicator{
    width: 300px;
    text-align: center;
}
</style>