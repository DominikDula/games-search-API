<template>
<div v-if="ready">
    <div class="filters">
        <select @change="filterGame()" v-model="selected" name="" id="year">
            <option v-if="!selected" value="">Select Year</option>
            <option v-for="(year,index) in YearGenerator" :key="index+1" :value=" year.join()">
                {{year[0]}}
            </option>   
        </select>
        <button class="clear" @click="yearReset()" v-if="selected">x</button>
        <select @change="filterGame()" v-model='platformOption'  name="" id="platform">
            <option v-if="!platformOption" value="">Select Platform</option>
            <option v-for="(platform,index) in PlatformGenerator" :key="index+1" :value=" [platform.id,platform.name]">
                {{platform.name}}
            </option>
        </select>
        <button class="clear" @click="platformReset()"  v-if="platformOption">x</button>
    </div>
      <h1  v-if="selected && !platformOption">Best games in {{selected.slice(0,4)}}</h1>
      <h1  v-if="platformOption && !selected">Best games of {{platformOption[1]}}</h1>
      <h1  v-if=" selected && platformOption">Best games in {{selected.slice(0,4)}} of {{platformOption[1]}}</h1>
     <div class="grid-container">
        <game-info v-for="item in results" :key="item.id" :item="item" />
    </div>
    <load-more class="bottom"></load-more>
</div>
    
</template>

<script>
import GameInfo from '@/components/game/GameInfo.vue';
import LoadMore from '@/components/LoadMore.vue';
    export default {
        data() {
            return {
                results:'',
                pagesize: 1,
                next:'',
                selected:'',
                PlatformGenerator:[],
                platformOption:'',
                ready:'',
            }
        },
        components: {
            GameInfo,
            LoadMore,
        },
        created () {
            this.getAllGame();
            this.getPlatform();
    
        },
        mounted () {

             this.$root.$on('shownext', () => {
                 if(this.next === null){
                     return
                 }
                this.pagesize += 1
                this.getAllGame()
            }),
             this.$root.$on('showprevious', () => {
                 if(this.pagesize<=1){
                     return
                 }
                this.pagesize -= 1
                this.getAllGame()
            })
        },
        computed: {
            YearGenerator() {
                let yearArray=[]
                let d = new Date()
                let n = d.getFullYear() +1
                n = n.toString() 
                for(let i = 1973;i<=n;i++){
                    yearArray.push([i-1,i])
 
                }
                 
                return yearArray.reverse();
            }
        },
        
    

        methods: {

            async getAllGame() {
                this.$root.$emit('loader',true)
                this.ready = false
                try {
                     let response = await fetch(`https://rawg.io/api/games?&page=${this.pagesize}&dates=${this.selected}&platforms=${this.platformOption[0] || '4'}`);
                    let data = await response.json()
                    this.results = data.results
                    this.next = data.next
                    this.$root.$emit('loader',false)
                    this.ready = true
                    }
                catch (error) {
                    console.log(error);
                }
            },
            async getPlatform(){
                    let response = await fetch(`https://api.rawg.io/api/platforms`);
                    let data = await response.json()
                    data.results.forEach(element => {
                        this.PlatformGenerator.push({name:element.name,id:element.id})
                    });

            },
            filterGame(){
                this.pagesize = 1
                this.getAllGame()
            },
            yearReset(){
            this.selected = ''
            this.getAllGame()
            },
            platformReset(){
            this.platformOption = ''
            this.getAllGame()
            },
        }
            
        
    }
</script>


<style lang="scss" scoped>


.filters{
    display: flex;
    justify-content: center;
    max-width: $base-width;
    margin: 2em auto 0;
    align-items: center;



    select{
    background-color: #272727;
    color: white;
    padding: 10px;
    width: 200px;
    border: none;
    font-size: 1em;
    border-radius: $border-small;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
    outline: none;
    margin: 0 10px;

   
}
.clear{
    background: red;
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-weight: 600;
    border: none;
    cursor: pointer;
}

}



h1{
        max-width: $base-width;
        display: flex;
        margin: 20px auto 0;
        justify-content: center;
    }

.bottom{
    padding: 0 0 4em;
}

@media (max-width: 655px) { 
    .filters{

        select{
        padding: 8px;
        width: 130px;
        font-size: 0.8em;

    }

}

   h1{
        font-size: 1.3em;
    }
    
}

</style>