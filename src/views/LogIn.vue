<template>
  <div class="login-page">
    <!-- 夜空背景装饰 -->
    <div class="sky">
      <span
        v-for="i in 26"
        :key="i"
        class="star"
        :style="starStyle(i)"
      />
      <div class="sun" />
      <div class="cloud cloud-1" />
      <div class="cloud cloud-2" />
      <div class="cloud cloud-3" />
      <svg class="mountain mountain-back" viewBox="0 0 375 150" preserveAspectRatio="none">
        <path d="M0 150 L0 94 L46 56 L88 86 L128 40 L172 78 L214 54 L258 90 L300 60 L340 94 L375 72 L375 150 Z" />
      </svg>
      <svg class="mountain mountain-front" viewBox="0 0 375 120" preserveAspectRatio="none">
        <path d="M0 120 L0 80 L52 44 L98 72 L150 24 L205 76 L256 48 L306 82 L375 46 L375 120 Z" />
      </svg>
    </div>

    <!-- 返回按钮 -->
    <div class="back-btn" @click="goBack">
      <van-icon name="arrow-left" size="20" />
    </div>

    <!-- 品牌区 -->
    <div class="brand">
      <div class="brand-badge">旅</div>
      <h1 class="brand-title">智能旅游助手</h1>
      <p class="brand-slogan">世界那么大，一起去看看</p>
    </div>

    <!-- 登机牌登录卡 -->
    <div class="ticket">
      <div class="ticket-main">
        <div class="ticket-head">
          <span class="ticket-type">登机牌 · BOARDING PASS</span>
          <span class="ticket-stamp" :class="{ show: logged }">
            <van-icon name="success" size="16" />
          </span>
        </div>

        <div class="ticket-route">
          <div class="route-item">
            <span class="route-label">FROM 未登录</span>
            <span class="route-code">NOW</span>
          </div>
          <div class="route-flight"><span>✈</span></div>
          <div class="route-item route-to">
            <span class="route-label">TO 目的地</span>
            <span class="route-code">PROFILE</span>
          </div>
        </div>

        <van-form @submit="onSubmit">
          <div class="ticket-fields">
            <van-field
              v-model="username"
              name="username"
              label="账号"
              placeholder="请输入账号"
              left-icon="contact-o"
              autocomplete="off"
              :rules="[{ required: true, message: '请输入账号' }]"
            />
            <van-field
              v-model="password"
              type="password"
              name="password"
              label="密码"
              placeholder="请输入密码"
              left-icon="lock"
              clearable
              :rules="[
                { required: true, message: '请输入密码' },
                { pattern: /^\S{6,}$/, message: '密码至少 6 位' },
              ]"
            />
          </div>

          <van-button
            class="login-btn"
            type="primary"
            native-type="submit"
            :loading="submitting"
            loading-text="登机中..."
            round
            block
          >
            立即登机
          </van-button>
        </van-form>

        <div class="ticket-register" @click="onRegister">还没有账号？立即注册</div>
      </div>

      <!-- 票根 -->
      <div class="ticket-stub">
        <div class="barcode" />
        <div class="stub-note">演示环境：任意账号密码均可登录 · 登录状态保存在本机</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import { isLoggedIn, login } from '../utils/auth'

const route = useRoute()
const router = useRouter()

const username = ref('')
const password = ref('')
const submitting = ref(false)
// 登录成功时盖上的"验讫"印章
const logged = ref(false)

// 登录成功后的去向
const redirectPath = route.query.redirect || '/profile'

// 生成星星的确定性随机位置，避免模板里写死
const starStyle = (i) => {
  const left = (i * 53) % 100
  const top = (i * 37) % 28
  const size = 1 + (i % 3)
  return {
    left: `${left}%`,
    top: `${top}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${(i % 5) * 0.6}s`,
  }
}

const onSubmit = async () => {
  submitting.value = true
  // 模拟登录请求耗时
  await new Promise((resolve) => setTimeout(resolve, 600))
  login({ username: username.value })
  submitting.value = false
  logged.value = true
  showToast('登录成功')
  
  // 稍作停留展示盖章动画后跳转
  setTimeout(() => {
    router.replace(redirectPath)
  }, 500)
}

const onRegister = () => {
  showToast('注册功能开发中')
}

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.replace('/')
  }
}

onMounted(() => {
  // 已登录则直接进入个人中心
  if (isLoggedIn()) {
    router.replace(redirectPath)
  }
})
</script>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  padding: 88px 0 48px;
  background: linear-gradient(180deg, #141b33 0%, #22345c 34%, #3d5f86 56%, #c46f4d 78%, #2a3d5c 100%);
  overflow: hidden;
}

/* ---------- 夜空装饰 ---------- */
.sky {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.star {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 246, 224, 0.9);
  animation: twinkle 3s ease-in-out infinite;
}
@keyframes twinkle {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 1; }
}

.sun {
  position: absolute;
  left: 50%;
  bottom: 24%;
  width: 96px;
  height: 96px;
  margin-left: -48px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffd9a0 0%, #f2a35e 55%, rgba(242, 163, 94, 0) 72%);
  box-shadow: 0 0 90px rgba(242, 163, 94, 0.5);
  animation: sun-rise 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s backwards;
}
@keyframes sun-rise {
  from { opacity: 0; transform: translateY(42px) scale(0.8); }
  to { opacity: 1; transform: none; }
}

