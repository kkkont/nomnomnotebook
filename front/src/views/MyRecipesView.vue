<template>
  <HeaderComponent />
  <div class="myrecipes">
    <div class="sidebar">
      <div class="account">
        <img :src="user.urllink" id="profilephoto" />
        <h1>{{ user.name }}</h1>
        <div class="about">
          <font-awesome-icon
            icon="quote-left"
            class="fa-quote-left icon"
          ></font-awesome-icon>
          <p class="aboutquote">{{ user.description }}</p>
        </div>
      </div>
      <button class="addbutton" @click="this.$router.push('/addrecipe')">
        Add a recipe
      </button>
      <button class="addbutton" v-if="authResult" @click="Logout()">
        Log Out
      </button>
    </div>
    <div class="recipes">
      <MyRecipesComponent></MyRecipesComponent>
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import MyRecipesComponent from "@/components/MyRecipesComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

import auth from "../auth";
export default {
  name: "MyRecipesView",
  components: {
    HeaderComponent,
    MyRecipesComponent,
    FooterComponent,
  },
  data: function () {
    return {
      authResult: auth.authenticated(),
      user: {},
    };
  },
  methods: {
    fetchUser() {
      fetch(`http://localhost:3000/api/users/`)
        .then((response) => response.json())
        .then((data) => (this.user = data))
        .catch((err) => console.log(err.message));
    },
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
  mounted() {
    this.fetchUser();
    console.log("mounted");
  },
};
</script>
<style>
* {
  background-color: #f1c4d7;
}

.myrecipes {
  display: flex;
  justify-content: space-around;
}
.sidebar {
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 25%;
  align-items: center;
}
.account {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  padding: 20px;
  border-radius: 25px;
  background-color: white;
}

.recipes {
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 20px;
  padding: 20px;
  border-radius: 25px;
  background-color: white;
}

#profilephoto {
  background-color: white;
  height: 200px;
  width: 200px;
  object-fit: cover;
  border-radius: 50%;
}

h1 {
  background-color: white;
}
.about {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 5px solid #f1c4d7;
  border-radius: 25px;
  background-color: white;
}
.icon {
  color: #ff4136;
  font-size: 30px;
  background-color: white;
}
.aboutquote {
  padding-left: 10px;
  background-color: white;
  font-size: large;
  font-weight: bold;
}
.img {
  max-height: 500px;
  width: auto;
  object-fit: contain;
  border-radius: 10px;
  background-color: #fcedf3;
}

.addbutton {
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
  font-size: 25px;
  width: 200px;

  font-weight: bold;
  background-color: white;
  border: none;
  box-shadow: 10px 6px 15px 0px rgba(255, 65, 54, 0.47);
}
.addbutton:hover {
  box-shadow: 10px 6px 15px 0px rgba(255, 65, 54, 0.8);
}
</style>
