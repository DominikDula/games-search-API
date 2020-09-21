<template>
    <div @mouseenter="ShowOnHover()" @mouseleave="ShowOnHover()"  class="game-holder">
        <!-- v-on:mouseenter="isHidden = !isHidden" v-on:mouseleave="isHidden = !isHidden" -->
        
        <div   class="game-info" >
                <router-link :to="{name:'SingleGame',params:{slug:item.slug}}">   
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
                        <!-- <div v-if="!item.clip "  class="game-img" >
                            <img :src="item.background_image" alt="">
                        </div> -->
                    </div>
                    
                    <div    v-if="!item.clip && imgScreenLength" class="screenshots" >
                            <img   @mouseenter="ImageAnimation()"
                                @mouseleave="StopImageAnimation()" 
                            :src="item.short_screenshots[iterator].image" alt="">
                    </div>
                   
                    <div class="platform-img" >
                        <span v-for="platform in item.parent_platforms.slice(0,7)" :key="platform.id">
                            <img 
                            v-if="platformImage.includes(platform.platform.slug)"
                            :title="platform.platform.slug"
                            :src="require(`@/assets/platform_img/${platform.platform.slug}.svg`)" 
                            :alt="platform.platform.slug">
                        </span>         
                    </div>
                    <span v-if="item.metacritic" 
                        title="metacritic rating"
                        :class="ratingColor" 
                        class="metacritic">
                        {{item.metacritic}}%
                    </span>
                
                </router-link>
                <span  @click="ShowOnClick()"  class="show-more" >Show more...</span>
                
                <div v-if="isHidden" class="more-info">
                    <ul>
                        <li>
                            <span class="span-title" >Rating: </span> 
                            <span>{{item.rating}}</span>
                        </li>
                        <li>
                            <span class="span-title">Released: </span> 
                            <span>{{item.released}}</span></li>
                        <li>
                            <span class="span-title">Genres: </span> 
                            <span> 
                                <router-link :to="{name:'SingleGenre',params:{slug:genre.slug,name:genre.name}}" 
                                v-for="genre in item.genres.slice(0,3)" 
                                :key="genre.id">
                                    {{ genre.name }},
                                    
                                </router-link> 
                            </span>
                        </li>
                    </ul>

                </div>     
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                isHidden: false,   
                count : -1,
                iterator:0,
                imgScreenLength: this.item.short_screenshots.length,  
                timeout:'',       
                platformImage : ['amiga','android','atari','ios','linux','mac','nintendo','pc','playstation','sega','web','xbox'],  
                
 
            }
        },
        props:['item'],

  


        methods: {
            ResetVideo(){
                document.querySelectorAll(".videos").forEach(video => {
                    video.currentTime=0
                })
               
            },
            ShowOnHover(){
                if(window.innerWidth<665){
                    return false
                }
                this.isHidden = !this.isHidden

            },
            ShowOnClick(){
                if(window.innerWidth<665){
                    this.isHidden = !this.isHidden
                }
               
            },
           
            ImageAnimation(){
            
               if(this.count>=this.imgScreenLength-1){
                    this.count=-1
                }
                
                this.count++;
                 this.timeout=   setTimeout(() =>{this.ImageAnimation()}, 1000);
                     this.iterator=this.count
                     

            },
             StopImageAnimation(){
                 this.iterator=0
                 this.count=-1
                  clearTimeout(this.timeout)
                
            
            },
         
            
            

            
            
        },
        computed: {
			ratingColor() {
				return {
					negative: this.item.metacritic <= 39,
					average: this.item.metacritic >= 40 && this.item.metacritic <=69,
					positive: this.item.metacritic >=70,
				}
            },
           
            
			
        },

    }
</script>

<style lang="scss" >
.game-holder{
    border-radius: 20px;
    


    
}

.game-info{
    background-color: #202020;
    position: relative;
    border-radius: 20px;
    // transition: 0.2s ease-in;
    .platform-img  {
        display: flex;
        position: absolute;
        left: 10px;
        top: 260px;

        span{
            margin: 0 10px;
            
            
            img{
                width: 15px;
                height: 15px;
            }
        }
     
            
        

        
        
    }

    .screenshots img{
        // display: none;
            width: 100%;
            height: 250px;
            position: absolute;
            top: 0;
            left: 0;
            object-fit: cover;
            border-radius: 20px 20px 0 0;
        }
    .metacritic{
        width: 38px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 30%;
        position: absolute;
        top: 255px;
        right: 10px;
        font-size: 0.8em;
    }

 

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
        top: 350px;
        transform: translate(-50%, 0%);
        cursor: pointer;
        display: none;
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
        height: 140px;
        h1{
            font-size: 1.5em;
            margin: 1.8em 0.5em;
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
    bottom: -105px;
    width: 100%;
    z-index: 1;
    background-color: #202020;
    border-radius: 0 0 20px 20px;

    ul{
            padding: 0 1em;
            
            li {
                list-style: none;
                display: flex;
                justify-content: space-between;
                margin-bottom: 1em;
                position: relative;
                
            }

            span ,.span-title{
                font-size: 0.9em;
            }
            .span-title{
                color: #ffffff8c;
            }

            


            li::after{
                width: 100%;
                content: '';
                position: absolute;
                bottom: -6px;
                left: 0;
                border-bottom: 1px solid #ffffff42;
            }
           
            a{
                text-decoration: none;
                // border-bottom: 1px solid #ffffffa1;
                font-size: 0.9em;
            }

             a:hover{
                color: yellow;
                border-bottom: 1px solid yellow;
            }

        }
}

@media (max-width: 655px) { 
    .game-info{
        .show-more{
            display: inline;
        }
    }
    
}


</style>