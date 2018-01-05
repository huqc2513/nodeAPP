<template>
    <div class="wrap-box">
      <div class="shade-box">
      </div>
      <div class="main-box">

        <!--搜索框-->
        <div class="header">
          <input type="text" autofocus="autofocus" v-model="result" v-on:keyup.enter='go_result' placeholder="搜索品牌、类别" class="search-box font-color" autocomplete="off">

          <span class="iconfont  icon-fangdajing "  @click="go_result" style="font-size: 24px
;position: relative;top: 11px"></span>      <!--搜索按钮-->
        </div>

        <!--热门搜索-->
        <div class="hot-search">
          <h3 class="font-color">
            热门搜索
          </h3>
          <ul class="clearfix" style="padding: 10px 0">

            <li v-for="item in list ">

              <!--<a href="#">{{item}}</a>-->

              <router-link  tag="a"  :to="{path:'/search_result',query: {result: item}}" >
                {{item}}
              </router-link>

            </li>



          </ul>
        </div>
        <!--历史搜索-->
          <div class="search-record">
          <h3 class="font-color">
            历史搜索
            <span class="clear" @click="deleteall()"> 清除历史</span>
          </h3>
          <span class="line"></span>

          <ul class="record-wrap">

            <li v-for="(item,index) in history ">

              <router-link  tag="a"  :to="{path:'/search_result',query: {result: item}}" >
                {{item}}
              </router-link>
              <!--<a href="#"></a>-->

              <span class="delete" @click="deleteitem(index)"></span>

            </li>

            <!--<li v-for="(item,index) in history">-->
              <!--<a href="#">{{item}}</a>-->

            <!--</li>-->

          </ul>
        </div>


      </div>
    </div>
</template>

<script>
  import {search} from 'config/api';

    export default {
        name: "searchs",
        data(){
          return{
            result:'',
            list:['奶粉','美赞臣'],
            history:['美赞臣']
          }
        },
        methods:{
          go_result(){

            this.$router.push({path:'/search_result',query:{result:this.result}})//参数为命名的路由

          },
          deleteitem(index){
            this.history.removeIndex(index);
          },
          deleteall(){
            this.history=[];
          }
        },created(){

            //document.getElementById('search').search();
         // this.$refs.search.focus();

            //按指定位置删除
          Array.prototype.removeIndex = function (index) {
            if (index > - 1) {
              this.splice(index, 1);
            }
          };
      }
    }
</script>

<style lang="stylus" scoped>

  .wrap-box
    display block
    z-index 1001
    margin-left 10px


  html,body{
    width: 100%;
    height: 100%;
  }
  .shade-box{
    display: none;
    position: fixed !important;
    width: 100% !important;
    height: 100% !important;
    background: rgba(0,0,0,0.4) !important;
    opacity: 0.6;!important;
    transition: all 0.3s !important;
    z-index: 500 !important;
    /*transform: translateX(-400px);*/
  }
  .main-box{
    transform: translateX(-300px);
    position: fixed;
    width: 80%;
    height: 100%;
    /*border: 1px solid red;*/
    background: #ffffff;
    z-index:600;
    padding: 0 10px;
  }
  .header{
    height: 60px;
    border-bottom: 1px solid #e8e8e8;
    line-height: 60px;
    margin-bottom: 25px;
  }
  .header input{

  }
  .titile{
    color: black;
  }
  .border-color{
    border: 1px solid #87c369;
  }
  /*搜索框*/
  .search-box{
    vertical-align: middle;
    height: 30px;
    width: 80%;
    font-size: 12px;
    outline:none;
    padding-left: 5px;
  }
  .back{
    padding: 0 20px;
  }
  .msg{
    padding: 0 20px;
  }
  /*放大镜*/
  .header .fdj-icon{
    vertical-align: middle;
    color: #d4d4d4;
    font-size: 30px !important;
  }
  /*热门搜索*/
  .hot-search{
    padding: 15px 0;
  }
  body input[type=text]{
    position: relative;
    top: 11px !important;
    border: none !important;
    width: 80% !important;
    height: 30px !important;
    margin-bottom: 0px!important;
    padding: 0px!important;
  }
  .font-color{
    color: #898989!important;
    font-size: 15px!important;
  }
  .search-wrap-box{
    z-index: 200;
    /*display: none;*/
  }
  .hot-search ul{
    width: 100%;
  }
  li a{
    color: #7e8c8d!important;
  }
  .hot-search>ul>li{
    float: left;
    margin-right: 15px;
    border: 1px solid #87c369;
    padding: 5px 20px;
    margin-bottom: 20px;
    font-size: 12px;
    color: #acacac;
  }
  .clear{
    color: #b4d8a4;
    float: right;
    margin-right: 15px;
    font-size: 10px;
  }
  .line{
    display: inline-block;
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
  }
  .search-record ul{
    width: 100%;
  }
  .search-record ul>li{
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
    height: 35px;
    line-height: 35px;
    font-size: 12px;
    position: relative;
  }
  .icon-delete{
    position: absolute;
    right: 5px;
  }
  .search-record ul>li a{
    color: black;
  }
  .delete{
    position: absolute;
    right: 5px;
    top: 50%;
    transform:translateY(-50%) ;
    margin-right: 5px;
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url("../../assets/close.png") no-repeat;
    background-size:20px 20px ;
  }
  .record-wrap{
    max-height: 300px;
    overflow: hidden;
    overflow-y: auto;
  }


</style>
