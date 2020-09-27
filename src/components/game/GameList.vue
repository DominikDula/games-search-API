<template>
<div>
    <h1>New and Trending</h1>
    
    <!-- <div class="grid-container"> -->
    <transition-group tag="div" class="grid-container" name="fade" mode="out-in">
        <game-info v-for="item in results" :key="item.id" :item="item" />  
    </transition-group>    
    <!-- </div> -->
    
    
    
   <load-more class="bottom"></load-more>
</div>
    
</template>

<script>
import GameInfo from '@/components/game/GameInfo.vue';
import LoadMore from '@/components/LoadMore.vue';

    export default {
        data() {
            return {
                results:'',
                pagesize: 1,
                next:'',
      
            }
        },
        components: {
            GameInfo,
            LoadMore,
        },
        created () {
            this.getTrendingGame();
            

        },
        mounted () {
            this.$root.$on('shownext', () => {
                if(this.next === null){
                     return
                 }
                this.pagesize += 1
                this.getTrendingGame()
            }),
             this.$root.$on('showprevious', () => {
                 if(this.pagesize<=1){
                     return
                 }
                this.pagesize -= 1
                this.getTrendingGame()
            })
        },
     
        methods: {

            async getTrendingGame() {

            let response = await fetch(`https://rawg.io/api/games/lists/main?page=${this.pagesize}`);
            let data = await response.json()
            //Api returns duplicate results,filter duplicate
            this.results = data.results.reduce((unique, o) => {
                if(!unique.some(obj => obj.slug === o.slug )) {
                    unique.push(o);
                }
    
                    return unique;
            },[])
            this.next = data.next

        // console.log(data);

            },
       
            
        },

 
        
        
    }
</script>

<style lang="scss" scoped>

h1{
    max-width: $base-width;
    margin: 70px auto 0;
    display: flex;
    justify-content: center;
}

.bottom{
    padding: 0 0 4em;
}

@media (max-width: 655px) { 
    
    h1{
        font-size: 1.3em;
    }
    
}




</style>