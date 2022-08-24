# 尚品汇

### 项目准备

#### 浏览器自动打开

---`vue.config.jsn`配置

```json
devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
  },
```

#### 关闭eslint校验功能

---`vue.config.js`文件配置`lintOnSave:false`

### 项目路由分析

#### 路由组件

- Home首页路由组件
- Search路由组件
- Login登录路由组件
- Refister注册路由组件

#### 非路由组件

- Header（首页、搜索页）
- Footer（首页、搜索页） 登录注册页没有

### 路由组件搭建

pages（views）文件夹存放路由组件

components文件夹存放非路由文件 全局组件

路由配置一般放置在router文件夹下

### 路由重定向

`{ path: '*', redirect: '/home' },`

### footer显示与隐藏

根据路由元信息meta中配置字段来判断footer组件的显示与隐藏

### 路由传递参数

当传递参数为**对象**形式且为**params**参数时需要将路由命名

params参数路径需要占位符接收	占位符后加 **?** 说明该参数可以省略

### 重写push replace方法

解决编程式路由跳转到当前路由且参数不变时(多次点击) 抛出**NavigationDuplicated**错误警告问题(并不影响程序)

```js
// 先将VueRouter原型对象的push replace保存一份
let originPush = VueRouter.prototype.push;
let originReplcae = VueRouter.prototype.replace;

// 重写push|replace
// 第一个参数 跳转路径 参数
// 第二个参数 成功回调
// 第三个参数 失败回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplcae.call(this, location, resolve, reject);
  } else {
    originReplcae.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
```

### 模块组件拆分

- 先完成静态页面
- 拆分静态组件
- 获取服务器数据进行展示
- 完成动态业务

### 全局组件

组件在多个页面中使用时，可以注册为全局组件

好处：只需要注册一次，就可以在项目任意地方使用

在`main.js`文件中注册全局组件

```js
// 注册全局组件
// 第一个参数是组件名字 第二个参数是哪一个组件
Vue.component(TypeNav.name,TypeNav)
```

### 使用postman进行接口测试

### axios二次封装

请求拦截器：在发送请求前处理一些业务

响应拦截器：当服务器返回数据后进行事件处理

```js
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
    //成功的回调函数:服务器相应数据回来以后，响应拦截器可以检测到
    return res.data;
  },
  (error) => {
    //响应失败的回调函数
    return Promise.reject(new Error('faile'));
  }
);
```

### API接口统一管理

小项目可以在组件的生命周期中发送请求

大项目要进行统一管理 在api文件夹下新建index.js文件

### 跨域问题

协议、域名、端口号不同的请求

处理方法：JSONP、CROS、代理服务器

```js
 proxy: {
      // 匹配所有以 '/api'开头的请求路径
      '/api': {
        // 代理目标的基础路径
        target: 'http://gmall-h5-api.atguigu.cn',
      },
    },
```

### nprogress进度条使用

npm安装后

```js
// 引入nprogress进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
```

```js
nprogress.start()	// 进度条开始
nprogress.done()	// 进度条结束
```

可以在样式文件中修改颜色

### vuex状态管理库

使用模块化开发

```js
//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

import testOptions from './test'

//创建并暴露store
export default new Vuex.Store({
	modules:{
        testOptions
	}
})
```

```js
export default {
  // 开启命名空间
  namespaced: true,
  //准备actions对象——响应组件中用户的动作
  actions: {},
  //准备mutations对象——修改state中的数据
  mutations: {},
  //准备state对象——保存具体的数据
  state: {},
  //数据需要经过加工后再使用时 简化数据
  getters: {},
};
```

### 完成TypeNav组件

#### 三级联动数据获取

#### 动态背景颜色

两种方法可实现css或js

这里采用js

### 节流与防抖

节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发

防抖：前面的所有触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续触发只会触发一次

#### lodash插件 

封装了防抖与节流的业务	（脚手架已经引入该插件）

