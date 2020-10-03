<template>
<div v-if="results.length>0" >
    <h1>Youtube Videos</h1>
    <div v-for="(video,index) in results" :key="index+1" @click="ShowVideo(index,video)" class="video-grid">

        <div class="video-image">
            <img :src="video.thumbnails.sddefault.url"> 
            <i class="fas fa-play-circle play-icon"></i> 
        </div>

        <div  class="video-desc">
            <h3>{{video.name}}</h3>
        </div>
             
    </div>
    <transition name="fade"> 

        <div @click="HideImage" v-if="singleVideo" class="container-overlay">
            <i class="fas fa-times-circle"></i>

            <div class="videos-container">
                
                <div class="big-video">
                    
                    <div class="video-wrapper">
                        <iframe  :src="`https://www.youtube.com/embed/${videoArray[videoIndex]}`" class="video-overlay" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <i @click="DecreaseIndex()" class="fas fa-angle-left left"></i>
                        <i @click="IncreaseIndex()" class="fas fa-angle-right right"></i>
                    </div>
                     
                </div>
                
                <div class="small-video">
                    <img class="video-overlay" 
                    @click="ShowVideo(index,video)"   
                    v-for="(video,index) in results" 
                    :key="index+1" 
                    :src="video.thumbnails.sddefault.url">
                    
                </div>
            </div>  
        </div>
    </transition>
</div>
    
</template>

<script>
    export default {
        data() {
            return {
                results:'',
                singleVideo:'',
                videoIndex:'',
                videoArray:[],
            }
        },
        props: {
            slug: {
                type: String,
                default: ''
            },
        },
        created () {
            this.GetGameVideos()
            this.ArrowSlider()
            this.WheelSlider()
            
        },
        methods: {
         async   GetGameVideos() {
             
            let response = await fetch(`https://rawg.io/api/games/${this.slug}/youtube`);
            let data = await response.json()
            this.results = data.results.filter(video => video.like_count>0)
            data.results.filter(video => video.like_count>0)
            .forEach(element => {

                 this.videoArray.push(element.external_id)
            });

           
                
            },
            ShowVideo(index,video){
                this.singleVideo = video.external_id
                this.videoIndex = index
                document.documentElement.style = 'overflow:hidden;'

                
                
            },
            HideImage(event){
                if(event.target.className === 'video-overlay' || event.target.className === 'fas fa-angle-left left'
                 || event.target.className === 'fas fa-angle-right right' ){
                    return false
                }
                this.singleVideo = ''
                document.documentElement.style = 'overflow:visible;'
                
            },
            IncreaseIndex(){
                if(this.videoIndex >= this.videoArray.length-1){
                 return  this.videoIndex = 0
                }
                this.videoIndex +=1
            },
            DecreaseIndex(){
                if(this.videoIndex <=0){
                 return  this.videoIndex = this.videoArray.length -1
                }
                this.videoIndex -=1

            },
            ArrowSlider(){
                window.addEventListener('keyup',(e)=>{
                if(e.keyCode === 37){
                    this.DecreaseIndex()
                }
                if(e.keyCode === 39){
                    this.IncreaseIndex()
                }
            })
            },
            WheelSlider(){
                window.addEventListener('wheel',(e)=>{
                if(e.deltaY === 100){
                    this.DecreaseIndex()
                }
                if(e.deltaY === -100){
                    this.IncreaseIndex()
                }
            })

            },
        },
   

    }
</script>

<style lang="scss" scoped>


h1{
    max-width: $base-width;
    margin: 0 auto;
    padding:  0 0 2em;
    display: flex;
    justify-content: center;
}

.video-grid{
    max-width: 840px;
    margin: 1em auto;
    display: flex;
    justify-content: center;
    cursor: pointer;
    border-bottom: 1px solid rgba(255, 255, 255, 0.479);


   .video-image{
       position: relative;
            img{
            height: 130px;
            object-fit: cover;
            border-radius: $border-small;

        }
        .play-icon{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.8em;
        }
   }
   .video-desc{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1em;


   }

}

.video-grid:hover{
    color: yellow;
    border-bottom: 1px solid yellow;
}

.container-overlay{
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: #000000e0;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
            i{
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 2.3em;
            cursor: pointer;
        }
        i:hover{
            color: rgb(228, 228, 228);
        }
    .videos-container{
        max-width: $base-width;

    }

    .big-video{
         max-width: 1000px;
    margin: 2em auto;
    padding: 0 6em;

     .video-wrapper{
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;

     ::v-deep iframe{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: $border-small;
    }


     

        .right,.left{
            position: absolute;
            width: 40px;
            height: 40px;
            background: #0000006b;
            align-items: center;
            display: flex;
            justify-content: center;
            border-radius: 50%;
            top: 50%;
            transform: translate(0, -50%);
        }
        .right{
            right: -60px;
            
        }
        .left{
            left: -60px;
        }

    }
    }
    .small-video{
        max-width: $base-width;
        margin: 0 auto;
        display: grid;
        grid-gap: 10px;
        padding: 3em;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));

        img{
        width: 100%;
        height: 100px;
        object-fit: cover;
        border-radius: $border-small;
        cursor: pointer;
        transition: 0.1s ease;

        &:hover{
            transform: scale(1.03);
            transition: 0.3s ease-in-out;
        }
    }
    }
}

@media (max-width: 1270px){

    .video-grid{


        img{
            height: auto;
        }

    }
    .container-overlay{

        .big-video{
            .video-overlay{
                width: 80%;
                margin-top: 1em;
                height: 400px;
            }
        }


        .small-video{
            margin: 0 18px;
            flex-direction: row;
            display: flex;
            padding: 0 0em 66px 0;
            overflow-x: scroll;
            overflow-y: hidden;

            img{
                width: 20%;
                height: 100%;
                margin: 92px 0 0;

            }
        }
    }
}

@media (max-width: 930px){
    .video-grid{
    max-width: 80%;

   .video-image{
         img{
        height: 70px;

    }
   }
   .video-desc{
       h3{
           font-size: 0.8em;
           margin: 0;
       }
   }


}
}

@media (max-width: 700px){

    .container-overlay{

        .big-video{
            padding: 0 2em;

            .video-wrapper{

                .right,.left{
                    display: none;
                }
            }
            
        }

    }
}
@media (max-width: 500px){

    .container-overlay{
            i{
            font-size: 1.3em;
        }  
    }
}

</style>