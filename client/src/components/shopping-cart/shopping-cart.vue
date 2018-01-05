
<template>
    <div style="height: 100%">
      <my-heads  @showbox="showbox"  :back="false" :title=" '购物车' " :nub="0"></my-heads>



        <!--主容器-->
        <div class="main-content">

          <goodslist @changeDelete="changeDelete" @showbox="toshow" ref='goodslist' :goodslist.Sync="goodslist" v-if="goodslist"></goodslist>

        </div>

      <!--toshow(e){-->
      <!--this.$refs.sidebar.hideDom();-->
      <!--}-->

      <count :nub.Sync="this.totalcount" :is_checked='this.is_checked' :goodslist.Sync="goodslist" @selectAll='selectAll' ref='count'  :price="this.totalPrice" @empty="empty"></count>

      <!--搜素-->
      <sidebar ref="sidebar"></sidebar>

    </div>


</template>


<script>
    import head from 'components/head'
    import  count from 'components/shopping-cart/count'
    import  goodslist from './goods-list'

    import sidebar from 'components/sidebar'

   import {getShopcatlist,shopcat_del} from 'config/api'

    export default {
        name: "shopping-cart",
        data(){
          return{
            totalPrice:0,
            totalcount:0,
            sign:false,
            self:false,
            is_checked:false,
            goodslist:[
              {
                // cartid:1,
                // count:1,
                // id:1,
                // imgScr:require('./img/product.png'),
                // name:'宝贝儿奶粉',
                // price:'179',
                // is_class:false,
              }
            ]
          }
        },
       methods:{
         empty(){
           this.totalcount=0;
         },
         changeDelete(index,id){
           getShopcatlist().then(data=>{

             if(data.data.code==1){
               // is_class

               let arr =data.data.list;
               arr.forEach(i=>{
                 i.is_class=false;
               });

               this.goodslist =  arr;
             }
           });

          //  delete this.goodslist[index];
           //this.goodslist.splice(index,1);
           // alert(11);
         },//删除
         showbox(e){
           this.$refs.sidebar.hideDom();
         },
          //计算总价格e
         toshow(msg,count,list){
           this.totalPrice= msg;
           //判断是否全选
           this.totalcount= parseInt(count);
           //console.log(list);
           this.goodslist= list;
           this.$refs.count.unchecked();

         },

         //触发全选
         selectAll(info,num){
            // this.goodslist.forEach(i=>{
            //   i._isclass= !i._isclass;
            //
            // });
           this.totalPrice=info;
           this.totalcount= num;
           },
          selecetA(){
           let len =  this.goodslist.length;
           let sum =0;
           this.goodslist.forEach((i)=>{
              if(!i.is_class){

                this.is_checked=false;
              }
           });
            return true;
         }
       },
        components:{
          'my-heads':head,
            count,goodslist,
            sidebar
        },created(){

            getShopcatlist().then(data=>{

                if(data.data.code==1){
                  // is_class

                  let arr =data.data.list;
                  arr.forEach(i=>{
                    i.is_class=false;
                  });
                  this.goodslist =  arr;
                }else if(data.data.code==-1){
                      this.$router.push({path:'/'});
                }
            }
        )
      }

    }
</script>

<style  lang="stylus" scoped>
  .active
    color #87c369
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
</style>
