<template>
  <div class="page-container">
    <van-nav-bar title="旅程详情" left-arrow @click="goBack"/>
   <div class="page-content">
    <div class="loading-container" v-if="loading">
      <van-loading  type="spinner" size="48" >正在加载中...
      </van-loading>
    </div>
    <div class="error-container" v-if="error">
      <van-empty description="加载失败">
       <van-button @click="loadRecommendation" round type="primary" class="bottom-button">重新加载</van-button>
      </van-empty>
    </div>
    <template v-else-if="tripData && tripData.success === true">
      <div class="card overview-card">
       <h2>{{tripData.city}}·{{tripData.days}}天的行程</h2>
      </div>
      <van-collapse v-model="activeDays">
       <van-collapse-item
          v-for="day in tripData.dailyItinerary"
          :key="day.day"
          :title="'第'+ day.day + '天'"
          :name="day.days">
          <!-- 每日行程安排 -->
           <div class="day-schedule">
             <div class="schedule-section">
                 <div class="section-label morning">上午</div>
                 <SpotItem :data="day.morning"/>
             </div>
             <div class="schedule-section">
                <div class="section-label afternoon">下午</div>
                 <SpotItem :data="day.afternoon"/>
             </div>
             <div class="schedule-section">
                <div class="section-label evening">晚上</div>
                 <SpotItem :data="day.evening"/>
             </div>
           </div>
 
         
        </van-collapse-item>
            <div class="budget-card">
              <div class="section-title">预算明细</div>
              <BudgetTable :data="tripData.budgetBreakdown" :total="tripData.budget"/>
             </div>
             <div class="tips-card">
              <div class="section-title">温馨提示</div>
              <ul class="tip-list">
                <li v-for="tip in tripData.tips" :key="tip">{{tip}}</li>
              </ul>
             </div>
             <div class="warnings-card">
              <div class="section-title">注意事项</div>
              <ul class="warning-list">
                <li v-for="warning in tripData.warnings" :key="warning">{{warning}}</li>
              </ul>
             </div>
      </van-collapse>

    </template>
   </div>
   <div v-if="tripData && tripData.success === true" class="detail-footer">
    <van-button type="primary" @click="goTOChat" size="large" round class="primary-button">确认行程</van-button>
   </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTravelRecommendation } from '../api/travel'
//组件引入
import SpotItem from '../components/SpotItem.vue'
import BudgetTable from '../components/BudgetTable.vue'

const route = useRoute()
const router2 = useRouter()
//加载状态
const loading = ref(false)
//错误信息
const error = ref(false)
//选中的天数
const activeDays = ref([])
const errorMessage = ref('')
//返回的推荐数据
const tripData = ref(null)

// 接收表单提交数据
const formData = reactive({
  city: '北京',
  budget: 5000,
  days: 2,
})

