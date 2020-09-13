<template>
     <div class="game-container">
        <game-info v-for="item in results" :key="item.id" :item="item" />
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
            this.getAllGame();
            

        },
        methods: {

            async getAllGame() {

            let response = await fetch(`https://rawg.io/api/games`);
            let data = await response.json()
            this.results = data.results


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