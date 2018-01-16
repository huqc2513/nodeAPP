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

        <el-cascader
          :options="options"
          :show-all-levels="false"
          @change="change"
        ></el-cascader>


      </el-form>
    </el-col>


  <div class="el-col-24">
    <!--列表-->
    <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">

      <el-table-column type="selection" >
      </el-table-column>


      <el-table-column prop="type" label="类型" width="150" >
      </el-table-column>

      <!--<el-table-column prop="number" label="产品数量" >-->
      <!--</el-table-column>-->

      <el-table-column prop="introduce" label='分类介绍'>
      </el-table-column>

      <el-table-column prop="childrenCount" label='子分类数目'>
      </el-table-column>

      <el-table-column prop="introduce" label='分类封面图片'>
        <template slot-scope="scope">
          <img :src="scope.row.src" alt="" width="40" height="40" style="border-radius: 50%">
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" >批量删除</el-button>

      <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="2" style="float:right;" >
      </el-pagination>


    </el-col>
  </div>





    <!--<el-dialog-->
      <!--title="编辑"-->
      <!--:visible.sync="dialogVisible"-->
      <!--width="70%"-->
    <!--&gt;-->


      <!--<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">-->

        <!--<el-form-item label="姓名" prop="name">-->
          <!--<el-input v-model="editForm.name" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="生产地">-->
          <!--<el-input v-model="editForm.site"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="价格">-->
          <!--<el-input v-model="editForm.price"></el-input>-->
        <!--</el-form-item>-->



        <!--<el-form-item label="商品图片">-->
          <!--<hr>-->
          <!--<p v-show='editForm.images' style="height: 15px;margin: 0;clear: both;line-height: 15px-->
