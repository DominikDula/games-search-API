<template>
<div>
        <creator-template :info="info" />
        <div class="grid-container">
            <game-info v-for="item in results.results" :key="item.id" :item="item" />
        </div>
        <load-more class="bottom"></load-more>
</div>


</template>

<script>
import GameInfo from '@/components/game/GameInfo.vue';
import CreatorTemplate from '@/components/creators/CreatorTemplate.vue';
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
            CreatorTemplate,
            LoadMore,
        },
        created () {
            this.getSingleCreator();
            this.getCreatorInfo();

            
        },
        mounted () {

             this.$root.$on('shownext', () => {
                 if(this.next === null){
                     return
                 }
                this.pagesize += 1
                this.getSingleCreator()
            }),
             this.$root.$on('showprevious', () => {
                 if(this.pagesize<=1){
                     return
                 }
                this.pagesize -= 1
                this.getSingleCreator()
            })
        },

   
        props: {
            slug: {
                type: String,
                required:true 
            },
        },
        methods: {
            async getSingleCreator() {
                try{
                    let response = await fetch(`https://api.rawg.io/api/games?creators=${this.slug}&page=${this.pagesize}`);
                    let data = await response.json()
                    this.results = data
                    this.next = data.next
                }
                catch(error){
                    this.$router.push({name: '404Page'})
                }

            
            
            },
            async getCreatorInfo() {
    
                    let response = await fetch(`https://api.rawg.io/api/creators/${this.slug}`);
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

.bottom{
    padding: 0 0 4em;
}



</style>