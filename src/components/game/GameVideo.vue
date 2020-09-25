<template>
    <div class="game-video">
         <iframe width="1140" height="550" :src="`https://www.youtube.com/embed/${trailer || results}`" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
            this.GetGameVideo()
            this.getVideoTrailer()
        },
        methods: {

            async GetGameVideo() {
             
            let response = await fetch(`https://api.rawg.io/api/games/${this.slug}/youtube`);
            let data = await response.json()
            this.results = data.results[1].external_id
              
            },
            async getVideoTrailer() {

            let response = await fetch(`https://rawg.io/api/games/${this.slug}`);
            let data = await response.json()
            this.trailer = data.clip.video
            },
        },
        computed: {

        },
        
    }
</script>

<style lang="scss" scoped>

.game-video{
    margin: 0 auto;
    max-width: 1440px;
    display: flex;
    justify-content: center;
    padding: 3em;

   ::v-deep iframe{
        border-radius: 15px;
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