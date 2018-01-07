<template>
    <div>
      <!--<div class="item-list"   v-if="goodslist">-->
        <!--购物车产品-->
        <div  class="item-wrap" v-for="(item,index) in goodslist">

          <div class="item" :id=item.shop_cart_Id>

            <div class="check">
              <!--// succeed');-->
              <!--// $(this).find('.circle').removeClass('border-radius');'class-a': isA, 'class-b': isB-->
              <div class="circle ":class="{'succeed':item.is_class,'border-radius':!item.is_class}" @click="calc(index)"></div>
            </div>

            <div class="goods-img">
              <img :src=item.imgScr alt="">
            </div>

            <div class="product-info">
              <h3 class="product-title">{{item.name}}</h3>
              <p class="product-introduction"> 段位：
                <span>{{item.grading}}</span>
              </p>
              <div class="clearfix">
                <span class="price">{{item.price}}</span>
                <div class="calc">
                  <i class="iconfont icon-jian" @click='minus(item.count,index)' :name=item.id></i>
                  <input type="number" class="number" v-model='item.count' >
                  <i class="iconfont icon-jia" @click='add(item.count,index)' ></i>
                </div>
              </div>
            </div>

          </div>
          <div class="deleete-item">
            <p  class="dels" :name=item.cartid @click="del(index,item.product_cart_id,$event)" >删除</p>
          </div>

        </div>
      <!--</div>-->
    </div>
</template>

<script>

  import {getShopcatlist,shopcat_del} from 'config/api'
  import validator from 'validator';

    export default {
        name: "goods-list",
        data(){
          return{
            self:false,
            selfs:true,
            totalPrice:0,
          }
        },
       props: {
          goodslist:{
            type:Array,
            require:false,
            default: function () {
              return []
            }

          }

          // is_delete:{
          //   type:Boolean,
          //   require:false,
          //   default:false
          // }
        },
      methods:{

         minus(num,index){
           let arr =this.goodslist;
           if(this.goodslist[index].count>=1){
            // this.goodslist[index].count--;

             arr[index].count--;
           }else{

             return
           }


             this.$emit('showbox',this.changgePrice,this.count,arr);
           //}

         },
        add(num,index){

            //this.goodslist[index].count++;
          let arr =this.goodslist;
               arr[index].count++;
            let count =  this.goodslist[index].count;
            this.totalPrice =  parseInt(count);
            this.$emit('showbox',this.changgePrice,this.count,arr);
        },
        calc(index){
           let arr =this.goodslist;

           arr[index].is_class=!this.goodslist[index].is_class;

            this.$emit('showbox',this.changgePrice,this.count, arr);


        },
        del(index,id,event){

          shopcat_del(id).then(data=>{


              alert('陈宫');

            this.$emit('changeDelete',index,id);
            var container = $('.swipeleft');           //将展开的DOM归位 除掉样式类
            container.removeClass('swipeleft').addClass('swiperight');

          });


        },

      } ,
      mounted:function(){

        mui.init({
          gestureConfig:{
            tap: true, //默认为true
            doubletap: true, //默认为false
            longtap: true, //默认为false
            swipe: true, //默认为true
            drag: true, //默认为true
            hold:false,//默认为false，不监听
            release:false//默认为false，不监听
          }
        });

        //console.log($);

        //左滑删除
        mui("body").on("swipeleft",".item-wrap",function () {

          if( !$(this).hasClass('swipeleft')){
            $(this).addClass('swipeleft');
          }else{
            $(this).removeClass('swiperight');
          }

          this.addEventListener("swiperight",function () {

            if( !$(this).hasClass('swiperight')){

              $(this).removeClass('swipeleft');

               $(this).addClass('swiperight');
            }

          });

        });


      },
      created(){
         // console.log(this.goodslist);
      },
      computed: {
        changgePrice: function () {
          let price=0;
          this.goodslist.forEach((i)=>{
            //如果被勾选中
            if(i.is_class==true &&i.count>=1){
              price+=parseInt(i.count) * parseInt(i.price);
            }
          });
          return price
        },
        count: function () {
          let price=0;
          this.goodslist.forEach((i)=>{
            //如果被勾选中
            if(i.is_class==true &&i.count>=1){
              price+=parseInt(i.count);
            }
          });
          return price
        },
      },
      }
</script>

