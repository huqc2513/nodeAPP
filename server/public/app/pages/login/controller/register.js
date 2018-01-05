define(function(require, exports, module) {
    var jrFront=require('common');
    var API_JR_PATH = require('api-constants').basePath;
    var registerHtml=require('/pages/login/views/register.html');
    var timer,time;
    var register=Vue.extend({
        template: registerHtml,
        data: function () {
            return {
                model: {
                    cellNumber:'',
                    userName:'',
                    storeName:'',
                    pwd:'',
                },
                myform: {},
            };
        },
        ready: function(){
            jrFront.refleshTtile('注册');
            this.dialogWrap=jrFront.instantDialog();
           // this.antiFraud();
           /* var code=JSON.parse(window.sessionStorage.getItem('registerCode'));
            if(code){
                this.model = code;
                var t=new Date().getTime();
                this.model.verify_code=code.verify_code;
                var tt=60-parseInt((t-code.time)/1000);
                if(tt<59 && tt>0){
                    this.seconds=tt;
                    this.changeTime();
                }else if(tt<0){
                    this.get = true;
                    this.seconds = 59;
                }
            }*/
        },
        destroyed: function(){
            var d={
                time: time,
                userName:this.model.userName,
                cellNumber:this.model.cellNumber,
                pwd:this.model.pwd
            }
            window.sessionStorage.setItem('registerCode',window.JSON.stringify(d));
            window.sessionStorage.setItem("loginSuccess",'register');
        },
        methods: {
          /*  changeTime: function(){
                var self=this;
                if(timer){
                    clearInterval(timer);
                }
                this.get = false;
                timer = setInterval(function(){
                    (self.seconds)--;
                    if(self.seconds == 0){
                        self.seconds = 59;
                        self.get = true;
                        clearInterval(timer);
                    }
                },1000)
            },*/
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

            onSubmit: function (){
                if(this.myform.$valid){
                    this.model.pwd = this.model.pwd.replace(/\s+/g, "");
                    var self = this;
                    jrFront.ajax({
                        type:'post',
                        url: API_JR_PATH+'/register',
                        isLoad: true,
                        dataType:'json',
                        data: {
                            userName: self.model.userName,
                            passWord: self.model.pwd,
                            cellNumber: self.model.cellNumber,
                            storeName: self.model.storeName
                            },
                        success:function(data){
                            //
                            if(data.isSuccess){
                                window.sessionStorage.removeItem('registerCode');
                                $('.btn-default').attr('disabled',true);
                                //self.antiFraudRegister('0');
                                self.dialogWrap.show(data.message);
                                setTimeout(function(){
                                    $('.btn-default').removeAttr('disabled');
                                    window.location.href = '#wait';
                                },2000)

                            }
                            else{
                                self.dialogWrap.show(data.message);
                            }
                        }
                    },true)
                }
            },
        }
    });
    return register
});