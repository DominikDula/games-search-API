<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Games</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <search-game />
    <router-view :key="$route.path" />
  </div>
</template>

<script>
import SearchGame from '@/components/game/SearchGame.vue'  ;

    export default {
        data() {
            return {
                
            }
        },
        components: {
            SearchGame,

        },
    }
</script>

<style src="@/assets/scss/style.scss" lang="scss"></style>




