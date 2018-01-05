import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// axios.defaults.withCredentials=true;
// let  path = 'http://112.74.173.191:3006';
// if(process.env.NODE_ENV=='production'){
//   path = 'http://112.74.173.191:3005';
// }else{
//   path = 'http://112.74.173.191:3006';
// }


const moduleGoods = {
  state: {
      page:1,
      loading:false,
  },
  mutations: {
    add(state){
      state.page+=1;
    },
    self(state){
      state.loading= !state.loading;
    }
  },
  actions:{
    getList (context) {

    }
  }
};


export default new Vuex.Store({
  modules: {
    goods: moduleGoods,
  },
  state: {
    count:1
  },
});
