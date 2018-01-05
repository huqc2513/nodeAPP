define(function(require, exports, module){
    var ecfFront=require('common');
    //var API_ECF_PATH = require('api-constants').basePath;
    var API_ECF_PATH ='http://127.0.0.1/com.jr.tech.war';
    var API_4A_PATH = require('api-constants').c4aPath;
    var loginGraphCodePath = require('api-constants').loginGraphCodePath;
    var loginHtml=require('/pages/login/views/login.html');
    var login=Vue.extend({
        template: loginHtml,
        data: function () {
            return {
                model: {
                    userName: '',
                    cellNumber:'',
                    passWord:''
                    
                },
                myform: {}
            };
        },
        ready: function(){
            //var currentpage = window.location.href;
            //window.sessionStorage.setItem("currentpage",currentpage);
            this.dialogWrap=ecfFront.instantDialog();
            this.antiFraud();
            ecfFront.refleshTtile('登录');
            window.sessionStorage.setItem("loginSuccess",'login');
        },
        destroyed: function(){
            window.sessionStorage.setItem("loginSuccess",'login');
        },
        methods: {
            onSubmit: function(){
                if(this.myform.$valid){
                    ecfFront.loading.show();
                    var self = this;
                  
                                ecfFront.ajax({
                                    type:'post',
                                    url:API_ECF_PATH+'/login/personalLogin.do',
                                    dataType:'json',
                                    data: {
                                        userCode: self.model.userName,
                                        userType: 2,
                                        timestamp: returnData.timestamp,
                                        jsessionid: returnData.jsessionid,
                                        keygroup: returnData.keygroup,
                                        keyversion: returnData.keyversion,
                                        token: returnData.token,
                                        md5: returnData.md5,
                                        bizurl: returnData.bizurl,
                                        ttl: returnData.ttl
                                    },
                                    success:function(data){
                                        // 用户名和密码匹配,登录成功
                                        if(data.isSuccess){

                                            //登陆成功反欺诈
                                            self.antiFraudLogin('0');
                                            window.localStorage.clear();
                                            window.sessionStorage.clear();
                                            window.localStorage.setItem('loginUserName',self.model.userName);
                                            window.localStorage.setItem('loginSsoclient',data.data.ssoclient);
                                            window.localStorage.setItem('loginType',data.data.type);
                                            //判断是否是从公众号主界面进来的，到个人中心
                                            var url='#limit';
                                            if(self.$route.params && self.$route.params.url){
                                                url='#'+self.$route.params.url;
                                            }
                                            window.location.href = url;
                                        }
                                        else{
                                            //用户名和密码匹配不上，则提示错误信息
                                            ecfFront.loading.hide();
                                            self.dialogWrap.show(data.message);
                                            self.getGraphCode();
                                        }
                                    },
                                    error:function(xhr, type){
                                        ecfFront.loading.hide();
                                        console.log('Ajax error!');
                                    }
                                },true)
                        },
                        error:function(xhr, type){
                            ecfFront.loading.hide();
                            console.log('Ajax error!');
                        }
                }

            },
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

          
        }
    });
    return login
});
