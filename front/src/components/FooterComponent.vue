<template>
  <div class="footer">
    <nav>
      <a><router-link to="/about">About</router-link></a
      >⏐ <a><router-link to="/settings">Account settings</router-link></a
      >⏐<a v-if="authResult" @click="Logout()"
        ><router-link to="/">Log Out</router-link></a
      >
    </nav>
    <p>Created by Kadri-Ketter Kont</p>
  </div>
</template>
<script>
import auth from "../auth";
export default {
  name: "FooterComponent",
  data: function () {
    return {
      authResult: auth.authenticated(),
    };
  },
  methods: {
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
        credentials: "include", //  Don't forget to specify this if you need cookies
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log("jwt removed");
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
<style scoped>
.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.508);
  flex-direction: column;
}
p {
  padding-top: 0;
  padding-bottom: 5px;
  color: #7e7e7e;
  background-color: transparent;
}
nav a {
  color: #7e7e7e;
  background-color: transparent;
}
nav a:hover {
  color: #515151;
}
nav {
  padding: 20px 0px 5px 0px;
  background-color: transparent;
}
</style>
