import { reqOrderInfo, reqUserAddressInfo } from '@/api';

export default {
  namespaced: true,
  actions: {
    async getUserAddressInfo({ commit }) {
      let result = await reqUserAddressInfo();
      if (result.code == 200) {
        commit('GETUSERADDRESSINFO', result.data);
        return result.ok;
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async getOrderInfo({commit}){
      let result = await reqOrderInfo()
      if (result.code == 200) {
        commit('GETORDERINFO', result.data);
        return result.ok;
      } else {
        return Promise.reject(new Error(result.message));
      }
    }
  },
  mutations: {
    GETUSERADDRESSINFO(state, addressInfo) {
      state.addressInfo = addressInfo;
    },
    GETORDERINFO(state,orderInfo){
      state.orderInfo=orderInfo
    }
  },
  state: {
    addressInfo: [],
    orderInfo:{}
  },
  getters: {
    detailArrayList(state){
      return state.orderInfo.detailArrayList
    }
  },
};
