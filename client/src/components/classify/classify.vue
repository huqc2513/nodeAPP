<template>


  <div class="classify">

    <my-heads   @showbox="toshow" :back="false" :title=" '分类' " :nub="0"></my-heads>


    <sidebar ref="sidebar" ></sidebar>


    <!--主容器-->
    <div class="main-content">

      <div class="classify-list">

          <div v-for="item in imgSrc"  class="item">

          <router-link  tag="a"  :to="{path:'/goods_details/',query: {id:15}}" >

            <img :src=item.src alt="">
          </router-link>

          <div class="item-text">
            <h3 >{{item.name}}</h3>
            <span>{{item.type}}</span>
          </div>

        </div>




      </div>

    </div>

  </div>
</template>

<script>
  import head from 'components/head'
  import sidebar from 'components/sidebar'

  //import search from 'components/search/search'
  // console.log(Drawer);
  import  {getClassify} from 'config/api'
  export default {
    data(){
      return {
        pos: 'left',
        tran: 'overlay',
        drawerShow: false,
        imgSrc:[
//          {
//            src:require('../../assets/skin_03.png'),
//            type:'美妆个户',
//            name:'W I N E'
//          },
//          {
//            src:require('../../assets/skin_03.png'),
//            type:'美妆个户',
//            name:'W I N E'
//          },
//          {
//            src:require('../../assets/skin_03.png'),
//            type:'美妆个户',
//            name:'W I N E'
//          },
//          {
//            src:require('../../assets/skin_03.png'),
//            type:'美妆个户',
//            name:'W I N E'
//          }, {
//            src:require('../../assets/skin_03.png'),
//            type:'美妆个户',
//            name:'W I N E'
//          },

        ]
      }
    },
    methods: {
      toshow(e){
        this.$refs.sidebar.hideDom();
      }
    },
    created(){
      getClassify().then(data=>{
          if(data.data.code==200){
            let arr=[];
            console.log(data.data);
//    console.log(data);
        data.data.list.forEach(i=>{
              let obj ={src:i.src,type:i.c_name,name:i.introduce,id:i.classify_id
              };
              arr.push(obj);
            });
            if(arr){
              this.imgSrc=arr;
            }
          }
      })
    },
    components: { "my-heads":head, sidebar}
  }
</script>

<style lang="stylus" scoped>
  .classify
    height 100%

  button, input[type="button"], a.button {
    color: #fff;
    background-color: #3779d0;
    border: 0;
    font-size: 14px;
    border-radius: 4px;
    padding: 0px 8px;
    height: 40px;
    min-width: 40px;
    line-height: 40px;
    overflow: hidden;
    display: inline-block;
    outline: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    -webkit-transition: all;
    -moz-transition: all;
    transition: all;
    -webkit-transition-timing-function: linear;
    -moz-transition-timing-function: linear;
    transition-timing-function: linear;
    -webkit-transition-duration: .2s;
    -moz-transition-duration: .2s;
    transition-duration: .2s;
  }
  button:active{
    color: #fff;
    background-color: #377000;
  }
  .layout
    border:1px solid red
    display block
    width 200px


  .main-content{
    //border 1px solid red
    width: 100%;
    height: calc(100% - 50px);
    background: #fff;
    padding: 10px;
    overflow: hidden;
    overflow-y: auto;
  }
  .classify-list{
    width: 100%;
    height: 100%;

  }
  #footer{
    box-shadow:0 0 3px #e8e8e8;
    position: fixed;
    left: 0;
    bottom:0;
    width: 100%;
  }
  .item{
    position: relative;
    width: 100%;
    height: 125px;
    margin-bottom: 10px;
  }
  .item-text{
    display: inline-block;
    position: absolute;
    text-align: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .item h3{
    font-size: 21px;
    color: #ffffff;
  }
  .item span{
    font-size: 10px;
    color: #fff;
  }
  .item a img{
    width: 100%;
    height: 125px;
  }

</style>
