<template>
    <div class="commentscomponent">
      <p class="item" v-for="comment in comments" :key="comment.id">
        <div class="recipeHeader">
          <div class="user">
            <img :src="comment.user.urllink" id="user_icon">
            <h4 class="author">{{ comment.user.name }}</h4>
          </div>
          <h4 class="date">{{ new Date(comment.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }) }}</h4>
        </div>
        <p class="text">{{ comment.body }}</p>
        <div class="likescomments">
          <button @click="buttonClicked(comment.id)" class="like-button">
            <font-awesome-icon icon="heart" class="fa-regular fa-heart like"></font-awesome-icon>
          </button>
          <h4 class="likes">{{ comment.likes }}</h4>
        </div>
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CommentsComponent',
    data() {
      return {
        comments: [],
      };
    },
    methods: {
      fetchComments(recipeId) {
        fetch(`http://localhost:3000/api/comments/${recipeId}`)
          .then(response => response.json())
          .then(data => {
            data.sort((a, b) => new Date(b.date) - new Date(a.date));
            const userPromises = data.map(comment => this.fetchUser(comment.authorid));
            return Promise.all(userPromises).then(users => {
              this.comments = data.map((comment, index) => ({
                ...comment,
                user: users[index],
              }));
            });
          })
          .catch(err => console.log(err.message));
      },
      fetchUser(userId) {
        return fetch(`http://localhost:3000/api/users/${userId}`)
          .then(response => response.json())
          .catch(err => console.log(err.message));
      },
      async buttonClicked(commentId) {
      
      try {
        const isLiked = await this.checkIfLiked(commentId);
    
        if (isLiked) {
          await this.deleteLike(commentId);
        } else {
          await this.addLike(commentId);
        }
        const comment = this.comments.find((r) => r.id === commentId);
        if (comment) {
          comment.likes = isLiked ? comment.likes - 1 : comment.likes + 1;
        }
      } catch (error) {
        console.error(error);
      }
    },
    
    async checkIfLiked(commentId) {
      try {
        const response = await fetch(`http://localhost:3000/api/likes/check/${commentId}`);
        const data = await response.json();
        return data.likeExists;
      } catch (error) {
        console.error(error);
        return false; // Return false in case of an error
      }
    },
    
    async deleteLike(commentId) {
      try {
        await fetch(`http://localhost:3000/api/likes/comment/delete/${commentId}`, {
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
    
    async addLike(commentId) {
      const data = { comment_id: commentId };
    
      try {
        const response = await fetch("http://localhost:3000/api/likes/comment/add", {
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
    props: {
      recipeId: String,
    },
    mounted() {
      this.fetchComments(this.recipeId);
      console.log("mounted");
    },
    watch: {
      recipeId(newRecipeId, oldRecipeId) {
        if (newRecipeId) {
          this.fetchComments(newRecipeId);
          console.log("recipeId changed:", newRecipeId);
        }
      },
    },
  };
  </script>
  
<style scoped>
  .commentscomponent{
    background-color: white;
    padding:30px;
    border-radius:25px;
    display:flex;
    flex-direction: column;
    width:70%;
    margin:auto;
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
textarea {
    margin: 10px;
    background-color: white;
    padding: 10px;
    width: 60%;
    color: #de3c808d;
    font-size: 15px;
    border-radius: 5px;
  }
  textarea{
    max-width: 70%;
  }
</style>