import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guestOnly: true
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/clear',
    name: 'Clear',
    component: () => import(/* webpackChunkName: "clear" */ '../views/Clear.vue'),
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated
  store.commit('clearFlashMessage')
  if (to.meta.guestOnly && isAuthenticated) {
    next('/')
  } else if (to.meta.requireAuth && !isAuthenticated) {
    next(`/login?from=${to.fullPath}`)
  } else {
    next()
  }
})

export default router
