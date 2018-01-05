define(function(require, exports, module){
    var jrFront=require('common');
    var API_JR_PATH = require('api-constants').basePath;
    var loginHtml=require('/pages/login/views/login.html');
    var picNum=1;
    var login=Vue.extend({
        template: loginHtml,
        data: function () {
            return {
                model: {
                    cellNumber: '',
                    pwd:'',
                    captcha:'',
                    
                },
                myform: {},
                //tokenId:'',
                //src:loginGraphCodePath
            };
        },
        ready: function(){
        	var self=this;
        	setInterval(function(){
        		self.switchPic();
        	}, 10000);
        
            this.dialogWrap=jrFront.instantDialog();
            jrFront.refleshTtile('登录');
            window.sessionStorage.setItem("loginSuccess",'login');
        },
        destroyed: function(){
            window.sessionStorage.setItem("loginSuccess",'login');
        },
        methods: {
        	blurCheck:function(el){
                var name=$(el).attr('name');
                if(!this.myform[name].$valid){
                    this.dialogWrap.show($(el).attr('error-message'));
                }

            },
            onSubmit: function(){
            		jrFront.loading.show();
                    var self = this;
                    jrFront.ajax({
                        type:'post',
                        url:API_JR_PATH + '/login',
                        dataType:'json',
                        data: {
                            cellNumber: self.model.cellNumber,
                            passWord: self.model.pwd
                            //pinCode: self.model.graphCode,
                        },
                        //beforeSend:function(request){
                        //    request.setRequestHeader(tokenName, '2222222');
                        //},
                        success:function(data){
                        	jrFront.loading.hide();
                            if(data.isSuccess){
                                    // 用户名和密码匹配,登录成功
                            		// 登录成功，将 token放入 cookie 中
//                        				tokenValue = data.data.token;
                                        var url='#gqrcode';
                                        jrFront.loading.hide();
                                        window.location.href = url;
                                        self.dialogWrap.show(data.message);
                                    }
                                    else{

                                		jrFront.message("<h3>"+data.message+"</h3>");
                                    
                                    }
                                },
                                error:function(xhr, type){
                                    jrFront.loading.hide();
                                    console.log('Ajax error!');
                                }
                            },true)
                

            },
            switchPic: function(){
            	if(picNum==1){
            		 $(".bg-pic"+picNum).fadeToggle(5000);
            		 $(".bg-pic"+(picNum+1)).fadeToggle(5000);
            	}else if(picNum==2){
            		 $(".bg-pic"+picNum).fadeToggle(5000);
            		 $(".bg-pic"+(picNum+1)).fadeToggle(5000);
            	}else if(picNum==3){
            		 $(".bg-pic"+picNum).fadeToggle(5000);
            		 $(".bg-pic"+(picNum+1)).fadeToggle(5000);
            	}else if(picNum==4){
            		 $(".bg-pic"+picNum).fadeToggle(5000);
            		 $(".bg-pic1").fadeToggle(5000);
            		
            	}else{
            		 picNum=0;
            	}
            	++picNum;
            },
            toReg: function(){
                var url='#reg';
                window.location.href = url;
            }

        }
    });
    return login
});
