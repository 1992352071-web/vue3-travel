<template>
  <div class="spot-item">
    <!-- 景点名称 -->
    <h3 class="spot-name">{{ data.spot }}</h3>

    <!-- 游览时长 / 门票信息 -->
    <div class="spot-meta" v-if="data.duration || data.ticket">
      <van-icon name="clock-o" class="meta-icon" />
      <span v-if="data.duration">{{ data.duration }}</span>
      <span v-if="data.ticket">{{ data.ticket }}</span>
    </div>

    <!-- 交通方式 -->
    <div class="spot-meta" v-if="data.Transportation">
      <van-icon name="location-o" class="meta-icon" />
      <span>{{ data.Transportation }}</span>
    </div>

    <!-- 景点介绍 -->
    <p class="spot-intro" v-if="data.Introduction">{{ data.Introduction }}</p>
  </div>
</template>

<script setup>
// 接收父组件传入的景点数据
// 字段：spot 景点名称、duration 时长、ticket 门票、Transportation 交通、Introduction 介绍
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.spot-item {
  padding: 0 0 4px;
}

.spot-name {
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 700;
  color: #323233;
  line-height: 1.4;
}

/* 时长/门票与交通两段信息：内容短时并排一行，长时自动换到下一行 */
.spot-meta {
  display: inline-flex;
  align-items: center;
  vertical-align: top;
  margin: 0 16px 8px 0;
  font-size: 13px;
  color: #969799;
  line-height: 1.5;
}

.meta-icon {
  flex-shrink: 0;
  margin-right: 6px;
  font-size: 14px;
}

/* 同一段信息内多个内容的间距 */
.spot-meta span + span {
  margin-left: 12px;
}

.spot-intro {
  margin: 2px 0 0;
  font-size: 14px;
  color: #43454b;
  line-height: 1.7;
  text-align: justify;
}
</style>
