<template>
<div>
    <div class="search">
        <form @submit.prevent="Search()" action="">
            <input @focus="focus()" @blur="blur()"  @keyup="SearchSuggested($event)" id="input" v-model="query" placeholder="Search games" type="text" autocomplete="off">
            <i @click.prevent="Search()" class="fas fa-search"></i>
        </form> 
    </div>
    <div  v-if="visible && query" class="autosearch">
        <div class="suggested-all" v-for="game in results" :key="game.id">
            <div tabindex="0" @keydown.13="Submit(game)" @click="Submit(game)" tag="div" class="suggested-single">
                <div class="image-cover">
                    <img :src="game.background_image" :alt="game.background_image">
                </div>
                <div class="game-header">
                    <h4> {{game.name}} </h4>
                </div>

            </div>
        </div>
    </div>    
</div>

</template>

<script>
import { debounce } from 'lodash-es'
    export default {
        data() {
            return {
                query:'',
                results:'',
                visible:false,
            }
        },
        updated () {
            if(!this.query){
                this.visible = false;
            };
            this.GameFocus()
        },
        methods: {
            GameFocus(){
                let i = -1
                window.addEventListener('keydown',(e)=>{
                    
                let div = document.querySelectorAll(".suggested-single")
                let divSize = div.length

                if(e.keyCode === 40 && this.visible){
                    e.preventDefault()
                    if(i >= divSize-1){
                        return  i = divSize -1
                    }
                    i++
                    div[i].focus()
            
                }
                if(e.keyCode === 38 && this.visible){
                    e.preventDefault()
                    if(i <= 0){
                        document.querySelector("#input").focus()
                        return  i = -1
                  
                    }
                    i--
                    div[i].focus()
                   
                }
            })    
            },
            Submit(game){
                this.$router.push({ name: 'SingleGame',params:{slug:game.slug}}).catch(err => {err})
                this.visible = false
                
            },
            Search() {
                if(this.query === ''){
                    return
                }
                this.$router.push({ name: 'GlobalSearch',params: { query: this.query } }).catch(err => {err})
                document.querySelector("#input").blur()
                this.query = ''
            },
                        SearchSuggested(event){
                if(event.keyCode === 38){
                    return false
                }else{
                    this.SearchDebounce()
                }

            },
            SearchDebounce: debounce(function() {
                this.getSuggestedGames()
                this.visible = true
            },500),
            async getSuggestedGames() {

                try {
                    let response = await fetch(`https://rawg.io/api/games?search=${this.query}&page_size=10`);
                    let data = await response.json()
                    this.results = data.results
                    }
                catch (error) {
                    console.log(error);
                }
            },      
            focus(){
                window.addEventListener('click',(event)=>{
                    if(event.target.className === 'autosearch'){
                    return false
                    }
                    else{
                        this.visible = true
                    }
                })
              
                
            },
            blur(){
                window.addEventListener('click',(event)=>{
                    if(event.target.className === 'autosearch'){
                    return false
                    }else{
                        this.visible = false
                    }
                })                
             
                
            },
        },
    }
</script>

<style lang="scss" scoped>

.search{
    width: 60%;
    height: 40px;
    margin: 5em auto 0;
    max-width: $base-width;

    
    form{
        height: 40px;
        position: relative;
    }
    input{
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: $border-large;
        border:none;
        outline: none;
        font-size: 1em;
        text-indent: 1.5em;
        background-color: rgb(255 255 255 / 20%);
        color:rgb(212, 207, 207);
        transition: 0.2s ease-in-out;

        &:hover,&:focus{
            background-color: rgb(255 255 255 / 100%);
            transition: 0.2s ease-in-out;
            color: black;
        }
         &:hover::placeholder,&:focus::placeholder{
            color: black;
        }
        &::placeholder{
            color:rgb(212, 207, 207);
        }

    }
    input:hover ~ i,input:focus ~ i{
        color: black;
    }

    i{
        position: absolute;
        right: 14px;
        top: 14px;
        cursor: pointer;
        color: #d4cfcf;
    }
}

.autosearch{
    width: 60%;
    height: auto;
    background: black;
    margin: 1em auto;
    border-radius: $border-small;
}


.suggested-single{
    display: flex;
    padding: 1em;
    height: 50px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    outline: none;
    &:hover,&:focus{
        background: rgba(128, 128, 128, 0.2);
        color: yellow;
        border-radius: $border-small;
    }
    
    .image-cover{
        width: 35px;
        height: 50px;

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: $border-small;
        }
    }
    .game-header{
            margin-left: 2em;
    }


}

@media( max-width:600px) {
    .search{
        width: 80%;
    }
    .autosearch{
        width: 100%;
    }
}

</style>