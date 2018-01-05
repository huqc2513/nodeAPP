<template>
  <div >

        <div class="nav-bar">

          <div  class="nav" v-for="(name,index) in data"  @click="getDate(index,name)">
            <p :class="{'g-color':index!=nums}" >

              <b v-if="name=='价格排序'">
                {{name}}
                <i class="el-icon-caret-bottom" v-if="!sjx"></i>
                <i class="el-icon-caret-top" v-if="sjx"></i>
              </b>

              <b v-else="name!='价格排序'">
                {{name}}
              </b>

            </p>
            <i :class="{'line':index==nums}"></i>
          </div>
        </div>



    <div  >



      <div class="product-list"  id="test"  >


        <div    class="item"   v-for="(item,index) in goodslist" v-if="goodslist">

          <router-link    :to="{path:'/goods_details/',query: {id:item.id}}">

            <div class="img-box">
              <img  :src=item.imgScr  alt="">
            </div>
            <p   class="product-title">
              {{item.name}}
            </p>
            <div class="wrap-price">
              <span class="price">{{item.price}}</span>
              <span class="area">{{item.site}}</span>
            </div>
            <div class="sc-icon xixin"></div>
          </router-link>
        </div>




      </div>


    </div>
    <!--产品列表-->


    <!--<div class="product-list"   >-->

      <!--&lt;!&ndash;<mu-list id='scrollTest' style="width: 100%;text-align: left;vertical-align: top">&ndash;&gt;-->
        <!--&lt;!&ndash;<template>&ndash;&gt;-->
          <!--<div    class="item"   v-for="(item,index) in goodslist" v-if="goodslist">-->

            <!--<router-link    :to="{path:'/goods_details/',query: {id:item.id}}">-->

              <!--<div class="img-box">-->
                <!--<img  :src=item.imgScr  alt="">-->
              <!--</div>-->
              <!--<p   class="product-title">-->
                <!--{{item.name}}-->
              <!--</p>-->
              <!--<div class="wrap-price">-->
                <!--<span class="price">{{item.price}}</span>-->
                <!--<span class="area">{{item.site}}</span>-->
              <!--</div>-->
              <!--<div class="sc-icon xixin"></div>-->
            <!--</router-link>-->
          <!--</div>-->
        <!--&lt;!&ndash;</template>&ndash;&gt;-->






  <!--</div>-->
    <div v-show="!goodslist">
      <b>暂无数据!!</b>
    </div>

    </div>
</template>

<script>
  import  {getHot} from 'config/api'

    export default {

        data(){
//          const list = []
//          for (let i = 0; i < 10; i++) {
//            list.push('item' + (i + 1))
//          }
            return{
              list:[1,2,3,4,5],
              msg:'正在加载中',
              nums:0,
              numa: 10,
              page:1,
              sjx:true,
            scroller: null,
              loading:true,
            }
        },
        props:{
          loadingText: {
            type: String,
            default: '正在加载。。'
          },
          loadings:{
            type:Boolean,
            required: false,
            default: true,
          },
          goodslist:{
            type: Array,
            required: false,
            default: [],
          },
          data:{
              type: Array,
              required: false,
              default: "默认",
          },
          num:{
            type: Number,
            required: false,
            default: 1,
          }
        },methods:{

        getDate(index,name){

              this.nums=index;
              this.sjx= !this.sjx;
            this.$emit('changelist',index,name);

        },

      },
      mounted (){

      }
    }
</script>

<style lang="stylus" scoped>


  .mu-list
    display inline-block
    overflow hidden
    overflow-y auto
  .item
    width: 48%;
    margin-bottom: 10px;
    display inline-block
    vertical-align top
    padding 0 5px
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
    /*border:1px solid black*/
    min-height 228px
    max-height 506px
    overflow hidden
    overflow: auto;
    overflow-y auto

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
    height: 260px;
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
  /*收藏图标*/
  .sc-icon{
    display: inline-block;
    position: absolute;
    right: 5px;
    top: 8px;
    width: 25px;
    height: 25px;
    background:url(./img/img.png) no-repeat;
    background-size:47px 22px;
  }

  /*已收藏*/
  .xixin{
    background-position:-27px 0;
  }
  .unxinxin{
    background-position:0 0;
  }

  .demo-infinite-container{
    width: 256px;
    height: 300px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid #d9d9d9;
  }
</style>


<!--<template>-->

<!--</template>-->

<!--<script>-->
  <!--export default {-->
    <!--data () {-->
      <!--const list = []-->
      <!--for (let i = 0; i < 10; i++) {-->
        <!--list.push('item' + (i + 1))-->
      <!--}-->
      <!--return {-->
        <!--list,-->
        <!--num: 10,-->
        <!--loading: false,-->
        <!--scroller: null-->
      <!--}-->
    <!--},-->
    <!--mounted () {-->
      <!--this.scroller = this.$el-->
    <!--},-->
    <!--methods: {-->
      <!--loadMore () {-->
        <!--this.loading = true-->
        <!--setTimeout(() => {-->
          <!--for (let i = this.num; i < this.num + 10; i++) {-->
            <!--this.list.push('item' + (i + 1))-->
          <!--}-->
          <!--this.num += 10-->
          <!--this.loading = false-->
        <!--}, 2000)-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style lang="css">-->

<!--</style>-->
