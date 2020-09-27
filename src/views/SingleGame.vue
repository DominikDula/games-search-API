<template>
    <div>
        <div class="bg-image" v-bind:style="{ backgroundImage: 'url(' + results.background_image + ')' }">
            <!-- <video class="videos"  v-if="results.clip"  loop  muted autoplay >
                    <source :src="results.clip.clips['full']" type="video/mp4" >
            </video> -->
        </div>
        <div class="single-game-name">
            <h1>{{results.name}}</h1>
        </div>
        
        <div class="single-game-container" v-bind:style="{ backgroundImage: 'url(' + results.background_image_additional + ')' }" >
            <h1>About</h1>
            <div class="single-game-desc" >
                <div v-html="about"></div>
                <span v-if="boolean && about.length>500" @click="ReadMore()" >read more</span>
                <span v-if="!boolean && about.length>500" @click="ReadLess()" >read less</span>
            </div>
            
            <div class="single-game-wrapper">
                <div class="single-game-detail">
                    <section>
                        <h3>Genres</h3>
                        <router-link 
                        v-for="genre in results.genres" 
                        :key="genre.id" 
                        :to="{name:'SingleGenre',params:{slug:genre.slug,name:genre.name}}">{{ genre.name}}
                        </router-link>
                    </section>  

                    <!-- <p>Developers:<a v-for="developer in results.developers" :key="developer.id" href="#">{{ developer.name }}</a></p> -->

                    <section>
                        <h3>Developers</h3>
                        <router-link 
                            v-for="developer in results.developers" 
                            :key="developer.id" 
                            :to="{name:'SingleDeveloper',params:{slug:developer.slug,name:developer.name}}">
                            {{ developer.name }}
                        </router-link>
                    </section>


                    <section>
                        <h3>Platforms</h3>
                        <router-link 
                        v-for="platform in results.platforms" 
                        :key="platform.platform.id" 
                        :to="{name:'SinglePlatform',params:{id:platform.platform.id,name:platform.platform.name}}">
                        {{ platform.platform.name }}
                        </router-link>
                    </section>
                    <section>
                        <h3>Metacritic Score</h3>
                        <span v-if="results.metacritic" 
                            title="metacritic rating"
                            :class="ratingColor" 
                            class="metacritic">
                            {{results.metacritic}}%
                        </span>
                    </section>
                    <section>
                        <h3>Metacritic website</h3>
                        <a target="_blank" v-if="results.metacritic_url" :href="results.metacritic_url">{{results.metacritic_url}}</a>
                      
                    </section>
                    <section><h3>Website</h3> <a target="_blank" v-if="results.website" :href="results.website">{{results.website}}</a></section>
                    <section><h3>Release date</h3> <span>{{results.released}}</span></section> 
                </div>
            </div>
        </div>
        <div class="stores-div">
            <div class="stores-container">
                <h1>Stores</h1>
                <div class="stores">
                    <div class="single-store" 
                        v-for="store in results.stores" 
                        :key="store.id"
                        v-bind:style="{ backgroundImage: 'url(' + store.store.image_background + ')' }">
                        <h2>{{ store.store.name }}</h2>
                        <a target="_blank" :href="store.url">Go to Store</a>
                    </div>
                </div>
                
            </div>
            
        </div>

        <game-screenshots :slug="slug" />
        <game-video :slug="slug" />
        <similar-games :slug="slug" :name="results.name" />
        <div v-if="creators.length>0" class="game-creators">
            <h1>Creators</h1>
        </div>
        <div v-if="creators.length>0"  class="creator-container">
            <creators-list v-for="item in creators" :key="item.id" :item="item" />
        </div>
        
        


       




        
    </div>
</template>

<script>
import GameScreenshots from '@/components/game/GameScreenshots.vue';
import GameVideo from '@/components/game/GameVideo.vue';
import SimilarGames from '@/components/game/SimilarGames.vue';
import CreatorsList from '@/components/creators/CreatorsList.vue';

    export default {
        data() {
            return {
               results:'',
               shortabout:'',
               longabout:'',
               about:'',
               boolean:true,
               creators:'',

            }
        },
        components: {
            GameScreenshots,
            GameVideo,
            SimilarGames,
            CreatorsList,
        },
        created () {
            this.getSingleGame()
            this.getGameCreatros()

            
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

                try {
                    let response = await fetch(`https://rawg.io/api/games/${this.slug}`);
                    let data = await response.json()
                    this.results = data
                    this.about = data.description.substring(0,550) +'...'
                    this.shortabout = data.description.substring(0,550)
                    this.longabout = data.description
                    // console.log(data);
                    }
                catch (error) {
                     this.$router.push({name: '404Page'})
                }

            
            
            },

            async getGameCreatros(){
                let response = await fetch(`https://api.rawg.io/api/games/${this.slug}/development-team`);
                let data = await response.json();
                this.creators = data.results
                console.log(data.results);
            },
            ReadMore(){
                this.about =this.longabout
                this.boolean=false
            },
            ReadLess(){
              this.about = this.shortabout +'...'
              this.boolean=true
            },



 
        },
        computed: {
			ratingColor() {
				return {
					negative: this.results.metacritic <= 39,
					average: this.results.metacritic >= 40 && this.results.metacritic <=69,
					positive: this.results.metacritic >=70,
				}
            },	
        },
        
    }
