import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/developers",
    name: "Developers",
    props:true,
    component: () =>
      import(/* webpackChunkName: "developers" */ "../views/Developers.vue")
  },
  {
    path: "/developers/:slug",
    name: "SingleDeveloper",
    props:true,
    component: () =>
      import(/* webpackChunkName: "single-developers" */ "../views/SingleDeveloper.vue")
  },
  {
    path: "/games/:slug",
    name: "SingleGame",
    props:true,
    component: () =>
      import(/* webpackChunkName: "single-game" */ "../views/SingleGame.vue")
  },
  {
    path: "/games",
    name: "AllGames",
    props:true,
    component: () =>
      import(/* webpackChunkName: "all-games" */ "../views/AllGames.vue")
  },
  {
    path: "/genres",
    name: "Genres",
    props:true,
    component: () =>
      import(/* webpackChunkName: "genres" */ "../views/Genres.vue")
  },
  {
    path: "/genres/:slug",
    name: "SingleGenre",
    props:true,
    component: () =>
      import(/* webpackChunkName: "single-genres" */ "../views/SingleGenre.vue")
  },
  {
    path: "/platforms",
    name: "Platforms",
    props:true,
    component: () =>
      import(/* webpackChunkName: "platforms" */ "../views/Platforms.vue")
  },
  {
    path: "/platforms/:id/:name",
    name: "SinglePlatform",
    props:true,
    component: () =>
      import(/* webpackChunkName: "single-platform" */ "../views/SinglePlatform.vue")
  },
  {
    path: "/creators",
    name: "Creators",
    props:true,
    component: () =>
      import(/* webpackChunkName: "creators" */ "../views/Creators.vue")
  },
  {
    path: "/creators/:slug",
    name: "SingleCreator",
    props:true,
    component: () =>
      import(/* webpackChunkName: "single-creator" */ "../views/SingleCreator.vue")
  },
  {
    path: "/search/:query",
    name: "GlobalSearch",
    props:true,
    component: () =>
      import(/* webpackChunkName: "global-search" */ "../views/GlobalSearch.vue")
  },
  {
    path: "/404",
    alias: '*',
    name: "404Page",
    props:true,
    component: () =>
      import(/* webpackChunkName: "404" */ "../views/404Page.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
        document.getElementById('app').scrollIntoView();
    }
});

export default router;
