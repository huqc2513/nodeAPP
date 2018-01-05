define(function(require, exports, module){
    var refleshTtile=function(title){
        if(browser.ios){
            var $body = $('.ecf-front-content');
            document.title = title;
            // hack在微信等webview中无法修改document.title的情况
            var $iframe = $('<iframe src="/favicon.ico"></iframe>');
            $iframe.on('load', function() {
                setTimeout(function() {
                    $iframe.off('load').remove()
                }, 0)
            }).appendTo($body)
        }
    }

    var u = navigator.userAgent;
    var browser={
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
        iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == " qq" //是否QQ
    };

    var instantDialog=function(opts){
        var dialog=function(){
            var options= $.extend({},{
                time: 2000,
                autoHide: true
            },opts);
            var dialogWrap,tips;
            this.init=function(){
                var str='<div class="s-dialog-wrap s-dialog-wrap-hide">'
                            +'<div class="s-dialog-body">'
                                +'<div class="s-dialog-bg"></div>'
                                +'<div class="s-dialog-content">'
                                    +'<p class="tips">'+tips+'</p>'
                                +'</div>'
                            +'</div>'
                        +'</div>';
                dialogWrap=$(str).appendTo($('.ecf-front-content'));
                tips=dialogWrap.find('.tips');

            };
            this.show=function(mes){
                tips.html(mes);
                dialogWrap.show();
                if(options.autoHide){
                    this.hide();
                }
            }
            this.hide=function(){
                setTimeout(function(){
                    dialogWrap.hide();
                },options.time);
            }
            this.init();
        }
        return new dialog(opts);
    }
    var dialogObject=function(opts){
        var self=this,dialogObj,modalBody,modalFooter,modalHeader;
        var options= $.extend({},{
            className: '',
            center: false,
            content: '',
            buttons: []
        },opts);
        var initButtons=function(){
            if(options.buttons.length<1){
                modalFooter.remove();
                return;
            }
            var buttons=options.buttons,w=100/options.buttons.length;
            buttons.forEach(function(opt,index){
                var className=opt.className? opt.className: 'btn-primary';
                var btn=$('<button type="button" class="btn" ></button>').appendTo(modalFooter);
                btn.addClass(className).css({width: w+"%"}).text(opt.text);
                btn.on('click',function(){
                    opt.fun && opt.fun.call(self,this);
                })
            })
        }
        var init=function(){
            var html="<div class='modal-wrap'>"+
                        "<div class='modal-bg'></div>"+
                        "<div class='modal-dialog'>"+
                            "<div class='modal-content'>" +
                                "<div class='modal-header'></div>"+
                                "<div class='modal-body'></div>"+
                                "<div class='modal-footer'></div>"+
                            "</div>"+
                        "</div>"+
                    "</div>";
            if($(".ecf-front-content").length<1){
                $('<div class="ecf-front-content"></div>').appendTo($('#app'));
            }
            dialogObj=$(html).appendTo($(".ecf-front-content"));
            dialogObj.addClass(options.className);
            modalBody=dialogObj.find('.modal-body');
            modalFooter=dialogObj.find('.modal-footer');
            modalHeader=dialogObj.find('.modal-header');
            modalBody.html(options.content.body);
            modalHeader.html(options.content.header);
            initButtons();
        }
        var bindEvents=function(){
            dialogObj.find('.modal-bg').on('click',function(){
                self.hide();
            })
            dialogObj.find('.no-tel-link').on('click',function(){
                self.hide();
            })
        }
        this.destroy=function(){
            dialogObj.remove();
            delete dialogObj;
            delete modalFooter;
            delete modalBody;
            delete this;
        }
        this.show=function(html){
            if(html){
                modalBody.html(html);
            }
            if(options.center){
                dialogObj.css({opacity: 0}).show();
                var con=dialogObj.find('.modal-dialog');
                var top=(parseInt($(window).height())-parseInt(con.height()))/2;
                con.css({top: top});
                dialogObj.css({opacity: 1});
            }else{
                dialogObj.show();
            }
        }
        this.hide=function(){
            dialogObj.hide();
        }
        init();
        bindEvents();
        this.el=dialogObj;
    }
    var modalDialog=function(opts){
        return new dialogObject(opts);
    }
    var confirm=function(content,btnText,sCallback,cCallBack){
        btnText=btnText ? btnText : '确定';
        var options={
            className: 'confirm-dialog',
            content: {body:content},
            buttons: [{
                text: btnText,
                className: 'btn-primary',
                fun: function(){
                    sCallback && sCallback.call(this);
                    this.destroy();
                }
            },{
                text: '取消',
                className: 'btn-default',
                fun: function(){
                    cCallBack && cCallBack.call(this);
                    this.destroy();
                }
            }]
        };
        var dobj=modalDialog(options);
        dobj.show();
        return dobj;
    }
    var message=function(content,btnText,callback){
        btnText=btnText ? btnText : '知道了';
        var options={
            className: 'message-dialog',
            content: {body: content},
            buttons: [{
                text: btnText,
                className: 'btn-primary',
                fun: function(){
                    callback && callback.call(this);
                    this.destroy();
                }
            }]
        }
        var dobj=modalDialog(options);
        dobj.show();
        return dobj;
    }

    // 拨打客服电话
    var calls=function(content){
        var options={
            className: 'message-dialog',
            content: {body: content},
        }
        var dobj=modalDialog(options);
        dobj.show();
        return dobj;
    }


    var loading=function(){
        var init=function(){
            var html='<div class="loading-wrap">'+
                '<div class="loading-icon"></div>'+
                '</div>';
            var h=(parseInt($(window).height())-60)/2;
            var w=(parseInt($(window).width())-60)/2;
            $(html).appendTo($('.ecf-front-content')).find('.loading-icon').css({top: h,left: w});
        }
        this.show=function(){
            if($('.loading-wrap').length<1){
                init();
            }
            $('.loading-wrap').show();
        };
        this.hide=function(){
            $('.loading-wrap').hide();
        }
    }
    var ajax= function(params,isSso){
        var succes=params.success;
        var afterData = $.extend({}, params.data,{
//                clientType:3
            }
        )
        var sso = window.localStorage.getItem('loginSsoclient');
        var jsonData=$.extend({},params,{data:afterData},{
            success: function(data){
                if(typeof data =="string"){
                    data=eval('('+data+')');
                }
                if(data && data.errorCode=='200'){
                    var u=window.sessionStorage.getItem("loginSuccess");
                    if(u && ((u.indexOf('login')!=-1) ||(u.indexOf('default')!=-1))){
                        wx.ready(function(){
                            wx.closeWindow();// config信息验证后会执行ready方法
                        });
                    }else{
                        if(window.sessionStorage.getItem('fromTran')){
                            window.location.href='#';
                        }else if(params.from && params.from == 'limitBtn'){
                            window.location.href = '#login/limit';
                        }else{
                            $('.loading-wrap').addClass('loading-index');
                            var str=params.backUrl ? ('#?url='+params.backUrl+'') : "#";
                            message('<h3>登录超时，请重新登录<h3>','确定',function(){
                                $('.loading-wrap').removeClass('loading-index');
                                window.location.href= str;
                            })
                        }
                    }
                }else{
                    succes(data);
                }
            }
        })
        if(!isSso && sso){
            jsonData.url=jsonData.url+';ssoclient='+sso;
        }
        $.ajax(jsonData);
    }
    
    //分期详情的弹窗
    var detailMsg = function(header,content,btnText,callback){
        btnText=btnText ? btnText : '知道了';
        var options={
            className: 'message-dialog',
            content: {header: header,body: content},
            buttons: [{
                text: btnText,
                className: 'btn-primary',
                fun: function(){
                    callback && callback.call(this);
                    this.destroy();
                }
            }]
        }
        var dobj=modalDialog(options);
        dobj.show();
        return dobj;
    }
    
    //获取微信签名
    var API_ECF_PATH = require('api-constants').basePath;
    var setConfig = function(time){
    	var getConfig = function(){
			ajax({
	            type: 'post',
	            url: API_ECF_PATH+'/weChatApply/toWeChatApply.do',
	            dataType: 'json',
	            success: function (data){
	            	var data = data.data;

	            	var configData = JSON.stringify(data);
	            	window.sessionStorage.setItem('weixinConfigData',configData);
	            	wx.config({
				        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				        appId: data.appId, // 必填，公众号的唯一标识
				        timestamp: data.timestamp, // 必填，生成签名的时间戳
				        nonceStr: data.nonceStr, // 必填，生成签名的随机串
				        signature: data.signature,// 必填，签名，见附录1
				        jsApiList: ['chooseImage','scanQRCode','uploadImage','previewImage','closeWindow'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				    });
	            },
	            error:function(xhr, type){
		            console.log('Ajax error!');
		        }
	        })
		}
    	
    	var datas = window.sessionStorage.getItem('weixinConfigData');
	    if(datas){
	    	var curConfigData = JSON.parse(datas);
			var _time = curConfigData.timestamp;
			var offsetTime = parseInt(time/1000) - _time;
	        if(offsetTime > 7200){
	        	getConfig();
	        }
	        else{

	        	wx.config({
			        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			        appId: curConfigData.appId, // 必填，公众号的唯一标识
			        timestamp: curConfigData.timestamp, // 必填，生成签名的时间戳
			        nonceStr: curConfigData.nonceStr, // 必填，生成签名的随机串
			        signature: curConfigData.signature,// 必填，签名，见附录1
			        jsApiList: ['chooseImage','scanQRCode','uploadImage','previewImage','closeWindow'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			    });
	        }
	    }else{
	    	getConfig();
		}
	}

    //对金钱类数字进行处理,添加千分位,保留两位小数
    var handleMoneyData=function(money){
        var money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
        var intArr = money.split(".")[0].split("").reverse(),
            decimal = money.split(".")[1];
        var integer  = "";
        for (i = 0; i < intArr.length; i++) {
            integer  += intArr[i] + ((i + 1) % 3 == 0 && (i + 1) != intArr.length ? "," : "");
        }
        return integer .split("").reverse().join("") + "." + decimal;
    }

    var getUrlParam = function(sName){
        alert(sName);
        if(sName)
        {
            var url = window.location.search; //获取url中"?"符后的字串
            alert("url=="+url);
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }
        else
        {
            alert("参数不能为空");
            return false;
        }
    }


    return {
        instantDialog: instantDialog,
        modalDialog: modalDialog,
        confirm: confirm,
        message: message,
        detailMsg:detailMsg,
        setConfig:setConfig,
        calls:calls,
        handleMoneyData:handleMoneyData,
        ajax: ajax,
        refleshTtile:refleshTtile,
        browser: browser,
        getUrlParam:getUrlParam,
        loading: new loading()

    }
})
