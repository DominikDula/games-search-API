<template>
    <div  class="footer" >
        <div class="project-info">
            <div class="database">
            <p>Database and design inspiration</p>
            <a href="https://rawg.io/" target="_blank">
                <img :src="require('@/assets/rawg-logo.png')" alt="">
            </a>
            </div>
            
            <div class="vue">
                <p>Project built with</p>
            <a href="https://vuejs.org/" target="_blank">
                <img :src="require('@/assets/logo.png')" alt="">
            </a>
            </div>
            
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

.footer{
    width: 100%;
    height: 200px;
    background: rgb(27, 25, 25);
}

.project-info{
    padding-top: 1em;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .database,.vue{
        display: flex;
        justify-content: center;
    }
    .database img{
   
        width: 70px;
        height: 70px;
        border-radius: 50%;
    
    }
    .vue img{
        width: 60px;
        height: 60px;
    }
    p{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1em;
    }

}



</style>