.cloud {
  position: absolute;
  border-radius: 50%;
  filter: blur(7px);
  animation: drift linear infinite alternate;
}
.cloud-1 {
  left: -12%;
  bottom: 34%;
  width: 150px;
  height: 34px;
  background: rgba(255, 220, 180, 0.22);
  animation-duration: 26s;
}
.cloud-2 {
  left: 30%;
  bottom: 40%;
  width: 110px;
  height: 26px;
  background: rgba(255, 255, 255, 0.1);
  animation-duration: 34s;
  animation-delay: 4s;
}
.cloud-3 {
  left: 55%;
  bottom: 30%;
  width: 170px;
  height: 38px;
  background: rgba(255, 210, 170, 0.16);
  animation-duration: 30s;
  animation-delay: 8s;
}
@keyframes drift {
  from { transform: translateX(-20px); }
  to { transform: translateX(60px); }
}

.mountain {
  position: absolute;
  left: 0;
  width: 100%;
  animation: mountain-in 1s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}
.mountain-back {
  bottom: 0;
  height: 170px;
  fill: #2a3d5c;
  opacity: 0.85;
  animation-delay: 0.15s;
}
.mountain-front {
  bottom: 0;
  height: 120px;
  fill: #16243f;
  animation-delay: 0.3s;
}
@keyframes mountain-in {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: none; }
}

/* ---------- 返回按钮 ---------- */
.back-btn {
  position: absolute;
  top: 20px;
  left: 18px;
  z-index: 10;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(6px);
  color: #fff;
  cursor: pointer;
}

/* ---------- 品牌区 ---------- */
.brand {
  position: relative;
  z-index: 1;
  text-align: center;
  animation: brand-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}
@keyframes brand-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}
.brand-badge {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 211, 156, 0.55);
  background: rgba(255, 255, 255, 0.08);
  color: #ffd39c;
  font-family: Georgia, 'STZhongsong', 'Songti SC', serif;
  font-size: 24px;
  box-shadow: 0 0 26px rgba(242, 163, 94, 0.35);
}
.brand-title {
  margin: 0 0 10px;
  color: #fff;
  font-family: Georgia, 'STZhongsong', 'Songti SC', serif;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 8px;
  text-indent: 8px;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.35);
}
.brand-slogan {
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 13px;
  letter-spacing: 3px;
}

/* ---------- 登机牌 ---------- */
.ticket {
  position: relative;
  z-index: 1;
  width: calc(100% - 48px);
  max-width: 380px;
  margin: 40px auto 0;
  background: linear-gradient(180deg, #fffdf7 0%, #fdf7ec 100%);
  border-radius: 14px;
  box-shadow: 0 26px 64px rgba(6, 14, 32, 0.55);
  animation: ticket-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.4s backwards;
}
@keyframes ticket-in {
  from { opacity: 0; transform: translateY(40px) scale(0.96); }
  to { opacity: 1; transform: none; }
}

.ticket-main {
  padding: 18px 20px 14px;
}

.ticket-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.ticket-type {
  color: #22303f;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
}
.ticket-stamp {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid #e5643e;
  color: #e5643e;
  opacity: 0;
  transform: rotate(-24deg) scale(1.7);
  transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.ticket-stamp.show {
  opacity: 1;
  transform: rotate(-12deg) scale(1);
}

/* 航线信息 */
.ticket-route {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1px dashed #e2d8c2;
  margin-bottom: 4px;
}
.route-item {
  min-width: 0;
}
.route-to {
  text-align: right;
}
.route-label {
  display: block;
  margin-bottom: 6px;
  color: #8a877c;
  font-size: 11px;
  letter-spacing: 1px;
}
.route-code {
  color: #22303f;
  font-family: Georgia, 'STZhongsong', 'Songti SC', serif;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 3px;
}
.route-flight {
  flex: 1;
  position: relative;
  height: 22px;
}
.route-flight::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  border-top: 1px dashed #c9bfa8;
}
.route-flight span {
  position: absolute;
  right: -2px;
  top: 50%;
  transform: translateY(-54%) rotate(-18deg);
  color: #e5643e;
  font-size: 14px;
}

/* 表单字段 */
.ticket-fields {
  margin: 4px 0 8px;
}
.ticket-fields :deep(.van-cell) {
  background: transparent;
  padding: 14px 4px;
}
.ticket-fields :deep(.van-cell::after) {
  left: 4px;
  right: 4px;
  border-bottom: 1px dashed #e2d8c2;
}
.ticket-fields :deep(.van-field__label) {
  color: #22303f;
  font-weight: 600;
  letter-spacing: 3px;
}

.login-btn {
  margin-top: 10px;
  border: none;
  background: linear-gradient(90deg, #2f6fed 0%, #12b0a8 100%);
  box-shadow: 0 8px 20px rgba(47, 111, 237, 0.35);
  font-weight: 600;
  letter-spacing: 8px;
  text-indent: 8px;
}
.login-btn:active {
  transform: scale(0.98);
}

.ticket-register {
  margin-top: 16px;
  text-align: center;
  color: #9a958a;
  font-size: 13px;
  cursor: pointer;
}

/* ---------- 票根 ---------- */
.ticket-stub {
  position: relative;
  padding: 16px 20px 18px;
  border-top: 2px dashed #ded3bb;
}
/* 撕票线两侧的半圆缺口 */
.ticket-stub::before,
.ticket-stub::after {
  content: '';
  position: absolute;
  top: -14px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #3d5f86;
}
.ticket-stub::before {
  left: -14px;
}
.ticket-stub::after {
  right: -14px;
}

.barcode {
  height: 36px;
  opacity: 0.75;
  background: repeating-linear-gradient(
    90deg,
    #22303f 0 2px,
    transparent 2px 5px,
    #22303f 5px 6px,
    transparent 6px 10px,
    #22303f 10px 13px,
    transparent 13px 17px
  );
}
.stub-note {
  margin-top: 12px;
  color: #a29b8c;
  font-size: 12px;
  text-align: center;
  letter-spacing: 1px;
}
</style>
