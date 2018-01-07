<template>


  <div style="width: 100%;height: 100%">

    <my-heads   @showbox="toshow"  :back="true" :title=" '产品详情' " :nub="1"></my-heads>


    <div  class="wrap-box clearfix" >
          <div class="mains">
            <swiper :listImg="listImg"  v-if='listImg' :height="230"></swiper>

            <div style="background: #ffffff">
                    <div class="price clearfix"  v-if="goods_detals">
                      <span class="title" >{{goods_detals.name}}</span>
                      <b class="price-text">￥{{goods_detals.price}}</b>
                      <span class="vomluon">销量{{goods_detals.salesVolume}}笔</span>
                    </div>

                <div class="clearfix" style="width: 100%;text-align: center">


                  <mu-select-field v-model="from.type" :labelFocusClass="['label-foucs']" >
                    <!--<mu-menu-item value="7" title="请选择类型"/>-->
                    <mu-menu-item v-for="text,index in list" :key="index" :value="index" :title="text" />

                  </mu-select-field>

                  <div style="margin-top: 20px">

                    <mu-select-field v-model="from.count" :labelFocusClass="['label-foucs']" >
                      <!--<mu-menu-item value="7" title="请选择类型"/>-->
                      <mu-menu-item v-for="text,index in list2" :key="index" :value="index" :title="text" />

                    </mu-select-field>

                  </div>


                </div>
            </div>

                <goods_img :data="goodslist" :comment="comment"></goods_img>
        </div>
    </div>

    <div class="btn-box">
      <mu-flat-button label="加入购物车" @click="submit_shopcart" class="demo-flat-button shop-cart"/>
        <!--<div class="" @click="submit_shopcart">加入购物车</div>-->
        <div class="shop" @click="buy">立即购买</div>
    </div>

  </div>
</template>

<script>
  import  head from 'components/head'
  import swiper from 'components/swiper'


  import goods_img from './goods_img'

  import VuePickers from 'vue-pickers'
  import {addOrder,shopcat_add,get_goods_details} from 'config/api'

  export default {
    name: "goods_details",
    data(){
      return{
        goods_detals:{},
        height:190,
        show:true,
        good_id:'',
        comment:[],
        listImg: [
//          {
//            src:require('./img/goods_02.png')
//          }
        ],
        num1: 1,
        from:{
          id:15,
          type:0,
          count: 0,
          price:99,
          address:'北京'
        },
        list: ['请选择类型','实惠型','清洁型'],
        list2 :['请选择数量','1','2','3','4','5'],
          goodslist:[

          ],
      }
    },
    created(){

      if(this.$route.query.id){
        this.good_id =this.$route.query.id
      }
       if(this.good_id){
           get_goods_details(this.good_id).then(data=>{
             if(data.data.code==200) {
               let arr=[];
                let len= data.data.evaluate;
                for(let i=0;i<len.length;i++){
                  arr.push({url: data.data.evaluate[i].images_path});
                }
                this.listImg= arr;

                this.comment =data.data.bannerList;
                console.log(data.data);

                this.goodslist =   [
                        {name:'产品细节'},
                        {name:'评论',count:this.comment.length}
                  ];
                 this.goods_detals=data.data.detailsInfo[0];
                 console.log( this.goods_detals);
              }
           })
       }

    },
    mounted(){


    },
    methods:{
      buy(){
          if(this.from.type==0||this.from.count==0){
                alert('请填选信息');
            return;
          }else {

            addOrder(this.from).then(err=>{
              if(err.data.code==1){
                  alert('下单成功');
                this.$router.push({path:'/myorder'});
              }
            });
          }
      },
      handleChange(value) {
       // console.log(value);
      },
      submit_shopcart(){
        this.from.count++;
        this.from.goodid= this.good_id;
        shopcat_add(this.from).then(data=>{

              alert('加入成功');
            this.$router.push({path:'/home/shopping_cart'})
        });

      },
      toshow(e){
        this.$refs.sidebar.hideDom();
      },
      onSelectChange: function(value) {
//        console.log(value)
      }
    },
    components:{
      "my-heads":head,
       swiper,goods_img,VuePickers,
    }
  }

</script>

<style lang="stylus" scoped>


  .mu-text-field-focus-line
    background-color #87c369
  .mu-menu-item-wrapper.active
      color #87c369
  /*.mu-text-field.focus-state*/

    /*color  #87c369*/

  .wrap-box
    height calc(100% - 100px)
    width 100%

    overflow hidden
    overflow-y auto
  .selete
    //appearance:none;
    margin 0 auto
    width: 70%;
    height: 30px
    text-align: center;
    margin: 0 auto
    overflow hidden
    option
      //appearance:none;
      width 50% !important

  .active
    color #87c369
  .mains
    /*border 1px solid red*/
    width 100%;
    height calc( 100%)
    overflow hidden
    overflow-y auto
  .header
    display block
    border 1px solid red
  .advertising img{
    width: 100%;
    height: 180px;
  }
  .price
    margin-top: 10px;
    font-size: 16px
    padding 0 10px

  .price-text
    display inline-block
    float: left
    margin-left: 10px
    font-weight 700
  .vomluon
    display inline-block
    float:right;
    color:#9a9a9a;
    margin-right: 10px
    font-weight 500
  .title
    margin:15px 0;
    position: relative;
    left: -13px
    display block
    font-weight 600
    /*margin: 5px 0*/
    height 20px
    text-align: center
  .btn-box
    height 50px
    width 100%
    text-align center
    display flex
    .shop-cart
      display inline-block
      flex  4
      height 50px
      line-height 50px
      background-color white
      color #87c369

    .shop
      flex 6
      display inline-block
      height 50px
      line-height 50px
      background-color #87c369
      color white

  select {
    /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
    border: solid 1px #000;

    /*很关键：将默认的select选择框样式清除*/
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;

    /*在选择框的最右侧中间显示小箭头图片*/
    background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;


    /*为下拉小箭头留出一点位置，避免被文字覆盖*/
    padding-right: 14px;
  }


  /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
  select::-ms-expand { display: none; }

</style>
