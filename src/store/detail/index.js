import { reqDetailList, reqAddOrUpdateShopCar } from '@/api';
import { getUUID } from '@/utils/uuid_token';

export default {
  namespaced: true,
  actions: {
    async getGoodsDetail({ commit }, goodsId) {
      let result = await reqDetailList(goodsId);
      if (result.code == 200) commit('GETGOODSDETAIL', result.data);
    },
    async getShopCarData({ commit }, { skuId, skuNum }) {
      let result = await reqAddOrUpdateShopCar(skuId, skuNum);
      if (result.ok) {
        return result.ok;
      } else {
        return Promise.reject(new Error('faile'));
      }
    },
  },
  mutations: {
    GETGOODSDETAIL(state, goodsDetail) {
      state.goodsDetail = goodsDetail;
    },
  },
  state: {
    goodsDetail: {},
    uuid_token: getUUID(),
  },
  getters: {
    categoryView(state) {
      return state.goodsDetail.categoryView || {};
    },
    skuInfo(state) {
      return state.goodsDetail.skuInfo || {};
    },
    spuSaleAttrList(state) {
      return state.goodsDetail.spuSaleAttrList || [];
    },
  },
};
