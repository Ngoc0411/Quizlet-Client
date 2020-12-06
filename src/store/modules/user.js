import { USER_REQUEST, USER_ERROR, USER_SUCCESS, USER_ACCOUNT } from "../actions/user";
import apiCall from "../../utils/api";
//import Vue from "vue";
import { AUTH_LOGOUT } from "../actions/auth";

const state = { status: "", profile: {} };

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name
};

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }, data) => {
    commit(USER_REQUEST);
    apiCall({ url: "user/me", data })
      .then(resp => {
        if(data !== undefined){
          commit(USER_SUCCESS, resp);
        }
        //commit(USER_SUCCESS, resp);
      })
      .catch(() => {
        commit(USER_ERROR);
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT);
      });
  },
  [USER_ACCOUNT]: ({ commit }, resp) => {
    commit(USER_ACCOUNT, resp);
  },
};

const mutations = {
  [USER_REQUEST]: state => {
    state.status = "loading";
  },
  [USER_ACCOUNT]: (state, resp) => {
    state.profile.email = resp.Email;
    state.profile.password = resp.Password;
    state.profile.loaiTaiKhoanID = resp.LoaiTaiKhoanID;
    state.profile.tenLoaiTaiKhoan = resp.TenLoaiTaiKhoan;
    state.profile.ngaySinh = resp.NgaySinh;
    state.profile.tenNguoiDung = resp.TenNguoiDung;
    state.profile.taiKhoanID = resp.TaiKhoanID;
    state.profile.anh = resp.Anh;
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = "success";
    //Vue.set(state, "profile", resp);
    state.profile.email = resp.email;
    state.profile.password = resp.password;
  },
  [USER_ERROR]: state => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: state => {
    state.profile = {};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
