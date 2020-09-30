<template>
<div>
    <h1> Developed by {{info.name}}</h1>
    <div class="grid-container">
        <game-info v-for="item in results.results" :key="item.id" :item="item" />
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
               info:'',
               pagesize:1,
               next:'',

            }
        },
        components: {
            GameInfo,
            LoadMore,
        },
        created () {
            this.getSingleDeveloper()
            this.getDeveloperInfo()

            
        },
        mounted () {

             this.$root.$on('shownext', () => {
                 if(this.next === null){
                     return
                 }
                this.pagesize += 1
                this.getSingleDeveloper()
            }),
             this.$root.$on('showprevious', () => {
                 if(this.pagesize<=1){
                     return
                 }
                this.pagesize -= 1
                this.getSingleDeveloper()
            })
        },
   
   
        props: {
            slug: {
                type: String,
                required:true 
            },
        },
        methods: {
            async getSingleDeveloper() {
                this.$root.$emit('loader',true)

                try{
                    let response = await fetch(`https://api.rawg.io/api/games?developers=${this.slug}&page=${this.pagesize}`);
                    let data = await response.json()
                    this.results = data
                    this.next = data.next
                    this.$root.$emit('loader',false)
                }
                catch(error){
                    this.$router.push({name: '404Page'})
                }


            
            },
            async getDeveloperInfo() {

            let response = await fetch(`https://api.rawg.io/api/developers/${this.slug}`);
            let data = await response.json()
            this.info = data
            if(response.status===404){
                this.$router.push({name: '404Page'})
            }
            
            },
            



 
        },
        
    }
</script>

<style lang="scss" scoped>


 h1{
    max-width: $base-width;
    margin: 30px auto 0; 
    display: flex;
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