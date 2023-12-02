<script setup>
//make a list of shoe sizes
const shoesizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
</script>
<template>
    <div class="container">
        <h1>Shoe Size</h1>
        <div id="shoesizeContainer" >
            <div id="shoesize" v-for="shoesize in shoesizes" :key="shoesize" @click="setShoeSize(shoesize)">
                <p>{{ shoesize }}</p>
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
    #shoesize {
        display: inline-block;
        border: white solid 2px;
        color: white;
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
</style>