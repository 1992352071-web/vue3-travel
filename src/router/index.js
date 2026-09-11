import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn } from '../utils/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/Chat.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../views/Detail.vue'),

    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LogIn.vue'),
    },

  ],
})

// 未登录访问个人中心时跳转登录页，登录成功后回跳
router.beforeEach((to) => {
  if (to.name === 'profile' && !isLoggedIn()) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
})

export default router
