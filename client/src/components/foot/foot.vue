<template>
    <div class="foot">
      <footer class="clearfix">
              <!--<router-link :to="{ name: '/homes',}">-->
                      <div>
                        <i class=" iconfont icon-zhuye"></i>
                      </div>
              <!--</router-link>-->
            <!--<router-link :to="{ name: '/lists',}">-->
                        <div>
                          <i class="iconfont icon-fenlei"></i>
                        </div>
              <!--</router-link>-->
            <!--<router-link :to="{ name: '/shop-cart',}" >-->
                      <div>
                        <i class="iconfont icon-gouwuchekong"></i>
                      </div>
            <!--</router-link>-->
                <!--<router-link :to="{ name: '/center',}"  >-->
                    <div>
                      <i class="iconfont icon-yonghu"></i>
                    </div>
                <!--</router-link>-->

      </footer>
    </div>
</template>

<script>
    export default {
        name: "foot"
    }
</script>

<style lang="stylus" scoped>
  .foot
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
