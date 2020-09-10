<template>
    <div class="search">
        <input v-model="query" placeholder="Search games" type="text">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                query:'',
            }
        },
    }
</script>

<style lang="scss" scoped>

.search{
    width: 80%;
    height: 40px;
    margin: 0 auto;

    input{
        width: 100%;
        height: 100%;
        border-radius: 20px;
        border:none;
        outline: none;
        font-size: 1em;
        padding-left: 1.5em;  


    }
}

</style>