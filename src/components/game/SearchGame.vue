<template>
    <div class="search">
        <form @submit.prevent="Search()" action="">
            <input id="input" v-model="query" placeholder="Search games" type="text">
            <i @click.prevent="Search()" class="fas fa-search"></i>
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
                if(this.query === ''){
                    return
                }
                this.$router.push({ name: 'GlobalSearch',params: { query: this.query } }).catch(err => {err})
                document.querySelector("#input").blur()
                this.query = ''
                

            }
        },
    }
</script>

<style lang="scss" scoped>

.search{
    width: 80%;
    height: 40px;
    margin: 5em auto 0;
    max-width: $base-width;

    
    form{
        height: 40px;
        position: relative;
    }
    input{
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: $border-large;
        border:none;
        outline: none;
        font-size: 1em;
        text-indent: 1.5em;
        background-color: rgb(255 255 255 / 20%);
        color:rgb(212, 207, 207);
        transition: 0.2s ease-in-out;

        &:hover,&:focus{
            background-color: rgb(255 255 255 / 100%);
            transition: 0.2s ease-in-out;
            color: black;
        }
         &:hover::placeholder,&:focus::placeholder{
            color: black;
        }
        &::placeholder{
            color:rgb(212, 207, 207);
        }

    }
    input:hover ~ i,input:focus ~ i{
        color: black;
    }

    i{
        position: absolute;
        right: 14px;
        top: 14px;
        cursor: pointer;
    }
}

@media( max-width:600px) {
    .search{
        margin: 0 auto 0;
    }
}

</style>