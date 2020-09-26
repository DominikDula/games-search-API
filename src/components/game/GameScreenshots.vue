<template>
<div >
    <h1>Gallery</h1>
    <div  class="image-grid">
        <img @click="ShowImage($event);ShowNext(index)"   v-for="(image,index) in results" :key="image.id" :src="image.image">
    </div>
   <transition name="fade"> 
        <div @click="HideImage" v-if="singleImage" class="container-overlay">
            <i class="fas fa-times-circle"></i>
            <div class="images-container">
                
                <div class="big-image">
                    <img class="image-overlay" :src="imgArray[imgIndex]" :alt="imgArray[imgIndex]">
                    <i @click="DecreaseIndex()" class="fas fa-angle-left left"></i>
                    <i @click="IncreaseIndex()" class="fas fa-angle-right right"></i>
                </div>
                <div class="small-images">
                    <img class="image-overlay" 
                    @click="ShowImage($event);ShowNext(index)"   
                    v-for="(image,index) in results" 
                    :key="image.id" 
                    :src="image.image">
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
                singleImage:'',
                imgIndex:'',
                imgArray:[],
            }
        },
        props: {
            slug: {
                type: String,
                default: ''
            },
        },
        created () {
            this.GetGameScreenshots()
            this.ArrowSlider()
            
        },
        methods: {
         async   GetGameScreenshots() {
             
            let response = await fetch(`https://rawg.io/api/games/${this.slug}/screenshots`);
            let data = await response.json()
            this.results = data.results
            data.results.forEach(element => {
                 this.imgArray.push(element.image)
            });
           
                
            },
            ShowImage(event){
                this.singleImage = event.target.src
                document.documentElement.style = 'overflow:hidden;'

                
                
            },
            HideImage(event){
                if(event.target.className === 'image-overlay' || event.target.className === 'fas fa-angle-left left'
                 || event.target.className === 'fas fa-angle-right right' ){
                    return false
                }
                this.singleImage = ''
                document.documentElement.style = 'overflow:visible;'
                
            },
            ShowNext(index){
                this.imgIndex = index
            },
            IncreaseIndex(){
                if(this.imgIndex >= this.imgArray.length-1){
                 return  this.imgIndex = 0
                }
                this.imgIndex +=1
            },
            DecreaseIndex(){
                if(this.imgIndex <=0){
                 return  this.imgIndex = this.imgArray.length -1
                }
                this.imgIndex -=1
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
            }
        },
   

    }
</script>

<style lang="scss" scoped>

h1{
    max-width: 1440px;
    margin: 0 auto;
    padding: 2em 0 0;
    display: flex;
    justify-content: center;
}

.image-grid{
    max-width: 1140px;
    margin: 0 auto;
    display: grid;
    grid-gap: 25px;
    padding: 3em;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    // grid-auto-rows: minmax(300px, auto);

    img{
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 15px;
        cursor: pointer;
        transition: 0.1s ease;

        &:hover{
            transform: scale(1.03);
            transition: 0.3s ease-in-out;
        }
    }
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
    z-index: 1;
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
    .images-container{
        max-width: 1440px;

    }

    .big-image{
      display: flex;
      justify-content: center;
      max-width: 1000px;
      margin: 0 auto;
      position: relative;

        .right,.left{
            width: 40px;
            height: 40px;
            background: #0000006b;
            align-items: center;
            display: flex;
            justify-content: center;
            border-radius: 50%;
        }
        .right{
            position: absolute;
            top: 50%;
            right: 15px;
        }
        .left{
            position: absolute;
            top: 50%;
            left: 15px;
        }






      .image-overlay{
          border-radius: 15px;
          width: 100%;
      }
      img{
          width: 70%;
      }
    }
    .small-images{
        max-width: 1440px;
    margin: 0 auto;
    display: grid;
    grid-gap: 10px;
    padding: 3em;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

        img{
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 15px;
        cursor: pointer;
        transition: 0.1s ease;

        &:hover{
            transform: scale(1.03);
            transition: 0.3s ease-in-out;
        }
    }
    }
}

@media (max-width: 600px){

    .image-grid{
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

        img{
            height: auto;
        }

    }
    .container-overlay{

        .big-image{
            img{
                width: 90%;
            }
        }


        .small-images{
            height: 150px;
            margin: 0 18px;
            flex-direction: row;
            display: flex;
            padding: 0 0em 66px 0;
            overflow-x: scroll;
            overflow-y: hidden;

            img{
                width: 50%;
                height: 85px;
                margin: 92px 0;

            }
        }
    }
}

</style>