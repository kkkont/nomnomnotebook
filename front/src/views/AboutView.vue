<template>
  <div class="frontpage">
    <div class="sidebar"></div>
    <div class="introduction">
      <p>Welcome to <b>NomNomNotebook!</b></p>
      <p style="text-align: justify">
        On this website, you have the freedom to share your culinary creations
        with the public or keep them as private journal entries. Engage with
        fellow food enthusiasts by leaving comments and expressing appreciation
        through likes. Feel the flexibility to update your recipes at any time,
        ensuring that your culinary innovations evolve and inspire others along
        the way. Join the community, celebrate the art of cooking, and let the
        aroma of delicious possibilities fill your digital kitchen!
      </p>
      <p>Let's embark on this flavorful journey together!</p>
      <p><b>Who are We?</b></p>
      <p style="text-align: justify">
        I am Kadri-Ketter Kont, currently a second-year Computer Science student
        at the University of Tartu. In my journey through academia, I discovered
        a unique intersection between my passion for coding and the therapeutic
        joy I find in cooking. This realization inspired me to embark on a
        project – a web application that seamlessly merges technology with the
        world of culinary adventures.
      </p>
      <p>
        If you're interested in learning more about me, feel free to explore the
        links provided below.
      </p>
      <div class="links">
        <a href="https://www.linkedin.com/in/kadri-ketter-kont" target="_blank"
          ><font-awesome-icon class="icon" icon="fa-brands fa-linkedin" /></a
        ><a href="https://github.com/kkkont" target="_blank"
          ><font-awesome-icon class="icon" icon="fa-brands fa-square-github"
        /></a>
      </div>
    </div>
    <div class="sidebar">
      <button
        v-if="authResult"
        @click="this.$router.push('/')"
        class="aboutbutton"
      >
        Return
      </button>
      <button v-else @click="this.$router.push('/welcome')" class="aboutbutton">
        Return
      </button>
    </div>
  </div>
</template>
<script>
import auth from "../auth";
export default {
  name: "AboutView",
  data: function () {
    return {
      authResult: auth.authenticated(),
    };
  },
};
</script>
<style scoped>
.frontpage {
  align-items: start;
}
.sidebar {
  width: 20%;
  background-color: white;
  align-items: left;
}
.links a {
  background-color: white;
}
.icon {
  background-color: white;
  color: #fb8ab7;
  height: 60px;
}
.links {
  display: flex;
  justify-content: space-around;
  width: 30%;
  background-color: white;
}
.icon:hover {
  color: #ff5b9d;
}
.aboutbutton {
  margin: 0;
}
</style>
