import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Main/home/home.vue'
import UpdateProduct from '../views/Main/product/Updateproduct.vue'
import Admin from '../views/Main/admin/Admin.vue'
import LandingPage from '../views/Main/landingpage/LandingPage.vue'
import History from '../views/Main/history/history.vue'
// import Main from '../views/Main/index.vue'
import Product from '../views/Main/product/product.vue'
import Card from '../components/_base/card.vue'
import About from '../views/About.vue'
import Login from '../views/Auth/login/login.vue'
import Register from '../views/Auth/register/register.vue'
import Store from '../store/index'
import Chart from '../components/_base/chart/chart.vue'
Vue.use(VueRouter)

const routes = [{
  // path: '/',
  // name: 'Home',
  // component: Home
  path: '/landingpage',
  name: 'LandingPage',
  component: LandingPage
},
{
  path: '/update',
  name: 'update',
  component: UpdateProduct,
  meta: { requiresAuth: true }
},
{
  path: '/login',
  name: 'login',
  component: Login,
  meta: { requiresVisitor: true }
},
{
  path: '/register',
  name: 'register',
  component: Register,
  meta: { requiresVisitor: true }
},
{
  path: '/about',
  name: 'About',
  component: About
},
{
  path: '/',
  name: 'home',
  component: Home,
  meta: { requiresAuth: true }
},
{
  path: '/admin',
  name: 'admin',
  component: Admin
},
{
  path: '/product',
  name: 'Product',
  component: Product
},
{
  path: '/card',
  name: 'Card',
  component: Card
},
{
  path: '/history',
  name: 'History',
  component: History
},
{
  path: '/chart',
  name: 'Chart',
  component: Chart
}
// {
//   path: '/home',
//   name: 'Home',
//   component: Home
//   route level code-splitting
//   this generates a separate chunk (about.[hash].js) for this route
//   which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
// },
// {
//   path: '/history',
//   name: 'History',
//   component: History
// },
// {
//   path: '/product',
//   name: 'Product',
//   component: Product
// }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!Store.getters.isLogin) {
      next({
        path: '/login'
        // query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (Store.getters.isLogin) {
      next({
        path: '/'
        // query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
