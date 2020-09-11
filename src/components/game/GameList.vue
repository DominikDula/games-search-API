<template>
<div>
    <h1>New and Trending</h1>
    <div class="game-container">

        <game-info v-for="item in results" :key="item.id" :item="item" />
        
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
            this.getTrendingGame();
            

        },
     
        methods: {

            async getTrendingGame() {

            let response = await fetch(`https://rawg.io/api/games/lists/main?page_size=20`);
            let data = await response.json()
            //Api returns duplicate results,filter duplicate
            this.results = data.results.reduce((unique, o) => {
                if(!unique.some(obj => obj.slug === o.slug )) {
                    unique.push(o);
                }
                    return unique;
            },[])

        // console.log(data);

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