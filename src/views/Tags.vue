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
                next:''

            }
        },
        components: {
            TemplateList,
            LoadMore
        },
        created () {
            this.getAllTags();
             
            
            

        },
        mounted () {

             this.$root.$on('shownext', () => {
                 if(this.next === null){
                     return
                 }
                this.pagesize += 1
                this.getAllTags()
            }),
             this.$root.$on('showprevious', () => {
                 if(this.pagesize<=1){
                     return
                 }
                this.pagesize -= 1
                this.getAllTags()
            })
        },
        methods: {

            async getAllTags() {
                try{
                    let response = await fetch(`https://api.rawg.io/api/tags?page_size=20&page=${this.pagesize}`);
                    let data = await response.json()
                    this.results = data.results
                    this.next = data.next

                }
                catch(error){
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
