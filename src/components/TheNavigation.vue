<template>
<div class="nav-container">
    <div @click="NavClick" id="nav" class=" navigation" :class="{ 'navigation': isActive, 'navigation-show': isNotActive }">
        <router-link to="/">Home</router-link>
        <router-link to="/developers">Developers</router-link>
        <router-link to="/games">All games</router-link>
        <router-link to="/genres">Genres</router-link>
        <router-link to="/tags">Tags</router-link>
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

.nav-container{
    max-width: $base-width;
    margin: 0 auto;
}

.navigation {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    opacity: 1;
  
    a {
        font-size: 1.2em;
        margin: 0 0.8em;
        font-weight: 500;
        color: #fff;
        text-decoration: none;
  
      &.router-link-exact-active {
        color:yellow;
        font-weight: bold;
      }
      &:hover {
        color:rgba(255, 255, 0, 0.651);
      }
    }
  }
.hamburger{
    width: 100%;
    opacity: 0;

    i{
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 2em;
        cursor: pointer;
        z-index: 2;
    }


    
}



@media( max-width:980px) {
    .hamburger{
        display: block;
        width: 100%;
        height: 60px;
        opacity: 1;
        position: absolute;
        top: 0;
        z-index: 3;

    }
    
    .navigation{
        justify-content: center;
        opacity: 0;
        display: flex;
        flex-direction: column;
        transform: translateY(-600px);
        transition: 0.5s ease-in-out;
        a{
            padding: 1.5em 0;
        }
    }
    .navigation-show {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        background: rgba(0, 0, 0, 0.9);
        z-index: 3;
        opacity: 1;
        transform: translateY(0);
        transition: 0.5s ease-in-out;
        
        a{
            padding: 0.9em 0;
        }
    }
}

</style>

