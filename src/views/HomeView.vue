<template>
 <div class="page-container">
   <van-nav-bar title="智能旅游助手" />

<div class="page-content">
 <van-notice-bar
  left-icon="volume-o"
  text="这是一个智能旅游助手，您可以根据您的需求规划您的旅程。请输入您的需求，我会根据您的需求规划您的旅程。"
/>
</div>
<div class="card">
  <div class="section-title">旅程规划</div>
   <van-field 
   label="选择目的地"
     v-model="formData.city"
   @click="showCityPicker = true"
   readonly
   is-link
   placeholder="请选择目的地"
   style="background-color: #f7f7f7; border-radius: 8px; margin-bottom: 8px;"
     />
  <van-field 
   label="预算（元）"
    v-model="formData.budget"
   placeholder="请输入预算"
   style="background-color: #f7f7f7; border-radius: 8px; margin-bottom: 8px;"
     />
      <van-field 
   label="旅行天数"
    v-model="formData.days"
   placeholder="请输入旅行天数"
   style="background-color: #f7f7f7; border-radius: 8px; margin-bottom: 8px;"
     />
     <van-button type="primary" size='large' round @click="handerSumbmit">提交</van-button>
</div>
<div class="card quick-card">
   <div class="section-title">快捷入口</div>
   <div class="quick-grid">
    <div class="quick-entry" @click="goPage('/chat')">
      <van-icon class="quick-icon" size="30" name="chat-o" />
      <span>AI 对话</span>
    </div>
    <div class="quick-entry" @click="goPage('/profile')">
      <van-icon class="quick-icon" size="30" name="contact-o" />
      <span>我的</span>
    </div>
   </div>
</div>
<div class="card destination-card">
   <div class="section-title">热门目的地</div>

   <van-grid :border="false" :gutter="12" :column-num="4">
  <van-grid-item @click="selectCity(city)" v-for="city in hotCities" :key="city"   >
    <div class="city-tage" :class="{active:formData.city === city}">{{city}}</div>
  </van-grid-item>
</van-grid>

</div>
<van-popup v-model:show="showCityPicker"
 round
 position="bottom">
  <van-picker
  
  title="选择目的地"
  :columns="columns"
  @confirm="onConfirm"
  @cancel="onCancel"
 
/>

</van-popup>
 </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant';




const router = useRouter()
// 表单数据
const formData = reactive({
  "city":"",
"budget": null,
"days": null
})
let showCityPicker = ref(false)
// picker数据
const allCities =[

'北京','上海','广州','深圳','成都','杭州','西安','重庆',
'南京','武汉','苏州','长沙','天津','郑州','济南','青岛',
'大连','沈阳','哈尔滨','长春','福州','厦门','南昌','合肥',
'昆明','贵阳','南宁','桂林','海口','三亚','丽江','大理',
'西安','兰州','乌鲁木齐','拉萨','呼和浩特','太原','石家庄'
]
const columns = allCities.map(item=>({text:item,value:item}))

// 热门城市数据
const hotCities=['北京','上海','广州','深圳','成都','杭州','西安','重庆']
// picker方法
const onConfirm = ({selectedOptions}) => {
     console.log(selectedOptions[0])
     formData.city = selectedOptions[0].value
     showCityPicker.value = false
    };
const onCancel = () => {
      showCityPicker.value = false
    };
// 提交表单事件
const handerSumbmit = () => {
  console.log(formData)
  // 校验表单数据
  if(!formData.city){
    showToast('请选择目的地')
    return
  }
  if(!formData.budget||formData.budget<=100){
    showToast('预算不能低于100元')
    return
  }
  if(!formData.days||formData.days<1||formData.days>30){
    showToast('旅行天数要在1天到30天之间')
    return
  }
  // 提交表单
  console.log(formData)
  router.push(
    {
      path:'/detail',
        query: {
        city: formData.city,
        budget: formData.budget,
        days: formData.days
      }
    }
  )

}
// 快捷入口跳转函数
function goPage(path) {
  router.push(path)
}
// 选择城市方法
function selectCity(city) {
  formData.city = city
  showCityPicker.value = false
}
</script>


<style scoped>
.page-container {
  min-height: 100vh;
background-color: #f5f5f5;
padding-bottom: 70px;
}
.page-content {
  padding: 16px;
}
.card {
background-color: #fff;
border-radius: 8px;
padding: 16px;
margin: 0 16px 12px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.section-title {
font-size: 18px;
font-weight: 600;
color:#323233;
margin-bottom: 12px;
}
.quick-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.quick-entry {
  min-width: 0;
  min-height: 108px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #646566;
  font-size: 15px;
}
.quick-icon {
  margin-bottom: 10px;
  color: #323233;
  font-size: 30px;
}
.destination-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}
.destination-item {
  min-width: 0;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.destination-pill {
  max-width: calc(100% - 12px);
  min-width: 44px;
  padding: 7px 10px;
  overflow: hidden;
  color: #646566;
  background-color: #f7f8fa;
  border-radius: 18px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.destination-pill.is-active {
  color: #fff;
  background-color: #4388f4;
}
@media (max-width: 359px) {
  .destination-grid {
    gap: 6px;
  }

  .destination-pill {
    min-width: 40px;
    padding-inline: 7px;
    font-size: 13px;
  }
}
.city-tage{

  padding: 8px 12px;
border-radius: 16px;
font-size: 14px;
color: #666;
background-color: #f7f8fa;
transition: all 0.3s;
}
.active{
 background-color: #007AFF;
color: #fff;


}
</style>
