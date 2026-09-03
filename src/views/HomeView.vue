<template>
 <div class="page-container">
   <van-nav-bar title="智能旅游助手" />

<div class="page-content">
 <van-notice-bar
  left-icon="volume-o"
  text="轮回之后依然决定去爱。去树海旅游；背负爱太多的罪人们幸福的悲鸣声今天也听得见。"
/>
</div>
<div class="card">
  <div class="section-title">旅程规划</div>
   <van-field 
   label="选择目的地"
     v-model="formData.city"
   @click="showCityPicker = true"
   readonly="true"
   is-link="true"
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
<div class="card">
   <div class="section-title">快捷入口</div>
   
</div>
<div class="card">
   <div class="section-title">热门目的地</div>
</div>
<van-popup v-model:show="showCityPicker"
 round="button" 
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
margin-bottom: 12px;
box-shadow: 0 2px 8px Orgba(0, 0, 0, 0.05);
}
.section-title {
font-size: 18px;
font-weight: 600;
color:#323233;
margin-bottom: 12px;
}
</style>
