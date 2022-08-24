// 引入一级路由
// import Home from '@/pages/Home';
// 路由懒加载
const Home = () => import('@/pages/Home');

// import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
// 引入二级路由
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder';

export default [
  // 重定向
  { path: '*', redirect: '/home' },
  { path: '/home', component: Home, meta: { showFooter: true } },
  {
    path: '/login',
    component: () => import('@/pages/Login'), //路由懒加载
    meta: { showFooter: false },
  },
  { path: '/register', component: Register, meta: { showFooter: false } },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: Search,
    meta: { showFooter: true },
  },
  {
    name: 'detail',
    path: '/detail/:goodsId',
    component: Detail,
    meta: { showFooter: true },
  },
  {
    name: 'addcartsuccess',
    path: '/addcartsuccess',
    component: AddCartSuccess,
    meta: { showFooter: true },
  },
  {
    name: 'shopcart',
    path: '/shopcart',
    component: ShopCart,
    meta: { showFooter: true },
  },
  {
    name: 'trade',
    path: '/trade',
    component: Trade,
    meta: { showFooter: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    name: 'pay',
    path: '/pay',
    component: Pay,
    meta: { showFooter: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    name: 'paysuccess',
    path: '/paysuccess',
    component: PaySuccess,
    meta: { showFooter: true },
  },
  {
    name: 'center',
    path: '/center',
    component: Center,
    meta: { showFooter: true },
    children: [
      // 重定向
      { path: '/center', redirect: '/center/myorder' },
      { name: 'myorder', path: 'myorder', component: MyOrder },
      { name: 'grouporder', path: 'grouporder', component: GroupOrder },
    ],
  },
];
