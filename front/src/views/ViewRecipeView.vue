<template>
<HeaderComponent></HeaderComponent>
<div class="recipe">
    <div class="item">
    <div class="recipeHeader">
          <div class="user">
            <img :src="user.urllink" id="user_icon">
            <h4 class="author">{{ user.name }}</h4>
          </div>
          <h4 class="date">{{ new Date(recipe.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }) }}</h4>
        </div>
        <h4 class="title">{{ recipe.title }}</h4>
        <p class="text"> {{ recipe.body }} </p>
        <img v-if="recipe.urllink" class="img" :src="recipe.urllink" alt="Post Image">
        <div class="likescomments">
           <button @click="buttonClicked(recipe.id)" class="like-button"> <font-awesome-icon icon="heart" class="fa-regular fa-heart like"></font-awesome-icon></button>
          <h4 class="likes"> {{ recipe.likes }} </h4>
          <font-awesome-icon icon="comment" class="fa-regular fa-comment like"></font-awesome-icon>
          <h4 class="comments"> {{ recipe.comments }} </h4>
        </div>
    </div>
    <div class="addcomment">
      <textarea id="commentBody" v-model="comment.body" placeholder="Comment this post" style="height: 50px;"></textarea>
        <button @click="addComment()">Comment</button>
    </div>
    <CommentsComponent :recipeId="recipe.id" :key="childKey"></CommentsComponent>
    </div>
</template>
<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import CommentsComponent from '@/components/CommentsComponent.vue';
export default {
  name: "ViewRecipe",
  components:{
    HeaderComponent,
    CommentsComponent,
  },
  data() {
    return {
      recipe: {},
      user:{},
      activeUser:{},
      comment: {
        body: "",
      },
      childKey: 0,
      comments: [],
    };
  },
  methods:{
    fetchRecipe(recipeId) {
  return fetch(`http://localhost:3000/api/recipes/${recipeId}`)
    .then((response) => response.json())
    .then((data) => {
      this.recipe = data;
    })
    .catch((err) => console.log(err.message));
},async fetchActiveUser(){
  try {
        const response = await fetch(`http://localhost:3000/api/users/`);
        const data = await response.json();
        this.activeUser = data;
      } catch (err) {
        console.log(err.message);
      }
}, async addComment() {
  await this.fetchActiveUser();

  if (!this.comment.body) {
    console.log("Please fill in all required fields.");
    return;
  }

  const formattedDate = new Date();
  const authorid = this.activeUser.id;

  const data = {
    recipe_id: this.recipe.id,
    body: this.comment.body,
    date: formattedDate,
    authorid: authorid,
    likes: 0,
  };

  try {
    const response = await fetch("http://localhost:3000/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Comment added successfully");
      this.childKey += 1;
    } else {
      console.log("Failed to add comment");
    }
  } catch (error) {
    console.error("Error adding comment:", error);
  }
},

    fetchUser(userId) {
      return fetch(`http://localhost:3000/api/users/${userId}`)
        .then(response => response.json())
        .then((data) => (this.user = data))
        .catch(err => console.log(err.message));
    },
    findUser(){
        this.fetchUser(this.recipe.authorid);
    },
    async buttonClicked(recipeId) {
  try {
    const isLiked = await this.checkIfLiked(recipeId);

    if (isLiked) {
      await this.deleteLike(recipeId);
      this.recipe.likes -= 1; // Update likes count
    } else {
      await this.addLike(recipeId);
      this.recipe.likes += 1; // Update likes count
    }
  } catch (error) {
    console.error(error);
  }
},

    
    async checkIfLiked(recipeId) {
      try {
        const response = await fetch(`http://localhost:3000/api/likes/check/${recipeId}`);
        const data = await response.json();
        return data.likeExists;
      } catch (error) {
        console.error(error);
        return false; // Return false in case of an error
      }
    },
    
    async deleteLike(recipeId) {
      try {
        await fetch(`http://localhost:3000/api/likes/delete/${recipeId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Like deleted successfully');
      } catch (error) {
        console.error(error);
      }
    },
    
    async addLike(recipeId) {
      const data = { recipe_id: recipeId };
    
      try {
        const response = await fetch("http://localhost:3000/api/likes/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify(data),
        });
        console.log('Like added successfully');
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
  const recipeId = this.$route.params.recipeId;
  this.fetchRecipe(recipeId).then(() => {
    this.findUser();
  });
}
}
</script>
<style scoped>
  .recipe{
    background-color: white;
    padding:30px;
    border-radius:25px;
    margin:20px;
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
.like:hover{
  color:#f0649c;
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
button{
  border:none;
  background-color: #fcedf3;
}

.addcomment{
        background-color: white;
        display:flex;
        justify-content: center;
        padding:20px;
    }
    textarea{
        width:60%;
        margin-right: 30px;
    }
</style>