<template>
    <div class="grid-container">
        <template-list v-for="item in results" :key="item.id" :item="item" />
    </div>
</template>

<script>
import TemplateList from '@/components/TemplateList.vue';
    export default {
        data() {
            return {
                results:'',
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
                try{
                    let response = await fetch(`https://api.rawg.io/api/genres`);
                    let data = await response.json()
                    this.results = data.results
                    // console.log(data);
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
