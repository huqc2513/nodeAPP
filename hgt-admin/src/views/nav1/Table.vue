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

        <el-form-item>
          <!--<el-button type="primary" @click="handleAdd">新增</el-button>-->

          <el-cascader
            :options="options"
            :show-all-levels="false"
            v-model="editForm.filters"
            @change="changeType"
            :clearable="true"
          ></el-cascader>

        </el-form-item>

			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" >
			</el-table-column>
			<!--<el-table-column type="id" >-->
			<!--</el-table-column>-->
      <el-table-column prop="name" label="产品名称" width="150" >
      </el-table-column>
			<el-table-column prop="site" label="生产地" >
			</el-table-column>
			<el-table-column prop="grading" label="段位"   >
			</el-table-column>

      <el-table-column prop="type" label="所属分类"   >
      </el-table-column>

			<el-table-column prop="price" label="价格"  sortable>
			</el-table-column>
			<el-table-column prop="created_at" label="创建时间" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length==0">批量删除</el-button>

			<el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="filters.pageCount" :total="total" style="float:right;" >
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

        <el-form-item label="所属分类" >

          <el-cascader
            :options="options"
            :show-all-levels="false"
            v-model="editForm.category"
            @change="changEditForm"
          ></el-cascader>

        </el-form-item>



        <el-form-item label="价格">
          <el-input v-model="editForm.price"></el-input>
        </el-form-item>



        <el-form-item label="商品图片">
          <hr>
          <p v-show='editForm.images' style="height: 15px;margin: 0;clear: both;line-height: 15px
;position: relative;top:-10px;font-size: 12px;">标注：绿色框为商品封面,点击可切换商品封面图</p>

          <!--<p v-show='editForm.images==[]' style="text-align: center">-->

            <!--此商品暂无图片-->

          <!--</p>-->

          <div :class="{'img_box':true,'border':item.is_cover=='yes'?true:false}" v-for="(item,index) in editForm.images" @click="check_is_cover(index)">

            <div class="wrap">

              <img :src='item.images_path' alt="">
            </div>
              <div style="text-align: center;">
                <el-button @click='del_image(item,index)'type="primary" icon="el-icon-delete"></el-button>

                <div style="text-align: center;padding-top: 10px">
                      <div style="width:40px;margin: 0 auto">

                      </div>
                  </div>
              </div>

          </div>




        </el-form-item>


        <div>
          <span style="width: 150px;display:inline-block">商品图片上传</span>
          <el-upload
            ref="upload"
            :data='{goods_id:editForm.id,is_cover:editForm.is_cover}'
            class="upload-demo"
            :action="this.upload"
            :on-preview="handlePreview"
            name="file"
            :multiple="true"
            :auto-upload="false"
            :on-success="on_success"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture">

            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->

          </el-upload>
        </div>



      </el-form>




      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editProduct(editForm)">确 定</el-button>
      </span>
    </el-dialog>





	      <!--新增界面-->


    <el-dialog
      title="新增"
      :visible.sync="addFormVisible"
      width="70%"
    >


      <el-form :model="addForm"   label-width="80px" :rules="addFormRules" ref="addForm">

        <div>
          <el-form-item label="产品名称"  >
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="所属分类" >
            <!--<el-input v-model="addForm.category" auto-complete="off"></el-input>-->

            <el-cascader
            :options="options"
            :show-all-levels="false"
            v-model="addForm.category"
            @change="change"
          ></el-cascader>


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




        <div>
          <span style="width: 150px;display:inline-block">商品图片上传</span>
          <el-upload
            ref="upload2"
            class="upload-demo"
            :action="this.uploadAdd"
            :on-preview="handlePreview"
            name="file"
            :before-upload="beforeUpload2"
            :before-remove="beforeremove2"
            :multiple="true"
            :on-success="on_success1"

            :on-remove="handleRemove2"
            :file-list="fileList1"
            list-type="picture"
           >

            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>

          </el-upload>
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





	import { getGoodsList,uploadPath,upload_edit_Path,login,delGoods,del_image,add_product,update_product,getClassify,classify_meta} from '../../api/api';





 let upload_add =upload_edit_Path();
 let upload_edit= uploadPath();

	export default {
		data(){

			return {
        classify:[],
        uploadAdd:upload_add,
        upload:upload_edit,
        Vueself:'',
        fileList: [],
        fileList1: [],
				filters: {
					name: '',
          count:1,
          pageCount:6,
          type:[],
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
					addr: '',

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
          category:[],//选择的分类
          imagesList:[],
				},
        files: [],
        options:[],//分类
        optionsAddFrom:[],
			}
		},
		methods: {
      changeType(data){
         this.getUsers();
      },
      changEditForm(data){//编辑产品分类
          console.log(data);
      },
      change(data){//新增产品分类
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

        //分类id
        let data=e.category;
        data = data.toString();
        if(data.substring(1,data.length-1).indexOf(',')==-1){
          data= data.substring(1,data.length-1)
        }else{
          data= data.charAt( data.length-1);
        }



        let obj= {
          id:e.id,
          grading:e.grading,
          name:e.name,
          price:e.price,
          category:data,//分类id
          site:e.site,
          images:e.images
        };
        //提交表单
          update_product(obj).then(data=>{

            if(data.data.code=200){
              this.$message(data.data.msg);
            }
            this.dialogVisible = false;

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

      //  console.log(file.response.result);
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
      handleRemove2(file, fileList) {
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
        let data =this.editForm.filters.toString();
        if(data.length==1){
          data=data;
        }else{
          data=data.substring(data.lastIndexOf(',')+1,data.length)
        }

        console.log(data);
        let obj = {
          pageCount: this.filters.pageCount,
          nub: this.filters.count,
          keyword: this.filters.name,
          type:data
        };
        if (obj.keyword) {
          obj.nub = 1;
        }
        getGoodsList(obj).then(data => {
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
        let sort =[];
      if(this.classify){
        let res =this.loop_options(this.classify,row.category);
          res.forEach(i=>{
              sort.push(i.classify_id);
          })
      }

       let classify_id = parseInt(row.category);
        if(classify_id){
          row.category=sort.reverse();

      }

        this.dialogVisible = true;
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);

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

                   this.addForm= {
                         name: '',
                         price:'',
                         site:'',
                         grading:'',
                         category:[], //选择的分类
                         imagesList:[],
                       };

                   this.$refs.upload2.clearFiles();//清空列表

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

        // let data =this.editForm.filters.toString();
        // if(data.length==1){
        //   data=data;
        // }else if(data.length>=1){
        //   data=data.substring(data.lastIndexOf(',')+1,data.length)
        // }else{
        //   data='';
        // }

        let obj = {
          pageCount: this.filters.pageCount,
          nub: this.filters.count,
          keyword:'',
          type:''
        };


        getGoodsList(obj).then(data=>{

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
         // console.log('response', newFile.response);
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
      loop_options(arr,pid){

        var temp = [];
        var forFn = function(arr, pid){
            for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item.classify_id == pid) {
              temp.push(item);

              forFn(arr,item.parent_id);
            }
          }
        };

        forFn(arr, pid);
        return temp;
      }

    },
		created() {
        this.init();
        this.Vueself = this;
        let that =this;
        const arrt=async function(){
          let arr= await classify_meta();

           that.classify =  arr.data.classify;

        };
        arrt();


        //获取分类
        getClassify().then(data=>{

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
