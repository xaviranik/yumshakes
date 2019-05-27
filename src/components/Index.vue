<template>
  <div class="index">
    <div class="container">
      <div class="card">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      shakes: [
        {
          id: 1,
          title: 'Ninja Shake',
          slug: 'ninja-shake',
          ingredients: ['banana', 'coffee', 'milk']
        },
        {
          id: 2,
          title: 'Good Game Coffee Played',
          slug: 'good-game-coffee-played',
          ingredients: ['strawberry', 'coffee', 'hazelnut', 'oreo']
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
