// 配置路由

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import routes from './routes';
// 引入store
import store from '../store';

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

let router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior() {
    // 始终滚动到顶部
    return { y: 0 };
  },
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  next();
  let token = store.state.user.token;
  let userName = store.state.user.userInfo.name;
  if (token) {
    // 已经登录的不能再去登录页面
    if (to.path == '/login') {
      next('/');
    } else {
      if (userName) {
        next();
      } else {
        // 获取用户信息
        store
          .dispatch('user/getUserInfo')
          .then(() => {
            next();
          })
          .catch((error) => {
            // token失效
            console.log(error);
            // 清除token
            store.dispatch('user/userLogout');
            next('/login');
          });
      }
    }
  } else {
    // 未登录
    let toPath = to.path;
    if (
      toPath == '/trade' ||
      toPath.indexOf('/pay') != -1 ||
      toPath.indexOf('/center') != -1
    ) {
      next('/login?redirect='+toPath);
    } else {
      next();
    }
  }
});

export default router;
