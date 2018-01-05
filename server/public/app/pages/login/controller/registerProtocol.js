define(function(require, exports, module) {
    var registerProtocolHtml=require('/pages/login/views/registerProtocol.html');
    var ecfFront=require('common');
    var registerProtocol =Vue.extend({
        template: registerProtocolHtml,
        ready:function(){
            ecfFront.refleshTtile('协议查看');
        },
        destroyed: function(){
            window.sessionStorage.setItem("loginSuccess",'registerProtocol');
        }
    })
    return registerProtocol
});
