define(function(require, exports, module){
    var ecfFront=require('common');
    var API_ECF_PATH = require('api-constants').basePath;
    var API_4A_PATH = require('api-constants').c4aPath;
    var loginGraphCodePath = require('api-constants').loginGraphCodePath;
    var sellerLoginHtml=require('/pages/login/views/sellerLogin.html');
    var sellerLogin=Vue.extend({
        template: sellerLoginHtml,
        data: function () {
            return {
                model: {
                    userName: '',
                    psw:'',
                    graphCode:''
                },
                myform: {},
                tokenId:'',
                src:loginGraphCodePath
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
                        url:API_4A_PATH + '/user/login.do',
                        dataType:'json',
                        data: {
                            userType:2,
                            bizurl:'http://10.73.33.5:8089/ecf-front-war/login/login.do',
                            username: self.model.userName,
                            password: self.model.psw,
                            pinCode: self.model.graphCode,
                            ttl: 1200
                        },
                        success:function(data){
                            if(data.isSuccess){
                                var returnData = data.data;
                                ecfFront.ajax({
                                    type:'post',
                                    url:API_ECF_PATH+'/login/merchantLogin.do',
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
                                            var url='#sellerCenter';
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
                            }else{
                                ecfFront.loading.hide();
                                //登录c4a接口，报错信息
                                self.dialogWrap.show(data.message);
                                self.getGraphCode();

                            }
                        },
                        error:function(xhr, type){
                            ecfFront.loading.hide();
                            console.log('Ajax error!');
                        }
                    },true)
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

            //用户反欺诈
            antiFraud:function(){
                var self = this;
                ecfFront.ajax({
                    type:'post',
                    url: API_ECF_PATH +'/shield/shield.do',
                    dataType:'json',
                    data: {},
                    success:function(data){
                        console.log(data);
                        self.tokenId = data.data;
                        self.postToken(data.data);
                    },
                    error:function(xhr, type){
                        console.log('Ajax error!');
                    }
                },true);

            },
            //用户登陆反欺诈
            antiFraudLogin:function(state){
                var self = this;
                ecfFront.ajax({
                    type:'post',
                    url: API_ECF_PATH+'/shield/shieldLogin.do',
                    dataType:'json',
                    data: {mobile: self.model.userName,sessionId:self.tokenId,state:state},
                    success:function(data){
                        ecfFront.loading.hide();
                    },
                    error:function(xhr, type){
                        ecfFront.loading.hide();
                        console.log('Ajax error!');
                    }
                },true);
            },
            //发送tokenId
            postToken:function(tokenId){
                _fmOpt = {
                    partner: 'idea',
                    appName: 'idea_web',
                    token: tokenId,
                    fpHost: 'https://fptest.fraudmetrix.cn',
                    staticHost: 'statictest.fraudmetrix.cn',
                    tcpHost: 'fptest.fraudmetrix.cn',
                    wsHost: 'fptest.fraudmetrix.cn:9090'
                };
                var cimg = new Image(1,1);
                cimg.onload = function() {
                    _fmOpt.imgLoaded = true;
                };
                cimg.src = "https://fptest.fraudmetrix.cn/fp/clear.png?partnerCode=idea&appName=idea_web&tokenId=" + _fmOpt.token;
                var fm = document.createElement('script'); fm.type = 'text/javascript'; fm.async = true;
                fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'statictest.fraudmetrix.cn/fm.js?ver=0.1&t=' + (new Date().getTime()/3600000).toFixed(0);
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(fm, s);
            },

            //点击图片刷新图形验证码
            getGraphCode:function(){
                var timestamp = new Date().getTime();
                this.src = loginGraphCodePath+'?rand='+timestamp;
            }
        }
    });
    return sellerLogin
});
