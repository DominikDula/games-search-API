<template>
<div>
    <h1>New and Trending</h1>
    <div class="game-container">

        <game-info v-for="item in results" :key="item.id" :item="item" />
            
            <!-- <div class="game-info" v-for="item in results" :key="item.id">
                <router-link :to="{name:'Games',params:{slug:item.slug}}">   
                    <div  class="game-img" >
                        <img :src="item.background_image" alt="">
                    </div>
                    <div class="game-desc">                
                        <h1>{{item.name}}</h1>
                    </div>
                    <div  class="game-video">
                        <video class="videos" @mouseenter="ResetVideo()" v-if="item.clip" autoplay muted >
                            <source :src="item.clip.clip" type="video/mp4">
                        </video>
                        <div v-if="!item.clip"  class="game-img" >
                            <img :src="item.background_image" alt="">
                        </div>
                    </div>
                
                </router-link>
                <span  class="show-more" >Show more...</span>
                
                <div  class="more-info">
                    <ul>
                        <li>Rating: {{item.rating}} </li>
                        <li>Released: {{item.released}} </li>
                        <li>Genres: <a v-for="genre in item.genres" :key="genre.id">
                            {{ genre.name }}
                        </a> </li>
                   
                    </ul>

                </div>     
            </div> -->
        
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
            this.getTrendingGame();
            

        },
     
        methods: {

            async getTrendingGame() {

            let response = await fetch(`https://rawg.io/api/games/lists/main?page_size=20`);
            let data = await response.json()
            //Api returns duplicate results,filter duplicate
            this.results = data.results.reduce((unique, o) => {
                if(!unique.some(obj => obj.slug === o.slug )) {
                    unique.push(o);
                }
                    return unique;
            },[])

        console.log(data);

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


}
// .opacity{
//     opacity: 1;
// }
// .game-info{
//     background-color: #202020;
//     border-radius: 20px;
//     overflow: hidden;
//     position: relative;
//     a{
//         color: #fff;
//         text-decoration: none;
//     }
//     .show-more{
//         position: absolute;
//         left: 50%;
//         top: 330px;
//         transform: translate(-50%, -50%);
//         cursor: pointer;
//     }
    
//     .game-img{
//         height: 250px;
//         display: flex;
//         img{
//             width: 100%;
//             object-fit: cover;
//         }
//         &:hover{
//             opacity: 0;
//         }
//     }
//     .game-desc{
//         height: 100px;
//         h1{
//             font-size: 1.6em;
//         }
//     }
//     .game-video{    
//         position: absolute;
//         top: 0;
//         opacity: 0;
//         video{
//             object-fit: cover;
//             width: 100%;
//             height: 250px;
//         }
//         &:hover{
//             opacity: 1;
//         }
//     }
// }

// // .more-info{
// //     display: none;
// // }



</style>