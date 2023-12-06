<script setup>
import { useRouter } from 'vue-router'
//make a list of shoe sizes
const shoesizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

//go back to choose page
const router = useRouter();
const goToPrevieusPage = () => {
    router.push('/');
}
const goToNextPage = () => {
    router.push('/info');
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
                <div id="shoesize" v-for="shoesize in shoesizes" :key="shoesize" @click="setShoeSize(shoesize)">
                    <p>{{ shoesize }}</p>
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
</style>