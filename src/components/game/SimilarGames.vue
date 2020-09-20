<template>
<div class="similar" >
    <h1>Games like {{name}}</h1>
    <div class="grid-container" >
        <game-info v-for="item in results" :key="item.id" :item="item" />
    </div>
    <div class="button">
        <button class="prev" @click="showPrevious()" >Previous</button>
        <button class="next" @click="showNext()" >Next</button>
    </div>
    
</div>
    
</template>

<script>
import GameInfo from '@/components/game/GameInfo.vue';

    export default {
        data() {
            return {
                results:'',
                pageSize:8,
                page:1

            }
        },
        props: {
            slug: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
        },
        components: {
            GameInfo,
        },

        created () {
            this.getSimilarGame()
        },

        methods: {

            async getSimilarGame() {
            let response = await fetch(`https://api.rawg.io/api/games/${this.slug}/suggested?page_size=${this.pageSize}&page=${this.page}`);
            let data = await response.json()
            this.results = data.results
            // console.log(data);
            },
            showNext() {
                if(this.next === null){
                     return
                 }
                this.page +=1
                this.getSimilarGame()
                document.querySelector('.similar').scrollIntoView({behavior: 'smooth'});
            },
            showPrevious() {
                if(this.page<=1){
                     return
                 }
                this.page -=1
                this.getSimilarGame()
                document.querySelector('.similar').scrollIntoView({behavior: 'smooth'});
            },
            
        },
    }
</script>


<style lang="scss" scoped>
.button{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0 4em;

    button{
        width: 70px;
        height: 30px;
        border-radius: 5px;
        margin: 0 1em;
        outline: none;
        border: none;
        cursor: pointer;

    }
}

h1{
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}

.grid-container {
    padding: 6em 1em;
    display: grid;
    grid-gap: 1em;
    grid-auto-rows: minmax(300px, auto);
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    max-width: 940px;
    margin: 0 auto;
    min-height: unset;
}
    @media (min-width: 700px){
    
   .grid-container{
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }


    ::v-deep .screenshots img{
            height: 150px;
    }
    ::v-deep .game-img{
            height: 150px;
    }
    ::v-deep .game-video video{
            height: 150px;
    }
    ::v-deep .platform-img span{
            margin: 0 5px;
    }
   ::v-deep .game-info .platform-img span img {
            width: 13px;
            height: 13px;
    }

    ::v-deep .game-info .metacritic {
            width: 28px;
            height: 15px;
            font-size: 0.6em;
    }
    ::v-deep .game-info .game-desc h1 {
        font-size: 1.2em;
    }

}


[v-cloak] {
	display: none;
}

.fade-enter-active {
	transition: all 0.2s ease;
}

.fade-enter {
	transform: scale(0.9);
}


   
    
        





</style>