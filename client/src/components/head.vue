<template>
    <div class="head-wrap">

      <header class="clearfix">
        <i @click="searchs" class="iconfont  icon-fangdajing white back" style="font-size: 32px" v-show="!back" ></i>
        <i class="iconfont  icon-back white back" @click="backs" v-show="back" style="font-size: 24px
"></i>

        <p class="titile white">{{title}}</p>

        <div class="omit">
          <i class="iconfont icon-xiaoxi msg white" style="font-size: 26px"  v-show="nub==0"> </i>
          <i class="iconfont icon-shenglve msg white" v-show="nub>0" @click="self=!self"></i>
          <span  class="info" v-show="nub>0" >{{nub}}</span>
        </div>
        <!--'display':config.isHaveSearch ? 'block':'none'-->
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
    export default {
          data(){
            return{
              self:false
            }
          },
        name: "myhead",
        props: {
          modules:{
              type:String,
              required:false,
              default:''
          },
          title: {
            type: String,
            required: false,
            default: "默认",

          },
          nullNub:{
            type: Boolean,
            required: false,
            default: true,
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
            backs(){
              if(this.modules){

                switch(this.modules) {

                  case 'search':
                    this.$router.push({path:'/homes'});
                    break;
                  case 'centes':

                    this.$router.push({path:'/home/personal_center'});
                    break;

                }
              }else{
                this.$router.push({path:'/home/classify'});
              }

            },
            searchs(){

                this.$emit('showbox');

            },
            throttle(method,delay){
              var timer=null;
              return function(){
                var context=this, args=arguments;
                clearTimeout(timer);
                timer=setTimeout(function(){
                  method.apply(context,args);
                },delay);
              }
            }


        },
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
    background-color: #87c369;
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
    color: white;
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
