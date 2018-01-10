<template>

  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" >
      </el-table-column>
      <el-table-column prop="id" label="编号" width="50" >
      </el-table-column>
      <el-table-column prop="address" label="收获地址" >
      </el-table-column>
      <el-table-column prop="create_time" label="订单创建时间"     :formatter="dateFormat"   width="170" sortable>
      </el-table-column>
      <el-table-column prop="total_price" label="订单价格" >
      </el-table-column>
      <!--<el-table-column prop="userid" label="用户"  >-->

      <!--</el-table-column>-->
      <el-table-column prop="name" label="用户名称" >
    </el-table-column>

      <el-table-column prop="phone" label="手机号" >
      </el-table-column>

      <el-table-column  label="订单状态" sortable>
        <template slot-scope="scope">
          {{scope.status=='A'?'未配送':'其他' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>

        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>

      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="filters.pageCount" :total="total" style="float:right;">
      </el-pagination>


    </el-col>











  </section>
</template>

<script>
  import util from '../../common/js/util'

  import moment from 'moment'


  import { getorderlist,login} from '../../api/api';

  //getGoodsList

  export default {
    data() {
      return {

        fileList: [],
        filters: {
          name: '',
          count:1,
          pageCount:6,
        },
        users: [],
        total: 0,
        page: 1,
        listLoading: false,
        dialogVisible:false,
        sels: [],//列表选中列
        editFormVisible: true,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          id: 0,
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        },

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        }

      }
    },
    methods: {
      //时间格式化
      dateFormat: function (row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },

      on_success(response, file, fileList) {
        // alert('chengoggn');
        console.log(file);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },

      handleCurrentChange(val) {
        this.filters.count = val;
        this.getUsers();
      },
      //获取用户列表
      getUsers() {


        this.listLoading = true;


        let obj = {
          pageCount: this.filters.pageCount,
          nub: this.filters.count,
          keyword: this.filters.name
        };
        if (obj.keyword) {
          obj.nub = 1;
        }
        getorderlist(obj).then(data => {
          this.listLoading = false;

          if (data.data.code == 500) {

            this.$message.error('错误');

          } else {

            this.users = data.data.list;

          }
        });


        this.listLoading = false;

      },
      //删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {id: row.id};
          //  	removeUser(para).then((res) => {
          // 	this.listLoading = false;
          // 	//NProgress.done();
          // 	this.$message({
          // 		message: '删除成功',
          // 		type: 'success'
          // 	});
          // 	this.getUsers();
          // });
        }).catch(() => {

        });
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.dialogVisible = true;
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
        console.log(this.editForm);
      },
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        };
      },
      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              editUser(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                //	this.editFormVisible = false;
                this.getUsers();
              });
            });
          }
        });
      },
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.addForm);
              para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              addUser(para).then((res) => {
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getUsers();
              });
            });
          }
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //批量删除
      batchRemove: function () {
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {ids: ids};
          batchRemoveUser(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getUsers();
          });
        }).catch(() => {

        });
      }
    },
    created() {

      let obj ={
        pageCount:4,
        nub:1,
      };
      getorderlist(obj).then(data=>{
        this.listLoading = false;

        if(data.data.code==500){

          this.$message.error('错误');

        }else{
          // console.log(data.data.list);
          this.users =data.data.list;

          this.total =data.data.totalElement;

        }
      });
    }
  }

</script>

<style scoped>

</style>
