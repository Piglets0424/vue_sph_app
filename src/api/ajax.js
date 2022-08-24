// 对axios进行二次封装
import axios from 'axios';
// 引入nprogress进度条
import nprogress from 'nprogress';
// start()done()进度条开始与结束
// 引入进度条样式
import 'nprogress/nprogress.css';

import store from '@/store';

//利用axios对象的方法create，去创建一个axios实例
const $http = axios.create({
  //配置对象
  //基础路径，发请求的时候，路径当中会出现api
  baseURL: '/api',
  //代表请求超时的时间5S
  timeout: 5000,
});
//请求拦截器:在发请求之前，请求拦截器可以检测到
$http.interceptors.request.use(
  (config) => {
    if (store.state.detail.uuid_token) {
      config.headers.userTempId = store.state.detail.uuid_token;
    }
    // 携带token
    if (store.state.user.token) {
      config.headers.token = store.state.user.token
    }
    // 进度条开始
    nprogress.start();
    //config:配置对象，对象里面有一个属性很重要，headers请求头
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
//相应拦截器
$http.interceptors.response.use(
  (res) => {
    // 进度条结束
    nprogress.done();
    //成功的回调函数:服务器相应数据回来以后，响应拦截器可以检测到
    return res.data;
  },
  (error) => {
    //响应失败的回调函数
    return Promise.reject(new Error('faile'));
  }
);

export default $http;
