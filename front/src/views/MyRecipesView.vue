<template>
    <HeaderComponent/>
    <div class="myrecipes">
      <div class="sidebar">
        <div class="account">
          <img src="https://www.basket.ee/cache/basket/public/remote/http_is-basket-ee/_2000x2000x0/bw-client-filesXbasketisXpublicXplayer-pictureX3919-v1701256513-Luuna-NML-7.jpg" id="profilephoto">
          <h1>kkkont</h1>
          <div class="about">
            <font-awesome-icon icon="quote-left" class="fa-quote-left icon"></font-awesome-icon>
            <p class="aboutquote">i like cooking chicken and rice</p>
          </div>
        </div>
        <button class="addbutton">Add a recipe</button>
      </div>
     <div class="recipes">
        recipes
      </div>
    </div>
  </template>
  
  <script>
  import HeaderComponent from '@/components/HeaderComponent.vue'
  export default {
    name: 'MyRecipesView',
    components: {
      HeaderComponent
    }
  }
  </script>
  <style>
  *{
    background-color: #f1c4d7;
  }

  .myrecipes{
    display:flex;
    justify-content: space-around;
  }
  .sidebar{
    display:flex;
    flex-direction: column;
    margin:20px;
    justify-content: center;
    align-items: center;
  }
  .account{
    display:flex;
    flex-direction: column;
    align-items: center;
    padding:20px;
    border-radius: 25px;
    background-color: white;
  }

  .recipes{
    display:flex;
    width:70%;
    margin:20px;
    padding:20px;
    border-radius: 25px;
    background-color: white;
  }

  #profilephoto{
    height:200px;
    width:200px;
    object-fit: cover;
    border-radius: 50%;
  }

  h1{
    background-color: white;
  }
  .about{
    display:flex;
    align-items: center;
    width:70%;
    padding:10px;
    border: 5px solid #f1c4d7;
    border-radius: 25px;
    background-color: white;
  }
  .icon{
    color:#ff4136;
    font-size:30px;
    background-color: white;
  }
  .aboutquote{
    padding-left: 10px;
    background-color: white;
    font-size: large;
    font-weight: bold;
  }

  .addbutton{
    margin:20px;
    padding:10px;
    border-radius: 10px;
    font-size: 25px;
    width:200px;
    
    font-weight:bold;
    background-color: white;
    border:none;
    box-shadow: 10px 6px 15px 0px rgba(255,65,54,0.47);
  }
  .addbutton:hover{
     box-shadow: 10px 6px 15px 0px rgba(255,65,54,0.8);
  }
</style>
  