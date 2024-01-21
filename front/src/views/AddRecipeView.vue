<template>
    <HeaderComponent></HeaderComponent>
    <div class="addpost">
      <h1>Add a Recipe</h1>
      <input type="title" name="title" required v-model="recipe.title" placeholder="The Name of Your Mouthwatering Creation">
      <input type="body" name="body" required v-model="recipe.body" placeholder="Compose Your Recipe Tale" style="height:100px">
      <label for="url">Add a picture url:</label>
      <input type="url" name="url" required v-model="recipe.urllink" placeholder="Capture the Culinary Artwork">
      <div class="checkbox">
        <label for="public" style="padding-right:20px;">Let the World Savor Your Flavor?</label>
        <div class="checkbox-wrapper-5">
    <div class="check">
      <input id="check-5" type="checkbox" v-model="recipe.public">
      <label for="check-5"></label>
    </div>
  </div>
      </div>
      <button @click="AddRecipe"  class="center">Drop Culinary Magic!</button>
    </div>
  </template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
export default {
  name: "AddPost",
  components:{
    HeaderComponent,
  },
  data() {
    return {
      recipe: {
        title: "",
        body: "",
        urllink: "",
        public: false,
      },
      user: {},
    };
  },
  methods: {
    async AddRecipe() {
      await this.fetchUser(); // Wait for fetchUser to complete
      if (!this.recipe.title || !this.recipe.body ) {
    console.log("Please fill in all required fields.");
    return; // Do not proceed with the post
  }
      const formattedDate = new Date();
      const author = this.user.name;
      const authorid = this.user.id;
      var data = {
        title: this.recipe.title,
        body: this.recipe.body,
        urllink: this.recipe.urllink,
        date: formattedDate,
        author: author,
        authorimg: this.user.urllink,
        authorid: authorid,
        likes: 0,
        comments: 0,
        public: this.recipe.public || false,
      };

      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
          console.log("error");
        });
    },
    async fetchUser() {
      try {
        const response = await fetch(`http://localhost:3000/api/users/`);
        const data = await response.json();
        this.user = data;
      } catch (err) {
        console.log(err.message);
      }
    },
  },
};

</script>

<style scoped>
.addpost {
    display:flex;
    flex-direction:column;
    max-width: 600px;
    align-items: center;
    margin:auto;
    background-color:  white;
    text-align: left;
    padding: 40px;
    border-radius: 25px;
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
  #public_yes{
    color:brown;
  }


.center {
  margin: auto;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  width: 30%; 
}
.checkbox {
    display:flex;
    align-items: center;
  background-color:  white;
}
label{
    background-color: white;
}
button {
    padding: 10px;
    margin: 10px;
    width:200px;
    font-size: 20px;
    border-radius: 15px;
    font-weight: bold;
    color: white;
    background-color: #f58eb9;
  }
  
  button:hover {
    background-color: #fb74ac;
  }
/* Used checkbox from this website https://getcssscan.com/css-checkboxes-examples.
This one is created by David Darnes */
.checkbox-wrapper-5 .check {
      --size: 40px;
  
      position: relative;
      background: linear-gradient(90deg, #f19af3, #f099b5);
      line-height: 0;
      perspective: 400px;
      font-size: var(--size);

    }
  
    .checkbox-wrapper-5 .check input[type="checkbox"],
    .checkbox-wrapper-5 .check label,
    .checkbox-wrapper-5 .check label::before,
    .checkbox-wrapper-5 .check label::after,
    .checkbox-wrapper-5 .check {
      appearance: none;
      display: inline-block;
      border-radius: var(--size);
      border: 0;
      transition: .35s ease-in-out;
      box-sizing: border-box;
      cursor: pointer;
    }
  
    .checkbox-wrapper-5 .check label {
      width: calc(2.2 * var(--size));
      height: var(--size);
      background: #d7d7d7;
      overflow: hidden;
    }
  
    .checkbox-wrapper-5 .check input[type="checkbox"] {
      position: absolute;
      z-index: 1;
      width: calc(.8 * var(--size));
      height: calc(.8 * var(--size));
      top: calc(.1 * var(--size));
      left: calc(.1 * var(--size));
      background: linear-gradient(45deg, #dedede, #ffffff);
      box-shadow: 0 6px 7px rgba(0,0,0,0.3);
      outline: none;
      margin: 0;
    
    }
  
    .checkbox-wrapper-5 .check input[type="checkbox"]:checked {
      left: calc(1.3 * var(--size));
    }
  
    .checkbox-wrapper-5 .check input[type="checkbox"]:checked + label {
      background: transparent;
    }
  
    .checkbox-wrapper-5 .check label::before,
    .checkbox-wrapper-5 .check label::after {
      content: "· ·";
      position: absolute;
      overflow: hidden;
      left: calc(.15 * var(--size));
      top: calc(.5 * var(--size));
      height: var(--size);
      letter-spacing: calc(-0.04 * var(--size));
      color: #9b9b9b;
      font-family: "Times New Roman", serif;
      z-index: 2;
      font-size: calc(.6 * var(--size));
      border-radius: 0;
      transform-origin: 0 0 calc(-0.5 * var(--size));
      backface-visibility: hidden;
    }
  
    .checkbox-wrapper-5 .check label::after {
      content: "●";
      top: calc(.65 * var(--size));
      left: calc(.2 * var(--size));
      height: calc(.1 * var(--size));
      width: calc(.35 * var(--size));
      font-size: calc(.2 * var(--size));
      transform-origin: 0 0 calc(-0.4 * var(--size));
    }
  
    .checkbox-wrapper-5 .check input[type="checkbox"]:checked + label::before,
    .checkbox-wrapper-5 .check input[type="checkbox"]:checked + label::after {
      left: calc(1.55 * var(--size));
      top: calc(.4 * var(--size));
      line-height: calc(.1 * var(--size));
      transform: rotateY(360deg);
    }
  
    .checkbox-wrapper-5 .check input[type="checkbox"]:checked + label::after {
      height: calc(.16 * var(--size));
      top: calc(.55 * var(--size));
      left: calc(1.6 * var(--size));
      font-size: calc(.6 * var(--size));
      line-height: 0;
    }
    .checkbox-wrapper-5{
        background-color:  white;
    }
</style>
  


  

  