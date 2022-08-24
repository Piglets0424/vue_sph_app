import Vue from 'vue';
import App from './App.vue';
Vue.config.productionTip = false;

import router from '@/router';
import store from './store';

import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
// 注册全局组件 第一个参数是组件名字 第二个参数是哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

// 引入elementui
import { MessageBox } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入加载图片
import load from '@/assets/1.gif';
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  // 默认图片
  loading: load,
});

// 引入表单验证插件
import '@/plugins/validate'

// 引入mock
import '@/mock/mockServe';
// 引入swiper样式
import 'swiper/css/swiper.css';

import * as API from '@/api';

new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this; //安装全局事件总线，$bus就是当前应用的vm
    Vue.prototype.$API = API;
  },
}).$mount('#app');
