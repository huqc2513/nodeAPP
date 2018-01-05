<template>
    <div>
      <div class="nav-bar">


        <!--产品导航-->
        <div  class="nav" style="background: #ffffff" v-for="(item,index) in data" @click="getDate(index,item.name)">
              <p :class="{'g-color':index!=nums}">
                <b>{{item.name}} {{item.count |sum}}</b>
              </p>

          <i :class="{'line':index==nums}"></i>

        </div>
      </div>

  <!--产品图片-->
      <div style="padding-top: 20px;background: #ffffff" >
        <router-view></router-view>
      </div>

    </div>
</template>

<script>
  export default {
    name: "goods_img",
    data(){
      return{
        goodslist:[
          {name:'产品细节'},
          {name:'评论',count:0}
        ],
        nums:0,
      }
    },
    props:{
      comment:{
        type: Array,
        required: false,
        default: [],
      },
      data:{
        type: Array,
        required: false,
        default: [],
      },
      num:{
        type: Number,
        required: false,
        default: 1,
      }
    },methods:{

      getDate(index,name){

        this.nums=index;

        if(name=='产品细节'){
          this.$router.push({path:'/goods_details/goods_introduce',param:{id:'1'}});
        }else if(name=='评论'){
//               alert(this.comment);
          if(this.comment){

            let str =JSON.stringify(this.comment);

            this.$router.push({path:'/goods_details/goods_comment',query:{id:'1',commentlist:str}});
          }

        }
      }
    },
    created(){

    },
    filters: {
      sum: function (value) {
        let v='';
        if(parseInt(value)>0&&value!=undefined){
          v= `(${value})`
        }

        return v
      },

    }

  }
</script>

<style  lang="stylus" scoped>




  .item
    width: 48%;
    margin-bottom: 10px;

  .sign{
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    border: none;
    background: #87c369;
    margin: 0 5px;
  }
  .sign-active{
    transition: all 1s;
    transform:scale(2);
  }
  .nav-bar{
    display: flex;
    flex-direction:row;
    flex-wrap:nowrap;
    justify-content:space-around;
    height: 40px;
    line-height: 40px;
    text-align: center;
    width: 100%;
  }
  .nav{
    position: relative;
    flex: 1;
  }
  .line{
    display: block;
    position: absolute;
    left: 50%;
    bottom: 3px;
    transform:translateX(-50%);
    width:30%;
    border-bottom: 1px solid #87c369;
  }

  .g-color{
    color: #989797;
  }
  .active{
    color: #87c369 ;!important;
    position: relative;
  }

  .icon-shouqi{
    font-size: 16px;
  }
  .sj{
    margin-left: 5px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 7px solid #87c369;
  }
  /*产品列表*/
  .product-list{

    text-align center
    padding: 0 15px;
    width 100%
    display: flex;
    flex-wrap:wrap;
    justify-content:space-between;
    margin-top 1rem
  }
  .product-list .item{
    width: 48%;
    margin-bottom: 10px;
    /*height: 260px;*/
    /*border: 1px solid #e8e8e8;*/
  }
  .img-box{
    margin-bottom: 5px;
  }
  .img-box img{
    width: 100%;
    height: 100%;
  }

  .price{
    float: left;

    color: #87c369;
    font-size: 16px;
  }
  .product-title{
    padding: 0 5px ;
    font-size: 12px;
    font-family: '微软雅黑';
    line-height: 17px;
    max-height: 34px;
    overflow: hidden;
    text-align left
  }
  .wrap-price{
    height: 30px;
    line-height: 30px;
    vertical-align: middle;

    position: relative;
  }
  .area{
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #a8a8a8;
  }
  .item{
    position: relative;
  }


  /*已收藏*/
  .xixin{
    background-position:-27px 0;
  }
  .unxinxin{
    background-position:0 0;
  }
</style>
