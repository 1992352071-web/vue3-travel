import { createApp } from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
// import './style.css'
import App from './App.vue'
import router from './router'
import { pinia } from './stores'

// 底部导航组件引入,顶部导航栏组件引入
import { Tabbar, Empty, Loading, Tag, Cell, CellGroup, Collapse, CollapseItem, TabbarItem, Toast, Grid, GridItem, Button, Icon, NavBar, NoticeBar, Field, Popup, Picker } from 'vant';


// 创建应用实例
const app = createApp(App)
app.use(Vant)
app.use(pinia)
app.use(router)
app.mount('#app')

// 组件库引入
app.use(Tabbar);
app.use(Loading);
app.use(Collapse);
app.use(CollapseItem);
app.use(TabbarItem);
app.use(Tag);
app.use(Cell);
app.use(CellGroup);
app.use(Button);
app.use(NavBar);
app.use(NoticeBar);
app.use(Field);
app.use(Empty);
app.use(Popup);
app.use(Icon);
app.use(Picker);
app.use(Toast);
app.use(Grid);
app.use(GridItem);
