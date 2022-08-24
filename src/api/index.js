// API统一管理

import $http from './ajax';
import $httpMock from './mockAjax';

// 1.三级联动
// /api/product/getBaseCategoryList    get     无参数
// export const reqCategoryList = () => {
//   return $http({
//     method: 'get',
//     url: '/product/getBaseCategoryList',
//   })
//     .then((response) => {
//       return response;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
export const reqCategoryList = () => $http.get('/product/getBaseCategoryList');

// 2.banner轮播图
// export const reqBannerList = () => {
//   return $httpMock({
//     method: 'get',
//     url: '/banner',
//   })
//     .then((response) => {
//       return response;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
export const reqBannerList = () => $httpMock.get('/banner');

// 3.获取floor组件数据
export const reqFloorList = () => {
  return $httpMock({
    method: 'get',
    url: '/floor',
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

// 4.search模块获取数据
// /api/list    POST  带参数
export const reqGetSearchInfo = (params = {}) => {
  return $http({
    method: 'post',
    url: '/list',
    //params至少是个空对象
    data: params,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

// 5.detail模块获取数据
//  /api/item/{ skuId }   get   有参数
export const reqDetailList = (goodsId) => $http.get(`/item/${goodsId}`);

// 6.添加更新购物车
// /api/cart/addToCart/{ skuId }/{ skuNum }     Post    带参数
export const reqAddOrUpdateShopCar = (skuId, skuNum) =>
  $http.post(`/cart/addToCart/${skuId}/${skuNum} `);

// 7.获取购物车列表
// /api/cart/cartList get  无参数
export const reqGetShopCartList = () => $http.get('/cart/cartList');

// 8.删除购物车商品
// /api/cart/deleteCart/{skuId}   DELETE    无参数
export const reqDeleteCartById = (skuId) =>
  $http.delete(`/cart/deleteCart/${skuId}`);

// 9.切换商品选中状态
// /api/cart/checkCart/{skuID}/{isChecked}    get     有参数
export const reqToggleChecked = (skuID, isChecked) =>
  $http.get(`/cart/checkCart/${skuID}/${isChecked} `);

// 10.获取验证码
// /api/user/passport/sendCode/{phone}    get   带参数
export const reqGetCode = (phone) =>
  $http.get(`/user/passport/sendCode/${phone}`);

// 11.用户注册
// /api/user/passport/register  post   带参数
export const reqUserRegister = (data) =>
  $http.post(`/user/passport/register`, data);

// 12.登录
// /api/user/passport/login   post   带参数
export const reqLogin = (data) => $http.post(`/user/passport/login`, data);

// 13.通过token获取用户信息
// /api/user/passport/auth/getUserInfo  get  无参
export const reqUserInfo = () => $http.get('/user/passport/auth/getUserInfo');

// 14.退出登录
// /api/user/passport/logout    get   无参
export const reqLogout = () => $http.get('/user/passport/logout');

// 15.获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList  get  无参
export const reqUserAddressInfo = () =>
  $http.get('/user/userAddress/auth/findUserAddressList');

// 16.获取交易页信息
// /api/order/auth/trade    get
export const reqOrderInfo = () => $http.get('/order/auth/trade');

// 17.提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}  post
export const reqSubmitOrder = (tradeNo, data) =>
  $http.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data);

// 18.获取订单支付信息
// /api/payment/weixin/createNative/{orderId}  get
export const reqPayInfo = (orderId) =>
  $http.get(`/payment/weixin/createNative/${orderId}`);

// 19.查询支付状态
// /api/payment/weixin/queryPayStatus/{orderId}  get
export const reqQueryPayStatus = (orderId) =>
  $http.get(`/payment/weixin/queryPayStatus/${orderId}`);

// 获取订单列表
// /api/order/auth/{page}/{limit}   get
export const reqMyOrderList = (page, limit) =>
  $http.get(`/order/auth/${page}/${limit}`);
