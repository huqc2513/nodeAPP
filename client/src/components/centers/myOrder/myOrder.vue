<template>
    <div style="height: 100%">

      <my-heads  :modules="'centes'"  :back="true"  :title=" '我的订单' " :nub="0"></my-heads>

      <!--主容器-->
      <div class="main-content">

        <div class="item-list">


          <div  class="item-wrap" v-for="(item,index) in orderList"  v-if='orderList' :name="item.id">

            <div class="check" @click='checkd(index)'>
              <div :class="{'circle':true, 'border-radius':!item.self,'succeed':item.self}" ></div>
              <span style="float: left;margin-left: 70px;font-size: 12px;font-weight: bold">订单总价：{{item.total_price}}</span>
              <span class="status">{{item.status=='A'?'配送中':'已送到'}}</span>
            </div>

            <div class="item"  v-for="items in item.list">
              <div class="goods-img">
                <img :src=items.imgSrc alt="">
              </div>

              <div class="product-info">
                <h3 class="product-title">{{items.name}}</h3>
                <p class="product-introduction"> 段位：
                  <span>{{items.grading}}</span>
                </p>
                <div class="clearfix">
                  <span class="price">￥{{items.price}}</span>

                  <div class="calc">
                    <span class="num">X{{items.count}}</span>
                  </div>

                </div>

              </div>
            </div>



          </div>


        </div>
      </div>


      <div class="check-all">
        <div class="circle-foot " :class="{'border-radius-all':!sign,'succeed':sign}" @click="checkdAll" id="all"></div>
        <span id="refresh" style="float: left;margin-left: 70px;color: #a2a2a2;font-size: 14px">数量：{{counts}}</span>
        <span class="deleteall" id="delete-all" @click="delectAll">删除</span>
      </div>


    </div>
</template>

<script>
  import  head from 'components/head'

  import {getOrderList,deleteAll} from 'config/api'

    export default {
        name: "my-order",
        data(){
          return{
            orderList:[],
            self:false,
            sign:false,
            count:0,
            arr:[],
          }
        },
        methods:{
          getList(){
            getOrderList().then((data)=>{

              if(data.data.order_list[0].length==0){
                this.orderList=[];
                return
              }
              let arr =data.data.order_list[0];
              arr.forEach((i)=>{
                i.self=false;
              });
              // console.log(this.orderList);

              this.orderList=arr;

              //this.list =a
              console.log(this.orderList);
            })
          },
          delectAll(){
              let arr=[];
              this.orderList.forEach((e)=>{
                  if(e.self){
                    arr.push(e.id);
                  }
              });
            if(arr.length<=0){
              alert('请勾选')
              return
            }
              deleteAll(arr).then((data)=>{
                this.getList();
              });

          },
          checkd(index){

          this.orderList[index].self= !this.orderList[index].self

          },
          checkdAll(){
            this.sign = !this.sign;

            if(this.sign){
              this.orderList.forEach((i)=>{
                i.self=true;
              });
            }else{
              this.orderList.forEach((i)=>{
                i.self=false;
              })
            }
            console.log(this.arr.length);
          }

        },
        computed:{
                  counts:function (){
                     let c = this.orderList.length;
                     let arr=[];
                   this.orderList.forEach((i)=>{
                        if(!i.self){
                         c--;
                          arr.push(i.id);
                        }else{

                        }
                    });

                   this.arr = arr;
                    ///console.log(this.arr);
                   return c;
              }
        },
        components:{
          "my-heads":head,
        },created(){
          this.getList();
        },
        watch:{
            orderList:{

              handler(oldVal){
                    let arr= [];
                oldVal.forEach((i)=>{
                  if(!i.self){

                    arr.push(i.id);
                  }
                });
                this.arr = arr;

              },
              deep:true
            }
        }
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
    height: calc(100% - 100px);
    overflow: hidden;
    overflow-y: auto;
    background: #f0f0f0;
    padding: 10px 10px 0 10px ;
  }

  .item-wrap{
    /*height: 115px;*/
    position: relative;
    margin-bottom: 10px;
  }
  .item-list{
    background: #f0f0f0;
    /*height: calc(100%  - 40px);*/
    overflow: hidden;
    overflow-y: auto;
  }
  .item{
    height: 115px;
    width: 100%;
    padding: 10px ;
    background: #fcfcfc;
    /*margin-bottom: 10px;*/
    position: relative;
  }

  .item>div {
    float: left;
  }
  .num{
    color: #bebebe
  }

  .check{
    background: #f8f8f8;
    min-width: 30px;
    width: 100%;
    height: 30px;
    line-height: 30px;
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
    margin-left: 20px;
    border-radius: 50%;
    border: 1px solid #e8e8e8;
  }
  .succeed{
    margin-left: 20px;
    /*position: absolute;*/
    width: 25px;
    height: 25px;
    /*left: -4px ;*/
    /*top: -5px;*/
    background: url("img/succeed.png");
    background-size: 25px 25px;
  }
  .status{
    float: right;
    margin-right: 20px;
    color: #87c369;
    font-size: 12px;
    /*font-weight: bold;*/
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
    width: 20px;
    height: 20px;
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

  .deleteall{
    width: 50px;
    font-size: 14px;
    float: right;
    margin-right: 20px;
    text-align: center;
    color: #626262;
  }

  .check-all{
    background: #fff;
    min-width: 30px;
    width: 100%;
    height: 45px;
    border-top: 1px solid #e8e8e8;
    line-height: 45px;
    text-align: center;
    vertical-align: middle;
    position:relative
  }
  .circle-foot{
    width: 24px;
    height: 24px;
    position: absolute;
    overflow: hidden;
    margin-left: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  .succeed-all{
    margin-left: 10px;
    /*position: absolute;*/
    width: 25px;
    height: 25px;
    /*left: -4px ;*/
    /*top: -5px;*/
    background: url("./img/succeed.png");
    background-size: 25px 25px;
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

</style>
