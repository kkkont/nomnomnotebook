<template>
  <div id="recipes-component">
    <div
      class="item"
      v-for="recipe in recipes"
      :key="recipe.id"
      @click="viewRecipe(recipe.id, $event)"
    >
      <div class="recipeHeader">
        <div class="user">
          <img :src="recipe.user.urllink" id="user_icon" />
          <h4 class="author">{{ recipe.user.name }}</h4>
        </div>
        <h4 class="date">
          {{
            new Date(recipe.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          }}
        </h4>
      </div>
      <h4 class="title">{{ recipe.title }}</h4>
      <p class="text" v-html="formatRecipeBody(recipe.body)"></p>
      <img
        v-if="recipe.urllink"
        class="img"
        :src="recipe.urllink"
        alt="Post Image"
      />
      <div class="likescomments">
        <button @click="buttonClicked(recipe.id)" class="like-button">
          <font-awesome-icon
            icon="heart"
            class="fa-regular fa-heart like"
          ></font-awesome-icon>
        </button>
        <h4 class="likes">{{ recipe.likes }}</h4>
        <font-awesome-icon
          icon="comment"
          class="fa-regular fa-comment like"
        ></font-awesome-icon>
        <h4 class="comments">{{ recipe.comments }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllRecipesComponent",
  data: function () {
    return {
      recipes: [],
    };
  },

  methods: {
    formatRecipeBody(body) {
      return body.replace(/\n/g, "<br>");
    },
    fetchRecipes() {
      fetch(`http://localhost:3000/api/recipes/`)
        .then((response) => response.json())
        .then((data) => {
          data.sort((a, b) => new Date(b.date) - new Date(a.date));
          const userPromises = data.map((recipe) =>
            this.fetchUser(recipe.authorid)
          );
          return Promise.all(userPromises).then((users) => {
            this.recipes = data.map((recipe, index) => ({
              ...recipe,
              user: users[index],
            }));
          });
        })
        .catch((err) => console.log(err.message));
    },
    fetchUser(userId) {
      return fetch(`http://localhost:3000/api/users/${userId}`)
        .then((response) => response.json())
        .catch((err) => console.log(err.message));
    },
    async buttonClicked(recipeId) {
      try {
        const isLiked = await this.checkIfLiked(recipeId);

        if (isLiked) {
          await this.deleteLike(recipeId);
        } else {
          await this.addLike(recipeId);
        }
        const recipe = this.recipes.find((r) => r.id === recipeId);
        if (recipe) {
          recipe.likes = isLiked ? recipe.likes - 1 : recipe.likes + 1;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async checkIfLiked(recipeId) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/likes/check/${recipeId}`
        );
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
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Like deleted successfully");
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
          credentials: "include",
          body: JSON.stringify(data),
        });
        console.log("Like added successfully");
      } catch (error) {
        console.error(error);
      }
    },
    viewRecipe(recipeId, event) {
      if (!event.target.closest(".like-button")) {
        this.$router.push({ name: "recipe", params: { recipeId } });
      }
    },
  },
  mounted() {
    this.fetchRecipes();
    console.log("mounted");
  },
};
</script>

<style scoped>
#recipes-component {
  background-color: white;
  padding: 30px;
  border-radius: 25px;
}
.item {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 20px;
  padding: 20px;
  border-radius: 25px;
  background-color: #fcedf3;
}
.recipeHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fcedf3;
}
.user {
  display: flex;
  align-items: center;
  background-color: #fcedf3;
}
.author {
  padding-left: 30px;
  align-items: center;
  background-color: #fcedf3;
}

#user_icon {
  height: 80px;
  width: 80px;
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
  margin-left: 20px;
  background-color: #fcedf3;
}
.date,
.author {
  font-size: large;
  background-color: #fcedf3;
}
.img {
  max-height: 500px; /* Set your desired max-height */
  width: auto;
  object-fit: contain; /* Preserve aspect ratio */
  border-radius: 10px; /* Optional: Add border-radius */
  background-color: #fcedf3;
}

.like {
  font-size: 30px;
  color: #fb8ab7;
  padding-right: 10px;
  background-color: #fcedf3;
}
.like:hover {
  color: #f0649c;
}

.likescomments {
  display: flex;
  align-items: center;
  margin-left: 20px;
  background-color: #fcedf3;
}

.likes {
  padding-right: 30px;
  background-color: #fcedf3;
}
.comments {
  background-color: #fcedf3;
}
button {
  border: none;
  background-color: #fcedf3;
}
</style>
