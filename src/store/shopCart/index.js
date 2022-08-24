import { reqDeleteCartById, reqGetShopCartList, reqToggleChecked } from '@/api';

export default {
  namespaced: true,
  actions: {
    async getShopCartList({ commit }) {
      let result = await reqGetShopCartList();
      if (result.code == 200) commit('GETSHOPCARTLIST', result.data);
    },
    async deleteCartById({ commit }, skuId) {
      let result = await reqDeleteCartById(skuId);
      if (result.ok) {
        return result.ok;
      } else {
        return Promise.reject(new Error('faile'));
      }
    },
    async toggleIsChecked({ commit }, { skuId, isChecked }) {
      let result = await reqToggleChecked(skuId, isChecked);
      if (result.ok) {
        return result.ok;
      } else {
        return Promise.reject(new Error('faile'));
      }
    },
    deleteAllCheckedCart({ getters, dispatch }) {
      let PromiseAll = [];
      getters.cartList.cartInfoList.forEach((item) => {
        let promise =
          item.isChecked == 1
            ? dispatch('deleteCartById', item.skuId)
            : '';
        PromiseAll.push(promise);
      });
      return Promise.all(PromiseAll);
    },
  },
  mutations: {
    GETSHOPCARTLIST(state, shopCartList) {
      state.shopCartList = shopCartList;
    },
  },
  state: {
    shopCartList: [],
  },
  getters: {
    cartList(state) {
      return state.shopCartList[0] || {};
    },
  },
};
