(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6ee69c4f"],{"43da":function(e,t,r){"use strict";r("508e")},"498a":function(e,t,r){"use strict";var n=r("23e7"),a=r("58a8").trim,s=r("c8d2");n({target:"String",proto:!0,forced:s("trim")},{trim:function(){return a(this)}})},"508e":function(e,t,r){},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,r){var n=r("e330"),a=r("1d80"),s=r("577e"),o=r("5899"),i=n("".replace),c="["+o+"]",u=RegExp("^"+c+c+"*"),l=RegExp(c+c+"*$"),d=function(e){return function(t){var r=s(a(t));return 1&e&&(r=i(r,u,"")),2&e&&(r=i(r,l,"")),r}};e.exports={start:d(1),end:d(2),trim:d(3)}},c8d2:function(e,t,r){var n=r("5e77").PROPER,a=r("d039"),s=r("5899"),o="​᠎";e.exports=function(e){return a((function(){return!!s[e]()||o[e]()!==o||n&&s[e].name!==e}))}},efcf:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"title",rawName:"v-title"}],staticClass:"page-wrapper",attrs:{"data-title":"江分经代OA系统"}},[r("van-form",{staticClass:"login-form",on:{submit:e.onSubmit}},[r("van-cell-group",{attrs:{inset:""}},[r("van-field",{attrs:{label:"账号","left-icon":"user-o",maxlength:"32",placeholder:"请输入账号","label-width":"3rem",clearable:"",rules:[{required:!0}]},model:{value:e.loginForm.userId,callback:function(t){e.$set(e.loginForm,"userId",t)},expression:"loginForm.userId"}}),r("van-field",{attrs:{type:"password",label:"密码",maxlength:"16","left-icon":"lock",placeholder:"请输入密码","label-width":"3rem",clearable:"",rules:[{required:!0}]},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}})],1),r("div",{staticStyle:{margin:"24px"}},[r("van-button",{attrs:{block:"",round:"",type:"primary",disabled:!e.validateSuccess,"native-type":"submit"}},[e._v("登录")])],1)],1),e._m(0)],1)},a=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"copyright"},[e._v(" Copyright ©2022 lcxcsy.top "),r("a",{attrs:{href:"http://beian.miit.gov.cn/",target:"_blank"}},[e._v("苏ICP备2021056380号")])])}],s=r("1da1"),o=(r("96cf"),r("498a"),r("d399")),i=r("365c"),c=r("ed08"),u=r("ed09"),l=Object(u["c"])({name:"LoginPage",setup:function(e,t){var r=t.root,n=r._router,a=r.$store.getters,l=r.$store._actions,d=Object(u["d"])({userId:"",password:""}),p=a.userInfo;d.userId=(null===p||void 0===p?void 0:p.userId)||"";var f=Object(u["a"])((function(){var e=d.userId,t=d.password;return e.length>=1&&t.length>=1})),m=function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return o["a"].loading({duration:0,forbidClick:!0,message:"登录中..."}),t={userId:d.userId.trim(),password:Object(c["a"])(d.userId.trim(),d.password.trim())},e.prev=2,e.next=5,i["m"](t);case 5:r=e.sent,a=r.data,l.syncToken[0](a.token),l.syncUserInfo[0](a.userInfo),o["a"].success("登录成功"),n.push({path:"/home"}),e.next=16;break;case 13:e.prev=13,e.t0=e["catch"](2),o["a"].fail("登录失败，用户名或密码错误");case 16:case"end":return e.stop()}}),e,null,[[2,13]])})));return function(){return e.apply(this,arguments)}}();return{loginForm:d,validateSuccess:f,onSubmit:m}}}),d=l,p=(r("43da"),r("2877")),f=Object(p["a"])(d,n,a,!1,null,"7a4582fe",null);t["default"]=f.exports}}]);