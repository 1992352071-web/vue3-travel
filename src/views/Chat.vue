<template>
  <div class="page-container chat-page">
 <div class="page-header">
  <van-nav-bar
  title="AI旅游助手"
  left-text="返回"
  left-arrow
  style="height:46px"
  @click-left="onBack"
  />
 </div>
 <div class="chat-container" ref="chatContainer">
  <!-- 对话默认显示 -->
   <div class="chat-empty" v-if="chatMessages.length === 0">
    <van-empty description="开始与ai助手对话" />
    <div class="quick-question">
      <div class="quick-title">常见问题</div>
      <van-tag class="quick-tag"
       mark type="primary" 
       v-for="question in commonQuestions" :key="question"
       
       >{{ question }}</van-tag>
    </div>

   </div>
   <!-- 有对话内容时显示 -->
    <div class="message-list" v-else>
      <ChatBubble v-for="message in chatMessages" :key="message.id" :message="message" />
      <div v-if="isStreaming" class="streaming-indicator">
         <van-Loading type="spinner" size="20px" />
           <span>AI正在思考中...</span>
      </div>
    </div>
 </div>
  <div class="chat-input-area">
    <div class="input-wrapper">
     <van-field
    v-model="inputMessage"
    :disabled="isStreaming"
    placeholder="请输入您的问题"
    class="chat-field"
    />
     <van-button
        class="send-btn"
        :disabled="!inputMessage.trim()"
        size="small"
        type="primary"
        round
        @click="sendMessage"
      >发送</van-button>
    </div>
  </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchStream } from '../utils/request'
import { showToast } from 'vant'
import ChatBubble from './ChatBubble.vue'
// 对话容器
const chatContainer = ref(null)

const scrollToBottom = () => {
  chatContainer.value.scrollTop = chatContainer.value.scrollHeight
}

// 对话消息
const chatMessages = ref([])

// 常见问题
const commonQuestions = ref([
  `北京有哪些必去的景点?`,
'上海美食推荐',
'成都三日游攻略',
'如何选择旅行保险?'
])



const router = useRouter()
//用户输入框内容
const inputMessage = ref('')
//是否正在流式传输
const isStreaming = ref(false)
// 对话消息
const messages = ref([])
// 整体字符串消息
const fullResponse = ref('')



//返回方法
const onBack = () => {
  router.back()
}
//发送消息
const sendMessage = () => {
 const msg = inputMessage.value.trim()
if (!msg || isStreaming.value) {
return}
 //添加用户消息
 addUserMessage(msg)
const  userMsg=inputMessage.value
 //清空输入框内容
 inputMessage.value = ''
 //获取流式响应
 fechAiResponse(userMsg)
 
}
//添加用户消息
const addUserMessage = (msg) => {
messages.value.push ({
id: Date.now() + 1,
role: 'user',
content: msg,
timestamp: new Date().toISOString()
})}
//获取流式响应
const fechAiResponse = (userMsg) => {
  isStreaming.value = true
  //添加ai返回的消息
        messages.value.push({
           id: Date.now() + 2,
           role: 'ai',
           content: '',
           timestamp: new Date().toISOString()
           })
    //整体字符串消息
  fetchStream('chat', 
  {
    message: userMsg,
  },
  (chunk)=>{
      fullResponse += chunk
      //AI正在回复的消息
         const lastMsg = messages.value[messages.value.length - 1]
       if (lastMsg && lastMsg.role === 'ai') {
          lastMsg.content = fullResponse}
          scrollToBottom()
  },
  ()=>{
//ai回复完成
isStreaming.value = false

  },
  (errorMsg)=>{
const lastMsg = messages.value[messages.value.length - 1]
if (lastMsg && lastMsg.role ==='ai'){
    lastMsg.content=`抱歉,AI发生错误:${errorMsg}`
 }

isStreaming. value = false
    showToast(`抱歉,AI发生错误,请稍后重试`
   )
    scrollToBottom()
  }
)
}

</script>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
  box-sizing: border-box;
}

/* 聊天消息区：独立滚动，底部留足 fixed 输入区 + tabbar 的空间 */
.chat-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  padding-bottom: 140px;
  box-sizing: border-box;
}

/* 底部固定输入区：在 tabbar(50px) 上方，紧贴 */
.chat-input-area {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  z-index: 100;
  padding: 10px 12px;
  background-color: #fff;
  border-top: 1px solid #ebedf0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
}

/* 输入框 + 按钮 一行布局 */
.input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* van-field 填充剩余空间，去掉默认边框 + 加圆角浅灰背景 */
:deep(.chat-field) {
  flex: 1;
  background-color: #f5f6f7;
  border-radius: 20px;
  padding: 4px 12px;
  box-sizing: border-box;
}
:deep(.chat-field .van-cell),
:deep(.chat-field .van-field__control) {
  background-color: transparent;
}
:deep(.chat-field .van-cell::after) {
  display: none; /* 去掉 van-field 默认下划线 */
}

.send-btn {
  flex-shrink: 0;
  min-width: 56px;
}
/* 空状态整体：垂直排列居中 */
.chat-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
}

/* 压缩 van-empty 默认上下留白 */
:deep(.van-empty) {
  padding: 24px 0 8px;
}

/* 常见问题区：标题占满一行，标签两列网格排布 */
.quick-question {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
}

/* 常见问题标题：横跨两列的小号灰字 */
.quick-title {
  grid-column: 1 / -1;
  margin: 0;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: #969799;
}

/* 问题标签：浅灰胶囊，在各列内居中 */
:deep(.van-tag.quick-tag) {
  margin: 0;
  justify-self: center;
  padding: 7px 14px;
  border-radius: 999px;
  background-color: #f2f3f5;
  color: #323233;
  font-size: 13px;
  cursor: pointer;
}

</style>
