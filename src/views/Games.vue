<template>
    <div>
        <div class="bg-image" v-bind:style="{ backgroundImage: 'url(' + results.background_image + ')' }">
            
        </div>
        <div class="single-game-info">
            <h1>{{results.name}}</h1>
        </div>
        
        <div class="single-game-desc"  >
            <h1>About</h1>
            <div class="single-game-detail" v-html="results.description"></div>

            
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
        updated () {
            // document.querySelector('.single-game-desc').innerHTML=`<h1>About</h1>${this.results.description}` ;
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
            console.log(data.description);
            
            },



 
        },
        
    }
</script>

<style lang="scss" scoped>

.bg-image{
    width: 100%;
    height: 600px;
    position: absolute;
    top: 0;
    left: 0;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -1;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;

    }
}
.bg-image::after{
    content: '';
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.single-game-info{
    width: 1440px;
    margin: 300px auto 0;
    font-size: 2em;
    display: flex;
    justify-content: flex-start;
        h1{
            padding: 0 1em;
        }
    }

.single-game-desc{
    width: 1440px;
    display: flex;
    margin: 70px auto;
    background: #201d21ab;
    flex-direction: column;
    justify-content: center;
    border-radius: 20px;
    padding: 50px;



}

.single-game-detail{
    
    ::v-deep h1{
        width: 50%;
    }
    ::v-deep h3{
        width: 50%;
    }
    ::v-deep p{
    width: 50%;
    font-size: 1em;
    line-height: 1.5;
}
}





   
    



</style>