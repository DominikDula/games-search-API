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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "developers" */ "../views/Developers.vue")
  },
  {
    path: "/developers/:slug",
    name: "SingleDeveloper",
    props:true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "single-developers" */ "../views/SingleDeveloper.vue")
  },
  {
    path: "/games/:slug",
    name: "SingleGame",
    props:true,
    component: () =>
      import(/* webpackChunkName: "games" */ "../views/SingleGame.vue")
  },
  {
    path: "/games",
    name: "AllGames",
    props:true,
    component: () =>
      import(/* webpackChunkName: "all-games" */ "../views/AllGames.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
