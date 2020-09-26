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
            this.getSinglePlatform();
            this.getPlatformInfo()

            
        },
        mounted () {

             this.$root.$on('shownext', () => {
                 if(this.next === null){
                     return
                 }
                this.pagesize += 1
                this.getSinglePlatform()
            }),
             this.$root.$on('showprevious', () => {
                 if(this.pagesize<=1){
                     return
                 }
                this.pagesize -= 1
                this.getSinglePlatform()
            })
        },

   
        props: {
            id: {
                // type: String,
                required:true 
            },
        },
        methods: {
            async getSinglePlatform() {

                try{
                    let response = await fetch(`https://api.rawg.io/api/games?platforms=${this.id}&page=${this.pagesize}`);
                    let data = await response.json()
                    this.results = data
                    this.next = data.next
                }
                catch(error){
                    this.$router.push({name: '404Page'})
                }


            
            },
            async getPlatformInfo() {

            let response = await fetch(`https://api.rawg.io/api/platforms/${this.id}`);
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