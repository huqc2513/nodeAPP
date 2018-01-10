
import axios from 'axios'


axios.defaults.withCredentials=true;

var instance = axios.create({
  // headers: {'content-type': 'application/x-www-form-urlencoded'}
});




import Vue from 'vue'







let  path = 'http://112.74.173.191:3006';


if(process.env.NODE_ENV=='production'){
  path = 'http://112.74.173.191:3005';
}else{
  path = 'http://localhost:3006';
}

export function upload_edit_Path() {
  let path = 'http://localhost:3006/uploadImage';

  if(process.env.NODE_ENV=='production'){
    path = 'http://112.74.173.191:3005/uploadImage';
  }
  return path
}

export function uploadPath(){

  let path = 'http://localhost:3006/upload';

  if(process.env.NODE_ENV=='production'){
    path = 'http://112.74.173.191:3005/upload';
  }
  return path
}


//修改商品
export function getUserList(obj){
  // path='http://localhost:3006';
  return instance.post(path+'/getUserList',obj);
}



//修改商品
export function update_product(obj){
  // path='http://localhost:3006';
  return instance.post(path+'/product/update',obj);
}


//添加商品
export function add_product(obj){
  // path='http://localhost:3006';
  return instance.post(path+'/product/add',obj);
}



//后台登陆
export function admin_login(obj){
  // path='http://localhost:3006';
  return instance.post(path+'/admin/login',obj);
}

// 删除商品图片
export function del_image(obj){
  // path='http://localhost:3006';
  return instance.post(path+'/del_image',obj);
}


//获取商品列表
export function getGoodsList(obj){
  // path='http://localhost:3006'
  return instance.post(path+'/product/query',obj);
}
//获取订单列表
export function getorderlist(obj){
  // path='http://localhost:3006'
  return instance.post(path+'/order/list',obj);
}

//删除商品
export function delGoods(array){
   // path='http://localhost:3006';
  return instance.post(path+'/goods/del',array);
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
