(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4e035b68"],{"34ab":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"record-wrapper"},[a("div",{staticClass:"person-name"},[e._v(e._s(e.active?"审批完成^_^":"请您审批~"))]),a("div",{staticClass:"card-wrapper"},e._l(e.recordList,(function(t,r){return a("van-card",{key:r,attrs:{title:"申请人："+t.personName,desc:"出差时间："+t.startTime+" ~ "+t.endTime+" 共"+e.computeTotalDay(t.startTime,t.endTime)+"天"},scopedSlots:e._u([{key:"tags",fn:function(){return[a("div",[e._v(" 出差地点："+e._s(t.areaName)+" ")]),a("div",{staticStyle:{width:"100%"}},[e._v(" 出差事由："+e._s(t.reason)+" ")]),3===t.status||2===t.status?a("van-tag",{staticStyle:{position:"absolute",right:"0",top:"0"},attrs:{type:3===t.status?"success":"danger"}},[e._v(" "+e._s(3===t.status?"审批通过":"已拒绝")+" ")]):e._e()]},proxy:!0},{key:"footer",fn:function(){return[!e.isAdmin||1!==t.status&&t.status?e._e():a("van-button",{staticStyle:{position:"absolute",left:"10px"},attrs:{size:"small",type:"danger"},on:{click:function(a){return e.handleDeal(2,t.recordId)}}},[e._v(" 拒绝 ")]),!e.isAdmin||1!==t.status&&t.status?e._e():a("van-button",{attrs:{size:"small ",type:"primary"},on:{click:function(a){return e.handleDeal(3,t.recordId)}}},[e._v(" 通过 ")])]},proxy:!0}],null,!0)})})),1),a("van-tabbar",{on:{change:e.queryTripRecord},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},[a("van-tabbar-item",{attrs:{icon:"records"}},[e._v("未审批")]),a("van-tabbar-item",{attrs:{icon:"good-job-o"}},[e._v("已审批")])],1)],1)},n=[],s=a("1da1"),c=(a("96cf"),a("2241")),i=a("365c"),o="Ul0jhI3RRDvWkINjSckhtw==",u={name:"Record",data:function(){return{appKey:"",active:0,recordList:[]}},computed:{isAdmin:function(){return this.appKey===o}},created:function(){this.appKey=this.$route.query.appKey||sessionStorage.getItem("appKey")||"",this.appKey?this.queryTripRecord():c["a"].alert({message:"您暂无权限！"})},methods:{queryTripRecord:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(i["c"])({greatLifeKey:e.greatLifeKey,status:e.active?[2,3]:[1],isAdmin:e.isAdmin});case 3:a=t.sent,r=a.data,e.recordList=r,t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log("queryTripRecord",t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()},computeTotalDay:function(e,t){return(new Date(t)-new Date(e))/864e5+1},handleDeal:function(e,t){var a=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,Object(i["d"])({status:e,recordId:t});case 3:c["a"].alert({message:"您已成功处理该条出差申请！"}),a.queryTripRecord(),r.next=10;break;case 7:r.prev=7,r.t0=r["catch"](0),console.log("updateTripRecord",r.t0);case 10:case"end":return r.stop()}}),r,null,[[0,7]])})))()}}},p=u,d=(a("8711"),a("2877")),l=Object(d["a"])(p,r,n,!1,null,"93983014",null);t["default"]=l.exports},8711:function(e,t,a){"use strict";a("afa8")},afa8:function(e,t,a){}}]);
//# sourceMappingURL=chunk-4e035b68.72c08230.js.map