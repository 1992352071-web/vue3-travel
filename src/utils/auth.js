import { ref } from 'vue'

const TOKEN_KEY = 'travel_user'

function readUser() {
  try {
    return JSON.parse(localStorage.getItem(TOKEN_KEY) || 'null')
  } catch {
    return null
  }
}

// 模块级登录态：router 守卫与页面组件共享，刷新后从 localStorage 恢复
const currentUser = ref(readUser())

export function isLoggedIn() {
  return !!currentUser.value
}

export function login(user) {
  currentUser.value = user
  localStorage.setItem(TOKEN_KEY, JSON.stringify(user))
}

export function logout() {
  currentUser.value = null
  localStorage.removeItem(TOKEN_KEY)
}
