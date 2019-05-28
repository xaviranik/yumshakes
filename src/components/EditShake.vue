<template>
  <div v-if="shake" class="edit-shake container">
    <h2 class="center-align purple-text">Edit {{ shake.title }}</h2>
    <form @submit.prevent="editShake">
      <div class="field title">
        <label for="title">Shake Title</label>
        <input type="text" name="title" v-model="shake.title">
      </div>
      <div v-for="(ing, index) in shake.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient</label>
        <input type="text" name="ingredient" v-model="shake.ingredients[index]">
        <i class="material-icons delete" @click="deleteIngredient(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add Ingredient (Press <kbd>Tab</kbd> to add ingredient)</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="newIngredient">
      </div>
      <div class="field center-align">
        <p class="red-text" v-if="feedback">{{ feedback }}</p>
        <button class="btn pink">Update Shake</button>
      </div>
    </form>
  </div>
</template>

<script>
  import db from '@/firebase/init'
  import slugify from 'slugify'

  export default {
    name: 'EditShake',
    data() {
      return {
        shake: [],
        newIngredient: null,
        feedback: null
      }
    },
    methods: {
      editShake() {
        if (this.shake.ingredients.length == 0) {
          this.feedback = 'You must enter at least one ingredient';
          return;
        }
        if (this.shake.title && this.shake.ingredients.length != 0) {
          this.feedback = null;
          // Creating slug
          this.shake.slug = slugify(this.shake.title, {
            replacement: '-',
            remove: /[*+~.()'"!:@]/g,
            lower: true
          });

          // Storing to Firestore
          db.collection('shakes').doc(this.shake.id).update({
            title: this.shake.title.trim(),
            ingredients: this.shake.ingredients,
            slug: this.shake.slug
          }).then(() => {
            this.$router.push({ name: 'Index' });
          }).catch(error => {
            console.log(error);
          });
        } else {
          this.feedback = 'You must enter a shake title'
        }
      },
      addIngredient() {
        if (this.newIngredient && this.newIngredient.trim() !== "") {
          this.shake.ingredients.push(this.newIngredient.trim());
          this.newIngredient = null;
          this.feedback = null;
        } else {
          this.feedback = 'You must enter a value to add an ingredient';
        }
      },
      deleteIngredient(ing) {
        this.shake.ingredients = this.shake.ingredients.filter(ingredient => {
          return ingredient != ing;
        });
      }
    },
    created() {
      let ref = db.collection('shakes').where('slug', '==', this.$route.params.shake_slug);
      ref.get().then(snapshop => {
        snapshop.forEach(doc => {
          this.shake = doc.data();
          this.shake.id = doc.id;
        });
      });
    }
  }

</script>

<style>
  .edit-shake {
    margin-top: 0px;
    padding: 20px;
    max-width: 500px;
  }

  .edit-shake h2 {
    font-size: 2rem;
    margin: 30px auto;
  }

  .edit-shake .field {
    margin: 20px auto;
    position: relative;
  }

  .edit-shake .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    font-size: 1.4em;
    color: #aaa;
    cursor: pointer;
    transition-duration: 200ms;
  }

  .edit-shake .delete:hover {
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
