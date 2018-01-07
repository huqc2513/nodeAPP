import axios from 'axios'

    axios.defaults.withCredentials=true;

    let  path = 'http://112.74.173.191:3006';

    if(process.env.NODE_ENV=='production'){
      path = 'http://112.74.173.191:3005';
    }else{
      path = 'http://112.74.173.191:3006';
    }

  //path = 'http://localhost:3006';

///shopcat/del
export function getClassify() {
  return axios.get(path+'/classify');
}
export function create_order(obj) {

  let  id =  JSON.parse(sessionStorage.getItem('user')).id;

  obj.user_id=id;

  return axios.post(path+'/create_order',obj);
}
export function shopcat_del(i) {
  //let  id =  JSON.parse(sessionStorage.getItem('user')).id;
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

export function getgoodsList() {
  return axios.get(path+"/product");
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
export function get_goods_details(id){
  return axios.get(path+'/goods/details?id='+id)
}
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
