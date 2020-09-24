<template>
<div>
    <div @click="NavClick" id="nav" class=" navigation" :class="{ 'navigation': isActive, 'navigation-show': isNotActive }">
      <router-link to="/">Home</router-link>
      <router-link to="/developers">Developers</router-link>
      <router-link to="/games">All games</router-link>
      <router-link to="/genres">Genres</router-link>
      <router-link to="/platforms">Platforms</router-link>
      <router-link to="/creators">Creators</router-link>
    </div>

    <div class="hamburger">
        <i @click="ToggleNav()" class="fas fa-bars show" :class="{ 'fas fa-bars show': isActive, 'fas fa-times': isNotActive }"></i>
    </div>
</div>

</template>

<script>
    export default {
        data() {
            return {
                isActive: true,
                isNotActive: false
            }
        },

        methods: {
            ToggleNav() {

                if(this.isActive){
                    document.documentElement.style = 'overflow:hidden;'
                }else if(this.isNotActive){
                    document.documentElement.style = 'overflow:visible;'
                }

                this.isActive = !this.isActive
                this.isNotActive = !this.isNotActive   
            },

            NavClick(event){
                if(window.innerWidth>600){
                    return false
                }

                if(this.isActive){
                    document.documentElement.style = 'overflow:hidden;'
                }else if(this.isNotActive){
                    document.documentElement.style = 'overflow:visible;'
                }
                if(event.target.id === 'nav'){
                    return false
                } 

                this.isActive = true
                this.isNotActive = false
                
               
                
                
            }
        },
    }
</script>

<style lang="scss" scoped>

.navigation {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #151515;
  
    a {
        font-size: 1.2em;
        margin: 0 0.3em;
        font-weight: bold;
        color: #fff;
        text-decoration: none;
  
      &.router-link-exact-active {
        color:yellow;
      }
      &:hover {
        color:rgba(255, 255, 0, 0.651);
      }
    }
  }
.hamburger{
    width: 100%;
    display: none;

    i{
        position: absolute;
        top: 25px;
        right: 25px;
        font-size: 2em;
        cursor: pointer;
    }


    
}



@media( max-width:600px) {
    .hamburger{
        display: block;
    }
    
    .navigation{
        display: none;
    }
    .navigation-show {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        
        a{
            padding: 2em 0;
        }
    }
}

</style>

