<template>
    <div>
        <div class="wrap" v-for="item in listImg">
          <img :src='item.src' alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "goods_introduce",
        data(){
          return{
            listImg:[
              {src:require('./img/img_04.png')}
            ]
          }
        },
        created(){
            console.log(this.$router.param);
        }
    }
</script>

<style lang="stylus" scoped>
     .wrap
        width 100%
        img
          width 100%
          height 100%
</style>
