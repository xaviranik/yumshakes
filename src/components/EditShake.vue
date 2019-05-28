<template>
  <div class="edit-shake">
    <div class="container">
      <h2>Edit Shake</h2>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'EditShake',
  data() {
    return {
      
    }
  },
  methods: {

  },
  created() {
    let ref = db.collection('shakes').where('slug', '==' , this.$route.params.shake_slug);
    ref.get().then(snapshop => {
      snapshop.forEach(doc => {
        console.log(doc.data());
      });
    });
  }
}
</script>

<style>

</style>
