<template>
  <div class="add-shake container">
      <h2 class="center-align purple-text">Add New Shake Recipe</h2>
      <form @submit.prevent="addShake">
        <div class="field title">
          <label for="title">Shake Title</label>
          <input type="text" name="title" v-model="title">
        </div>
        <div v-for="(ing, index) in ingredients" :key="index" class="field">
          <label for="ingredient">Ingredient</label>
          <input type="text" name="ingredient" v-model="ingredients[index]">
          <i class="material-icons delete" @click="deleteIngredient(ing)">delete</i>
        </div>
        <div class="field add-ingredient">
          <label for="add-ingredient">Add Ingredient (Press <kbd>Tab</kbd> to add ingredient)</label>
          <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="newIngredient">
        </div>
        <div class="field center-align">
          <p class="red-text" v-if="feedback">{{ feedback }}</p>
          <button class="btn pink">Add Shake</button>
        </div>
      </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'AddShake',
  data() {
    return {
      title: null,
      newIngredient: null,
      ingredients: [],
      feedback: null,
      slug: null
    }
  },
  methods: {
    addShake() {
      if(this.ingredients.length == 0) {
        this.feedback = 'You must enter at least one ingredient';
        return;
      }
      if(this.title && this.ingredients.length != 0) {
        this.feedback = null;

        // Creating slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[*+~.()'"!:@]/g,
          lower: true
        });

        // Storing to Firestore
        db.collection('shakes').add({
          title: this.title.trim(),
          ingredients: this.ingredients,
          slug: this.slug
        }).then(() => {
          this.$router.push({ name: 'Index' });
        }).catch(error => {
          console.log(error);
        });
      }
      else {
        this.feedback = 'You must enter a shake title'
      }
    },
    addIngredient() {
      if(this.newIngredient && this.newIngredient.trim() !== "") {
        this.ingredients.push(this.newIngredient.trim());
        this.newIngredient = null;
        this.feedback = null;
      }
      else {
        this.feedback = 'You must enter a value to add an ingredient';
      }
    },
    deleteIngredient(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  }
}
</script>

<style>
.add-shake {
  margin-top: 30px;
  padding: 20px;
  max-width: 500px;
}

.add-shake h2 {
  font-size: 2rem;
  margin: 20px auto;
}

.add-shake .field {
  margin: 20px auto;
  position: relative;
}

.add-shake .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  font-size: 1.4em;
  color: #aaa;
  cursor: pointer;
  transition-duration: 200ms;
}

.add-shake .delete:hover {
  color: red;
  font-size: 1.8em;
}

kbd {
  background-color: #eee;
  border-radius: 3px;
  border: 1px solid #b4b4b4;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .2), 0 2px 0 0 rgba(255, 255, 255, .7) inset;
  color: #333;
  display: inline-block;
  font-size: .85em;
  font-weight: 700;
  line-height: 1;
  padding: 2px 4px;
  white-space: nowrap;
}
</style>


