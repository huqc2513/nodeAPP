<template>

  <div class="swiper-container" :style="{'height':height+'px'}" >

      <div class="swiper-wrapper">
            <div  v-for="str in listImg" class="swiper-slide" :style="{ backgroundImage: 'url(' + str.url + ')' }" >
            </div>
      </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>

  </div>
</template>

<script>
  import Swiper from 'swiper';

  export default {
    props:{
      height:{
        type:Number,
        require:false,
        default:130,
    } ,
      listImg:{
        type:Array,
        require:false,
      }
  },
    mounted() {
        this.init();

    },
    methods:{
      init(){
        if(this.listImg!='') {
          this.$nextTick(function () {
            let swiper = new Swiper('.swiper-container', {
              pagination: {
                el: '.swiper-pagination'
              },
              paginationClickable: true,
              observer: true,//修改swiper自己或子元素时，自动初始化swiper
              observeParents: true,//修改swiper的父元素时，自动初始化swiper
              speed: 600,
              autoplay: 4000,
              loop: true,
            });
          });
        }
      }
    },
    watch:{
      listImg:{
        handler(now){
          this.init();
        },
        deep:true
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-container img{
    height 100%
    width: 100%
  }

  .swiper-container {
    width: 100%;
    height: 13rem;
    .swiper-wrapper {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }

  }
</style>
