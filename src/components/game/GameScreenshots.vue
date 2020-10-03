<template>
<div >
    <h1>Gallery</h1>
    <div  class="image-grid">
        <img @click="ShowImage(index)" v-for="(image,index) in results" :key="image.id" :src="image.image">
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
                    @click="ShowImage(index)"   
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
                singleImage:false,
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
            this.WheelSlider()
            
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
            ShowImage(index){
                this.singleImage = true
                this.imgIndex = index
                document.documentElement.style = 'overflow:hidden;'

                
                
            },
            HideImage(event){
                if(event.target.className === 'image-overlay' || event.target.className === 'fas fa-angle-left left'
                 || event.target.className === 'fas fa-angle-right right' ){
                    return false
                }
                this.singleImage = false
                document.documentElement.style = 'overflow:visible;'
                
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
        border-radius: $border-small;
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
        max-width: $base-width;

    }

    .big-image{
      display: flex;
      justify-content: center;
      max-width: 1000px;
      margin: 0 auto;
      position: relative;

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
            right: 20px;
        }
        .left{
            left: 20px;
        }






      .image-overlay{
          border-radius: $border-small;
          width: 100%;
      }

    }
    .small-images{
        max-width: $base-width;
        margin: 0 auto;
        display: grid;
        grid-gap: 10px;
        padding: 3em;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

        img{
        width: 100%;
        height: 150px;
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

    .image-grid{
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

        img{
            height: auto;
        }

    }
    .container-overlay{

        .big-image{
            .image-overlay{
                width: 80%;
                margin-top: 1em;
            }
        }


        .small-images{
            margin: 0 18px;
            flex-direction: row;
            display: flex;
            padding: 0 0em 66px 0;
            overflow-x: scroll;
            overflow-y: hidden;

            img{
                width: 30%;
                height: 100%;
                margin: 92px 0 0;

            }
        }
    }
}

@media (max-width: 700px){

    .container-overlay{

          .big-image{
            .image-overlay{
                width: 95%;
                margin-top: 0
            }
        }

        .small-images{

            img{
                width: 50%;
                height: 60%;
            }
        }
    }
}
@media (max-width: 500px){

    .container-overlay{
            i{
            font-size: 1.3em;
        }

          .big-image{
            .right,.left{
            width: 25px;
            height: 25px;

        }

        }


    }
}

</style>