<template>
  <div>
    <HeaderComponent />
    <div class="myrecipes">
      <div class="recipes">
        <AllRecipesComponent></AllRecipesComponent>
      </div>
    </div>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import AllRecipesComponent from "@/components/AllRecipesComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "AllRecipesView",
  components: {
    HeaderComponent,
    AllRecipesComponent,
    FooterComponent,
  },
};
</script>

<style></style>
