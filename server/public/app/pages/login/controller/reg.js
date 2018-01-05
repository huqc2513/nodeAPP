define(function(require, exports, module){
    var jrFront=require('common');
    var API_JR_PATH = require('api-constants').basePath;
    var regHtml=require('/pages/login/views/reg.html');
    var picNum=1;
    var reg=Vue.extend({
        template: regHtml,
        data: function () {
            return {
                model: {
                    cellNumber: '',
                    userName:'',
                    pwd:'',
                    idNum:'',
                    storeName:''
                    
                }
                //tokenId:'',
                //src:loginGraphCodePath
            };
        },
        ready: function(){
        
            this.dialogWrap=jrFront.instantDialog();
            jrFront.refleshTtile('注册');
            window.sessionStorage.setItem("reg",'login');
        },
        destroyed: function(){
            window.sessionStorage.setItem("reg",'login');
        },
        methods: {
            onSubmit: function(){
                    jrFront.loading.show();
                    var self = this;
                    jrFront.ajax({
                        type:'post',
                        url:API_JR_PATH + '/register',
                        dataType:'json',
                        data: {
                            cellNumber: self.model.cellNumber,
                            userName: self.model.userName,
                            passWord: self.model.pwd,
                            idNumber: self.model.idNum,
                            storeName: self.model.storeName,
                            //smsCode: self.model.graphCode,
                            ttl: 1200
                        },
                        //beforeSend:function(request){
                        //    request.setRequestHeader(tokenName, '2222222');
                        //},
                        success:function(data){
                        	   jrFront.loading.hide();
                            if(data.isSuccess){
                            				tokenValue = data.data.token;
                                            var url='#gqrcode';
                                            jrFront.loading.hide();
                                            window.location.href = url;
                                            self.dialogWrap.show(data.message);
                                        }
                                        else{
                                            //用户名和密码匹配不上，则提示错误信息
                                            jrFront.loading.hide();
                                            self.dialogWrap.show(data.message);
                                            //self.getGraphCode();
                                        }
                                    },
                                    error:function(xhr, type){
                                        jrFront.loading.hide();
                                        console.log('Ajax error!');
                                    }
                                },true)
                

            },
            toLogin: function(){
                var url='#';
                window.location.href = url;
            }

        }
    });
    return reg
});
