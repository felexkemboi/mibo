import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    alias: "/repos",
    name: "repositories",
    component: () => import("../components/RepositoryList.vue")
  },
  {
    path: "/repository/:name",
    name: "repository-details",
    component: () => import("../components/RepositoryDetails.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
