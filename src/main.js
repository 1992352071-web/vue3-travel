import { createApp } from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
// import './style.css'
import App from './App.vue'
import router from './router'

// 底部导航组件引入,顶部导航栏组件引入
import { Tabbar, TabbarItem, NavBar, NoticeBar, Field, Popup } from 'vant';


// 创建应用实例
const app = createApp(App)
app.use(Vant)
app.use(router)
app.mount('#app')

// 组件库引入
app.use(Tabbar);
app.use(TabbarItem);
app.use(NavBar);
app.use(NoticeBar);
app.use(Field);
