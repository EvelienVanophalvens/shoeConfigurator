<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
//receive json string from shoeSize.vue

let socket = null;

onMounted(() => {
  //make connection with server
  socket = new WebSocket('wss://shoeconfigurator.onrender.com/primus');
  socket.addEventListener('open', function (event) {
    console.log('Connected to server');
  });
});

//close connection with server when leaving page
onBeforeUnmount(() => {
  socket.close();
  console.log('Disconnected from server');
});

const route = useRoute();
const shoeOptionsString = route.query.shoeOptions;
const shoeOptions = JSON.parse(shoeOptionsString);

// Define reactive data
const array1 = ref(shoeOptions[0][0].split(','));
const array2 = ref(shoeOptions[0][1].split(','));
const array3 = ref(shoeOptions[0][2].split(','));
const array4 = ref(shoeOptions[0][3].split(','));
const array5 = ref(shoeOptions[0][4].split(','));
const array6 = ref(shoeOptions[0][5].split(','));
const material = ref(shoeOptions[1]);
const size = ref(shoeOptions[2]);


// Define functions
const sendData = () => {
  let firstname = document.querySelector("#firstname").value;
  let lastname = document.querySelector("#lastname").value;
  let email = document.querySelector("#email").value;
  let phoneNumber = document.querySelector("#phoneNumber").value;
  let street = document.querySelector("#street").value;
  let houseNumber = document.querySelector("#houseNumber").value;
  let city = document.querySelector("#city").value;
  let zipcode = document.querySelector("#zipcode").value;
  let state = document.querySelector("#state").value;
  let country = document.querySelector("#country").value;


  const data = {
    shoeName: "air rev nitro’s",
    colorLaces: array1.value[0],
    colorOutsole: array2.value[0],
    colorMidsole: array3.value[0],
    colorOuterMaterial: array4.value[0],
    colorMidMaterial: array5.value[0],
    colorInnerMaterial: array6.value[0],
    innerMaterial: material.value,
    shoeSize: size.value,
    firstName: firstname,
    lastName: lastname,
    email: email,
    phoneNumber: phoneNumber,
    street: street,
    houseNumber: houseNumber,
    city: city,
    zipCode: zipcode,
    state: state,
    country: country
    
  };

  // Send data to server
  socket.send(JSON.stringify(data));

  //send data to database
  // fetch('https://shoeconfigurator.onrender.com/api/v1/shoes', {
  fetch('http://localhost:3000/api/v1/shoes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  //temp alert
  window.alert("Your order has been placed!");
};



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
        <input id="firstname" type="text">
      </div>
      <div class="input">
        <label for="lastname">lastname:</label>
        <input id="lastname"  type="text">
      </div>
    </div>
      <div class="contact">
      <div class="input">
        <label for="email">email:</label>
        <input id="email" type="text">
      </div>  
      <div class="input">
        <label for="phoneNumber">phonenumber:</label>
        <input id="phoneNumber" type="text">
      </div>   
    </div>
    <h2>adress</h2>
    <div class="address1">
      <div class="input">
        <label for="street">street:</label>
        <input id="street" type="text">
      </div>   
      <div class="input">
        <label for="houseNumber">housenumber:</label>
        <input id="houseNumber" type="text">
      </div>
      <div class="input">
        <label for="city">city:</label>
        <input id="city" type="text">
      </div>
      <div class="input">
        <label for="zipcode">zipcode:</label>
        <input id="zipcode" type="text">
      </div>
    </div>
    <div class="address2">
      <div class="input">
        <label for="state">state:</label>
        <input id="state" type="text">
      </div>
      <div class="input">
        <label for="country">country:</label>
        <input id="country" type="text">
      </div>
    </div>
    <div class="btn">
      <a href="#" @click="sendData">Next</a>
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
  display: flex;
  flex-direction: row;
  width: 70%;
  margin: auto;
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

.shoeInfo {
  display: flex;
  flex-direction: row;
  width: 70%;
  margin: auto;
}

</style>