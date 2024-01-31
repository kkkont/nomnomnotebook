<template>
  <HeaderComponent />
  <div class="settings">
    <h1>
      Craving a funky twist in your account, {{ user.name }}? <br />Let's spice
      it up!
    </h1>
    <div style="background-color: white">
      <label for="name">Change your name or nickname</label>
      <input
        type="name"
        name="name"
        required
        v-model="user.name"
        placeholder="Change your name or nickname"
        style="width: 100px"
      />
    </div>
    <img :src="user.urllink" id="profilephoto" />
    <label for="urlllink">Change an URL link of your profile picture</label>
    <div class="urllink">
      <input
        type="urllink"
        name="urllink"
        required
        v-model="user.urllink"
        placeholder="Change an URL link of your profile picture"
      />
      <button @click="clearUrllink" style="border-radius: 0px; font-size: 15px">
        Clear URL Link
      </button>
    </div>
    <h2 style="background-color: white">Here You can edit Your description!</h2>
    <div class="about">
      <font-awesome-icon
        icon="quote-left"
        class="fa-quote-left icon"
      ></font-awesome-icon>
      <input
        type="description"
        name="description"
        required
        v-model="user.description"
        placeholder="Enter your new description"
        style="height: 50px; font-size: 20px; width: 100%; border: none"
      />
    </div>

    <button class="updateButton" @click="updateUser" style="margin: 30px">
      Update Account
    </button>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
export default {
  name: "MyRecipesView",
  components: {
    HeaderComponent,
  },
  data() {
    return {
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
    updateUser() {
      if (!this.user.id) {
        console.error("Cannot update without a user ID");
        return;
      }
      fetch(`http://localhost:3000/api/users/${this.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.user.name,
          urllink: this.user.urllink,
          description: this.user.description,
        }),
      })
        .then((response) => response.json())
        .then((updatedUser) => {
          this.$router.push("/");
          console.log("User updated successfully", updatedUser);
        })
        .catch((error) => {
          console.error("Error updating user", error);
        });
    },
    clearUrllink() {
      this.user.urllink = "";
    },
  },
  mounted() {
    this.fetchUser();
    console.log("mounted");
  },
};
</script>
<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 60%;
  margin: auto;
  padding: 20px;
  border-radius: 25px;
}

.urllink {
  display: flex;
  background-color: white;
  width: 70%;
  justify-content: center;
}
.username {
  border: 5px solid #f1c4d7;
  padding: 10px;
  margin: 0;
  border-radius: 25px;
}
#profilephoto {
  border: 5px solid #f1c4d7;
  margin: 30px;
}

label {
  background-color: white;
}
button {
  padding: 10px;
  margin: 10px;
  width: 30%;
  font-size: 20px;
  border-radius: 15px;
  font-weight: bold;
  color: white;
  background-color: #f58eb9;
}
button:hover {
  background-color: #fb74ac;
}
</style>
