<template>
    <div class="loader">
        <div class="spin"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               
            }
        },
    }
</script>

<style lang="scss" scoped>

.loader{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
    // background: rgba(0, 0, 0, 0.8);   
}

.spin{
    width: 60px;
    height: 60px;
    position: absolute;
    transform: translate(-50%,-50%);
    top: 40%;
    left: 50%;
}

.spin:before{
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 6px solid rgba(128, 128, 128, 0.507);
    border-bottom: 6px solid grey;
    animation: spinner 1s linear infinite;

}

@keyframes spinner{

    0%{
        transform: rotate(0deg)
    }
    100%{
        transform: rotate(360deg)
    }
}

</style>