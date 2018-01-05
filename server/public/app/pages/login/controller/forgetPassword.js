define(function(require, exports, module){
	var ecfFront=require('common');
	var API_ECF_PATH = require('api-constants').basePath;
    var IDcard = require('IDcard');
	var forgetPasswordHtml=require('/pages/login/views/forgetPassword.html');
    var forgetPassword=Vue.extend({
        template: forgetPasswordHtml,
        data: function(){
	        return {
	        	model:{
	            	userName:'',
	            	idNumber:'',
	            	securityCode:''
	            },
	            myform: {},
	            repeatSend:false,
		        get:true,
		        seconds:59
	        }
	    },
        ready: function(){
            ecfFront.refleshTtile('找回密码');
            this.dialogWrap=ecfFront.instantDialog();
        },
        destroyed: function(){
            window.sessionStorage.setItem("loginSuccess",'forgetPassword');
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
            blurCheck:function(el){
                var name=$(el).attr('name');
                if(!this.myform[name].$valid){
                    this.dialogWrap.show($(el).attr('error-message'));
                }
            },
            getSecurityCode:function(){
                var name=$('#userName').attr('name');
                if(this.model.userName == ''){
                    this.dialogWrap.show('用户名不能为空');
                }else if(this.myform[name].$valid){
					var self = this;
					ecfFront.ajax({
						type:'post',
						url:API_ECF_PATH+'/login/sendPasswordMessage.do',
						dataType:'json',
						data: {mobile:self.model.userName},
						success:function(data){
							console.log(data);
                            if(!data.isSuccess){
                                self.dialogWrap.show(data.message);
                            }else{
                                if(timer){
                                    clearInterval(timer);
                                }
                                self.repeatSend = true;
                                self.get = false;
                                var timer = setInterval(function(){
                                    (self.seconds)--;
                                    if(self.seconds == 0){
                                        self.seconds = 59;
                                        self.get = true;
                                        clearInterval(timer);
                                    }
                                },1000)                                
                            }
						},
						error:function(xhr, type){
                            self.dialogWrap.show('系统异常');
							console.log('Ajax error!');
						}
					},true)
				}else{
					this.dialogWrap.show('请输入正确的手机号码');
				}
            },
            onSubmit:function(){
            	if(this.myform.$valid){
                    this.model.idNumber = this.model.idNumber.toUpperCase();
                    var check = IDcard.checkCard(this.model.idNumber); 
                    if(check){       
                        ecfFront.loading.show();            
                		var self = this;
                		ecfFront.ajax({
    	                    type:'post',
    	                    url: API_ECF_PATH+'/login/passwordReset.do',
    	                    dataType:'json',
    	                    data: {userName: self.model.userName,idNumber: self.model.idNumber,securityCode:self.model.securityCode},
    	                    success:function(data){
                                ecfFront.loading.hide();
    	                        // 用户名和密码匹配
    	                        if(data.isSuccess){
    	                            //跳转到密码重置密码
    								window.sessionStorage.setItem('forgetPasswordUserName',self.model.userName);
    	                            window.location.href = '#passwordReset';
    	                            return
    	                        }
    	                        
    	                        //提示错误信息
    	                        self.dialogWrap.show(data.message);
    	                        
    	                    },
    	                    error:function(xhr, type){
                                ecfFront.loading.hide();
    	                        console.log('Ajax error!');
    	                    }
    	                },true)
	            	}
            	}
            }
        }
    });
    return forgetPassword
});