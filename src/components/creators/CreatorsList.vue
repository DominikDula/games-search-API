<template>
     <div class="creator-info" v-bind:style="{ backgroundImage: 'url(' + item.image_background + ')' }" >    
            <router-link class="router-creator" tag="div" :to="{name:'SingleCreator', params:{slug:item.slug}}">   
                <div v-if="item.image" class="creator-img">
                    <img class="creator-img" :src="item.image" :alt="item.image"> 
                </div>
                <div class="creator-name">               
                    <h2>{{item.name}}</h2>
                </div>
                <div class="creator-position">               
                    <span v-for="(position,index) in positions" :key="index+1">
                        {{ position}}   
                    </span>
                </div>
                
            </router-link>
            <div class="creator-desc">
                <h3>Known for:</h3>             
                <ul>
                    <li v-for="game in item.games.slice(0, 3)" :key="game.id">
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
        props:['item'],
        computed: {
            positions() {
                // remove last comma
                let ar =[] 
               this.item.positions.forEach(element => {
                ar.push(element.name+',')
            })
                let arr1 = ar.slice(0,-1);
                let arr2 = ar.slice(-1).toString().slice(0,-1);
                arr1.push(arr2)
                return arr1
            }
        },
    }
</script>

<style lang="scss" scoped>
.creator-info{
    width: 100%;
    position: relative;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 0;
    z-index: 1;
    border-radius: 15px;
    overflow: hidden;

    .router-creator{
        cursor: pointer;
    }


     .creator-img{
        margin-top: 1em;
        display: flex;
        justify-content: center;
        .creator-img{
            width: 140px;
            height: 140px;
            border-radius: 50%;
            object-fit: cover;
        }
    }

    .creator-name{
        display: flex;
        justify-content: center;
        
    }
    .creator-position{
        display: flex;
        justify-content: center;
    }




    .creator-desc{
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

.creator-info::after{
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