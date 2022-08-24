// 主页模块仓库
import { reqCategoryList, reqBannerList, reqFloorList } from '@/api';

export default {
  // 开启命名空间
  namespaced: true,
  //准备actions对象——响应组件中用户的动作
  actions: {
    // 通过api向服务器发送请求 获取数据
    // categorytList() {
    //   reqCategoryList().then((result) => {
    //     console.log(result);
    //   });
    // },
    // 解构commit
    async categorytList({ commit }) {
      let result = await reqCategoryList();
      // console.log(result);
      if (result.code === 200) {
        commit('ATEGORYTLIST', result.data);
      }
    },
    // 获取首页轮播图数据
    async getBannerList({ commit }) {
      let result = await reqBannerList();
      // console.log(result);
      if (result.code === 200) {
        commit('GETBANNERLIST', result.data);
      }
    },
    // 获取floor数据
    async getFloorList({ commit }) {
      let result = await reqFloorList();
      if (result.code === 200) {
        commit('GETFLOORLIST', result.data);
      }
    },
  },
  //准备mutations对象——修改state中的数据
  mutations: {
    ATEGORYTLIST(state, categorytList) {
      state.categorytList = categorytList;
    },
    GETBANNERLIST(state, bannerList) {
      state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
      state.floorList = floorList;
    },
  },
  //准备state对象——保存具体的数据
  state: {
    // 三级数据
    categorytList: [],
    // 轮播图数据
    bannerList: [],
    // floor数据
    floorList: [],
  },
  //数据需要经过加工后再使用时 简化数据
  getters: {},
};
