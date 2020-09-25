<template>
<div>

    <select @change="getAllGame()" v-model="selected" name="" id="">
        <option value="">Select Year</option>
        <option v-for="(year,index) in YearGenerator" :key="index+1" :value=" year[0] + ','+ year[1]">
            {{year[0]}}
        </option>
        
    </select>
      <h1  v-if="selected">Best games in {{selected.slice(0,4)}}</h1>
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
                selected:''
            }
        },
        components: {
            GameInfo,
            LoadMore,
        },
        created () {
            this.getAllGame();
    
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

                try {
                     let response = await fetch(`https://rawg.io/api/games?&page=${this.pagesize}&dates=${this.selected}`);
                    let data = await response.json()
                    this.results = data.results
                    this.next = data.next
                    // console.log(data.results);
                    }
                catch (error) {
                    console.log(error);
                }

 

            },
            
        },
    }
</script>


<style lang="scss" scoped>

select{
    background-color: #272727;
    color: white;
    padding: 12px;
    width: 250px;
    border: none;
    font-size: 1.2em;
    border-radius: 15px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
    outline: none;
    max-width: 1440px;
    display: flex;
    margin: 20px auto 0;

   
}

h1{
        max-width: 1440px;
        display: flex;
        margin: 20px auto 0;
        justify-content: center;
    }

.bottom{
    padding: 0 0 4em;
}

@media (max-width: 655px) { 
    
   h1{
        font-size: 1.3em;
    }
    
}

</style>