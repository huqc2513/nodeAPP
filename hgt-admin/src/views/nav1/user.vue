<template>

	<section style="width: 100%">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="keyword" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click.13="getUser">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
				<!--<el-table-column type="id" >-->
				<!--</el-table-column>-->
				<el-table-column prop="name" width='80' label="姓名"  >
				</el-table-column>

				<el-table-column prop="phone" label="手机号"  >
				</el-table-column>
				<el-table-column prop="is_admin" label="是否管理员"  >
				</el-table-column>

        <el-table-column prop="created_at" label="创建时间"  >

        </el-table-column>

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">设置权限</el-button>

          </template>
        </el-table-column>

			</el-table>

          <div style="width:100%;background: #f2f2f2;
              padding: 10px;
              margin: 10px 0;
              text-align: right;
              clear: both;
          "
          >

        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="6"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>

    </div>

		</template>

	</section>
</template>
<script>
	import { getUserList} from '../../api/api';
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
        currentPage1: 1,
        total:0,
        keyword:'',
				filters: {
					name: ''
				},
				loading: false,
				users: [
				]
			}
		},
		methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
       this.getUser(val)
      },
			//获取用户列表
			getUser: function (val) {
        if(!val){
          val=1
        }
        let obj ={
          nub:val,
          page:6,
          keyword:this.keyword
        };

        getUserList(obj).then((res) => {
          this.users = res.data.list;
           this.total=res.data.totalElement;
        });

			}
		},
		mounted() {
      this.getUser();



		}
	};

</script>

<style scoped>

</style>
