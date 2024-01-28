<template>
<div class="header">
    <img src="../assets/logo-no-background copy.png" id="logo">
    <nav>
        <a><router-link to="/">MY RECIPES</router-link></a>
        <a><router-link to="/shared">SHARED RECIPES</router-link></a>
    </nav>
    <div class="dropdown" @click="toggleDropdown">
      <img src="https://cdn-icons-png.flaticon.com/512/8038/8038492.png" id="user">
      <div class="dropdown-content" v-if="showDropdown">
        <!-- Dropdown options -->
        <router-link to="/settings">Account settings</router-link>
        <a @click="Logout()">Log Out</a>
      </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      showDropdown: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
          credentials: 'include', //  Don't forget to specify this if you need cookies
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('jwt removed');
        //console.log('jwt removed:' + auth.authenticated());
        this.$router.push("/welcome");
        //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error logout");
      });
    },
  },
};
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
    width:70px;
    background-color: white;
}
.dropdown {
  position: relative;
  display:flex;
  cursor: pointer;
}

.dropdown-content {
  display: block;
  position: absolute;
  margin-top:70px;
  min-width: 200px;
  left: -100px; 
  box-shadow: 10px 6px 15px 0px rgba(255,65,54,0.47);
  z-index: 1;
  border-radius: 25px;
}

.dropdown-content a {

  background-color: #fff1f7;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color:  #ffe6f1;;
}

</style>