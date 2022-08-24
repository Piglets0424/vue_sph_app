import {
  reqGetCode,
  reqLogin,
  reqLogout,
  reqUserInfo,
  reqUserRegister,
} from '@/api';
import { setToken, getToken, removeToken } from '@/utils/token';

export default {
  namespaced: true,
  actions: {
    async getCode({ commit }, phone) {
      let result = await reqGetCode(phone);
      if (result.code == 200) {
        commit('GETCODE', result.data);
        return result.ok;
      } else {
        return Promise.reject(new Error('faile'));
      }
    },
    async userRegister({ commit }, user) {
      let result = await reqUserRegister(user);
      if (result.code == 200) {
        return result.ok;
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async userLogin({ commit }, data) {
      let result = await reqLogin(data);
      if (result.code == 200) {
        setToken(result.data.token);
        commit('USERLOGIN', result.data.token);
        return result.ok;
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async getUserInfo({ commit }) {
      let result = await reqUserInfo();
      if (result.code == 200) {
        commit('GETUSERINFO', result.data);
        return result.ok;
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async userLogout({ commit }) {
      let result = await reqLogout();
      if (result.code == 200) {
        commit('CLEARUSERINFO');
        return result.ok;
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
  },
  mutations: {
    GETCODE(state, code) {
      state.code = code;
    },
    USERLOGIN(state, token) {
      state.token = token;
    },
    GETUSERINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    CLEARUSERINFO(state) {
      (state.token = ''), (state.userInfo = {}), removeToken();
    },
  },
  state: {
    code: '',
    token: getToken(),
    userInfo: {},
  },
  getters: {},
};
