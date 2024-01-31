<template>
  <div>
    <div v-if="showLogo" class="logo-container">
      <img class="logo" src="../assets/logo-no-background.png" alt="Logo" />
    </div>
    <div v-if="!showLogo" class="frontpage">
      <div class="introduction">
        <p>
          Welcome to <b>NomNomNotebook!</b><br /><br />Your go-to culinary hub
          for storing, sharing, and discovering recipes with a vibrant community
          of food enthusiasts. 🍲👩‍🍳
        </p>
        <button @click="this.$router.push('/about')" class="aboutbutton">
          Learn More About Us
        </button>
      </div>
      <div class="login">
        <h1>Ready to Spice Things Up? <br />Log In for Culinary Delights!</h1>
        <label for="email"></label>
        <input
          type="email"
          name="email"
          required
          v-model="email"
          placeholder="Enter your email"
        />
        <label for="password"></label>
        <input
          type="password"
          name="password"
          required
          v-model="password"
          placeholder="Enter your password"
        />
        <button @click="LogIn" class="loginbutton">Log In</button>
        <h4>Don't have an account?</h4>
        <button @click="this.$router.push('/signup')" class="signupbutton">
          Sign Up
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogIn",

  data: function () {
    return {
      showLogo: true,
      email: "",
      password: "",
    };
  },
  beforeMount() {
    setTimeout(() => {
      this.showLogo = false;
    }, 3000);
  },
  methods: {
    LogIn() {
      var data = {
        email: this.email,
        password: this.password,
      };

      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", //  Don't forget to specify this if you need cookies
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          //this.$router.push("/");
          location.assign("/");
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
.introduction {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  font-size: 25px;
}

.introduction p,
b {
  background-color: white;
}

.frontpage {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  padding: 60px;
  margin: 60px;
  border-radius: 25px;
  animation: fadeIn 1s ease-in-out forwards;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.logo {
  max-width: 90%;
  max-height: 90%;
  animation: fadeInOut 3s ease-in-out forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.login {
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
}

input {
  margin: 10px;
  background-color: white;
  padding: 10px;
  width: 60%;
  color: #de3c808d;
  font-size: 15px;
  border-radius: 5px;
}

input::placeholder {
  color: #de3c808d;
  font-style: italic;
}

.login h4 {
  background-color: white;
}

.loginbutton {
  padding: 10px;
  margin: 10px;
  width: 30%;
  font-size: 20px;
  border-radius: 15px;
  font-weight: bold;
  color: white;
  background-color: #f58eb9;
}

.loginbutton:hover {
  background-color: #fb74ac;
}

.signupbutton:hover {
  background-color: #fb74ac;
}
.signupbutton {
  padding: 10px;
  width: 25%;
  font-size: 15px;
  border-radius: 15px;
  font-weight: bold;
  color: white;
  background-color: #f58eb9;
}

.aboutbutton {
  font-size: 30px;
  padding: 10px;
  margin: 20px;
  color: #2c3e50;
  background-color: #ffedf4;
  border-radius: 15px;
  border: #ffa7cc 3px solid;
}

.aboutbutton:hover {
  background-color: #ffd7e7;
}
</style>
