<template>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/developers">Developers</router-link>
      <router-link to="/games">All games</router-link>
      <router-link to="/genres">Genres</router-link>
      <router-link to="/platforms">Platforms</router-link>
      <router-link to="/creators">Creators</router-link>
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

@media( max-width:500px) {
    #nav a{
        font-size: 0.7em;
    }
}

</style>