define(function(require, exports, module){
    var ecfFront=require('common');

    var API_ECF_PATH = require('api-constants').basePath;
    var passwordResetHtml=require('/pages/login/views/passwordReset.html');

    var passwordReset=Vue.extend({
        template: passwordResetHtml,
        data: function(){
            return {
            	myform: {},
	            model: {
	            	psw:''
	            }
            }
        },
        ready: function(){
            ecfFront.refleshTtile('设置密码');
            this.dialogWrap=ecfFront.instantDialog();
        },
        destroyed: function(){
            window.sessionStorage.setItem("loginSuccess",'passwordReset');
        },
        methods: {
            shPassword: function(event){
                var target=$(event.target);
                if(target.hasClass("icon-can-see-pass")){
                    target.removeClass("icon-can-see-pass").addClass("icon-cant-see-pass");
                    $(".password").attr("type","password");
                }else{
                    target.removeClass("icon-cant-see-pass").addClass("icon-can-see-pass");
                    $(".password").attr("type","text");
                }
            },
            onSubmit: function() {
                if(this.myform.$valid){
                    ecfFront.loading.show();
                	var self = this;
                	ecfFront.ajax({
	                    type:'post',
	                    url: API_ECF_PATH+'/login/passwordSuccess.do',
	                    dataType:'json',
	                    data: {condition:window.sessionStorage.getItem('forgetPasswordUserName'),newPsw: self.model.psw},
	                    success:function(data){
                            ecfFront.loading.hide();
	                        // 用户名和密码匹配
	                        if(data.isSuccess){
                                self.dialogWrap.show(data.message);
	                            //跳转到个人中心页面
                                setTimeout(function(){
                                    window.location.href = '#login/limit';
                                },1500)

                            }else{
	                        	//提示信息
	                        	self.dialogWrap.show(data.message);
	                        }
	                    },
	                    error:function(xhr, type){
                            ecfFront.loading.hide();
	                        console.log('Ajax error!');
	                    }
	                },true)
                }
            },
            blurCheck:function(el){
                var name=$(el).attr('name');
                if(!this.myform[name].$valid){
                    this.dialogWrap.show($(el).attr('error-message'));
                }

            }
        }
    });
    return passwordReset
});