</script>

<style lang="scss" scoped>



.bg-image{
    width: 100%;
    height: 650px;
    position: absolute;
    top: 0;
    left: 0;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 0;
    z-index: -1;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;

    }
    .videos{
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
.single-game-name{
    max-width: $base-width;
    margin: 300px auto 0;
    font-size: 2em;
    display: flex;
    justify-content: flex-start;
    padding: 0 1em;

    h1{
        margin: 0;
    }
 
    }

.single-game-container{
    position: relative;
    max-width: $base-width;
    display: flex;
    margin: 150px auto;
    background: #201d21ab;
    // flex-direction: column;
    justify-content: center;
    border-radius: $border-small;
    padding: 50px;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
           h1{
            z-index: 1;
            position: absolute;
            top: 10px;
            left: 50px;
        }



}

.single-game-container::after{
    content: '';
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}



.single-game-desc{
    z-index: 1;
    width: 50%;
    margin-top: 3em;
    
 
    ::v-deep p{
    color: rgb(204, 204, 204);
    font-size: 1em;
    line-height: 1.8;

}
span{
        color: black;
        padding: 0.3em 1.2em;
        background: rgb(255 255 255);
        border-radius: $border-large;
        font-size: 0.8em;
        text-decoration: none;
        font-weight: 500;
        cursor: pointer;
}
}

.single-game-wrapper{
    display: flex;
    justify-content: center;
    flex-direction: column;
    z-index: 1;
    width: 50%;


// 
 
}

.single-game-detail{
        
      section{
          max-width: 70%;
          margin: 0 auto; 
      }  
      h3{
          margin: 1em 0;
          padding: 0;
      }
      .metacritic{
            width: 40px;
            height: 40px;
            display: flex;
            border-radius: 50%;
            justify-content: center;
            align-items: center;
      }
        a{
            color:#cccccc;
            text-decoration: none;
            margin: 0 5px 0 0;
            line-height: 1.8;
            cursor: pointer;
            
        }

        a:hover{
            color: yellow;
            border-bottom: 1px solid yellow;
        }
    }

.stores-div{
    max-width: $base-width;
    margin: 0 auto;
    // background: rgb(41, 41, 41);

    .stores-container{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .stores{
        width: 50%;
        // background: red;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    .single-store{
        position: relative;
        height: 150px;
        margin: 0.6em;
        background-size: cover;
        background-repeat: no-repeat;
        z-index: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        border-radius: $border-small;
        overflow: hidden;
        
   

        a{
            color: white;
            padding: 0.5em;
            border-radius: $border-large;
            text-decoration: none;
            background: #ff0000b0;
        }

    
        
    }

    .single-store::after{
        content: '';
        background-color: rgba(0, 0, 0, 0.6);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;

    }

    .gallery{
        width: 50%;
    }
}
.game-creators{
    max-width: 1240px;
    margin: 0 auto;
    display: flex;
    justify-content: center;

 
  
}

.creator-container{
    padding: 6em 1em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 1em;
    grid-auto-rows: minmax(350px, auto);
    max-width: 1240px;
    min-height: 300px;
    margin: 0 auto;

    

    ::v-deep .creator-info{

        min-width: 50%;

        .router-creator .creator-img img{
            width: 80px;
            height: 80px;
        }
        .creator-desc{
            font-size: 0.9em;
        }
    }

}



        

@media (max-width: 860px){
    .bg-image{
        height: 600px;
    }

    .single-game-name{
        font-size: 1.1em;
        justify-content: center;
        
    }
    .single-game-container{
        max-width: 100%;
        margin: 180px auto;
        flex-direction: column;
        padding: 25px;

        h1{
            left: 25px;
        }
        
    }

   
    .single-game-desc,.single-game-wrapper{
        width: 100%;
    }
    .single-game-wrapper{
        margin-top: 2em;
    }
    .single-game-detail{
        section{
            width: 100%;
            margin: 0;
        }
    }
}

@media( max-width:600px) {

.stores-div{

    .stores{
            width: 100%;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
    }
    
}



   
    



</style>