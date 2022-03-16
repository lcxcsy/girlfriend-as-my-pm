(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f40c290a"],{"00c7":function(t,e,r){"use strict";r("8c35")},"0db6":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"title",rawName:"v-title"}],class:{"page-wrapper":!0,"page-top":0==t.activeBar},attrs:{"data-title":"渠道经理出差申请系统"}},[0===t.activeBar?[r("ApplicationForm",{ref:"applyFormRef",attrs:{userInfo:t.currentUser}})]:[r("TripRecords",{attrs:{userInfo:t.currentUser}})],r("van-tabbar",{model:{value:t.activeBar,callback:function(e){t.activeBar=e},expression:"activeBar"}},[r("van-tabbar-item",{attrs:{icon:"guide-o"}},[t._v("出差申请")]),r("van-tabbar-item",{attrs:{icon:"search"}},[t._v("审批查询")])],1)],2)},a=[],i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("van-dropdown-menu",{staticStyle:{margin:"0 -12px"}},[r("van-dropdown-item",{attrs:{options:t.STATUS_OPTION},on:{change:t.getRecords},model:{value:t.currentStatus,callback:function(e){t.currentStatus=e},expression:"currentStatus"}})],1),r("div",{staticClass:"record-wrapper"},t._l(t.recordsList,(function(e,n){return r("van-card",{key:n,attrs:{title:"申请人："+e.userName,desc:"出差时间："+t.getDateDuration(e.startTime,e.endTime)},scopedSlots:t._u([{key:"tags",fn:function(){return[r("div",{staticClass:"van-card__desc van-ellipsis"},[t._v("出差地点："+t._s(e.areaName))]),r("div",{staticClass:"van-card__desc van-ellipsis"},[t._v("申请事由："+t._s(e.reason))]),r("van-tag",{staticStyle:{position:"absolute",right:"0",top:"0"},attrs:{type:3===e.status?"success":2===e.status?"danger":"warning"}},[t._v(" "+t._s(t.APPROVAL_STATUS[e.status])+" ")])]},proxy:!0}],null,!0)})})),1)],1)},c=[],o=(r("d81d"),r("ac1f"),r("1276"),r("a9e3"),r("46ff")),u=r("358c"),s=r("ed09"),l=Object(s["c"])({name:"TripRecords",props:{userInfo:{type:Object,default:function(){return{}},required:!0}},setup:function(t){var e=Object(s["e"])("1;2;3"),r=Object(o["a"])(),n=r.recordsList,a=r.getTripRecords,i=r.getDateDuration,c=function(){t.userInfo.userId&&a({userId:t.userInfo.userId,status:e.value.split(";").map((function(t){return Number(t)}))})};return c(),{STATUS_OPTION:u["d"],APPROVAL_STATUS:u["a"],currentStatus:e,recordsList:n,getDateDuration:i,getRecords:c}}}),f=l,d=(r("293c"),r("2877")),p=Object(d["a"])(f,i,c,!1,null,"40695496",null),x=p.exports,v=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"person-name"},[t._v("Hi~, "+t._s(t.userInfo.userName||"陌生人"))]),r("van-form",{on:{submit:t.onFormSubmit}},[r("van-field",{attrs:{readonly:"",clickable:"",required:"",name:"picker",label:"出差地点",placeholder:"请选择",value:t.formData.areaName,rules:[{required:!0}]},on:{click:function(e){t.showAreaPicker=!0}}}),r("van-popup",{attrs:{position:"bottom"},model:{value:t.showAreaPicker,callback:function(e){t.showAreaPicker=e},expression:"showAreaPicker"}},[r("van-picker",{attrs:{"show-toolbar":"",title:"出差地点",columns:t.REGION_TREE},on:{confirm:t.onAreaConfirm,cancel:function(e){t.showAreaPicker=!1}}})],1),r("van-field",{attrs:{readonly:"",clickable:"",required:"",name:"calendar",label:"出差时间",placeholder:"请选择日期",value:t.tripDuration,rules:[{required:!0}]},on:{click:function(e){t.showCalendar=!0}}}),r("van-calendar",{attrs:{type:"range","allow-same-day":!0},on:{confirm:t.onCalendarConfirm},model:{value:t.showCalendar,callback:function(e){t.showCalendar=e},expression:"showCalendar"}}),r("van-field",{attrs:{rows:"2",autosize:"",required:"",label:"申请事由",type:"textarea",maxlength:"50",placeholder:"请说明出差渠道机构、工作内容","show-word-limit":"",rules:[{required:!0}]},model:{value:t.formData.reason,callback:function(e){t.$set(t.formData,"reason",e)},expression:"formData.reason"}}),r("div",{staticStyle:{margin:"16px 100px"}},[r("van-button",{attrs:{round:"",block:"",type:"primary",disabled:t.submitDisabled,"native-type":"submit"}},[t._v(" 提交 ")])],1)],1)],1)},b=[],h=r("5530"),m=r("1da1"),g=(r("96cf"),r("5a0c")),w=r.n(g),O=r("3782"),y=Object(s["c"])({name:"TripApply",props:{userInfo:{type:Object,default:function(){return{}},required:!0}},setup:function(t){var e=Object(o["a"])(),r=e.formData,n=e.getDateDuration,a=e.addTripRecord,i=e.handleReset,c=Object(s["e"])(!1),u=function(t){"市辖区"===t[1]?r.areaName=t[0]:r.areaName=t[0]+"-"+t[1],c.value=!1},l=Object(s["e"])(""),f=Object(s["e"])(!1),d=function(t){r.startTime=w()(t[0]).format("YYYY/MM/DD"),r.endTime=w()(t[1]).format("YYYY/MM/DD");var e=r.startTime,a=r.endTime;l.value=n(e,a),f.value=!1},p=Object(s["a"])((function(){var t=!1;for(var e in r)""===r[e]&&(t=!0);return t})),x=function(){var e=Object(m["a"])(regeneratorRuntime.mark((function e(){var n,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.userInfo,c=Object(h["a"])(Object(h["a"])({},r),{},{userName:n.userName,userId:n.userId}),e.next=4,a(c);case 4:i(),l.value="";case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return{formData:r,REGION_TREE:O,showAreaPicker:c,onAreaConfirm:u,tripDuration:l,showCalendar:f,onCalendarConfirm:d,submitDisabled:p,onFormSubmit:x}}}),T=y,I=(r("00c7"),Object(d["a"])(T,v,b,!1,null,"b10d8200",null)),j=I.exports,_=Object(s["c"])({name:"BusinessTripApply",components:{TripRecords:x,ApplicationForm:j},setup:function(t,e){var r=e.root,n=Object(s["e"])(0),a=r.$store.getters.userInfo;return{currentUser:a,activeBar:n}}}),E=_,N=(r("4b13"),Object(d["a"])(E,n,a,!1,null,"bc542432",null));e["default"]=N.exports},1276:function(t,e,r){"use strict";var n=r("2ba4"),a=r("c65b"),i=r("e330"),c=r("d784"),o=r("44e7"),u=r("825a"),s=r("1d80"),l=r("4840"),f=r("8aa5"),d=r("50c4"),p=r("577e"),x=r("dc4a"),v=r("4dae"),b=r("14c3"),h=r("9263"),m=r("9f7f"),g=r("d039"),w=m.UNSUPPORTED_Y,O=4294967295,y=Math.min,T=[].push,I=i(/./.exec),j=i(T),_=i("".slice),E=!g((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var r="ab".split(t);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));c("split",(function(t,e,r){var i;return i="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,r){var i=p(s(this)),c=void 0===r?O:r>>>0;if(0===c)return[];if(void 0===t)return[i];if(!o(t))return a(e,i,t,c);var u,l,f,d=[],x=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),b=0,m=new RegExp(t.source,x+"g");while(u=a(h,m,i)){if(l=m.lastIndex,l>b&&(j(d,_(i,b,u.index)),u.length>1&&u.index<i.length&&n(T,d,v(u,1)),f=u[0].length,b=l,d.length>=c))break;m.lastIndex===u.index&&m.lastIndex++}return b===i.length?!f&&I(m,"")||j(d,""):j(d,_(i,b)),d.length>c?v(d,0,c):d}:"0".split(void 0,0).length?function(t,r){return void 0===t&&0===r?[]:a(e,this,t,r)}:e,[function(e,r){var n=s(this),c=void 0==e?void 0:x(e,t);return c?a(c,e,n,r):a(i,p(n),e,r)},function(t,n){var a=u(this),c=p(t),o=r(i,a,c,n,i!==e);if(o.done)return o.value;var s=l(a,RegExp),x=a.unicode,v=(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.unicode?"u":"")+(w?"g":"y"),h=new s(w?"^(?:"+a.source+")":a,v),m=void 0===n?O:n>>>0;if(0===m)return[];if(0===c.length)return null===b(h,c)?[c]:[];var g=0,T=0,I=[];while(T<c.length){h.lastIndex=w?0:T;var E,N=b(h,w?_(c,T):c);if(null===N||(E=y(d(h.lastIndex+(w?T:0)),c.length))===g)T=f(c,T,x);else{if(j(I,_(c,g,T)),I.length===m)return I;for(var R=1;R<=N.length-1;R++)if(j(I,N[R]),I.length===m)return I;T=g=E}}return j(I,_(c,g)),I}]}),!E,w)},"159b":function(t,e,r){var n=r("da84"),a=r("fdbc"),i=r("785a"),c=r("17c2"),o=r("9112"),u=function(t){if(t&&t.forEach!==c)try{o(t,"forEach",c)}catch(e){t.forEach=c}};for(var s in a)a[s]&&u(n[s]&&n[s].prototype);u(i)},"17c2":function(t,e,r){"use strict";var n=r("b727").forEach,a=r("a640"),i=a("forEach");t.exports=i?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"1dde":function(t,e,r){var n=r("d039"),a=r("b622"),i=r("2d00"),c=a("species");t.exports=function(t){return i>=51||!n((function(){var e=[],r=e.constructor={};return r[c]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"293c":function(t,e,r){"use strict";r("bc82")},3782:function(t){t.exports=JSON.parse('[{"text":"南京市","children":[{"text":"市辖区"},{"text":"玄武区"},{"text":"秦淮区"},{"text":"建邺区"},{"text":"鼓楼区"},{"text":"浦口区"},{"text":"栖霞区"},{"text":"雨花台区"},{"text":"江宁区"},{"text":"六合区"},{"text":"溧水区"},{"text":"高淳区"}]},{"text":"无锡市","children":[{"text":"市辖区"},{"text":"锡山区"},{"text":"惠山区"},{"text":"滨湖区"},{"text":"梁溪区"},{"text":"新吴区"},{"text":"江阴市"},{"text":"宜兴市"}]},{"text":"徐州市","children":[{"text":"市辖区"},{"text":"鼓楼区"},{"text":"云龙区"},{"text":"贾汪区"},{"text":"铜山区"},{"text":"丰县"},{"text":"沛县"},{"text":"睢宁县"},{"text":"新沂市"},{"text":"邳州市"}]},{"text":"常州市","children":[{"text":"市辖区"},{"text":"天宁区"},{"text":"钟楼区"},{"text":"新北区"},{"text":"武进区"},{"text":"金坛区"},{"text":"溧阳市"}]},{"text":"苏州市","children":[{"text":"市辖区"},{"text":"虎丘区"},{"text":"吴中区"},{"text":"相城区"},{"text":"姑苏区"},{"text":"吴江区"},{"text":"常熟市"},{"text":"张家港市"},{"text":"昆山市"},{"text":"太仓市"}]},{"text":"南通市","children":[{"text":"市辖区"},{"text":"崇川区"},{"text":"港闸区"},{"text":"通州区"},{"text":"海安县"},{"text":"如东县"},{"text":"启东市"},{"text":"如皋市"},{"text":"海门市"}]},{"text":"连云港市","children":[{"text":"市辖区"},{"text":"连云区"},{"text":"海州区"},{"text":"赣榆区"},{"text":"东海县"},{"text":"灌云县"},{"text":"灌南县"}]},{"text":"淮安市","children":[{"text":"市辖区"},{"text":"淮安区"},{"text":"淮阴区"},{"text":"清江浦区"},{"text":"洪泽区"},{"text":"涟水县"},{"text":"盱眙县"},{"text":"金湖县"}]},{"text":"盐城市","children":[{"text":"市辖区"},{"text":"亭湖区"},{"text":"盐都区"},{"text":"大丰区"},{"text":"响水县"},{"text":"滨海县"},{"text":"阜宁县"},{"text":"射阳县"},{"text":"建湖县"},{"text":"东台市"}]},{"text":"扬州市","children":[{"text":"市辖区"},{"text":"广陵区"},{"text":"邗江区"},{"text":"江都区"},{"text":"宝应县"},{"text":"仪征市"},{"text":"高邮市"}]},{"text":"镇江市","children":[{"text":"市辖区"},{"text":"京口区"},{"text":"润州区"},{"text":"丹徒区"},{"text":"丹阳市"},{"text":"扬中市"},{"text":"句容市"}]},{"text":"泰州市","children":[{"text":"市辖区"},{"text":"海陵区"},{"text":"高港区"},{"text":"姜堰区"},{"text":"兴化市"},{"text":"靖江市"},{"text":"泰兴市"}]},{"text":"宿迁市","children":[{"text":"市辖区"},{"text":"宿城区"},{"text":"宿豫区"},{"text":"沭阳县"},{"text":"泗阳县"},{"text":"泗洪县"}]}]')},"408a":function(t,e,r){var n=r("e330");t.exports=n(1..valueOf)},"44e7":function(t,e,r){var n=r("861d"),a=r("c6b6"),i=r("b622"),c=i("match");t.exports=function(t){var e;return n(t)&&(void 0!==(e=t[c])?!!e:"RegExp"==a(t))}},"46ff":function(t,e,r){"use strict";r.d(e,"a",(function(){return u}));var n=r("1da1"),a=(r("99af"),r("96cf"),r("2241")),i=r("d399"),c=r("365c"),o=r("ed09"),u=function(){var t=Object(o["d"])({areaName:"",startTime:"",endTime:"",reason:""}),e=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,c["a"](e);case 3:a["a"].alert({message:"您已成功添加一条出差记录！"}),t.next=9;break;case 6:t.prev=6,t.t0=t["catch"](0),console.log(t.t0,"addTripRecord");case 9:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e){return t.apply(this,arguments)}}(),r=function(){t.areaName="",t.startTime="",t.endTime="",t.reason=""},u=Object(o["e"])([]),s=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,c["i"](e);case 3:r=t.sent,n=r.data,u.value=null!==n&&void 0!==n&&n.length?n:[],t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log("getTripRecords",t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}(),l=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,c["j"](e);case 3:i["a"].success("处理成功！"),t.next=9;break;case 6:t.prev=6,t.t0=t["catch"](0),console.log("updateTripRecord",t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e){return t.apply(this,arguments)}}(),f=function(t,e){if(t&&e){var r=(new Date(e).getTime()-new Date(t).getTime())/864e5+1;return"".concat(t," ~ ").concat(e," 共").concat(r,"天")}return""};return{recordsList:u,formData:t,addTripRecord:e,getTripRecords:s,handleReset:r,handleApplyForm:l,getDateDuration:f}}},"4b13":function(t,e,r){"use strict";r("7dca")},"4de4":function(t,e,r){"use strict";var n=r("23e7"),a=r("b727").filter,i=r("1dde"),c=i("filter");n({target:"Array",proto:!0,forced:!c},{filter:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},5530:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));r("b64b"),r("a4d3"),r("4de4"),r("d3b7"),r("e439"),r("159b"),r("dbb4");function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,r){var n=r("e330"),a=r("1d80"),i=r("577e"),c=r("5899"),o=n("".replace),u="["+c+"]",s=RegExp("^"+u+u+"*"),l=RegExp(u+u+"*$"),f=function(t){return function(e){var r=i(a(e));return 1&t&&(r=o(r,s,"")),2&t&&(r=o(r,l,"")),r}};t.exports={start:f(1),end:f(2),trim:f(3)}},7156:function(t,e,r){var n=r("1626"),a=r("861d"),i=r("d2bb");t.exports=function(t,e,r){var c,o;return i&&n(c=e.constructor)&&c!==r&&a(o=c.prototype)&&o!==r.prototype&&i(t,o),t}},"7dca":function(t,e,r){},"8c35":function(t,e,r){},"99af":function(t,e,r){"use strict";var n=r("23e7"),a=r("da84"),i=r("d039"),c=r("e8b5"),o=r("861d"),u=r("7b0b"),s=r("07fa"),l=r("8418"),f=r("65f0"),d=r("1dde"),p=r("b622"),x=r("2d00"),v=p("isConcatSpreadable"),b=9007199254740991,h="Maximum allowed index exceeded",m=a.TypeError,g=x>=51||!i((function(){var t=[];return t[v]=!1,t.concat()[0]!==t})),w=d("concat"),O=function(t){if(!o(t))return!1;var e=t[v];return void 0!==e?!!e:c(t)},y=!g||!w;n({target:"Array",proto:!0,forced:y},{concat:function(t){var e,r,n,a,i,c=u(this),o=f(c,0),d=0;for(e=-1,n=arguments.length;e<n;e++)if(i=-1===e?c:arguments[e],O(i)){if(a=s(i),d+a>b)throw m(h);for(r=0;r<a;r++,d++)r in i&&l(o,d,i[r])}else{if(d>=b)throw m(h);l(o,d++,i)}return o.length=d,o}})},a640:function(t,e,r){"use strict";var n=r("d039");t.exports=function(t,e){var r=[][t];return!!r&&n((function(){r.call(null,e||function(){throw 1},1)}))}},a9e3:function(t,e,r){"use strict";var n=r("83ab"),a=r("da84"),i=r("e330"),c=r("94ca"),o=r("6eeb"),u=r("1a2d"),s=r("7156"),l=r("3a9b"),f=r("d9b5"),d=r("c04e"),p=r("d039"),x=r("241c").f,v=r("06cf").f,b=r("9bf2").f,h=r("408a"),m=r("58a8").trim,g="Number",w=a[g],O=w.prototype,y=a.TypeError,T=i("".slice),I=i("".charCodeAt),j=function(t){var e=d(t,"number");return"bigint"==typeof e?e:_(e)},_=function(t){var e,r,n,a,i,c,o,u,s=d(t,"number");if(f(s))throw y("Cannot convert a Symbol value to a number");if("string"==typeof s&&s.length>2)if(s=m(s),e=I(s,0),43===e||45===e){if(r=I(s,2),88===r||120===r)return NaN}else if(48===e){switch(I(s,1)){case 66:case 98:n=2,a=49;break;case 79:case 111:n=8,a=55;break;default:return+s}for(i=T(s,2),c=i.length,o=0;o<c;o++)if(u=I(i,o),u<48||u>a)return NaN;return parseInt(i,n)}return+s};if(c(g,!w(" 0o1")||!w("0b1")||w("+0x1"))){for(var E,N=function(t){var e=arguments.length<1?0:w(j(t)),r=this;return l(O,r)&&p((function(){h(r)}))?s(Object(e),r,N):e},R=n?x(w):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),k=0;R.length>k;k++)u(w,E=R[k])&&!u(N,E)&&b(N,E,v(w,E));N.prototype=O,O.constructor=N,o(a,g,N)}},bc82:function(t,e,r){},d81d:function(t,e,r){"use strict";var n=r("23e7"),a=r("b727").map,i=r("1dde"),c=i("map");n({target:"Array",proto:!0,forced:!c},{map:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},dbb4:function(t,e,r){var n=r("23e7"),a=r("83ab"),i=r("56ef"),c=r("fc6a"),o=r("06cf"),u=r("8418");n({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(t){var e,r,n=c(t),a=o.f,s=i(n),l={},f=0;while(s.length>f)r=a(n,e=s[f++]),void 0!==r&&u(l,e,r);return l}})},e439:function(t,e,r){var n=r("23e7"),a=r("d039"),i=r("fc6a"),c=r("06cf").f,o=r("83ab"),u=a((function(){c(1)})),s=!o||u;n({target:"Object",stat:!0,forced:s,sham:!o},{getOwnPropertyDescriptor:function(t,e){return c(i(t),e)}})}}]);