<template>
<div>
    <h1>{{$route.params.name}}</h1>
    <div class="grid-container">
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
            this.getSinglePlatform();

            
        },

   
        props: {
            id: {
                // type: String,
                required:true 
            },
        },
        methods: {
            async getSinglePlatform() {

            let response = await fetch(`https://api.rawg.io/api/games?platforms=${this.id}`);
            let data = await response.json()
            this.results = data
            console.log(data);
            
            },



 
        },
        
    }
</script>

<style lang="scss" scoped>

 h1{
    max-width: 1440px;
    margin: 30px auto 0; 
}

</style>