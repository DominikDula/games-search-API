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
            this.getPlatforms();
            

        },
        methods: {

            async getPlatforms() {

            let response = await fetch(`https://api.rawg.io/api/platforms`);
            let data = await response.json()
            this.results = data.results
            // console.log(data);
            


            },
            
        },
    }
</script>

<style lang="scss" scoped>




</style>
