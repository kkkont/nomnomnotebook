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
  };
  </script>
  
  <style>

  </style>
  