<template>
    <div style="background: white; padding: 10px 0">
        <div  class="wrap-box" v-for="item in comment" :name="item.comment_id" v-if="comment.length>0">

            <div class="left-box">
                <div class="img-box">
                    <img :src=item.src alt="">
                    <p class="user_name">{{item.username}}</p>
                </div>

            </div>
            <div class="right-box">
                <b class="content">{{item.content}}</b>
                <span class="color-class">
                  颜色分类: &nbsp; {{item.product_class}}
                </span>
                <div style="margin-top: 10px">
                  <div>
                  <b>产品：</b>
                  <el-rate
                    style="display: inline-block"
                    v-model="item.product_grade"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                  </el-rate>
                </div>

                  <div>
                    <b>物流：</b>
                    <el-rate
                      style="display: inline-block"
                      v-model="item.wl_grade"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate>
                  </div>

                  <div>
                    <b>服务：</b>
                    <el-rate
                      style="display: inline-block"
                      v-model="item.product_server"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate>
                  </div>

                </div>
            </div>
        </div>

        <div v-if="comment.length==0" style="width: 100%;text-align: center;">
            <b>赞无评论</b>
        </div>
    </div>
</template>

<script>
    export default {
        name: "goods_comment",
        data(){
          return{

            comment:[
//              {
//                src:'',
//                name:'小明',
//                content:'非常好用，不错!',
//                color:'清洁款 蓝色',
//                graded:{
//                  value5:3.7,
//                  value6:4.7,
//                  value7:2.1
//                }
//              },
//              {
//                src:'',
//                name:'小飞',
//                content:'还可以!',
//                color:'黑色',
//                graded:{
//                  value5:5,
//                  value6:5,
//                  value7:5
//                }
//              }
            ],
          }
        },
        created(){
          if(this.$route.query.commentlist){
                this.comment = JSON.parse(this.$route.query.commentlist)
          }
        }

    }
</script>

<style  lang="stylus" scoped>
  .wrap-box
    background #f5f5f5
    width 100%
    height 180px
    display: flex
    flex-direction: row
    align-items:center
    margin 10px 0
    .left-box
      height 100%
      flex-grow:1
      display flex
      padding-top 15px
      //align-items:center
      .img-box
          width 100px
          height 100px
          margin 0 auto
          border-radius 50%
          background white
          /*border 1px solid red*/
          .user_name
            text-align center
            position relative
            top 84px
    .right-box
      height 100%
      flex-grow:4
      display: flex
      padding 10px 0
      padding-left 10px
      flex-direction  column

      .content
        display block
        width 100%
        margin-bottom 5px
        min-height 30px

      .color-class
         display block
         color #8d8d8d

         font-size 20px
          margin 0 5px
          height 30px
      .text
          display block
          margin-left 15px
          height 30px
</style>
