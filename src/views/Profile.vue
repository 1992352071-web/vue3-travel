<template>
  <div class="page-container">
    <van-nav-bar title="个人中心" />

    <!-- 用户信息卡片 -->
    <div class="card user-card">
      <van-image round width="64" height="64" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
      <div class="user-info">
        <div class="user-name">旅行者</div>
        <div class="user-desc">世界那么大，一起去看看</div>
      </div>
    </div>

    <!-- 旅行数据统计 -->
    <div class="card stat-card">
      <div class="stat-item">
        <div class="stat-num">{{ stats.trips }}</div>
        <div class="stat-label">旅行次数</div>
      </div>
      <div class="stat-item">
        <div class="stat-num">{{ stats.cities }}</div>
        <div class="stat-label">到过城市</div>
      </div>
      <div class="stat-item">
        <div class="stat-num">{{ stats.days }}</div>
        <div class="stat-label">旅行天数</div>
      </div>
    </div>

    <!-- 功能菜单 -->
    <div class="card menu-card">
      <van-cell
        v-for="item in menuList"
        :key="item.title"
        :title="item.title"
        :icon="item.icon"
        is-link
        @click="onMenuClick(item)"
      />
    </div>

    <!-- 退出登录 -->
    <div class="logout-btn">
      <van-button type="primary" size="large" round @click="onLogout">退出登录</van-button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { showToast, showConfirmDialog } from 'vant'

// 旅行统计数据（示例数据）
const stats = reactive({
  trips: 12,
  cities: 8,
  days: 36
})

// 功能菜单
const menuList = [
  { title: '我的行程', icon: 'orders-o' },
  { title: '我的收藏', icon: 'star-o' },
  { title: '旅行足迹', icon: 'location-o' },
  { title: '设置', icon: 'setting-o' }
]

// 菜单点击事件
const onMenuClick = (item) => {
  showToast(`${item.title}功能开发中`)
}

// 退出登录事件
const onLogout = () => {
  showConfirmDialog({
    title: '提示',
    message: '确定要退出登录吗？'
  })
    .then(() => {
      showToast('已退出登录')
    })
    .catch(() => {})
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 40px;
}
.card {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin: 0 16px 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.user-card {
  display: flex;
  align-items: center;
  gap: 16px;
}
.user-info {
  min-width: 0;
}
.user-name {
  font-size: 20px;
  font-weight: 600;
  color: #323233;
  margin-bottom: 6px;
}
.user-desc {
  font-size: 14px;
  color: #969799;
}
.stat-card {
  display: flex;
  padding: 20px 16px;
}
.stat-item {
  flex: 1;
  text-align: center;
}
.stat-num {
  font-size: 20px;
  font-weight: 600;
  color: #323233;
  margin-bottom: 6px;
}
.stat-label {
  font-size: 13px;
  color: #969799;
}
.menu-card {
  padding: 0;
  overflow: hidden;
}
.logout-btn {
  margin: 24px 16px 0;
}
</style>
