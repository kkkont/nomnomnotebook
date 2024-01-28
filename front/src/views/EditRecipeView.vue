<template>
<HeaderComponent></HeaderComponent>
<div class="editrecipe">
    <h1>Spice up Your Recipe!</h1>
    <input type="title" name="title" required v-model="recipe.title" placeholder="The Name of Your Mouthwatering Creation">
      <input type="body" name="body" required v-model="recipe.body" placeholder="Compose Your Recipe Tale" style="height:100px">
      <label for="url">Add a picture url:</label>
      <div class="url">
      <input type="url" name="url" required v-model="recipe.urllink" placeholder="Capture the Culinary Artwork">
      <button @click="clearUrllink" style="border-radius: 0px; font-size:15px;">Clear URL Link</button>
    </div >
        <img class="preview" v-if="recipe.urllink" :src="recipe.urllink" alt="Image preview">
      <div class="checkbox">
        <label for="public" style="padding-right:20px;">Let the World Savor Your Flavor?</label>
        <div class="checkbox-wrapper-5">
    <div class="check">
      <input id="check-5" type="checkbox" v-model="recipe.public">
      <label for="check-5"></label>
    </div>
  </div>
</div>
<div class="buttons">
      <button @click="updateRecipe" id="updatebutton">Lock in Your Heat!</button>
      <button @click="deleteRecipe" id="deletebutton">Delete Recipe!</button>
    </div>
    </div>
</template>
<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
export default {
  name: "EditRecipe",
  components:{
    HeaderComponent,
  },
  data() {
    return {
      recipe: {},
    };
  },
  methods: {
    deleteRecipe() {
      const recipeId = this.recipe.id;
      fetch(`http://localhost:3000/api/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log('Recipe deleted successfully');
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateRecipe() {
      fetch(`http://localhost:3000/api/recipes/${this.recipe.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.recipe.title,
          body: this.recipe.body,
          urllink: this.recipe.urllink,
          public:this.recipe.public
        }),
      })
        .then((response) => response.json())
        .then((updatedRecipe) => {
          this.$router.push("/");
          console.log("Recipe updated successfully", updatedRecipe);
        })
        .catch((error) => {
          console.error("Error updating post", error);
        });
    },
    fetchRecipe(recipeId) {
      fetch(`http://localhost:3000/api/recipes/${recipeId}`)
        .then((response) => response.json())
        .then((data) => (this.recipe = data))
        .catch((err) => console.log(err.message));
    },clearUrllink() {
      this.recipe.urllink = '';
    },
  },

  mounted() {
    const recipeId = this.$route.params.recipeId;
    this.fetchRecipe(recipeId);
  },
};

</script>
<style scoped>
.editrecipe{
    background-color: white;
    display:flex;
    flex-direction: column;
    width:70%;
    margin:auto;
    border-radius:25px;
    justify-content: center;
    align-items: center;
    padding:20px;
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
    font-size: 20px;
    border-radius: 15px;
    font-weight: bold;
    color: white;
    background-color: #f58eb9;
    border:none;
  }
  
  button:hover {
    background-color: #fb74ac;
  }
#updatebutton{
    background-color: #6cc87c;
}
#deletebutton{
    background-color: #f16076;
}

#deletebutton:hover{
    box-shadow: 1px 3px 9px 6px rgba(255,150,150,0.75);
}
#updatebutton:hover{
    box-shadow: 1px 3px 9px 6px rgba(115, 228, 149, 0.75);
}
  .preview{
    max-height:350px;
    border: 5px solid #f1c4d7;
    margin:20px;
  }
  .url{
    display:flex;
    background-color: white;
    width:70%;
    justify-content: center;
  }
  .buttons{
    display:flex;
    background-color: white;
   
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