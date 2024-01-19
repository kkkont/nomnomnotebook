<template>
<div class="header">
    <img src="../assets/logo-no-background copy.png" id="logo">
    <nav>
        <a><router-link to="/">MY RECIPES</router-link></a>
        <a><router-link to="/about">SHARED RECIPES</router-link></a>
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
}

#logo {
  width: 100px;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center; 
}

nav a {
  margin: 0 10px; /* Add margin for spacing between links */
  text-align: center;
  color:#e27da9;
  text-decoration: none;
}

nav a:hover{
    color: #ff4136;
}
nav a.router-link-exact-active {
  color: #ff4136;
}
#user{
    width:50px;
}
</style>