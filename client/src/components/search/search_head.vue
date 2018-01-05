<template>
  <div class="head-wrap">

    <header class="clearfix" style="margin-top: 10px">

      <i class="iconfont  icon-back white back" @click="backa" v-show="back" style="font-size: 32px
"></i>

      <div class="titile white">
        <input type="text"  v-on:keyup.enter='searchs' v-model="keyword" placeholder="请输入产品" style="width:80%;font-size: 12px
;
" >

        <i @click="searchs" class="iconfont  icon-fangdajing white " style="font-size: 24px;display: inline-block;padding: 0 5px
"></i>

        <div style="border-bottom: 1px solid #e8e8e8;position: relative;top: 10px
        ;"></div>
      </div>

      <div class="omit">
        <i class="iconfont icon-xiaoxi msg white" style="font-size: 26px"  v-show="nub==0"> </i>
        <i class="iconfont icon-shenglve msg white" v-show="nub>0" @click="self=!self"></i>
        <span class="info" v-show="nub>0">{{nub}}</span>
      </div>

    </header>
    <div class="msg-box" v-show="self">
      <ul>
        <li class="my-msg">
          <i class="iconfont icon-xiaoxi"></i>
          <span >消息</span>
          <span class="myinfo">{{nub}}</span>
        </li>

        <router-link  tag="li" to="/home/shopping_cart">

          <i class="iconfont icon-gouwuchekong"></i>
          <span>购物车</span>

        </router-link>

      </ul>
    </div>
  </div>
</template>

<script>
  import  {search} from "../../../config/api";

  export default {
    data(){
      return{
        self:false,
        keyword:'',
      }
    },
    name: "myhead",
    props: {

      title: {
        type: String,
        required: false,
        default: "默认",

      },
      back: {
        type: Boolean,
        required: false,
        default: true,
      },
      msg: {
        type: Boolean,
        required: false,
        default: true,
      },
      nub:{
        type: Number,
        required: false,
        default:1,
      },
    },
    methods:{

      backa(){
        this.$router.go(-1);

      },
      searchs(){

        search(this.keyword).then((data)=>{

            this.$emit('changeDate',data);


        });


      }
    },created(){

      this.keyword = this.$route.query.result;

    }

  }
</script>

<style  lang="stylus"scoped>
  .show
    visibility hidden
  /*display none*/
  .head-wrap
    display block
    width 100%

  header{
    display: flex;
    flex-wrap:nowrap;
    align-items:center;
    background-color: white;
    height: 50px;
    width: 100%;
    position: relative;
  }
  .back{
    padding: 0 20px;
  }
  .titile{
    flex: 1;
    text-align: center;
    font-size: 15px;
  }
  .msg{
    padding: 0 20px;
    font-size: 40px;
  }
  .white{
    color: #87c369;
  }
  .omit{
    /*padding: 0 20px;*/
    position: relative;
  }

  .info{
    width: 14px;
    height: 14px;
    line-height: 14px;
    border-radius: 50%;
    background: #f46463;
    text-align: center;
    position: absolute;
    right: 24px;
    top: 1px;
    font-size: 10px;
    color: #fff;
  }

  /*消息盒子*/
  .msg-box{
    position: absolute;
    right: 20px;
    top: 42px;
    width: 130px;
    background: #ffffff;
    z-index: 100;
  }
  .msg-box ul{
    width: 100%;
  }
  .msg-box ul>li{
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
  }
  .msg-box ul>li.my-msg{
    position: relative;
    border-bottom: 1px solid #e8e8e8;
  }
  .msg-box ul>li.my-msg .myinfo{
    position: absolute;
    right: 8px;
    top: 10px;
    color: white;

    width: 14px;
    height: 14px;
    line-height: 14px;
    border-radius: 50%;
    background: #f46463;
    text-align: center;
    font-size: 10px;

  }

  .msg-box ul>li>i{
    color: #87c369;
  }
  .msg-box ul>li>span{
    color: #626262;
    font-size: 12px;
    display: inline-block;
    margin-left: 10px;
  }


</style>
