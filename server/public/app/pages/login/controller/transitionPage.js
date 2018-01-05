define(function(require, exports, module){
    var ecfFront=require('common');
    var transitionPageHtml=require('/pages/login/views/transitionPage.html');
    var transitionPage=Vue.extend({
        template: transitionPageHtml,
        data: function () {
            return {}
        },
        ready: function(){

            var curTime = new Date().getTime();
            ecfFront.setConfig(curTime);

            var u = window.sessionStorage.getItem('fromTran');
            if(u){
                wx.ready(function(){
                    wx.closeWindow();// config信息验证后会执行ready方法
                })
            }
            window.sessionStorage.setItem('fromTran',true);
            if(window.localStorage.getItem('loginType')==1){
                window.location.href = '#personalCenter';
            }else{
                window.location.href = '#sellerCenter';
            }
        },
        destroyed: function(){
            window.sessionStorage.setItem("loginSuccess",'transitionPage');
        },
        methods: {

        }
    });
    return transitionPage
});