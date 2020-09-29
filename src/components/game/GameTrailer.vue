<template>
    <div v-show="trailer" class="game-video">
         <iframe class="frame" width="1140" height="550" src=""  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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

.game-video{
    margin: 0 auto;
    max-width: $base-width;
    display: flex;
    justify-content: center;
    padding: 3em;

   ::v-deep iframe{
        border-radius: $border-small;
    }
}

@media (max-width: 650px){
    .game-video{
        ::v-deep iframe{
            height: 250px;
        }
    }
}

</style>