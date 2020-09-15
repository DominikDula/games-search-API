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
            
            <div class="single-game-detail">
                <p>Genres:
                    <router-link 
                    v-for="genre in results.genres" 
                    :key="genre.id" 
                    :to="{name:'SingleGenre',params:{slug:genre.slug,name:genre.name}}">{{ genre.name}}
                    </router-link></p>  

                <!-- <p>Developers:<a v-for="developer in results.developers" :key="developer.id" href="#">{{ developer.name }}</a></p> -->

            <p>Developers:
                <router-link 
                    v-for="developer in results.developers" 
                    :key="developer.id" 
                    :to="{name:'SingleDeveloper',params:{slug:developer.slug,name:developer.name}}">
                    {{ developer.name }}
                </router-link>
            </p>


                <p>platforms: 
                    <!-- <a 
                    v-for="platform in results.platforms" 
                    :key="platform.id" 
                    href="#">
                    {{ platform.platform.name }}
                    </a> -->
                      <router-link 
                    v-for="platform in results.platforms" 
                    :key="platform.platform.id" 
                    :to="{name:'SinglePlatform',params:{id:platform.platform.id,name:platform.platform.name}}">
                    {{ platform.platform.name }}
                    </router-link>
                    </p>
                <p>Website: <a :href="results.website">{{results.website}}</a></p>
                <p>Release date: <span>{{results.released}}</span></p> 
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
            console.log(data);
            
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
            top: 0;
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
    z-index: 5;
    width: 30%;
    
 
    ::v-deep p{
    color: rgb(204, 204, 204);
    font-size: 1em;
    line-height: 1.5;

}
span{
       color: black;
        margin: 0px 0.3em;
        padding: 0.3em 1.2em;
        background: rgb(255 255 255);
        border-radius: 20px;
        font-size: 0.8em;
        text-decoration: none;
        font-weight: 500;
        cursor: pointer;
}
}

.single-game-detail{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    width: 70%;


    p {

    a,span{
        color: black;
        margin: 0px 0.3em;
        padding: 0.3em 1.2em;
        background: rgb(255 255 255);
        border-radius: 20px;
        font-size: 0.8em;
        text-decoration: none;
        font-weight: 500;

    }


}

 
}




   
    



</style>