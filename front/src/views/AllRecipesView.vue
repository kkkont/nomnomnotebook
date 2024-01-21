<template>
    <div>
      <HeaderComponent />
      <div class="myrecipes">
        <div class="recipes">
        <AllRecipesComponent></AllRecipesComponent>
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

  </style>
  