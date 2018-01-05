define(function(require, exports, module) {
    var jrFront=require('common');
    var API_JR_PATH = require('api-constants').basePath;
    var registerHtml=require('/pages/login/views/wait.html');
    var timer,time;
    var wait=Vue.extend({
        template: registerHtml,
        data: function () {
            return {
                model: {
                },
                myform: {},
            };
        },
        ready: function(){
        },
        destroyed: function(){
        },
        methods: {
        }
    });
    return wait
});