`_.debounce() `防抖函数 		`_.throttle()` 节流函数		

回调必须用普通函数 否则this指向会有问题

### 三级联动路由跳转与传参

声名式导航有卡顿现象

最好的解决方案：编程式导航+事件的委派

需解决的问题：点击的是否是a标签 是哪一级标签	获取的参数

使用自定义属性 将子节点a标签在定义属性	event.target节点标签  dataset属性可以获取自定义属性和属性值

### search组件的typeNav组件

列表默认隐藏

通过`this.$route.path.includes('/search')`来判断是否含有`'/search'`字符来确定隐藏与显示

过渡动画	过渡动画的前提是组件必须有v-if|v-show指令才能进行过渡动画

```css
 // 过渡动画
    // 进入起点 离开终点
    .sort-enter,
    .sort-leave-to {
      opacity: 0;
      height: 0px;
    }
    // 进入终点 离开起点
    .sort-enter-to,
    .sort-leave {
      opacity: 1;
      height: 461px;
    }
    // 进入过程 离开过程
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.2s;
    }
```

### 三级联动组件优化

将typeNav组件中三级联动数据请求放在根组件中	让其只发送一次请求

### 合并query、params参数

在跳转之前将其携带

### home首页

#### ListContainer组件

##### 模拟数据 mock插件

##### mock使用

- 新建mock文件夹
- 准备json数据----不能有空格
- 将需要的图片放在public文件夹下
- 通过`mockServe.js`文件实现模拟数据
- 将`mockServe.js`引入入口文件

#### banner轮播图

swiper插件，安装5版本

不能放在mounted钩子中因为此时页面结构不完整

解决方案：watch属性+nextTick

```this.$nextTick(回调函数)```在下一次 DOM 更新结束后执行其指定的回调。

### floor组件

获取mock数据

数据请求应该放在floor组件的父组件中 用来v-for遍历该组件

父子组件通信	props参数

这里的轮播图可以直接放在mounted钩子中	因为此时页面已经存在结构了

### 将轮播图注册为全局组件

将轮播图统一格式使用watch属性监听

### Search组件的开发

- 静态页面————>静态组件
- 发送请求
- vuex
- 组件获取数据 渲染数据

vuex数据要经过getters进行加工

#### 合并对象

Object.assign(target,)把后面的合并到目标对象中，目标对象就是合并之后的结果

#### 监听路由变化再次发送请求

在每次请求后将请求id修改为undefined  以便下次请求    发送请求时 将会不携带该参数	节省资源

#### 面包屑

v-show 删除后将 该属性设置为undefined	发送请求时 将会不携带该参数	节省资源

地址栏修改	进行路由跳转	自己跳自己

关键词删除后应将搜索框也置空  使用全局事件总线

#### 点击品牌处理事件

两种方法	1.自定义事件	2.全局事件总线

#### 售卖属性处理事件

与品牌处理事件类似

数组去重	判断数组中是否含有该元素 如果有将不追加该元素

根据索引值删除元素`splice(index,1)`

#### 排序操作

通过order属性值来判断谁高亮	1(综合)	2(价格)	`:class="{active: searchParams.order.indexOf('1')!=-1}`

​				放在计算属性简化代码

箭头	谁高亮谁有箭头	使用阿里字体图标

### 分页功能注册为全局组件

自定义分页器的四个条件

pageSize：每页展示多少条数据

pageNo：当前页

total：一共多少页

continues：分页连续页码个数

#### **难点**	计算连续页码的起始页数

