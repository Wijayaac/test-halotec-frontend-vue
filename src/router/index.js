import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/babies",
      name: "babies",
      component: () => import("../views/BabiesView.vue"),
    },
    {
      path: "/baby/add",
      name: "add baby",
      component: () => import("../views/AddBabyView.vue"),
    },
    {
      path: "/baby/:id",
      name: "Detail baby",
      component: () => import("../views/DetailBabyView.vue"),
    },
    {
      path: "/mothers",
      name: "mothers",
      component: () => import("../views/MothersView.vue"),
    },
    {
      path: "/mother/add",
      name: "add mother",
      component: () => import("../views/AddMotherView.vue"),
    },
    {
      path: "/mother/:id",
      name: "detail mother",
      component: () => import("../views/DetailMotherView.vue"),
    },
  ],
});

export default router;
