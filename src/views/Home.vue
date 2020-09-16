<template>
  <div >

      <game-list />

  </div>
</template>

<script>
// @ is an alias to /src

import GameList from '@/components/game/GameList.vue'

export default {
  name: "Home",
  data() {
      return {
          
      }
  },
  components: {
      GameList,

  }
};
</script>
