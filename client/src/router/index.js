import { createRouter, createWebHistory } from 'vue-router'

import appRoutes from './app.route'
import authRoutes from './auth.route'

// import { useStore } from 'vuex'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'text-orange-300 bg-indigo-950 mx-2 my-1',
  routes: [
    { path: '/', redirect: '/dental/' },
    { ...appRoutes },
    { ...authRoutes },
    // catch all redirect to home page
    { path: '/:pathMatch(.*)*', redirect: '/dental/' }
  ]
})

router.beforeEach(async (to) => {
  //   const store = useStore()
  //   const currentUser = store.state.auth.user
  const loggedIn = JSON.parse(localStorage.getItem('user'))
  // redirect to login page if not logged in and trying to access a restricted page
  //   const publicPages = ['/auth/login', '/account/register']
  const publicPages = ['/auth/login']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !loggedIn) {
    // authStore.returnUrl = to.fullPath
    // next('/auth/login')
    return '/auth/login'
  }
  //   else {
  //     next()
  //   }
})