```js
    // 计算连续起始页
    stratNumAndEndNum() {
      let { pageNo, totalPage, continues } = this;
      let stratNum = 0,
        endNum = 0;

      // 先判断连续页数是否大于总页数
      if (continues > totalPage) {
        stratNum = 1;
        endNum = totalPage;
      } else {
        // 向下取整
        stratNum = pageNo - parseInt(continues / 2);
        endNum = pageNo + parseInt(continues / 2);
        //   当当前页为1,2时
        if (stratNum < 1) {
          stratNum = 1;
          endNum = continues;
        }
        // 当当前页页为最后两页时
        if (endNum > totalPage) {
          stratNum = totalPage - continues + 1;
          endNum = totalPage;
        }
      }
      return { stratNum, endNum };
    },
```

### Detail详情组件

- 静态页面————>静态组件
- 注册路由------->注意路由的滚动行为
- 发送请求
- vuex
- 组件获取数据 渲染数据

对子组件传递数值

售卖属性选择 排他属性

放大镜

购买数量

判断是否合法

```js
 changeSkuNum(event) {
      let value = event.target.value;
      // console.log(value);
      if (isNaN(value) || value < 1) {
        this.skuNum = 1;
      } else if (value < 1) {
        this.skuNum = 1;
      } else {
        this.skuNum = parseInt(value);
      }
    },
```

点击加入购物车后	先向服务器发送请求 	成功跳转 	失败不跳转

跳转使用会话存储存储购买信息

跳转我的购物车

### 购物车组件

使用uuid解决访问购物车数据

在请求头中添加uuid_token

是否全选 every方法

```js
 isAllChecked(){
      return this.shopCartInfoList.every(item=>item.checked==1)
    }
```

删除操作 没有一次性删除操作但是可以多次调用删除一个的接口

全选

### 登录注册组件

获取验证码

登录 token（令牌 用户唯一id）

持久化存储token	本地存储

两个问题	1.登录后用户应该不能会login组件  2. 通过token获取用户信息应放在哪个组件

**导航守卫**！！！

### 交易组件 trade

点击提交订单要向服务器发请求

api 接口全局引入（类似全局事件总线）

```js
import * as API from '@/api'


Vue.prototype.$API = API
```

二维码生成	`qrcode`

支付成功与失败需要一直向服务器发送请求

### 支付组件pay

### 支付完成组件

### 我的订单组件

二级路由	` <!-- 路由组件出口 -->	<router-view></router-view>`
分页器组件的再次使用

### 全局守卫

未登录访问 ， 交易相关(trade)，支付相关(pay、paysuccess), 用户中心(center)，相关组件应跳转到 登录页面

### 路由独享守卫

登录后不能直接访问 交易相关(trade) 支付相关(pay、paysuccess)组件

### 图片懒加载

vue-lazyload	  vue2要使用1版本

### 表单验证

vee-validate   	使用2版本

第一步：插件安装与引入 cnpm i vee-validate@2 --save 安装的插件安装2版本的

```js
import VeeValidate from 'vee-validate'

import zh_CN from 'vee-validate/dist/locale/zh_CN' // 引入中文 message

Vue.use(VeeValidate)
```

第二步：提示信息 

```js
VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
  },
  attributes: {
    // 给校验的 field 属性名映射中文名称
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password1: '确认密码',
    agree: '协议',
  },
});
```

第三步：基本使用

```html
<input
  placeholder="请输入手机号"
  v-model="phone"
  name="phone"
  v-validate="{ required: true, regex: /^1\d{10}$/ }"
  :class="{ invalid: errors.has('phone') }"
/>
<span class="error-msg">{{ errors.first("phone") }}</span>
```

```js
//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend('agree', {
  validate: (value) => {
    return value;
  },
  getMessage: (field) => field + '必须同意',
});
```

```js
const success = await this.$validator.validateAll(); //全部表单验证 返回布尔值
```

### 路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。

### 打包上线

项目打包后，代码经过压缩加密，如果运行报错，输出的信息无法准确得知是哪里的代码报错。

有了map就可以像未加密一样，准确的输出是哪一行哪一列报错。

所以项目不需要可以去除

`vue.config.js`文件配置

`productionSourceMap: false,`

# 完结撒花
