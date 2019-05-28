<template>
  <div class="index">
    <div class="container">
      <div class="row">
        <div class="col s4" v-for="shake in shakes" :key="shake.id">
          <div class="card small">
            <router-link :to="{name: 'EditShake', params: {shake_slug: shake.slug} }">
              <i class="material-icons edit">edit</i>
            </router-link>
            <div class="card-content">
              <i class="material-icons delete" @click="deleteShake(shake.id)">delete</i>
              <h2 class="purple-text">{{ shake.title }}</h2>
              <ul class="ingredients">
                <li v-for="(ingredient,index) in shake.ingredients" :key="index">
                  <span class="chip">{{ ingredient }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import db from '@/firebase/init'

  export default {
    name: 'Index',
    data() {
      return {
        shakes: []
      }
    },
    methods: {
      deleteShake(id) {
        // Delete Doc from Firestore
        db.collection('shakes').doc(id).delete()
          .then(() => {
            this.shakes = this.shakes.filter(shake => {
              return shake.id != id;
            });
          });
      }
    },
    created() {
      // Fetch data from Firestore
      db.collection('shakes').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let shake = doc.data();
            shake.id = doc.id;
            this.shakes.push(shake);
          });
        });
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .index {
    margin-top: 15px;
  }

  .index h2 {
    font-size: 1.8rem;
    text-align: center;
    margin-top: 0;
  }

  .index .ingredients {
    margin: 30px auto;
  }

  .index .ingredients li {
    display: inline-block;
  }

  .index .delete {
    position: absolute;
    bottom: 8px;
    left: 8px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4rem;
    transition-duration: 200ms;
  }

  .index .delete:hover {
    color: red;
    font-size: 1.8rem;
  }

  .index .edit {
    position: absolute;
    bottom: 8px;
    right: 8px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4rem;
    transition-duration: 200ms;
  }

  .index .edit:hover {
    color: purple;
    font-size: 1.8rem;
  }

</style>
