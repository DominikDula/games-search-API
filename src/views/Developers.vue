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
            this.getAllDevelopers();
             
            
            

        },
        methods: {

            async getAllDevelopers() {

            let response = await fetch(`https://api.rawg.io/api/developers?page_size=20`);
            let data = await response.json()
            this.results = data.results
            // console.log(data);
            


            },
            
        },
    }
</script>

<style lang="scss" scoped>




</style>
