<template>
    <div class="game-holder">
        <div class="game-info" >
                <router-link :to="{name:'Games',params:{slug:item.slug}}">   
                    <div  class="game-img" >
                        <img :src="item.background_image" alt="">
                    </div>
                    <div class="game-desc">                
                        <h1>{{item.name}}</h1>
                    </div>
                    <div  class="game-video">
                        <video class="videos" @mouseenter="ResetVideo()" v-if="item.clip"  loop autoplay muted >
                            <source :src="item.clip.clip" type="video/mp4">
                        </video>
                        <div v-if="!item.clip"  class="game-img" >
                            <img :src="item.background_image" alt="">
                        </div>
                    </div>
                
                </router-link>
                <span v-on:click="isHidden = !isHidden"  class="show-more" >Show more...</span>
                
                <div v-if="isHidden" class="more-info">
                    <ul>
                        <li>Rating: {{item.rating}} </li>
                        <li>Released: {{item.released}} </li>
                        <li>Genres: <a v-for="genre in item.genres" :key="genre.id">
                            {{ genre.name }}
                        </a> </li>
                   
                    </ul>

                </div>     
            </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isHidden: false
            }
        },
        props:['item'],
        methods: {
            ResetVideo(){
                document.querySelectorAll(".videos").forEach(video => {
                    video.currentTime=0
                })
               
            }
        },
    }
</script>

<style lang="scss" scoped>
.game-holder{
    border-radius: 20px;


    
}

.game-info{
    background-color: #202020;
    position: relative;
    border-radius: 20px;
    transition: 0.2s ease-in;
    &:hover{
        transform: scale(1.03);
        transition: 0.2s ease-in;
        z-index: 10;

    }
    a{
        color: #fff;
        text-decoration: none;
    }
    .show-more{
        position: absolute;
        left: 50%;
        top: 330px;
        transform: translate(-50%, -50%);
        cursor: pointer;
    }
    
    .game-img{
        height: 250px;
        display: flex;
        img{
            width: 100%;
            object-fit: cover;
            border-radius: 20px 20px 0 0;
        }
        &:hover{
            opacity: 0;
        }
    }
    .game-desc{
        height: 110px;
        h1{
            font-size: 1.6em;
        }
    }
    .game-video{    
        position: absolute;
        top: 0;
        opacity: 0;
        video{
            object-fit: cover;
            width: 100%;
            height: 250px;
            border-radius: 20px 20px 0 0;
        }
        &:hover{
            opacity: 1;
        }
    }
}

.more-info{
    position: absolute;
    bottom: -75px;
    width: 100%;
    z-index: 1;
    background-color: #202020;
    border-radius: 0 0 20px 20px;
}


</style>