<!--;position: relative;top:-10px;font-size: 12px;">标注：绿色框为商品封面,点击可切换商品封面图</p>-->

          <!--&lt;!&ndash;<p v-show='editForm.images==[]' style="text-align: center">&ndash;&gt;-->

          <!--&lt;!&ndash;此商品暂无图片&ndash;&gt;-->

          <!--&lt;!&ndash;</p>&ndash;&gt;-->

          <!--<div :class="{'img_box':true,'border':item.is_cover=='yes'?true:false}" v-for="(item,index) in editForm.images" @click="check_is_cover(index)">-->

            <!--<div class="wrap">-->

              <!--<img :src='item.images_path' alt="">-->
            <!--</div>-->
            <!--<div style="text-align: center;">-->
              <!--<el-button @click='del_image(item,index)'type="primary" icon="el-icon-delete"></el-button>-->

              <!--<div style="text-align: center;padding-top: 10px">-->
                <!--<div style="width:40px;margin: 0 auto">-->

                <!--</div>-->
              <!--</div>-->
            <!--</div>-->

          <!--</div>-->




        <!--</el-form-item>-->





      <!--</el-form>-->




      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="editProduct(editForm)">确 定</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->





    <!--新增界面-->


    <el-dialog
      title="新增"
      :visible.sync="addFormVisible"
      width="70%"
    >


      <el-form :model="addForm"   label-width="80px" :rules="addFormRules" ref="addForm">

        <div>
          <el-form-item label=""  prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="所属分类" prop="name">
            <el-input v-model="addForm.category" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="生产地址" prop="name">
            <el-input v-model="addForm.site" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="段位" prop="name">
            <el-input v-model="addForm.grading" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="价格" prop="name">
            <el-input v-model="addForm.price" auto-complete="off"></el-input>
          </el-form-item>
        </div>



      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native=remove_submit()>取消</el-button>
        <el-button type="primary" @click.native="addSubmit()" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>

  import util from '../../common/js/util'





  import { getGoodsList,product_classify,getClassify} from '../../api/api';


  export default {
    data() {

      return {

        options: [],//分类
        total: 0,
        page: 1,

        dialogVisible:false,
        sels: [],//列表选中列
        editFormVisible: true,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            { required: false, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          name: '',
          price:'',
          site:'',
          grading:'',
          category:'',
          imagesList:[],
        },
        filters:{
          name:''
        },
        listLoading: false,
        users:[],
        //编辑界面数据
        editForm:{
          id: 0,
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: '',
        }
      }
    },
    methods: {
      change(data){
        console.log(data);

      },
      remove_submit(){
        this.addFormVisible = false;
        this.addForm.imagesList=[];
      },
      beforeremove2(file, fileList){

      },
      beforeUpload2(file){
        console.log(file);
      },
      //编辑商品
      editProduct(e){

        this.submitUpload();
        let obj= {
          id:e.id,
          grading:e.grading,
          name:e.name,
          price:e.price,
          site:e.site,
          images:e.images
        };
        //提交表单
        update_product(obj).then(data=>{

          if(data.data.code=200){
            this.$message(data.data.msg);
          }
          this.dialogVisible = false

          this.init();

        });
        this.dialogVisible = false;
      },
      check_is_cover(index){
        let list =this.editForm.images;
        if(list){
          for(let i=0;i<list.length;i++){
            list[i].is_cover='no';
          }
          this.editForm.images[index].is_cover='yes';
        }

      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      //删除图片
      del_image(item,index){

        let id =item.image_id;
        let name = item.images_path;
        name =name.substring(name.lastIndexOf('/')+1);

        let obj={
          id:id,
          fileName:name
        };
        //发送请求
        del_image(obj).then(data=>{
          alert(data.data.msg);

          this.editForm.images.splice(index);


        });


      },
      //编辑成功
      on_success1(response, file, fileList) {

        //console.log(this.fileList1);

        console.log(file.response.result);
        if(file.response.code==200){

          this.addForm.imagesList.push(file.response.result);
          // console.log(this.addForm.imagesList);



          //this.init();
          //this.$refs.upload2.clearFiles();

        }else{
          this.$message({
            message: file.response.msg,
            type: 'success'
          });
        }
      },
      //图片上传成功
      on_success(response, file, fileList) {



        if(file.response.code==200){

          this.$message({
            message: file.response.msg,
            type: 'success'
          });

          this.init();
          this.$refs.upload.clearFiles();
        };
      },
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handleRemove2(file, fileList){
        console.log( fileList);
      },
      handlePreview(file) {
        // console.log(file);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //性别显示转换
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      handleCurrentChange(val) {
        this.filters.count = val;
        this.getUsers();
      },
      //获取用户列表
      getUsers() {


        this.listLoading = true;


        let obj ={
          page:4,
          nub:1,
          keyword:''
        };
        if (obj.keyword) {
          obj.nub = 1;
        }

        product_classify(obj).then(data => {
          this.listLoading = false;

            if (data.data.code == 500) {
              this.$message.error('错误');

            } else {
              this.users = data.data.list;

            }
        });


        this.listLoading = false;


      },
      //删除商品
      handleDel: function (index, row) {

        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {

          this.listLoading = true;

          let arr = [];
          arr.push(row.id);
          let para = {id: arr};


          delGoods(para).then(data => {
            if (data.data.code == 1) {

              this.$message({
                message:data.data.msg,
                type: 'success'
              });


              this.init();

              this.listLoading = false;

            }else{
              this.$message({
                message:data.data.msg,
                type: 'success'
              });

            }
          })
          this.listLoading = false;

        }).catch(() => {
          this.listLoading = false;
        });
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.dialogVisible = true;
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
        // console.log(this.editForm);
        // console.log(this.editForm);
      },
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;

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

        add_product(this.addForm).then(data=>{
          if(data.data.code==200){

            this.$message({
              message: data.data.msg,
              type: 'success'
            });
            this.addFormVisible = false;

            this.init();
          }
        })


      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //批量删除商品
      batchRemove: function () {
        var ids = this.sels.map(item => item.id);

        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {id: ids};



          delGoods(para).then(data=>{

            if(data.data.code!=500){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }
            this.listLoading = false;
          });
          this.listLoading = false;
          this.init();

        });
        this.listLoading = false;
      },
      init(){

        let obj ={
          page:4,
          nub:1,
          keyword:''
        };

        product_classify(obj).then(data=>{

          this.listLoading = false;

          if(data.data.code==500){

            this.$message.error('错误');

          }else{
            this.users =data.data.list;

            this.total =data.data.totalElement;

          }
        });
      },
      inputFile: function (newFile, oldFile) {
        if (newFile && oldFile && !newFile.active && oldFile.active) {
          // 获得相应数据
          console.log('response', newFile.response)
          if (newFile.xhr) {
            //  获得响应状态码
            console.log('status', newFile.xhr.status)
          }
        }
      },
      inputFilter: function (newFile, oldFile, prevent) {
        if (newFile && !oldFile) {
          // 过滤不是图片后缀的文件
          if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
            return prevent()
          }
        }

        // 创建 blob 字段 用于图片预览
        newFile.blob = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }
      },
      initSelectDate(){

      }
    },
    created() {
      this.init();
        getClassify().then(data=>{
          //console.log(data.data);
          this.options=data.data.classify;
        });
    }

  }

</script>

<style  lang="stylus" >

  .img_box
    display inline-block
    width 200px
    height 260px
    margin-right 20px
    border 1px solid #e8e8e8
    border-radius 8px
    overflow hidden
    div.wrap
      width 200px
      height 150px
      overflow hide
      margin-top 10px
      text-align center
      margin-bottom 10px

      img
        width 100%
        height 100%

  .border
    border: 1px solid #13ce66 !important;
  .upload-demo
    display inline-block
    width 70%
  .el-upload-list{
    width 100% !important
  }


  .el-upload-list--picture


  .upload-demo
    /*border 1px solid red*/
  ul.el-upload-list

    width 100% !important
  li.el-upload-list__item
    display  inline-block
    float left !important
    border 1px solid red
    width 45% !important
    margin-right 20px


</style>
