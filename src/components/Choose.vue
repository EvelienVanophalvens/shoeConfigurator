<script setup>
import { ref, defineEmits, computed, provide, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router'
const shoespots = ["Laces", "Outsole", "Midsole", "Outer material", "Mid material", "Inner material"];
let shoespot = ref(0);
let colors = ref(0);
let colorOutsole = ["#ffffff", "#000000"];
let colorLaces = ["#ffffff", "#000000", "#ff0000", "#00ffff", "#00ff00", "#ffff00", "#0000ff", "#000000"];
let colorMidsole = ["#ffffff", "#000000", "#ff0000", "#00ffff", "#00ff00", "#ffff00", "#0000ff", "#000000"];
let colorOuterMaterial = ["#ffffff", "#000000", "#ff0000", "#00ffff", "#00ff00", "#ffff00", "#0000ff", "#000000"];
let colorMidMaterial = ["#ffffff", "#000000", "#ff0000", "#00ffff", "#00ff00", "#ffff00", "#0000ff", "#000000"];
let colorInnerMaterial = ["#ffffff", "#000000", "#ff0000", "#00ffff", "#00ff00", "#ffff00", "#0000ff", "#000000"];
let colorTongue = ["#ffffff", "#000000", "#ff0000", "#00ffff", "#00ff00", "#ffff00", "#0000ff", "#000000"];

// on mounted setMaterial
onMounted(() => {
    setMaterial("Leather");
})
//define emit function
const emit = defineEmits(['shoespot-changed', 'color-changed', 'material-changed']);
const next = () => {
    if (shoespot.value < shoespots.length - 1) {
        shoespot.value++;
    } else {
        shoespot.value = 0;
    }
    emit('shoespot-changed', shoespot.value);
    document.getElementById("shoespotindicator").innerHTML = shoespots[shoespot.value];
    updateColors();
}
const back = () => {
    if (shoespot.value > 0) {
        shoespot.value--;
    } else {
        shoespot.value = shoespots.length - 1;
    }
    emit('shoespot-changed', shoespot.value);
    document.getElementById("shoespotindicator").innerHTML = shoespots[shoespot.value];
    updateColors();
}
const updateColors = () => {
    switch (shoespot.value) {
        case 0:
            colors.value = colorLaces;
            break;
        case 1:
            colors.value = colorOutsole;
            break;
        case 2:
            colors.value = colorMidsole;
            break;
        case 3:
            colors.value = colorOuterMaterial;
            break;
        case 4:
            colors.value = colorMidMaterial;
            break;
        case 5:
            colors.value = colorInnerMaterial;
            break;
        case 6:
            colors.value = colorTongue;
            break;
    }
}
updateColors();

const setColor = (color, e) => {
    const newColor = color.slice(1);
    emit('color-changed', newColor);
}

//material only for inner material
const isInnerMaterial = computed(() => shoespots[shoespot.value] === "Inner material");
//make an array of the following materials: leather, polyester
let materials = ["Leather", "Polyester"];
let material = ref("");

const setMaterial = (m) => {
    material.value = m;
    //add selected id (this is m) to .materials
    const selectedMaterial = document.querySelector(`#${m}`);
    const deselectMaterial = document.querySelector(`.selected`);
    if (deselectMaterial) {
        deselectMaterial.classList.remove("selected");
    }
    selectedMaterial.classList.add("selected");
    emit('material-changed', material.value);
}
const router = useRouter()
const goToNextPage = () => {
    router.push('/shoeSize')
}
</script>
<template>
    <div class="section">
        <div class="center">
            <div class="side">
                <svg class="pointer" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"
                    @click="next"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
                <p id="shoespotindicator">Laces</p>
                <svg class="pointer" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"
                    @click="back"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
            </div>
            <div class="materials">
                <ul v-show="isInnerMaterial" class="materials">
                    <li :id="m" class="material" v-for="m in materials" @click="setMaterial(m)">{{ m }}</li>
                </ul>
            </div>
            <div class="colors">
                <ul >
                    <li v-for="c in colors" :style="{ backgroundColor: c }" @click="setColor(c)"></li>
                </ul>
            </div>
        </div>
        <div class="btn">
            <a href="#" @click.prevent="goToNextPage">Next</a>
        </div>
    </div>
</template>
<style scoped>
.material.selected {
    border: #D6FF38 solid 2px;
    color: #D6FF38;
}

.center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

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

#shoespotindicator {
    width: 300px;
    text-align: center;
}

ul {
    padding: 0;
    display: flex;
    flex-direction: row;
}
.colors{
    position: absolute;
    bottom: 0;
}

.colors li {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    list-style-type: none;
    margin: 0.5em;
    border: #D6D0C5;
    border-style: solid;
    border-width: 2px;

}

.materials {
    display: flex;
    flex-direction: row;
    height: auto;
}

.material {
    width: 150px;
    height: 30px;
    list-style-type: none;
    margin: 0.5em;
    border: #D6D0C5;
    border-style: solid;
    border-width: 2px;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1em;
    text-align: center;
    line-height: 30px;
}

.material:hover {
    border: #D6FF38 solid 2px;
    color: #D6FF38;
    cursor: pointer;
}

a {
    color: black;
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
    font-size: 1.5em;
    font-weight: bold;
}

.btn {
    display: inline-block;
    background-color: #D6FF38;
    width: 100px;
    height: 50px;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 20px;
    text-align: center;
    line-height: 50px;

}

.section {
    width: 100%;
    height: 200px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: black;
}</style>