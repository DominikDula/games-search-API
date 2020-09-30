<template>
<div class="wrapper">
    <div v-show="trailer" class="game-video">
         <iframe class="frame"  src=""  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</div>
    
    
</template>

<script>
    export default {
        data() {
            return {
                results:'',
                trailer:'',

            }
        },
        props: {
            slug: {
                type: String,
                default: ''
            },
        },
        created () {
            // this.GetGameVideo()
            this.getVideoTrailer()
        },
        methods: {

            // async GetGameVideo() {
             
            // let response = await fetch(`https://api.rawg.io/api/games/${this.slug}/youtube`);
            // let data = await response.json()
            // if(data.results.length<1){
            //     return
            // }else{
            //     this.results = data.results[1].external_id
            // }
            // let url = document.querySelector('.frame');
            // url.src = `https://www.youtube.com/embed/${this.trailer || this.results}`

              
            // },
            async getVideoTrailer() {

            let response = await fetch(`https://rawg.io/api/games/${this.slug}`);
            let data = await response.json()
            if(!data.clip){
                return
            }else{
                this.trailer = data.clip.video
            } 
            let url = document.querySelector('.frame');
            url.src = `https://www.youtube.com/embed/${this.trailer}`
            },
        },
 
    
  

        
    }
</script>

<style lang="scss" scoped>

.wrapper{
    max-width: 1000px;
    margin: 2em auto;
    padding: 0 2em;
    
}

.game-video{
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;

   ::v-deep iframe{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: $border-small;
    }
}

// @media (max-width: 650px){
//     .game-video{
//         ::v-deep iframe{
//             height: 250px;
//         }
//     }
// }

</style>