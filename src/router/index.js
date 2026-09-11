import { createRouter, createWebHistory } from 'vue-router'
import { showToast } from 'vant'
import { pinia } from '../stores'
import { useUserStore } from '../stores/user'

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
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../views/Detail.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LogIn.vue'),
    },

  ],
})

// 未登录访问需要登录的页面时：提示并跳转登录页，登录成功后回跳
router.beforeEach((to) => {
  const userStore = useUserStore(pinia)
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    showToast('请先登录')
    return { path: '/login', query: { redirect: to.fullPath } }
  }
})

export default router
