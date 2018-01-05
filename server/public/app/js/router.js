define(function(require, exports, module) {
    function init() {
        var App = Vue.extend({});
        var router = new VueRouter();
        router.map({
        		'': {//入口页面
                component: require('../pages/login/controller/login')
	          },
	      		'/login/:url': {//登录
	              component: require('../pages/login/controller/login')
	          },
	          	'/gqrcode': {//登录
	              component: require('../pages/login/controller/gQRCode')
	          },
	          	'/reg': {//注册
	              component: require('../pages/login/controller/reg')
	          },
	          	'/register': {//注册
		              component: require('../pages/login/controller/register')
		          }
//            '/register': {//注册
//                component: require('../pages/login/controller/register')
//            }
            /*,'/forgetPassword': {//忘记密码
                component: require('../pages/login/controller/forgetPassword')
            },
            '/passwordReset': {//密码重置
                component: require('../pages/login/controller/passwordReset')
            },
            '/basicInformation': {//基本信息
                component: require('../pages/credit/controller/basicInformation')
            },
            '/careerInformation': {//职业信息
                component: require('../pages/credit/controller/careerInformation')
            },
            '/contactInformation': {//联系人信息
                component: require('../pages/credit/controller/contactInformation')
            },
            '/creditInvestigation': {//征信授权
                component: require('../pages/credit/controller/creditInvestigation')
            },
            '/imageInformation': {//影像信息
                component: require('../pages/credit/controller/imageInformation')
            },
            '/imageShow': {//影像图片显示
                component: require('../pages/credit/controller/imageShow')
            },
            '/instalment': {//用信分期选择
                component: require('../pages/credit/controller/instalment')
            },     
            '/personalCenter': {//个人中心
                component: require('../pages/credit/controller/personalCenter')
            },
            '/payment': {//用信确认
                component: require('../pages/credit/controller/payment')
            },
            '/paymentResult': {//支付结果
                component: require('../pages/credit/controller/paymentResult')
            },
            '/limit': {//我的额度页面
                component: require('../pages/limit/controller/limit')
            },
            '/verificationCode': {//验证码验证
                component: require('../pages/limit/controller/verificationCode')
            },
            'setPayCardCode': {//验证码验证
                component: require('../pages/limit/controller/setPayCardCode')
            },
            '/bindBankCard': {//授信绑卡
                component: require('../pages/limit/controller/bindBankCard')
            },
            '/authentication': {//身份验证
                component: require('../pages/limit/controller/authentication')
            },
            '/changePassword': {//修改密码
                component: require('../pages/help/controller/changePassword')
            },
            '/commonProblem': {//常见问题
                component: require('../pages/help/controller/commonProblem')
            },
            '/companyProfile': {//公司简介
                component: require('../pages/help/controller/companyProfile')
            },
            '/complaintsProposals': {//投诉建议
                component: require('../pages/help/controller/complaintsProposals')
            },
            '/helpCenter': {//帮助中心
                component: require('../pages/help/controller/helpCenter')
            },
            '/troubleShooting': {//问题解答
                component: require('../pages/help/controller/troubleShooting')
            },
            '/troubleShooting2': {//问题解答
                component: require('../pages/help/controller/troubleShooting2')
            },
            '/troubleShooting3': {//问题解答
                component: require('../pages/help/controller/troubleShooting3')
            },
            '/troubleShooting4': {//问题解答
                component: require('../pages/help/controller/troubleShooting4')
            },
            '/troubleShooting5': {//问题解答
                component: require('../pages/help/controller/troubleShooting5')
            },
            '/myInstallment': {//分期列表
                component: require('../pages/installment/controller/myInstallment')
            },
            '/installmentDetails': {//分期详情
                component: require('../pages/installment/controller/installmentDetails')
            },
            '/collectionCode': {//下单收银
                component: require('../pages/orders/controller/collectionCode')
            },
            '/collectionResult': {//收银结果
                component: require('../pages/orders/controller/collectionResult')
            },
            '/ordersCenter': {//订单中心
                component: require('../pages/orders/controller/ordersCenter')
            },
            '/orderTally': {//订单结算
                component: require('../pages/orders/controller/orderTally')
            },
            '/QRCode': {//二维码展示
                component: require('../pages/orders/controller/QRCode')
            },
            '/sellerCenter': {//商户中心
                component: require('../pages/orders/controller/sellerCenter')
            },
            '/storesInformation': {//门店信息
                component: require('../pages/orders/controller/storesInformation')
            },
            '/registerProtocol': {//美的付注册协议
                component: require('../pages/login/controller/registerProtocol')
            },
            '/quickPayProtocol': {//快捷支付协议
                component: require('../pages/limit/controller/quickPayProtocol')
            },
            '/withholdProtocol': {//代扣协议
                component: require('../pages/limit/controller/withholdProtocol')
            },
            '/ShenzhouPayProtocol': {//神州付协议
                component: require('../pages/limit/controller/ShenzhouPayProtocol')
            },
            '/viewerContract': {//合同查看
                component: require('../pages/installment/controller/viewerContract')
            },
            '/borrowingLimitContract': {//借款额度合同
                component: require('../pages/limit/controller/borrowingLimitContract')
            },
            '/borrowingContract': {//美的花借款合同
                component: require('../pages/credit/controller/borrowingContract')
            },
            '/troubleShooting6': {//问题解答
                component: require('../pages/help/controller/troubleShooting6')
            },               
            '/troubleShooting7': {//问题解答
                component: require('../pages/help/controller/troubleShooting7')
            },
            '/sellerLogin/:url': {//商户登录
                component: require('../pages/login/controller/sellerLogin')
            },
            '/repaymentResult': {//还款更新
                component: require('../pages/installment/controller/repaymentResult')
            },
            '/transitionPage': {//过渡页面
                component: require('../pages/login/controller/transitionPage')
            }*/

        });
        router.start(App, '#app');    
    }
    exports.run=init;
})