<template>


  <div style="height: 100%;width: 100%">

    <my-heads   @showbox="toshow" :back="false" :title=" '海龟淘' " :nub="1"></my-heads>

    <div class="mains">
      <swiper :listImg="listImg"></swiper>

      <div class="advertising">
        <img src="../home/img/banner2.png" alt="">
      </div>

        <keep-alive>
          <!--<div style="height: 400px;">-->
                <my-nav @changelist='changelist' :data="navList" :goodslist="goodslist"></my-nav>

          <!--</div>-->
        </keep-alive>

      <!--搜素-->
      <sidebar ref="sidebar"> </sidebar>


    </div>

  </div>
</template>

<script>

  import  head from 'components/head'
  import swiper from 'components/swiper'
  import foot from 'components/foot/foot'
  import nav from 'components/nav/nav'

  import sidebar from 'components/sidebar'

  import  {getHot,getNewGoods} from "../../../config/api";

  export default {
    name: "homes",
    data(){
      return{
        goodslist:[],
        listImg: [{
          url: 'static/img/banner1_02.png'
        },{
          url: 'static/img/banner1_02.png'
        },{
          url: 'static/img/banner1_02.png'
        },{
          url: 'static/img/banner1_02.png'
        },{
          url: 'static/img/banner1_02.png'
        }
        ],
        navList:["新品上市","热销推荐"]
      }
    },
    methods:{
      changelist(index,name){

           if(index==0){
             getNewGoods().then((data)=>{

               this.goodslist = data.data.list;
             });

           }else if(index==1){


             getHot().then((data)=>{
                  // console.log(data.data);
                  this.goodslist = data.data.list;
             })

           }
      },
      toshow(e){
          this.$refs.sidebar.hideDom();
      }
    },
    components:{
      "my-heads":head,
        swiper,
      'my-nav':nav,
      'my-footer':foot,
      sidebar
    },created(){

        getNewGoods().then((data)=>{
          this.goodslist = data.data.list;
        });
    }
  }

</script>

<style lang="stylus" scoped>
  .active
    color #87c369
  .mains
    /*border 1px solid red*/
    width 100%;
    height calc( 100% - 50px )
    overflow hidden
    overflow-y auto
  .header
    display block
    border 1px solid red
  .advertising img{
    width: 100%;
    height: 180px;
  }

</style>
