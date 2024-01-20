<template>
    <HeaderComponent/>
    <div class="allrecipes">
        <div class="recipesshared">
            <h1>This is an shared recipes page</h1>
            <div class="getrecipes">
                
            </div>
        </div>
    </div>
  </template>
  <script>
  import HeaderComponent from '@/components/HeaderComponent.vue'
  export default {
    name: 'AllRecipesView',
    components: {
      HeaderComponent
    }
  }
  </script>
  <style>
  .allrecipes{
    display:flex;
    justify-content: center;
  }

  .recipesshared{
    display:flex;
    width:70%;
    margin:20px;
    padding:20px;
    border-radius: 25px;
    background-color: white;

  }
</style>