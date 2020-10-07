<template>
    <div v-show="showme" @click="ClickToTop()"  class="top">
        <button>
            <i class="fas fa-arrow-circle-up"></i>
        </button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showme:false,
                scrollTop:''
            }
        },
        created () {
            window.addEventListener('scroll',this.Show)
        },
        methods: {
            Show() {
            this.scrollTop= window.scrollY

            if(this.scrollTop>900){
                this.showme = true
            }
            else{
                this.showme=false
            }

            },
            ClickToTop(){
                window.scrollTo({top: 0, behavior: 'smooth'})
            },
        },
    }
</script>

<style lang="scss" scoped>

.top{
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: yellow; 
  z-index: 10; 
}

.top:hover{
    box-shadow: 0px 0px 20px 0px yellow;
}

button{
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50% ,-50%);
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;

    
}

i{
    font-size: 3em;
}

</style>