<template>
    <div class="button">
        <button class="prev" @click="showPrevious()" >Previous</button>
        <button class="next" @click="showNext()" >Next</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            showNext() {
                this.$root.$emit('shownext')
                window.scrollTo({top: 0, behavior: 'smooth'})
            },
            showPrevious() {
                this.$root.$emit('showprevious')
                window.scrollTo({top: 0, behavior: 'smooth'})
            },

        },
    }
</script>

<style lang="scss" scoped>
.button{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // margin-bottom: 4em;

    button{
        width: 70px;
        height: 30px;
        border-radius: 5px;
        margin: 0 1em;
        outline: none;
        border: none;
        cursor: pointer;

    }
}
</style>