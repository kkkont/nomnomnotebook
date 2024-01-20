<template>
<div class="header">
    <img src="../assets/logo-no-background copy.png" id="logo">
    <nav>
        <a><router-link to="/myrecipes">MY RECIPES</router-link></a>
        <a><router-link to="/shared">SHARED RECIPES</router-link></a>
    </nav>
    <img src="../assets/icons8-user-30.png" id="user">
</div>
</template>
<script>
export default {
  name: 'HeaderComponent',
}
</script>
<style>
.header {
  display: flex;
  justify-content: space-around; 
  align-items: center;
  padding:20px;
  margin: 0px 20px 20px 20px;
  border-radius: 25px;
  background-color: white;
  box-shadow: 10px 6px 15px 0px rgba(255,65,54,0.47);
}

#logo {
  width: 100px;
  background-color: white;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center; 
  background-color: white;
}

nav a {
  margin: 0 10px; /* Add margin for spacing between links */
  text-align: center;
  color:#e27da9;
  text-decoration: none;
  background-color: white;
}

nav a:hover{
    color: #ff4136;
}
nav a.router-link-exact-active {
  color: #ff4136;
}
#user{
    width:50px;
    background-color: white;
}
</style>