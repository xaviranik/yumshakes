<template>
   <div class="navbar">
     <nav class="nav-extended purple darken-1">
       <div class="nav-content">
          <router-link :to="{ name: 'Index' }"><span class="nav-title">YumShakes</span></router-link>
            <a href="" class="btn-floating btn-large halfway-fab waves-effect waves-light pink">
              <router-link :to="{ name: 'AddShake' }">
                <i class="material-icons">add</i>
              </router-link>
            </a>
       </div>
     </nav>
   </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>
.navbar nav {
  padding: 0 20px;
}
</style>
