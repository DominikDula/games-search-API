<template>
    <div class="search">
        <form @submit.prevent="Search()" action="">
            <input v-model="query" placeholder="Search games" type="text">
        </form> 
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                query:'',
            }
        },
        methods: {
            Search() {
                this.$root.$emit('input-query',this.query)
                this.query = ''
            }
        },
    }
</script>

<style lang="scss" scoped>

.search{
    width: 80%;
    height: 40px;
    margin: 3em auto 0;
    max-width: 1440px;

    
    form{
        height: 40px;
    }
    input{
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 20px;
        border:none;
        outline: none;
        font-size: 1em;
        padding-left: 1.5em;  
        background-color: rgb(255 255 255 / 20%);
        color:rgb(212, 207, 207);
        transition: 0.2s ease-in-out;

        &:hover{
            background-color: rgb(255 255 255 / 100%);
            transition: 0.2s ease-in-out;
            color: black;
        }
         &:hover::placeholder{
            color: black;
        }
        &::placeholder{
            color:rgb(212, 207, 207);
        }

    }
}

</style>