<style scoped>

  #header{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
  }
  .main-content{
    height: calc(100% - 90px);
    /*margin-top:50px;*/
    overflow: hidden;
    overflow-y: auto;
    background: #f0f0f0;
    padding: 10px 10px 0 10px ;
    /*border: 1px solid red;*/
  }
  #footer{
    position: fixed;
    left: 0;
    bottom:0;
    width: 100%;
  }
  .delete{

  }
  .item-wrap{
    height: 115px;
    position: relative;
    margin-bottom: 10px;

  }
  .item-list{
    background: #f0f0f0;
    height: 100%;

    overflow: hidden;
    overflow-y: auto;
  }
  .item{
    height: 115px;
    width: 100%;
    padding: 10px ;
    background: #fcfcfc;
    margin-bottom: 10px;
    position: relative;
  }

  .item>div{
    float: left;
  }
  .check{
    min-width: 30px;
    width: 8%;
    height: 100%;
    line-height: 100%;
    text-align: center;
    vertical-align: middle;
    position:relative
  }
  .circle{
    width: 20px;
    height: 20px;
    position: absolute;
    overflow: hidden;
    top: 50%;
    transform: translateY(-50%);
  }
  .border-radius{
    border-radius: 50%;
    border: 1px solid #e8e8e8;
  }
  .succeed{
    /*position: absolute;*/
    width: 25px;
    height: 25px;
    /*left: -4px ;*/
    /*top: -5px;*/
    background: url("img/succeed.png");
    background-size: 25px 25px;
  }
  .goods-img{
    margin-right: 10px;
    width: 80px;
    height: 95px;
    overflow: hidden;
  }
  .goods-img img{
    width: 90px;
    height: 95px;
  }
  .product-info{
    max-width: 220px;
    width: calc( 100% - 100px - 8% );
    /*height: 100%;*/
    /*overflow: hidden;*/
    /*border: 1px solid red;*/
  }
  .product-title{
    margin-top: 10px;
    font-size: 14px;
    font-family: '微软雅黑';
    line-height: 17px;
    max-height: 34px;
    overflow: hidden;
  }
  .product-introduction{
    font-size: 12px;
    color: #a2a2a2;
    margin: 2px 0;
  }
  .product-introduction>span{
    display: inline-block;
    margin-left: 10px;
    color: #a2a2a2;
  }
  .price{
    float: left;
    margin-top: 5px;
    color: #87c369;
    font-size: 16px;
  }

  .icon-jian:before{
    color: black;
  }
  .calc>i{
    float: left;
    margin:  0 5px ;
    color: #a2a2a2;
    padding: 5px;
  }
  .icon-jian:before{
    color: #a2a2a2;

  }
  .calc{
    display: flex;
    flex-wrap:nowrap;
    align-items:center;
    margin-top:5px;
    float: right;
    height: 100%;
    line-height: 100%;
    position: relative;
    /*border: 1px solid red;*/
    vertical-align: middle;
  }
  .number{
    /*position: absolute;*/
    /*top: 50%;*/
    /*transform: translateY(-50%);*/
    color: #87c369;
    font-weight: bold;
    border: 1px solid #e8e8e8;
    width: 50px;
    height: 18px;
    padding: 2px 0;
    line-height: 18px;
    text-align: center;
  }
  .deleete-item{
    position: absolute;
    right: -100px;
    margin-left: 20px;
    width: 85px;
    height: 110px;
    top: 0;
    line-height:110px;
    text-align: center;
    background: #f46463;
    color: white;
    font-size: 14px;
  }
  /*总价*/
  .total-price-box{
    display: flex;
    height: 45px;
    line-height: 45px;
    width: 100%;
    background:#f7f7f7 ;
    overflow: hidden;
  }
  .total-price-box b{
    color: #737373;
    font-size: 15px;
  }

  label{
    position: relative;
    float: left;
    clear: both;
    display: inline-block;
    height: 100%;
    overflow: hidden;
    width: 65px;
    line-height: 45px;
    margin-left: 20px;
    /*vertical-align: middle;*/
  }
  label b{
    position: absolute;
    display: inline-block;
    left: 30px;
  }
  /*全选*/
  .circle-all{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: inline-block;
    width: 24px;
    height: 24px;
    overflow: hidden;
  }
  .border-radius-all{
    border-radius: 50%;
    border: 1px solid #e8e8e8;
  }
  /*价格*/
  .total-price{
    margin: 0 10px;

  }
  .shop-btn{
    background: #87c369;
    flex: 1;
    text-align: center;
    color: #ffffff;
    font-weight: bold;
  }
  @keyframes myfirst
  {
    0% {
      transform: translateX(0);
    }
    100% {transform: translateX(-120px);}
  }

  @keyframes mylast
  {
    0% {
      transform: translateX(-120px);
    }
    100% {transform: translateX(0);}
  }

  .swipeleft{
    transition: all 0.2s;
    transform:translateX(-120px);
  }
  .swiperight{
    transition: all 0.2s;
    transform:translateX(0px);

  }
</style>
