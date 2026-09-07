<template>
  <div class="chat-bubble" :class="messageClass">
    <div class="bubble-content">
      <div class="message-text" v-if="message.role === 'user'">{{ message.content }}</div>
      <div class="message-text ai-message"  v-else>{{ message.content }}</div>
    </div>
    <div class="message-time" v-if="showTime">{{ formatTime }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 单条消息对象，字段：{ id, role: 'user'|'ai', content, timestamp }
  message: {
    type: Object,
    required: true,
  },
  // 是否显示时间戳
  showTime: {
    type: Boolean,
    default: true,
  },
})

// 用户消息在右、AI 消息在左
const messageClass = computed(() => {
  return props.message?.role === 'user' ? 'user-message' : 'ai-message'
})

// 时间戳格式化：HH:mm
const formatTime = computed(() => {
  if (!props.message?.timestamp) return ''
  const d = new Date(props.message.timestamp)
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
})
</script>

<style scoped>
/* 每条消息：垂直排列，气泡在上，时间在下 */
.chat-bubble {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

/* 气泡容器：用户靠右、AI 靠左 */
.user-message {
  align-items: flex-end;
}
.ai-message {
  align-items: flex-start;
}

/* 气泡本体 */
.bubble-content {
  max-width: 75%;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 15px;
  line-height: 1.6;
  word-break: break-word;
  box-sizing: border-box;
}

/* 用户气泡：主题蓝底 + 白字 + 右上角直角 */
.user-message .bubble-content {
  background-color: #1989fa;
  color: #fff;
  border-top-right-radius: 4px;
}

/* AI 气泡：白底 + 深灰字 + 左上角直角 */
.ai-message .bubble-content {
  background-color: #fff;
  color: #323233;
  border: 1px solid #ebedf0;
  border-top-left-radius: 4px;
}

/* 纯文本内容 */
.message-text {
  white-space: pre-wrap;
}

/* 时间戳：在气泡下方，小号灰字 */
.message-time {
  margin-top: 4px;
  font-size: 12px;
  color: #969799;
  line-height: 1;
}
</style>
