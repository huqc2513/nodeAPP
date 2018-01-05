
import axios from 'axios'


axios.defaults.withCredentials=true;

var instance = axios.create({
  // headers: {'content-type': 'application/x-www-form-urlencoded'}
});


import Vue from 'vue'


// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
//
// Vue.use(ElementUI)




let  path = 'http://112.74.173.191:3006';


if(process.env.NODE_ENV=='production'){
  path = 'http://112.74.173.191:3005';
}else{
  path = 'http://112.74.173.191:3006';
}

path='http://localhost:3006';

// let path='http://localhost:3006';



// 新增加商品
export function del_image(obj){
  path='http://localhost:3006';
  return instance.post(path+'/product/add',obj);
}



// 删除商品图片
export function del_image(obj){
  path='http://localhost:3006';
  return instance.post(path+'/del_image',obj);
}


//获取商品列表
export function getGoodsList(obj){
  path='http://localhost:3006'
  return instance.post(path+'/product/query',obj);
}
//获取订单列表
export function getorderlist(obj){
  path='http://localhost:3006'
  return instance.post(path+'/order/list',obj);
}

//删除商品
export function delGoods(array){
   path='http://localhost:3006';
  return instance.post(path+'/goods/del',array);
}




export function create_order(obj) {

  let  id =  JSON.parse(sessionStorage.getItem('user')).id;
  obj.user_id=id;

  return axios.post(path+'/create_order',obj);
}

export function shopcat_del(i) {
  let  id =  JSON.parse(sessionStorage.getItem('user')).id;
  return axios.post(path+'/shopcat/del',{id:i});
}
export  function shopcat_add(obj) {
  let id =  JSON.parse(sessionStorage.getItem('user')).id;
  obj.user_id = id;
  return axios.post(path+'/shopcat/add',obj);
}
export function getShopcatlist() {
  let id =  JSON.parse(sessionStorage.getItem('user')).id;
  //obj.user_id = id;
  return axios.get(path+'/shopcat/list?id='+id);

}

export function addOrder(obj) {
  let id =  JSON.parse(sessionStorage.getItem('user')).id;
  obj.user_id = id;
  return axios.post(path+'/orderList/add',obj);

}


export function deleteAll(arr) {
  return axios.post(path+'/orderList/del',{id:arr});
}
export function getOrderList() {
  //获取用户id
  let id =  JSON.parse(sessionStorage.getItem('user')).id;
  return axios.get(path+'/orderList?id='+id);
}

export function getBanerlist(){
  return axios.get(path+'/home/getbanner');
}

//新数据
export  function getHot(){
  //获取用户id
  let id =  JSON.parse(sessionStorage.getItem('user')).id;

  return axios.get(path+"/home/getNewGoods?id="+id);
}
//新数据
export  function getNewGoods(){
  //获取用户id
  let id =  JSON.parse(sessionStorage.getItem('user')).id;

  return axios.get(path+"/home/getHot?id="+id);
}




export function login(data){

  return axios.post(path+"/login",data);
}

export function register(data) {
  return axios.post(path+"/register",data);
}



//搜索
export function search(keyword,currpage,type) {
  let url = `/search?`;
  if(keyword){
    url+='keyword='+keyword
  }
  if(!currpage||currpage==0){
    currpage=1;
    url+='&nub='+currpage;
  }else{
    url+='&nub='+currpage;
  }

  if(type){
    url+=`&price=`+type;
  }

  return axios.get(path+url);
}

// /logout

export function logout() {
  return axios.get(path+'/logout');
}

// 请求拦截器
axios.interceptors.request.use(function(config) {

  //config.headers.Authorization = `sdf`;
  if (config.url.indexOf('/login') != -1) {

  }
  // console.log(config);
  return config

}, function(error) {
  return Promise.reject(error);
});

// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading


  if(data.data.code==500){

    alert('500');

  }

  return data
}, error => {


  alert('服务器繁忙');

  return Promise.reject(error)
})
