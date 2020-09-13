<template>
  <div id="app">
    <the-navigation />
    <search-game />
    <transition name="smooth" mode="out-in">
        <router-view :key="$route.path" />
    </transition>
  </div>
</template>

<script>
import SearchGame from '@/components/game/SearchGame.vue'  ;
import TheNavigation from '@/components/TheNavigation.vue'  ;

    export default {
        data() {
            return {
                
            }
        },
        components: {
            SearchGame,
            TheNavigation,

        },
    }
</script>

<style src="@/assets/scss/style.scss" lang="scss"></style>




