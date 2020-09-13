<template>
<div>
    <h1> Developed by {{$route.params.name}}</h1>
    <div class="game-container">
        <game-info v-for="item in results.results" :key="item.id" :item="item" />
    </div>
</div>

</template>

<script>
import GameInfo from '@/components/game/GameInfo.vue';
    export default {
        data() {
            return {
               results:'',

            }
        },
        components: {
            GameInfo,
        },
        created () {
            this.getSingleDeveloper();

            
        },
        updated () {
            // document.querySelector('.single-game-desc').innerHTML=`<h1>About</h1>${this.results.description}` ;
        },
   
        props: {
            slug: {
                type: String,
                required:true 
            },
        },
        methods: {
            async getSingleDeveloper() {

            let response = await fetch(`https://api.rawg.io/api/games?developers=${this.slug}`);
            let data = await response.json()
            this.results = data
            console.log(data);
            
            },



 
        },
        
    }
</script>

<style lang="scss" scoped>

.game-container{
    padding: 4em 1em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 1em;
    grid-auto-rows: minmax(300px, auto);
    max-width: 1440px;
    margin: 0 auto;


}

</style>