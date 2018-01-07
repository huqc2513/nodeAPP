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
      <el-table-column prop="id" label="订单编号" width="150" >
      </el-table-column>
      <el-table-column prop="address" label="收获地址" >
      </el-table-column>
      <el-table-column prop="created_at" label="订单创建时间"  width="150" sortable>
      </el-table-column>
      <el-table-column prop="total_price" label="订单价格" >
      </el-table-column>
      <el-table-column prop="userid
" label="用户"  >
      </el-table-column>
      <el-table-column  label="订单状态" sortable>
        <template slot-scope="scope">
          {{scope.status==A?'未配送':'其他' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
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


    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="70%"
    >


      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">

        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="生产地">
          <el-input v-model="editForm.site"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="editForm.price"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>


        <el-form-item label="商品图片">
          <img :src='editForm.imgScr' alt="">
        </el-form-item>





        <el-upload
          class="upload-demo"
          action="http://localhost:3006/upload"
          :on-preview="handlePreview"
          name="file"
          :on-success="on_success"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>

        </el-upload>



      </el-form>





      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>






    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="addForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  import util from '../../common/js/util'

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
      on_success(response, file, fileList){
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




        let obj ={
          pageCount:this.filters.pageCount,
          nub:this.filters.count,
          keyword:this.filters.name
        };
        if(obj.keyword){
          obj.nub=1;
        }
        getorderlist(obj).then(data=>{
          this.listLoading = false;

          if(data.data.code==500){

            this.$message.error('错误');

          }else{
            this.users =data.data.list;

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
          let para = { id: row.id };
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
        this.dialogVisible=true;
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
          let para = { ids: ids };
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
          this.users =data.data.list;

          this.total =data.data.totalElement;

        }
      });
    }
  }

</script>

<style scoped>

</style>
