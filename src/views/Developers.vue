<template>
    <div class="developer-container">
        <developer-list v-for="developer in results" :key="developer.id" :developer="developer" />
    </div>
</template>

<script>
import DeveloperList from '@/components/developers/DeveloperList.vue';
    export default {
        data() {
            return {
                results:'',
            }
        },
        components: {
            DeveloperList
        },
        created () {
            this.getAllDevelopers();
            

        },
        methods: {

            async getAllDevelopers() {

            let response = await fetch(`https://api.rawg.io/api/developers?page_size=20`);
            let data = await response.json()
            this.results = data.results
            console.log(data);
            


            },
            
        },
    }
</script>

<style lang="scss" scoped>

.developer-container{
    padding: 4em 1em;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 1em;
    grid-auto-rows: minmax(270px, auto);
    max-width: 1440px;
    margin: 0 auto;


}


</style>
