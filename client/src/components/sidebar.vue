<template>
  <div class="app">
    <!--<button @click="showMenu" class="btn">{{text}}</button>-->
    <transition name="move">
      <!--<div class="menu" v-show="show">-->
        <!--<div class="inner inner-1">1</div>-->
        <!--<div class="inner inner-2">2</div>-->
        <!--<div class="inner inner-3">3</div>-->


      <!--</div>-->
      <div class="menus"  v-show="show">
        <div class="shade" @click="hideDom" ></div>
        <div class="search">

          <!--<h3>测试内容</h3>-->

          <searchs></searchs>

        </div>
      </div>

    </transition>
  </div>
</template>

<script type="text/ecmascript-6">

  import searchs from 'components/search/search';

  export default {
    data () {
      return {
        show: false
      };
    },
    methods: {
      showMenu () {
        this.show = !this.show;
      },
      hideDom(){
        this.show = !this.show;
      }
    },
    computed: {
      text () {
        return this.show ? '收' : '开';
      }
    },
    components: {
      searchs

    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    .btn
      position: fixed
      bottom: 50px
      right: 10px
      z-index: 10
      width: 50px
      height: 50px
      line-height: 50px
      border-radius: 50%
      border: none
      outline: none
      color: #fff
      font-size: 18px
      background: blue
    .menu
      display none
      position: fixed
      bottom: 50px
      right: 10px
      width: 50px
      height: 50px
      border-radius: 50%
      transition: all .7s ease-in
    .menus
      /*display none*/
      z-index 1
      position: fixed
      top 0
      left: 0
      width: 100%
      height: 100%
      border-radius: 50%
      transition: all .3s
      &.move-enter-active//进入时的样式
        .search
          transition all .5s
          transform: translate3d(-100%, 0, 0)
          width 80%
          height 100%
          /*border 1px solid black*/
          background white
          z-index 1000
        .shade
          display block
          position absolute
          width 100%
          height: 100%
          background rgba(0,0,0,0)
          //z-index 1
          transition all 0.1s
        .inner
          transform: translate3d(0, 0, 0)
          transition-timing-function: cubic-bezier(0, .57, .44, 1.97)
        .inner-1
          transition-delay: .1s
        .inner-2
          transition-delay: .2s
        .inner-3
          transition-delay: .3s
      &.move-leave-active
        .search
          transition all .5s
          transform: translate3d(-100%, 0, 0)
          /*width 80%*/
          height 100%
          /*border 1px solid black*/
          background white
      &.move-enter, &.move-leave-active   //进入和离开

        .inner
          transition-timing-function: ease-in-out
        .inner-1
          transform: translate3d(0, 60px, 0)
          transition-delay: .3s
        .inner-2
          transform: translate3d(40px, 40px, 0)
          transition-delay: .2s
        .inner-3
         transform: translate3d(60px, 0, 0)
         transition-delay: .1s
      .inner
        display: inline-block
        position: absolute
        width: 30px
        height: 30px
        line-height: 30px
        border-radius: 50%
        background: red
        text-align: center
        color: #fff
        transition: all .4s

      .shade
        display block
        position absolute
        width 100%
        height: 100%
        background rgba(0,0,0,0.3)
        /*z-index 10*/
        transition all 0.1s

        //遮罩
      .search
        transition all .3s
        transform: translate3d(0, 0, 0)
        width 80%
        height 100%
        /*border 1px solid black*/
        background white !important
        z-index 1000
      .inner-1
        top: -50px
        left: 10px
      .inner-2
        left: -30px
        top: -30px
      .inner-3
        left: -50px
        top: 10px
</style>
