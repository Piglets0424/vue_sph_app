// 搜索模块仓库
import { reqGetSearchInfo } from '@/api';
export default {
  // 开启命名空间
  namespaced: true,
  //准备actions对象——响应组件中用户的动作
  actions: {
    // 获取search模块数据
    async getSearchList({ commit }, params) {
      let result = await reqGetSearchInfo(params);
      if (result.code == 200) {
        commit('GETSEARCHLIST', result.data);
      }
    },
  },
  //准备mutations对象——修改state中的数据
  mutations: {
    GETSEARCHLIST(state, searchList) {
      state.searchList = searchList;
    },
  },
  //准备state对象——保存具体的数据
  state: {
    searchList: {},
  },
  //数据需要经过加工后再使用时 简化数据
  getters: {
    //如果网络有问题则返回空数组
    attrsList(state) {
      return state.searchList.attrsList || [];
    },
    goodsList(state) {
      return state.searchList.goodsList || [];
    },
    trademarkList(state) {
      return state.searchList.trademarkList || [];
    },
  },
};
