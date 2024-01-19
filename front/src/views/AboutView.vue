<template>
  <HeaderComponent/>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    HeaderComponent
  }
}</script>
