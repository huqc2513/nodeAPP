define(function(require, exports, module){
    var jrFront=require('common');
    var API_JR_PATH = require('api-constants').basePath;
    var gQRCodeHtml=require('/pages/login/views/gQRCode.html');
    var picNum=1;
    var gQRCode=Vue.extend({
        template: gQRCodeHtml,
        data: function () {
            return {
                model: {
                	sum: '',
                	currencyType:'',
                	targetCurrencyType:'',
                	comResult:'',
                },
                myform:{}
                //tokenId:'',
                //src:loginGraphCodePath
            };
        },
        ready: function(){
            this.dialogWrap=jrFront.instantDialog();
            jrFront.refleshTtile('收款');
//            window.sessionStorage.setItem("loginSuccess",'login');
        },
        destroyed: function(){
//            window.sessionStorage.setItem("loginSuccess",'login');
        },
        methods: {
        	blurCheck:function(el){
                var name=$(el).attr('name');
                var elVal=$.trim($(el).val()).replace(/\b(0+)/gi,"");
                if($.trim($(el).val()).indexOf(".")<0){
                	$(el).val(elVal+".00");
                }
                
                if(!this.myform[name].$valid){
                    this.dialogWrap.show($(el).attr('error-message'));
                }

            },
            toExchange: function(){
//                    jrFront.loading.show();
                    var self = this;
                    jrFront.ajax({
                        type:'get',
                        url:API_JR_PATH + '/getExchangeInfo',
                        dataType:'json',
                        data: {
                        	fromAmount: self.model.sum,
                            fromCode: self.model.currencyType,
                            toCode: self.model.targetCurrencyType
                        },
                        //beforeSend:function(request){
                        //    request.setRequestHeader(tokenName, '2222222');
                        //},
                        success:function(data){
                            if(data.isSuccess){
                            			self.model.comResult=data.data.camount;
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
                

            }

        }
    });
    return gQRCode
});
