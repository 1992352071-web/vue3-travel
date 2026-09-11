import { defineStore } from 'pinia'

const TOKEN_KEY = 'travel_user'

function readUser() {
  try {
    return JSON.parse(localStorage.getItem(TOKEN_KEY) || 'null')
  } catch {
    return null
  }
}

// 用户登录信息：路由守卫与页面组件共享，刷新后从 localStorage 恢复
export const useUserStore = defineStore('user', {
  state: () => ({
    user: readUser(),
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    username: (state) => state.user?.username || '',
  },
  actions: {
    login(user) {
      this.user = user
      localStorage.setItem(TOKEN_KEY, JSON.stringify(user))
    },
    logout() {
      this.user = null
      localStorage.removeItem(TOKEN_KEY)
    },
  },
})