async function loadRecommendation() {
  error.value = false
  console.log('加载行程推荐...')
  loading.value = true
  errorMessage.value = ''

  try {
    tripData.value = await getTravelRecommendation({
      city: formData.city,
      budget: formData.budget,
      days: formData.days,
    })
  } catch (error) {
    error.value = true
    errorMessage.value =
      error.response?.data?.message || error.message || '行程推荐请求失败'
  } finally {
    loading.value = false
    //测试填充数据用
    tripData.value = {
      success: true,
      city: formData.city,
      days: formData.days,
      budget:{item: "总计",
        amount: 50000},
      budgetBreakdown :[
  {
    item: "住宿",
    amount: 1500
  },
  {
    item: "餐饮",
    amount: 1200
  },
  {
    item: "交通",
    amount: 800
  },
  {
    item: "门票",
    amount: 500
  },
  {
    item: "其他",
    amount: 1000
  }
],

      dailyItinerary: [
  {
    day: 1,
    date: "第一天",
    morning: {
      spot: "天安门广场&故宫博物院",
      duration: "3‑4小时",
      ticket: "故宫60元，天安门广场免费预约",
      Transportation: "地铁1号线到天安门东/天安门西站下车，步行抵达",
      Introduction: "天安门广场是首都北京的城市中心广场，故宫是明清两代皇家宫殿，保存大量古代建筑与珍贵文物，历史底蕴深厚。"
    },
    afternoon: {
      spot: "景山公园",
      duration: "1‑2小时",
      ticket: "2元",
      Transportation: "从故宫神武门出门步行5分钟即到",
      Introduction: "景山公园地处故宫北侧，登顶万春亭可以俯瞰故宫完整全景，是拍摄故宫全景的绝佳点位。"
    },
    evening: {
      spot: "南锣鼓巷",
      duration: "2‑3小时",
      ticket: "免费",
      Transportation: "从景山公园打车或乘坐地铁6号线南锣鼓巷站到达",
      Introduction: "老北京胡同街区，汇集特色小吃、文创小店，感受老北京市井烟火气息。"
    }
  },
  {
    day: 2,
    date: "第二天",
    morning: {
      spot: "八达岭长城",
      duration: "4‑5小时",
      ticket: "40元",
      Transportation: "德胜门乘坐877路公交，或高铁前往八达岭站",
      Introduction: "万里长城的重要段落，巍峨雄奇，群山连绵，是来北京必打卡的地标，体验古代防御工程的宏伟。"
    },
    afternoon: {
      spot: "奥林匹克公园（鸟巢、水立方）",
      duration: "2小时",
      ticket: "园区免费，场馆入内另购票",
      Transportation: "从长城返回市区，地铁8号线奥林匹克公园站下车",
      Introduction: "2008北京奥运会举办地，鸟巢、水立方现代建筑外观极具辨识度，适合拍照打卡。"
    },
    evening: {
      spot: "护国寺街",
      duration: "2小时",
      ticket: "免费",
      Transportation: "地铁6号线平安里站步行可达",
      Introduction: "老牌美食老街，可品尝豆汁、焦圈、卤煮、爆肚等地道北京风味小吃。"
    }
  },
  {
    day: 3,
    date: "第三天",
    morning: {
      spot: "颐和园",
      duration: "3‑4小时",
      ticket: "30元（旺季）",
      Transportation: "地铁4号线北宫门站下车",
      Introduction: "清代皇家园林，昆明湖、长廊、佛香阁景色优美，山水与古典园林建筑融为一体。"
    },
    afternoon: {
      spot: "圆明园",
      duration: "2‑3小时",
      ticket: "10元",
      Transportation: "颐和园打车或地铁4号线圆明园站",
      Introduction: "曾经的万园之园，留存大量历史遗址，感受厚重的历史沧桑感。"
    },
    evening: {
      spot: "王府井步行街",
      duration: "2小时",
      ticket: "免费",
      Transportation: "地铁1号线王府井站",
      Introduction: "北京知名商业步行街，商场众多，美食云集，可以采购伴手礼，结束整趟行程。"
    }
  }
  
],
tips : [
  "天安门广场与故宫均需要提前在官方小程序预约，节假日门票紧张，建议提前7天预约。",
  "故宫周一闭馆（法定节假日除外），出行前注意避开闭馆时间。",
  "八达岭长城距离市区较远，建议早出发，节假日877公交人流量大，预留充足通勤时间。",
  "北京夏季紫外线强，长城、户外景点游玩记得做好防晒，备好饮用水。",
  "颐和园、圆明园面积很大，建议穿舒适平底鞋，长时间步行比较耗体力。"
 
],
warnings:[
 "南锣鼓巷、王府井游客较多，小吃价格偏高，可以理性消费。",
  "故宫内餐饮较少，建议自带简单零食和水，景区内物价偏高。",
  "早晚温差较大，出行建议备一件薄外套，长城上风会更明显。",
  "景山公园傍晚登顶观赏故宫日落全景，拍照效果极佳。",
  "乘坐地铁优先准备乘车码，北京大部分景点地铁都可以直达，比打车更不容易堵车。"
]
    }
  }
}

onMounted(() => {
  formData.city = String(route.query.city || '北京')
  formData.budget = Number(route.query.budget) || 5000
  formData.days = Number(route.query.days) || 2
  loadRecommendation()
})
// goBack函数
function goBack() {
  router2.back()
}
// goTOChat函数
function goTOChat(){
  router2.push({name: 'chat'})
}
</script>

<style scoped>

.page-content{

padding: 16px;
}
.page-container {
  min-height: 100vh;
  padding-bottom: 70px;
  background-color: #f5f5f5;
}

/* 概览卡片 */
.card {
  background-color: #fff;
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.overview-card h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #323233;
}

/* 折叠面板卡片化 */
:deep(.van-collapse-item) {
  margin-bottom: 12px;
  border-radius: 8px;
  overflow: hidden;
}
:deep(.van-collapse-item__content) {
  padding: 12px 16px 16px;
}

/* 每日行程各时段 */
.schedule-section {
  margin-bottom: 20px;
}
.schedule-section:last-child {
  margin-bottom: 0;
}
.section-label {
  display: inline-block;
  padding: 3px 10px;
  margin-bottom: 12px;
  border-radius: 4px;
  background-color: #fcefd9;
  color: #e8942f;
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
}

.detail-content {
  padding: 24px 16px;
}

.status-message,
.recommendation {
  margin: 0;
  padding: 16px;
  color: #323233;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
}

.error-message {
  color: #ee0a24;
}

.recommendation {
  overflow-x: auto;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
}
/* 预算 / 提示 / 注意 等卡片 */
.budget-card,
.tips-card,
.warnings-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 卡片内二级标题（预算明细 / 温馨提示 / 注意事项） */
.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #323233;
  margin-bottom: 12px;
}

.tip-list,
.warning-list {
  margin: 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.8;
  color: #646566;
}

.loading-container {
 text-align: center;
 margin-top: 30px;
}
.primary-button{
  /* 居中样式 */
  margin: 0 auto;
  width: 90%;
}
.detail-footer{
  margin-top: 20px;
  text-align: center;
  margin: 0 auto;
}
</style>
