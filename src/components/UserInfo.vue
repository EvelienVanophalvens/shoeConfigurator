<script setup></script>
<template>  
  <h1>Your information</h1>
  <div class="shoeInfo">
    <p>Shoespot: {{ shoespot }}</p>
    <p>Color: {{ color }}</p>
    <p>Material: {{ material }}</p>
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