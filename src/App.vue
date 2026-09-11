<template>
  <main class="app-content">
    <!-- KeepAlive 缓存首页和对话页：切换路由时组件不销毁，表单数据与 AI 回复状态保留 -->
    <RouterView v-slot="{ Component }">
      <KeepAlive include="Chat">
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
  </main>
  <!-- 登录页不显示底部导航 -->
  <van-tabbar v-if="route.path !== '/login'" v-model="active">
  <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item to="/chat" icon="chat-o">对话</van-tabbar-item>
  <van-tabbar-item to="/profile" icon="contact-o">我的</van-tabbar-item>
</van-tabbar>

</template>

<script setup>
import { ref, watch } from 'vue'
import {useRoute} from 'vue-router'


const route = useRoute()
const active = ref(0)

// 根据当前路由同步底部导航高亮（登录成功跳转 profile 后高亮"我的"）
watch(
  () => route.path,
  (path) => {
    if (path.startsWith('/profile')) active.value = 2
    else if (path.startsWith('/chat')) active.value = 1
    else active.value = 0
  },
  { immediate: true }
)
</script>

<style scoped>

</style>
