<template>
    <div>
      <HeaderComponent />
      <div class="allrecipes">
        <div class="recipesshared">
          <div class="getrecipes">
            <AllRecipesComponent/>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AllRecipesComponent from '@/components/AllRecipesComponent.vue';
  import HeaderComponent from '@/components/HeaderComponent.vue';
  
  export default {
    name: 'AllRecipesView',
    components: {
      HeaderComponent,
      AllRecipesComponent,
    },
    methods:{
        fetchRecipes() {
        fetch(`http://localhost:3000/api/recipes/`)
            .then((response) => response.json())
         .then((data) => (this.recipes = data))
         .catch((err) => console.log(err.message));
    },
    }
  };
  </script>
  
  <style>
  .allrecipes {
    display: flex;
    justify-content: center;
  }
  
  .recipesshared {
    display: flex;
    width: 70%;
    margin: 20px;
    padding: 20px;
    border-radius: 25px;
    background-color: white;
    flex: column;
  }
  .getrecipes{
    margin:auto;
    width:80%;
    background-color: white;
    
  }
  </style>
  