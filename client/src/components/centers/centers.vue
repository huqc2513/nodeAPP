<template>
    <div>



      <my-heads   :module="'centes'" @showbox="toshow" :back="false" :title=" '个人中心' " :nub="1"></my-heads>

      <div class="main-content">

        <div class="portrait-img">
          <div class="img-box">
              <img :src=user_img  alt="" >
          </div>
          <p class="user-name">{{user_name}}</p>
        </div>

       <div class="menu">

          <mu-list-item class='item' title="个人中心" @clck="msg">
              <i class="el-icon-more fonts"></i>
          </mu-list-item>



            <mu-list-item  to='/myorder' class='item' title="我的订单">
              <!--<router-link   tag="i" to="/myorder" >-->
              <i class="el-icon-message fonts" ></i>
              <!--</router-link>-->
            </mu-list-item>



          <mu-list-item class='item' title="我的收藏" @clck="msg" >
            <i class="el-icon-tickets fonts"></i>
          </mu-list-item>

          <!--<div @click="logout">-->
            <mu-list-item  @click="logout" class='item' title="退出登陆">
              <i class="el-icon-setting fonts"></i>
            </mu-list-item>

          <!--</div>-->


        </div>

      </div>

      <!--搜素-->
      <sidebar ref="sidebar"></sidebar>


    </div>
</template>

<script>
    import  head from 'components/head'
    import swiper from 'components/swiper'
    import foot from 'components/foot/foot'
    import nav from 'components/nav/nav'
    import sidebar from 'components/sidebar'

    import {logout} from 'config/api';
    // import mobileTearSheet from '../../../components/mobileTearSheet'

    export default {
        name: "personal-center",
      data(){
        return{
          user_img:require('./img/user-portrait.png'),
          user_name:' ',
        }
      },
      methods:{
        toshow(e){
          this.$refs.sidebar.hideDom();
        },
        msg(){
          alert('暂未开发');
        },
        logout(){

          logout().then(data=>{
            console.log(data);
            if(data.data.code==-1){
                alert('退出登录成功');
                this.$router.push({path:'/login'});
            }
          })
        }
      },
      mounted(){
        let user =  JSON.parse (sessionStorage.getItem('user'));
          if(user){
            this.user_name = user.username;

          }


      },
      components:{
        "my-heads":head,
        sidebar,

      }
    }
</script>

<style lang="stylus" scoped>
  .item
    position relative
    font-size 24px
    border-bottom 1px solid #e8e8e8
    margin  0 10px
    margin-bottom 10px


    .fonts
        font-size: 20px;
        position: absolute;
        top:9px
        right 32px
  .active
    color #87c369
  #header{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
  }
  .main-content{
    //height: calc(100% );
    margin-top:50px;
    //overflow: hidden;
  }
  #footer{
    position: fixed;
    left: 0;
    bottom:0;
    width: 100%;
  }
  .portrait-img div

  .img-box
    margin  0 auto
    width 120px
    height: 120px
    border-radius 50%;
    overflow hidden

  .portrait-img{
    text-align: center;
  }
  .user-name{
    font-size: 16px;
    margin: 10px 0;
    font-family: '宋体';
    font-weight: bold;
  }
  .portrait-img div img{
    //margin-top: 35px;
    width: 120px;
    height: 120px;
  }
  .menu{
    margin-top: 45px;
    width: 100%;
  }
  .menu li{
    width: 100%;
    height: 50px;
    font-weight: 500;
    line-height: 50px;
    border-bottom: 1px solid #e8e8e8;
    padding: 0 30px;
  }
  .menu li:last-child{
    border-bottom: none;
  }
  //.header_portrait

</style>
