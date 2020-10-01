<template>
  <div  id="app" >
    <loader-spinner v-if="loader" />
    <the-navigation  />
    <search-game  />
    <transition name="smooth" mode="out-in">
        <router-view :key="$route.path" />
    </transition>
    <the-footer v-if="!loader"  />
  </div>
</template>

<script>
import SearchGame from '@/components/game/SearchGame.vue'  ;
import TheNavigation from '@/components/TheNavigation.vue'  ;
import TheFooter from '@/components/TheFooter.vue'  ;
import LoaderSpinner from '@/components/LoaderSpinner.vue';


    export default {
        data() {
            return {
                loader:true,
            }
        },
        components: {
            SearchGame,
            TheNavigation,
            TheFooter,
            LoaderSpinner,

        },
        mounted () {
            this.$root.$on('loader',  data => {
                this.loader = data
            })
        },
    }
</script>

<style src="@/assets/scss/style.scss" lang="scss"></style>




