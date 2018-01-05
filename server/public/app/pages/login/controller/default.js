define(function(require, exports, module){
    var ecfFront=require('common');
    var defaultHtml=require('/pages/login/views/default.html');//默认页面
    var defaultPage=Vue.extend({
        template: defaultHtml,
        data: function () {
            return {
                login: '#login/xxx',
                register: '#register'
            }
        },
        ready: function(){
            ecfFront.refleshTtile('登录');
            var url='';
            if(this.$route.query && this.$route.query.url){
                this.login="#login/"+this.$route.query.url;
                this.sellLogin="#sellerLogin/"+this.$route.query.url;
            }
        },
        destroyed: function(){
            window.sessionStorage.setItem("loginSuccess",'default');
        },
        methods: {
            
        }
    });
    return defaultPage
});