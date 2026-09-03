<template>
  <main class="app-content">
    <RouterView />
  </main>
  <van-tabbar v-model="active">
  <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item to="/chat" icon="chat-o">对话</van-tabbar-item>
  <van-tabbar-item to="/profile" icon="contact-o">我的</van-tabbar-item>
</van-tabbar>

</template>

<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<style scoped>

</style>
