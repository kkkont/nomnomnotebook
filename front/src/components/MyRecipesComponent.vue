<template>
    <div id="recipes-component">
      <p class="item" v-for="recipe in recipes" :key="recipe.id">
        <div class="recipeHeader">
          <div class="user">
            <img :src="recipe.authorimg" id="user_icon">
            <h4 class="author">{{ recipe.author }}</h4>
          </div>
          <h4 class="date">{{ new Date(recipe.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }) }}</h4>
        </div>
        <h4 class="title">{{ recipe.title }}</h4>
        <p class="text"> {{ recipe.body }} </p>
        <img v-if="recipe.urllink" class="img" :src="recipe.urllink" alt="Post Image">
        <div class="likescomments">
            <font-awesome-icon icon="heart" class="fa-regular fa-heart like"></font-awesome-icon>
          <h4 class="likes"> {{ recipe.likes }} </h4>
          <font-awesome-icon icon="comment" class="fa-regular fa-comment like"></font-awesome-icon>
          <h4 class="comments"> {{ recipe.comments }} </h4>
        </div>
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: "AllRecipesComponent",
    data: function () {
      return {
        recipes: [],
      }
    },
  
    methods: {
      fetchRecipes() {
        fetch(`http://localhost:3000/api/myrecipes/`)
          .then((response) => response.json())
          .then((data) => { 
            data.sort((a, b) => new Date(b.date) - new Date(a.date) );
            this.recipes = data;})
          .catch((err) => console.log(err.message));
      }
    },
    mounted() {
      this.fetchRecipes();
      console.log("mounted");
    },
  }
  </script>
  
  <style scoped>
  #recipes-component{
    background-color: white;
    padding:30px;
    border-radius:25px;
  }
.item{
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 20px;
    padding:20px;
    border-radius: 25px;
    background-color: #fcedf3;
}
.recipeHeader{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fcedf3;
}
.user{
    display: flex;
    align-items: center;
    background-color: #fcedf3;
}
.author{
    padding-left:30px;
    align-items: center;
    background-color: #fcedf3;
}

#user_icon {
    height:80px;
    width:80px;
    object-fit: cover;
    border-radius: 50%;
    border: #fbc5d9 3px solid;
  }
  .title {
  margin: 20px;
  font-size: x-large;
  background-color: #fcedf3;
}

.text {
  font-size: larger;
    margin-left:20px;
    background-color: #fcedf3;
}
.date,
.author {
  font-size: large;
  background-color: #fcedf3;
}
.like{
    font-size:30px;
    color:#fb8ab7;
    padding-right:10px;
    background-color: #fcedf3;
}

.likescomments{
    display: flex;
    align-items: center;
    margin-left: 20px;
    background-color: #fcedf3;
}

.likes{
    padding-right:30px;
    background-color: #fcedf3;
}
.comments{
    background-color: #fcedf3;
}
  </style>