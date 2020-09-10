<template>
    <div>
        <h1>{{results.name}}</h1>
        <div class="img">
            <img :src="results.background_image" alt="">
        </div>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
               results:'',
            }
        },
        created () {
            this.getSingleGame();
        },
        props: {
            slug: {
                type: String,
                required:true 
            },
        },
        methods: {
            async getSingleGame() {

            let response = await fetch(`https://rawg.io/api/games/${this.slug}`);
            let data = await response.json()
            this.results = data
            }
        },
        
    }
</script>

<style lang="scss" scoped>

.img img{
    width: 500px;
    height: 350px;
    margin: 0 auto;
}

</style>