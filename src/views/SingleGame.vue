<template>
    <div>
        <div class="bg-image" v-bind:style="{ backgroundImage: 'url(' + results.background_image + ')' }">
            
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
                        <h2>Genres</h2>
                        <router-link 
                        v-for="genre in results.genres" 
                        :key="genre.id" 
                        :to="{name:'SingleGenre',params:{slug:genre.slug,name:genre.name}}">{{ genre.name}}
                        </router-link>
                    </section>  

                    <!-- <p>Developers:<a v-for="developer in results.developers" :key="developer.id" href="#">{{ developer.name }}</a></p> -->

                    <section>
                        <h2>Developers</h2>
                        <router-link 
                            v-for="developer in results.developers" 
                            :key="developer.id" 
                            :to="{name:'SingleDeveloper',params:{slug:developer.slug,name:developer.name}}">
                            {{ developer.name }}
                        </router-link>
                    </section>


                    <section>
                        <!-- <a 
                        v-for="platform in results.platforms" 
                        :key="platform.id" 
                        href="#">
                        {{ platform.platform.name }}
                        </a> -->
                        <h2>Platforms</h2>
                        <router-link 
                        v-for="platform in results.platforms" 
                        :key="platform.platform.id" 
                        :to="{name:'SinglePlatform',params:{id:platform.platform.id,name:platform.platform.name}}">
                        {{ platform.platform.name }}
                        </router-link>
                    </section>
                    <section><h2>Website</h2> <a v-if="results.website" :href="results.website">{{results.website}}</a></section>
                    <section><h2>Release date</h2> <span>{{results.released}}</span></section> 
                </div>
            </div>

            

            
        </div>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
               results:'',
               shortabout:'',
               longabout:'',
               about:'',
               boolean:true,

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
            this.about = data.description.substring(0,550) +'...'
            this.shortabout = data.description.substring(0,550)
            this.longabout = data.description
            // console.log(data);
            
            },
            ReadMore(){
                this.about =this.longabout
                this.boolean=false
            },
            ReadLess(){
              this.about = this.shortabout +'...'
              this.boolean=true
            }



 
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
    background-position-y: 0;
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
.single-game-name{
    max-width: 1440px;
    margin: 300px auto 0;
    font-size: 2em;
    display: flex;
    justify-content: flex-start;
    padding: 0 1em;
 
    }

.single-game-container{
    position: relative;
    max-width: 1440px;
    display: flex;
    margin: 70px auto;
    background: #201d21ab;
    // flex-direction: column;
    justify-content: center;
    border-radius: 20px;
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
        border-radius: 20px;
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
        

@media (max-width: 860px){

    .single-game-name{
        font-size: 1.1em;
        justify-content: center;
    }
    .single-game-container{
        max-width: 100%;
        margin: 100px 1em;
        flex-direction: column;
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


   
    



</style>