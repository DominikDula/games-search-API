<template>
    <div class="platform">
        <h1>{{info.name}}</h1>
        <article v-if="info.description" v-bind:style="{ backgroundImage: 'url(' + info.image_background + ')' }" v-html="info.description"></article>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               
            }
        },
        props: ['info'],
    }
</script>

<style lang="scss" scoped>

.platform{
    max-width: $base-width;
    position: relative;
    margin: 2em auto 0;

     h1{
            position: absolute;
            top: 0;
            left: 50px;
            z-index: 2;
        }
}
          

article{
    position: relative;
    display: flex;
    justify-content: center;
    max-width: $base-width;
    margin: 0 auto;
    line-height: 1.3;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 0;
    border-radius: $border-medium;
    z-index: 1;
    overflow: hidden;
    min-height: 400px;
    line-height: 2;

  ::v-deep  p{
        margin-top: 3em;
        padding: 3em;
    }
}

article::after{
    content: '';
    background-color: rgba(0, 0, 0, 0.85);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}



</style>