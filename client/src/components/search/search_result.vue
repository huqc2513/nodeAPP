<template>
  <div style="height: 100%;overflow: hidden">
    <heads :nub="1" :modules="'search'"  @showbox='changeDate' :keyword="keyword"> </heads>

    <div  v-if="shows" style="text-align: center;margin-top: 10px">
      <b>暂无数据</b>
    </div>

    <div class="wrap" v-if="!shows">
      <navs ref="navs" @loadDate='loadDate' :data="navList" :goodslist="goodslist" @changelist="changelist" :loadingText="loadingText" @changescroll="changescroll"> </navs>
    </div>

  </div>

</template>

<script>
  import  heads from './search_head'

  import navs from '../nav/nav'

  import {search} from 'config/api'



    export default {
        name: "search_result"
      ,
      data(){
          return{
            page:1,
            loadingText:'正在加载',
            loading:false,
            shows:false,
            navList:["综合排序","价格排序"],
            price_sort:false,
            goodslist:[],
            listarr:[],
            self:false,
          }
      },
      components:{
        heads,navs
      },
      mounted(){
//        this.$nextTick(function () {
//          this.scroll();
//        });
      },created(){
        this.getGoods();//获取数据

      },methods:{
        changescroll(page){
          this.$nextTick(() => {
                if(!this.self){
                  search(this.keyword, page).then((data) => {
                    if (data.data.list == '' || data.data.list == undefined || data.data.list == []) {
                      this.loadingText = '无数据了';
                      this.self=true;
                        setTimeout(function () {
                          that.$refs.navs.setloading();
                        },1000)

                    } else {
                      let that = this;
                      setTimeout(function () {
                        for(let i=0;i<data.data.list.length;i++){
                          that.goodslist.push(data.data.list[i]);
                        }
                        //that.$refs.navs.setloading();

                      },1000)


                    }
                  })
                }
              that.$refs.navs.setloading();
          })

        },
          loadDate(page,loading){     //监听滚动

          this.loading= !this.loading;


        },
          scroll(){
          let that = this;
        },
          getGoods(){
            this.keyword = this.$route.query.result;

            if(this.keyword){
                search(this.keyword,1).then((data)=>{
                // console.lo)
                if(data.data.list==''||data.data.list==undefined||data.data.list==[]){
                  this.shows = true;
                }else{
                  this.shows = false;
                  this.goodslist= data.data.list;
                //  this.listarr= data.data.list;
                }
              })
            }

          },
          changelist(index,name){
              if(name=='价格排序'){
                this.price_sort  = ! this.price_sort;
                let priceSort ;
                if(!this.price_sort){
                  priceSort = 'DESC';
                }else{
                  priceSort= 'ASC';
                }
                search(this.keyword,1,priceSort).then((data)=>{

                  if(data.data.list==''||data.data.list==undefined||data.data.list==[]){
                        this.shows = true;
                    console.log('无数据');
                  }else{
                    this.shows = false;
                    this.goodslist= data.data.list;
                    console.log('有数据');
                  }

                })

              }
              if(name=='综合排序'){
                search(this.keyword,1).then((data)=>{

                  if(data.data.list==''||data.data.list==undefined||data.data.list==[]){
                    this.shows = true;

                  }else{
                    this.shows = false;
                    this.goodslist= data.data.list;

                  }

                })
              }
          },
          changeDate(data){
          //  this.price_sort  = ! this.price_sort;
            let priceSort ;
            if(!this.price_sort){
              priceSort = 'DESC';
            }else{
              priceSort= 'ASC';
            }

            search(this.keyword,1,priceSort).then((data)=>{

              if(data.data.list==''||data.data.list==undefined||data.data.list==[]){
                this.shows = true;
                console.log('无数据');
              }else{
                this.shows = false;
                this.goodslist= data.data.list;
                console.log('有数据');
              }

            })


//         if(data.data.list.length>0){
//
//           this.goodslist= data.data.list;
//           this.shows=false;
//         }else{
//           //alert(1);
//           this.shows=true;
//         }

        }
      }
    }
</script>

<style lang="stylus" scoped>
 .wrap
   margin-top 10px
   //height calc(100% - 60px)!important
   height: calc(100% - 72px)!important
   border-top   1px solid #87c369
   overflow hidden

</style>
