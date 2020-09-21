<template>
<div>
    <h1>Gallery</h1>
    <div class="image-grid">
        <img @click="ShowImage" v-for="image in results" :key="image.id" :src="image.image">
    </div>
    <div @click="HideImage" v-if="singleImage" class="container-overlay">
        <div class="images-container">
            <div class="big-image">
                <img class="image-overlay" :src="singleImage" :alt="singleImage">
            </div>
        <div class="small-images">
            <img class="image-overlay" @click="ShowImage"  v-for="image in results" :key="image.id" :src="image.image">
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
                singleImage:'',
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
            
        },
        methods: {
         async   GetGameScreenshots() {
             
            let response = await fetch(`https://rawg.io/api/games/${this.slug}/screenshots`);
            let data = await response.json()
            this.results = data.results
                
            },
            ShowImage(event){
                this.singleImage = event.target.src
                document.documentElement.style = 'overflow:hidden;'
                
            },
            HideImage(event){
                if(event.target.className === 'image-overlay'  ){
                    return false
                }
                this.singleImage = ''
                document.documentElement.style = 'overflow:visible;'
                
            },
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
    .images-container{
        max-width: 1440px;
    }
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

    .big-image{
      display: flex;
      justify-content: center;

      .image-overlay{
          border-radius: 15px;
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