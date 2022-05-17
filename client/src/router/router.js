const home = () => import("./../views/home.vue")
const expense = () => import("../views/expense.vue")
const bigType = () => import("../views/bigType.vue")
const smallType = () => import("../views/smallType.vue")
const noFound = () => import("./../views/404.vue")

export const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: home
  },
  {
    path: "/expense",
    name: "expense",
    component: expense
  },
  {
    path: "/bigType",
    name: "bigType",
    component: bigType
  },
  {
    path: "/smallType",
    name: "smallType",
    component: smallType
  },
  {
    path: "/*",
    name: "404",
    component: noFound
  }
]