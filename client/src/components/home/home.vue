<template>


  <div style="height: 100%;width: 100%">


      <div class="main">
        <keep-alive>
              <router-view></router-view>
          </keep-alive>
      </div>


    <div class="foot" id="footer">

          <footer class="clearfix">

          <div >
            <router-link  tag="i" to="/home/index" class=" iconfont icon-zhuye" active-class="actives">
            <!--<i   class=" iconfont icon-zhuye"></i>-->
            </router-link>
          </div>



              <div>
                <router-link  tag="i" to="/home/classify" class="iconfont icon-fenlei" active-class="actives" >

                </router-link>

              </div>




            <div>
              <router-link  tag="i" to="/home/shopping_cart" class="iconfont icon-gouwuchekong">
            </router-link>
            </div>



                <div>
                  <router-link  tag="i" to="/home/personal_center" class="iconfont icon-yonghu">

                  </router-link>
                </div>


          </footer>

    </div>


  </div>
</template>

<script>
  import homes from 'components/homes/homes'
  import  head from 'components/head'
  import swiper from 'components/swiper'
  import foot from 'components/foot/foot'
  import nav from 'components/nav/nav'

    export default {
        name: "home",
        data(){
          return{
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
        components:{
          homes,
          "my-heads":head,
            swiper,
          'my-nav':nav,
          'my-footer':foot
        }
    }

</script>

<style lang="stylus" scoped>
  .active
    color #87c369
  #footer
    position absolute
    left 0
    buttom 0
    height 50px
    overflow hidden
    /*border 1px solid black*/
  .main
    /*border 1px solid blue*/
    height calc( 100% - 50px)
    overflow hidden
    /*overflow-y auto*/
  .actives
    color #eb6100

  .header
    display block
    border 1px solid red
  .advertising img{
    width: 100%;
    height: 180px;
  }
  .foot
    width 100%
    height 50px
    border-top 1px solid #e8e8e8
  footer{
    display: flex;
    height: 50px;
    width: 100%;
    flex-wrap:nowrap;
    align-items:center;
    background: #ffffff;
    border-top: 1px solid #e8e8e8;

  }
  footer div{
    flex: 1;
    text-align: center;
  }
  footer div i{
    color: #87c369;
    flex: 1;
    text-align: center;
  }
  .icon-home{
    font-size: 24px;
  }

</style>
