<template>
<div v-if="ready">
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
                next:'',
                ready:'',

            }
        },
        components: {
            TemplateList,
            LoadMore,
        },
        created () {
            this.getAllDevelopers();
             
            
            

        },
        mounted () {

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
                this.$root.$emit('loader',true)
                this.ready = false

                try{
                    let response = await fetch(`https://api.rawg.io/api/developers?page_size=20&page=${this.pagesize}`);
                    let data = await response.json()
                    this.results = data.results
                    this.next = data.next
                    this.$root.$emit('loader',false)
                    this.ready = true
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
