<template>
  <div  id="app" >
    <the-navigation />
    <search-game />
    <transition name="smooth" mode="out-in">
        <router-view :key="$route.path" />
    </transition>
    <!-- <the-footer /> -->
  </div>
</template>

<script>
import SearchGame from '@/components/game/SearchGame.vue'  ;
import TheNavigation from '@/components/TheNavigation.vue'  ;
// import TheFooter from '@/components/TheFooter.vue'  ;

    export default {
        data() {
            return {
                
            }
        },
        components: {
            SearchGame,
            TheNavigation,
            // TheFooter,

        },
    }
</script>

<style src="@/assets/scss/style.scss" lang="scss"></style>




