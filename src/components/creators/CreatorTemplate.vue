<template>
    <div class="creator">
        <div class="creator-info">
            <h1>{{info.name}}</h1>
            <img v-if="info.image" :src="info.image" :alt="info.image">
        </div>
        
        <article v-if="info.description"  v-html="info.description"></article>
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

.creator{
    max-width: $base-width;
    position: relative;
    margin: 2em auto 0;

    .creator-info{
        display: flex;
        padding: 0 3em;
        h1{
            margin-right: 1em;
        }

        img{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
        }
    }


}
          

article{
    position: relative;
    display: flex;
    justify-content: center;
    max-width: $base-width;
    margin: 0 auto;
    line-height: 1.3;
    border-radius: $border-medium;
    line-height: 2;

  ::v-deep  p{
        padding: 0 3em;
    }
}


</style>