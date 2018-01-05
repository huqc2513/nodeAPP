define(function(require, exports, module){
	
	//设置本地nginx地址,由ngix反向代理请求后台
    var basePath = 'http://localhost:8088/com.jr.tech.war';
    var tokenName = 'X-Token';
    var tokenValue = '';
    return {
        basePath:basePath,
        tokenName:tokenName,
        tokenValue:tokenValue
    }
})
