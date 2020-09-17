<template>
  <div >

      <game-list v-if="!search" />
      
    <div v-if="search" class="grid-container">
        <game-info   v-for="item in results" :key="item.id" :item="item" />
    </div>

    <load-more v-if="search" class="bottom"></load-more>    

  </div>
</template>

<script>
// @ is an alias to /src

import GameList from '@/components/game/GameList.vue'
import GameInfo from '@/components/game/GameInfo.vue';
import LoadMore from '@/components/LoadMore.vue';

export default {
  name: "Home",
  data() {
      return {
          search:'',
          results:'',
          pagesize:1,
          next:''

      }
  },
  components: {
      GameList,
      GameInfo,
      LoadMore

  },

  methods: {

            async getAllGame() {

            let response = await fetch(`https://rawg.io/api/games?search=${this.search}&page=${this.pagesize}`);
            let data = await response.json()
            this.results = data.results
            this.next = data.next


            },
            
        },
   mounted () {
            this.$root.$on('input-query', (data) => {
                this.search = data
                this.pagesize = 1
                this.getAllGame()    
            })
             this.$root.$on('shownext', () => {
                 if(this.next === null){
                     return
                 }
                this.pagesize += 1
                this.getAllGame()
            }),
             this.$root.$on('showprevious', () => {
                 if(this.pagesize<=1){
                     return
                 }
                this.pagesize -= 1
                this.getAllGame()
            })
        },
};
</script>
