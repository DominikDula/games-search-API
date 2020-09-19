<template>
<div>
    <div class="grid-container">
        <template-list v-for="item in results" :key="item.id" :item="item" />
    </div>
    <load-more class="bottom"></load-more>
</div>
</template>

<script>
import TemplateList from '@/components/TemplateList.vue';
import LoadMore from '@/components/LoadMore.vue';
    export default {
        data() {
            return {
                results:'',
                pagesize:1,

            }
        },
        components: {
            TemplateList,
            LoadMore
        },
        created () {
            this.getAllDevelopers();
             
            
            

        },
        mounted () {
                this.$root.$on('input-query', (data) => {
                this.search = data
                this.pagesize = 1
                this.getAllDevelopers()    
            })
             this.$root.$on('shownext', () => {
                 if(this.next === null){
                     return
                 }
                this.pagesize += 1
                this.getAllDevelopers()
            }),
             this.$root.$on('showprevious', () => {
                 if(this.pagesize<=1){
                     return
                 }
                this.pagesize -= 1
                this.getAllDevelopers()
            })
        },
        methods: {

            async getAllDevelopers() {

            let response = await fetch(`https://api.rawg.io/api/developers?page_size=20&page=${this.pagesize}`);
            let data = await response.json()
            this.results = data.results
            // console.log(data);
            


            },
            
        },
    }
</script>

<style lang="scss" scoped>

.bottom{
    padding: 0 0 4em;
}




</style>
