<script setup>
import { useRouter } from 'vue-router'
import { defineEmits } from 'vue';
import { ref } from 'vue'

const emit = defineEmits({
  // Define your emits here
  'size-changed': null,
});

//make a list of shoe sizes
const shoesizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51"];
const selectedSize = ref(null);
const showOverlay = ref(false);

//go back to choose page
const router = useRouter();
const goToPrevieusPage = () => {
    router.push('/');
}
const goToNextPage = () => {
    if(selectedSize.value === null){
        showOverlay.value = true;
    }
    else{
        router.push('/info');
    }
}
//on click shoesize ==> console log
const setShoeSize = (shoesize) => {
    // console.log(shoesize);
    selectedSize.value = shoesize;
    showOverlay.value = false;
    emit('size-changed', shoesize); // Emit size-changed event
}

</script>
<template>
    <div class="section">
        <div class="container">
            <div class="btnBack">
                <a href="#" @click.prevent="goToPrevieusPage">back</a>
            </div>
            <h1>Shoe Size</h1>
            <div id="shoesizeContainer" >
                <div v-for="shoesize in shoesizes" :key="shoesize" @click="setShoeSize(shoesize)" :class="{ selected: shoesize === selectedSize, unselected: shoesize !== selectedSize }">
                    <p>{{ shoesize }}</p>
                </div>
                <div v-if="showOverlay" class="overlay">
                    <p>Please select a shoe size.</p>
                </div>
            </div>
            <div class="btn">
                <a href="#" @click.prevent="goToNextPage">Next</a>
            </div>
        </div>
    </div>  
</template>

<style scoped>
    h1 {
        color: #D6FF38;
        font-size: 2em;
        margin: 0;
        padding: 0;
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
    }
    .unselected {
        cursor: pointer;
        display: inline-block;
        border: white solid 2px;
        color: white;
        width: 50px;
        height: 50px;
        margin: 10px;
        text-align: center;  
    }
    .selected {
        cursor: pointer;
        display: inline-block;
        border: #D6FF38 solid 2px;
        color: #D6FF38;
        width: 50px;
        height: 50px;
        margin: 10px;
        text-align: center;  
    }
    #shoesize:hover {
        cursor: pointer;
        border: #D6FF38 solid 2px;
        color: #D6FF38;
    }
    #shoesizeContainer {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-gap: 10px;
        padding: 10px;
    }
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    a{
    color: black;
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
    font-size: 1.5em;
    font-weight: bold;
}
.btn{
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
.btnBack{
    display: inline-block;
    background-color: #D6FF38;
    width: 100px;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 20px; 
    text-align: center;
    line-height: 50px;
    
}
.section{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: black;
}
.overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 75%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 2em;
        font-family: Arial, Helvetica, sans-serif;
    }

</style>