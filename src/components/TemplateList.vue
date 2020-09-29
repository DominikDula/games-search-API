<template>
     <!-- template for developers/genres/platforms/tags -->

       <div class="item-info" v-bind:style="{ backgroundImage: 'url(' + item.image_background + ')' }" >    
            <router-link class="router-item" tag="div" :to="{name:where, params:{slug:item.slug,name:item.name,id:item.id}}">   
                <div class="item-name">                
                    <h1>{{item.name}}</h1>
                </div>
            </router-link>
            <div class="item-desc">
                <h3>Popular games:</h3>             
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
                where:''
            }
        },
        props:['item'],
        methods: {
            whereTo() {
                if(this.$route.name=='Developers'){
                    this.where='SingleDeveloper'
                }
                if(this.$route.name=='Genres'){
                    this.where='SingleGenre'
                }      
                if(this.$route.name=='Platforms'){
                    this.where='SinglePlatform'
                }      
                if(this.$route.name=='Tags'){
                    this.where='SingleTag'
                }      
            }
        },
        created () {
            this.whereTo()
            
        },

       
    }
</script>

<style lang="scss" scoped>


.item-info{
    width: 100%;
    position: relative;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 0;
    z-index: 1;
    border-radius: $border-medium;
    overflow: hidden;

    .router-item{
        cursor: pointer;
    }
 

    .item-name{
        display: flex;
        justify-content: center;
        height: 155px;
        h1{
            width: 70%;
        }
    }

    .item-desc{
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

                &:hover{
                    color: yellow;
                }
            }

        }

       
    }
    
}

.item-info::after{
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