<template>
<div>
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
                search:'',
                pagesize: 1,
                next:'',
            }
        },
        components: {
            GameInfo,
            LoadMore,
        },
        created () {
            this.getAllGame();

            
    
        },
        mounted () {
                this.$root.$on('input-query', (data) => {
                this.search = data
                this.pagesize = 1
                this.getAllGame()    
            })
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

            let response = await fetch(`https://rawg.io/api/games?search=${this.search}&page=${this.pagesize}`);
            let data = await response.json()
            this.results = data.results
            this.next = data.next
            console.log(data.results);


            },
            
        },
    }
</script>


<style lang="scss" scoped>

.bottom{
    padding: 0 0 4em;
}

</style>