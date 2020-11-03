<template>
    <div v-if="ready" class="grid-container">
        <template-list v-for="item in results" :key="item.id" :item="item" />
    </div>
</template>

<script>
import TemplateList from '@/components/TemplateList.vue';
    export default {
        data() {
            return {
                results:'',
                ready:'',
            }
        },
        components: {
            TemplateList
        },
        created () {
            this.getGenres();
            

        },
        methods: {

            async getGenres() {
                this.$root.$emit('loader',true)
                this.ready = false
                try{
                    let response = await fetch(`https://api.rawg.io/api/genres`);
                    let data = await response.json()
                    this.results = data.results
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






</style>
