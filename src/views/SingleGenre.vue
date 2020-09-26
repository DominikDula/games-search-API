<template>
<div>
        <single-template :info="info" />
        <div class="grid-container">
            <game-info v-for="item in results.results" :key="item.id" :item="item" />
        </div>
        <load-more class="bottom"></load-more>
</div>


</template>

<script>
import GameInfo from '@/components/game/GameInfo.vue';
import SingleTemplate from '@/components/genres-platforms/SingleTemplate.vue';
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
            SingleTemplate,
            LoadMore,
        },
        created () {
            this.getSingleGenre();
            this.getGenreInfo();

            
        },
        mounted () {

             this.$root.$on('shownext', () => {
                 if(this.next === null){
                     return
                 }
                this.pagesize += 1
                this.getSingleGenre()
            }),
             this.$root.$on('showprevious', () => {
                 if(this.pagesize<=1){
                     return
                 }
                this.pagesize -= 1
                this.getSingleGenre()
            })
        },

   
        props: {
            slug: {
                type: String,
                required:true 
            },
        },
        methods: {
            async getSingleGenre() {

                try{
                    let response = await fetch(`https://api.rawg.io/api/games?genres=${this.slug}&page=${this.pagesize}`);
                    let data = await response.json()
                    this.results = data
                    this.next = data.next
                    console.log(data);
                }
                catch(error){
                    this.$router.push({name: '404Page'})
                }


            
            },
            async getGenreInfo() {

            let response = await fetch(`https://api.rawg.io/api/genres/${this.slug}`);
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