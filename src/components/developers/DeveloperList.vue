<template>
     

       <div class="developer-info" v-bind:style="{ backgroundImage: 'url(' + developer.image_background + ')' }" >

                
                    <router-link class="router-developer" tag="div" :to="{name:'SingleDeveloper',params:{slug:developer.slug,name:developer.name}}">   
                        <div class="developer-name">                
                            <h1>{{developer.name}}</h1>
                        </div>
                    </router-link>
                    <div class="developer-desc">
                        <h3>Popular games:</h3>                
                        <ul>
                            <li v-for="game in developer.games.slice(0, 3)" :key="game.id">
                                <router-link :to="{name:'SingleGame',params:{slug:game.slug}}">{{game.name}}</router-link>
                            </li>
                        </ul>
                    </div>

                
               
        </div>
        
    
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        props:['developer'],
    }
</script>

<style lang="scss" scoped>


.developer-info{
    width: 100%;
    position: relative;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 0;
    z-index: 1;
    border-radius: 15px;
    overflow: hidden;

    .router-developer{
        cursor: pointer;
    }
 

    .developer-name{
        display: flex;
        justify-content: center;
        height: 155px;
        h1{
            width: 70%;
        }
    }

    .developer-desc{
        // margin-top: 3em;
        display: flex;
        padding: 0 2em 1em;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: linear-gradient(rgba(32, 32, 32, 0), rgb(32, 32, 32,0.9) 50%);

        h3{
            border-bottom: 1px solid #ffffffa1;
            width: 80%;
        }

        ul{
            padding: 0;
            margin: 0;
            
            li {
                list-style: none;
            }
            a{
                text-decoration: none;
                border-bottom: 1px solid #ffffffa1;
                font-size: 0.9em;
                color: #ffffffad;
            }

        }

       
    }
    
}

.developer-info::after{
    content: '';
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}
</style>