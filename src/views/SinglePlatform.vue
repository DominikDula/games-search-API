<template>
<div>
    <div class="platform">
        <h1>{{info.name}}</h1>
        <article v-if="info.description" v-bind:style="{ backgroundImage: 'url(' + info.image_background + ')' }" v-html="info.description"></article>
    </div>
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
               info:'',

            }
        },
        components: {
            GameInfo,
        },
        created () {
            this.getSinglePlatform();
            this.getPlatformInfo()

            
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
            async getPlatformInfo() {

            let response = await fetch(`https://api.rawg.io/api/platforms/${this.id}`);
            let data = await response.json()
            this.info = data
            
            },



 
        },
        
    }
</script>

<style lang="scss" scoped>

.platform{
    max-width: 1440px;
    position: relative;
    margin: 2em auto 0;

     h1{
            position: absolute;
            top: 0;
            left: 50px;
            z-index: 2;
        }
}
          

article{
    position: relative;
    display: flex;
    justify-content: center;
    max-width: 1440px;
    margin: 0 auto;
    line-height: 1.3;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 0;
    border-radius: 15px;
    z-index: 1;
    overflow: hidden;
    min-height: 400px;
    line-height: 2;

  ::v-deep  p{
        margin-top: 3em;
        padding: 3em;
    }
}

article::after{
    content: '';
    background-color: rgba(0, 0, 0, 0.85);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

 h1{
    max-width: 1440px;
    margin: 30px auto 0; 
}

</style>