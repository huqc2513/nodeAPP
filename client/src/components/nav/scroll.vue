<template>
  <div>
    <v-scroll :on-refresh="onRefresh" style="height: 200px;border: 1px solid red" :on-infinite="onInfinite">
      <ul >
        <li style="text-align: center;height: 40px
" v-for="i in downdata"> s</li>

      </ul>
    </v-scroll>
  </div>
</template>
<script>
  import Scroll from './test';

  export default{
    data () {
      return {
        counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
        num : 15,  // 一次显示多少条
        pageStart : 0, // 开始页数
        pageEnd : 0, // 结束页数
        listdata: [], // 下拉更新数据存放数组
        downdata: [1,1,1,1,1,1]  // 上拉更多的数据存放数组
      }
    },
    mounted : function(){
      this.getList();
    },
    methods: {
      getList(){
        // for(let i=0;i<10;i++){
        //   this.downdata.push(i)
        // }

      },
      onRefresh(done) {//下拉刷新

        done() // call done

      },
      onInfinite(done) {
       // alert(3);

      }
    },
    components : {
      'v-scroll': Scroll
    }
  }
</script>
