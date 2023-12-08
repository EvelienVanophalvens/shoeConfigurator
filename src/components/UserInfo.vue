<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
//receive json string from shoeSize.vue

const route = useRoute();
const shoeOptionsString = route.query.shoeOptions;
console.log(shoeOptionsString);
const shoeOptions = JSON.parse(shoeOptionsString);
console.log(shoeOptions);

// Define reactive data
const array1 = ref(shoeOptions[0][0].split(','));
const array2 = ref(shoeOptions[0][1].split(','));
const array3 = ref(shoeOptions[0][2].split(','));
const array4 = ref(shoeOptions[0][3].split(','));
const array5 = ref(shoeOptions[0][4].split(','));
const array6 = ref(shoeOptions[0][5].split(','));
const material = ref(shoeOptions[1]);
const size = ref(shoeOptions[2]);

</script>

<template>  
  <h1>Your information</h1>
  <div class="shoeInfo">
    <p>Laces: #{{ array1[0] }}</p>
    <p>Outsole: #{{ array2[0] }}</p>
    <p>Midsole: #{{ array3[0] }}</p>
    <p>Outer material: #{{ array4[0] }}</p>
    <p>Mid material: #{{ array5[0] }}</p>
    <p>Inner material: #{{ array6[0] }}</p>
    <p>Material: {{ material }}</p>
    <p>Size: {{ size }}</p>
  </div>
  <div class="userInfo">
    <h2>contact</h2>
    <div class="name">
      <div class="input">
        <label for="firstname">firstname:</label>
        <input type="text">
      </div>
      <div class="input">
        <label for="lastname">lastname:</label>
        <input type="text">
      </div>
    </div>
      <div class="contact">
      <div class="input">
        <label for="email">email:</label>
        <input type="text">
      </div>  
      <div class="input">
        <label for="phoneNumber">phonenumber:</label>
        <input type="text">
      </div>   
    </div>
    <h2>adress</h2>
    <div class="address1">
      <div class="input">
        <label for="street">street:</label>
        <input type="text">
      </div>   
      <div class="input">
        <label for="houseNumber">housenumber:</label>
        <input type="text">
      </div>
      <div class="input">
        <label for="city">city:</label>
        <input type="text">
      </div>
      <div class="input">
        <label for="zipcode">zipcode:</label>
        <input type="text">
      </div>
    </div>
    <div class="address2">
      <div class="input">
        <label for="state">state:</label>
        <input type="text">
      </div>
      <div class="input">
        <label for="country">country:</label>
        <input type="text">
      </div>
    </div>
    <div class="btn">
      <a href="#" @click.prevent="goToNextPage">Next</a>
    </div>
  </div>
</template>
<style scoped>
h1 {
  font-size: 2em;
  margin: 0;
  padding: 0;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}
h2 {
  font-size: 1.5em;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}
.input {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0em 2em 0em 0em;
}
.input label {
  font-size: 1em;
  margin: 0.5em 0em;
  font-family: Arial, Helvetica, sans-serif;
}
.input input {
  font-size: 1em;
  padding: 0.5em;
  border: 1px solid black;
  font-family: Arial, Helvetica, sans-serif;
}
.name {
  display: flex;
  flex-direction: row;
}
.contact {
  display: flex;
  flex-direction: row;
  margin: 1em 0em 2em 0em;
}
.address1 {
  display: flex;
  flex-direction: row;
}
.address2 {
  display: flex;
  flex-direction: row;
  margin: 1em 0em 2em 0em;
}
.userInfo {
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: auto;
}
.btn {
  display: inline-block;
  background-color: #D6FF38;
  width: 100px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  justify-self: end;
  align-self: end;
  margin: 0em 2em 0em 0em;
}
.btn a {
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  font-size: 1em;
  font-weight: bold;
}

</style>