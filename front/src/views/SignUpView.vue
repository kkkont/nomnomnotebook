<template>
  <div class="signuppage">
    <div class="signupintroduction">
      <p>
        <b>Join NomNomNotebook: Where Culinary Dreams Come to Life!</b><br />

        Are you tired of losing those mouth-watering recipes you stumble upon?
        Do you yearn to connect with fellow food enthusiasts worldwide? Look no
        further! NomNomNotebook is your gastronomic haven, inviting you to
        embark on a delightful journey of flavor and fun.
        <br /><br />
        📚 <b>Recipe Sanctuary:</b>Save and organize your favorite recipes,
        ensuring they're never lost in the depths of the internet again.
        <br /><br />
        💬 <b>Global Foodie Community:</b> Connect with like-minded individuals
        who share your passion for all things culinary. Swap stories, tips, and
        maybe even secret ingredients! <br /><br />
        👩‍🍳 <b>Discover & Be Discovered:</b> Dive into a treasure trove of
        recipes curated by our diverse community. Unleash your inner chef, and
        who knows? Your creation might become the next sensation! <br /><br />
        🌮 <b>Share the Love:</b> Share your culinary masterpieces with the
        world! Inspire others, receive feedback, and bask in the joy of
        spreading deliciousness. <br /><br />
        Ready to elevate your cooking experience? Register with NomNomNotebook
        and let the flavor-filled journey begin! 🍽️✨
      </p>
    </div>
    <div class="signup">
      <h1>Sign Up</h1>
      <input
        type="email"
        name="email"
        required
        v-model="email"
        placeholder="Enter your email"
      />
      <input
        type="password"
        name="password"
        required
        v-model="password"
        placeholder="Enter your password"
      />
      <div class="errMsg" v-if="errMsg">{{ errMsg }}</div>
      <input
        type="name"
        name="name"
        required
        v-model="name"
        placeholder="Enter your name or nickname"
      />
      <input
        type="urllink"
        name="urllink"
        required
        v-model="urllink"
        placeholder="Add an URL link of your profile picture"
      />
      <input
        type="description"
        name="description"
        required
        v-model="description"
        placeholder="Describe yourself :)"
        style="height: 50px"
      />
      <button @click="SignUp()" type="submit" class="loginbutton">
        Sign Up
      </button>
      <button @click="this.$router.push('/')" type="submit" class="backbutton">
        I have an account
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      email: "",
      password: "",
      name: "",
      urllink: "",
      description: "",
      errMsg: "",
    };
  },
  watch: {
    password(value) {
      this.password = value;
      this.validatePassword(value);
    },
  },
  methods: {
    validatePassword(value) {
      if (
        value.length < 8 ||
        value.length >= 16 ||
        !/[A-Z]/.test(value) ||
        !/[0-9]/.test(value)
      ) {
        this.errMsg =
          "Password requirements: 8-16 characters, include a capital letter and at least one number";
      } else {
        this.errMsg = "";
      }
    },
    SignUp() {
      var data = {
        email: this.email,
        password: this.password,
        name: this.name,
        urllink:
          this.urllink.trim() === ""
            ? "https://cdn-icons-png.flaticon.com/512/8038/8038492.png"
            : this.urllink,
        description: this.description,
      };
      fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
          console.log("error");
        });
    },
  },
};
</script>

<style>
.signuppage {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 50px;
  background-color: white;
  margin: 60px;
  border-radius: 25px;
  animation: fadeIn 1s ease-in-out forwards;
}
.signupintroduction {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: justify;
  width: 50%;
  font-size: 15px;
  padding: 20px;
}
.signupintroduction p,
.signupintroduction b {
  background-color: white;
}
.signup {
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.errMsg {
  width: 60%;
  color: #ff4136;
  padding: 5px;
  border-radius: 15px;
  background-color: #ffedf4;
}

.backbutton {
  font-size: 15px;
  border: none;
  background: none;
  color: #2c3e50;
}

.backbutton:hover {
  font-weight: bold;
  background-color: white;
  color: #24394f;
}
</style>
