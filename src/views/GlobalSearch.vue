<template>
<div>
    <h1>Results for '{{query}}'</h1>
     <div class="grid-container">
        <game-info v-for="item in results" :key="item.id" :item="item" />
    </div>
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
         props: {
            query: {
                type: String,
                required:true 
            },
        },
        components: {
            GameInfo,
            LoadMore,
        },
        created () {
            this.getAllGame();

    
        },
        mounted () {
             this.$root.$on('shownext', () => {
                 if(this.next === null){
                     return
                 }
                this.pagesize += 1
                this.getAllGame()
            }),
             this.$root.$on('showprevious', () => {
                 if(this.pagesize<=1){
                     return
                 }
                this.pagesize -= 1
                this.getAllGame()
            })
        },
    

        methods: {

            async getAllGame() {
                this.$root.$emit('loader',true)
                try{
                    let response = await fetch(`https://rawg.io/api/games?search=${this.query}&page=${this.pagesize}`);
                    let data = await response.json()
                    this.results = data.results
                    this.next = data.next
                    this.$root.$emit('loader',false)
                    // console.log(data.results);
                }
                catch(error){
                    this.$router.push({name: '404Page'})
                }

            


            },
            
        },
    }
</script>


<style lang="scss" scoped>

h1{
    max-width: $base-width;
    display: flex;
    justify-content: center;
    margin: 2em auto 0;

    span{
        color:rgb(194, 0, 0);
    }
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