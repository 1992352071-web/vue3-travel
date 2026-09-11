import { createPinia } from 'pinia'

// 单独导出 pinia 实例，供 main.js 注册和路由守卫等非组件环境使用
export const pinia = createPinia()
