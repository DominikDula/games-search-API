<template>

    <div class="creator-container">
        <creators-list v-for="item in results" :key="item.id" :item="item" />
    </div>

    
    
</template>

<script>
import CreatorsList from '@/components/creators/CreatorsList.vue';
    export default {
        data() {
            return {
                results:''
            }
        },
        components: {
            CreatorsList,
        },
        created () {
            this.GetCreators()
        },
        methods: {
           async GetCreators() {
               let response = await fetch(`https://api.rawg.io/api/creators?page_size=20`)
               let data = await response.json()
               this.results = data.results
               console.log(data.results);

                
            }
        },
    }
</script>

<style lang="scss" scoped>


</style>