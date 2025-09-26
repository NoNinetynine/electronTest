import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/homepage",
  },
  {
    path: "/homepage",
    name: "homepage",
    component: () => import("../views/homepage.vue"),
  },
  {
    path: "/hxl_dzp1",
    name: "hxl_dzp1",
    component: () => import("../views/hxl_DZP/dzp1.vue"),
  },
  {
    path: "/animation",
    name: "animation",
    component: () => import("../views/animation/anima.vue"),
  },
  {
    path: "/homework",
    name: "homework",
    component: () => import("../views/homework/homework.vue"),
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("../views/calendar/calendar.vue"),
  },
  {
    path: "/3D1",
    name: "3D1",
    component: () => import("../views/three3D/3D1.vue"),
  },
  {
    path: "/fakeLink",
    name: "fakeLink",
    component: () => import("../views/fakeLink/homepage.vue"),
  },
  {
    path: "/fakeLinkLogin",
    name: "fakeLinkLogin",
    component: () => import("../views/fakeLink/login.vue"),
  },
  {
    path: "/homepageTwo",
    name: "homepageTwo",
    component: () => import("../views/fakeLink/homepage-two.vue"),
    children: [
      {
        path: "/dbqb",
        name: "dbqb",
        component: () => import("../views/fakeLink/dbqb/dbqb.vue"),
      },
    ],
  },
  {
    path: "/aiGod",
    name: "aiGod",
    component: () => import("../views/aiGodCss/homepage.vue"),
  },
];
// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// 导出
export default router;
