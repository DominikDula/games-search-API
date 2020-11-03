<template>
    <div class="not-found">
        <div class="message">
            <h1>404</h1>
            <p>Page not found</p>
            <router-link to="/">Home</router-link>
        </div>
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

.not-found{
    width: 100%;
    height: 100%;
    background: url(../assets/404-BG.jpg);
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    z-index: 6;
    top: 0;
    overflow: hidden;
}

.not-found::after{
    content: '';
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    z-index: -1;
    width:100%;
    height: 100%;
}

.message{
    max-width: $base-width;
    margin: 0 auto;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 1em;


    h1,p{
        margin: 0;
        font-size: 4em;
    }

    a{
        color: black;
        background: white;
        width: 220px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        font-size: 1.6em;
        border-radius: $border-medium;
        cursor: pointer;
        margin-top: 2em;
    }
}

@media (max-width: 650px){
    .message{
            align-items: center;

        h1,p{
        font-size: 3em;
    }
    }
}

</style>