<template>
    <div class="game-video">
         <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${results}`" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                results:'',
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
        },
        methods: {

            async GetGameVideo() {
             
            let response = await fetch(`https://api.rawg.io/api/games/${this.slug}/youtube`);
            let data = await response.json()
            this.results = data.results[1].external_id
              
            }
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

</style>