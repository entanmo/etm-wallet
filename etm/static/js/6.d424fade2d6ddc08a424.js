webpackJsonp([6],{"+6Bv":function(e,t){},"5gXl":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("//Fk"),o=s.n(a),i=s("LHK4"),n=s("av1y"),c=s("DfFo"),l=s("OUwZ"),r={components:{Page:i.a,NoData:n.a,SSecret:c.a},data:function(){return{PageTotal:1,onOff:"未开启",delegateName:"",showPop:!1,delegateInfo:{},tableData:[],publickey:"",ONE_PAGE_NUM:10,submitVote:!1,voteType:"",showPop1:!1,secondSecret:""}},computed:{yesOrNo:function(){return"成功"===this.voteType?"success-tip":"fail-tip"}},updated:function(){var e=this;Bus.$on("hideQrcode",function(t){e.showPop=!1})},activated:function(){this.$store.commit("changeTitle","区块生产")},created:function(){this.publickey=Object(l.b)(localStorage.getItem("etmsecret")||sessionStorage.getItem("etmsecret")),this._getDelegateDetail(this.publickey)},methods:{showPopout:function(){this.showPop=!0,Bus.$emit("showMask",!0)},hidePopout:function(){this.showPop=!1,Bus.$emit("showMask",!1)},setDelegates:function(){this.showPop=!1,Bus.$emit("showMask",!1),this.$store.state.needsSecondSecret?this.showPop1=!0:this._setDelegates()},_setDelegates:function(){var e=this;this.checkSecondSecret(),this.$http.put("http://118.24.135.98:4096/api/delegates",{secret:localStorage.getItem("etmsecret")||sessionStorage.getItem("etmsecret"),username:this.delegateName,secondSecret:this.secondSecret}).then(function(t){e.hidePopout(),t.data.success?(e.onOff="已开启",e.voteType="成功",e.submitVote=!0,setTimeout(function(){e.submitVote=!1},2e3)):(e.voteType="失败",e.submitVote=!0,setTimeout(function(){e.submitVote=!1},2e3))}).catch(function(e){console.log(e)})},_getDelegateDetail:function(e){var t=this;this.$http.get("http://118.24.135.98:4096/api/delegates/get/",{params:{publicKey:e}}).then(function(s){s.data.success?(t.onOff="已开启",t.delegateInfo=s.data.delegate,t._getBlocks(e,0)):t.onOff="未开启"})},_getBlocks:function(e,t){var s=this;this.$http.get("http://118.24.135.98:4096/api/blocks",{params:{generatorPublicKey:e,offset:this.ONE_PAGE_NUM*t,limit:this.ONE_PAGE_NUM}}).then(function(e){e.data.success&&(s.tableData=e.data.blocks,s.PageTotal=Math.ceil(e.data.blocks.length/s.ONE_PAGE_NUM))})},renderDiff:function(e){this._getBlocks(this.publickey,e)},hidePop:function(e){this.showPop1=e},inputSSecret:function(e){this.secondSecret=e,this._setDelegates()},checkSecondSecret:function(){this.$store.needsSecondSecret||this.$http.interceptors.request.use(function(e){return delete e.data.secondSecret,e},function(e){return o.a.reject(error)})}},watch:{}},v={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"w"},[s("p",{staticClass:"name"},[e._v("受托人基本信息\n      "),s("span",{staticClass:"btn"},[e._v(e._s(e.onOff))]),e._v(" "),s("button",{ref:"registerBtn",staticClass:"btn",on:{click:e.showPopout}},[e._v("注册受托人")])]),e._v(" "),s("div",{staticClass:"info"},[s("ul",{staticClass:"flex"},[s("li",[s("p",[e._v("总收益")]),e._v(" "),s("p",[e._v(e._s(e.delegateInfo.rewards))])]),e._v(" "),s("li",[s("p",[e._v("排名")]),e._v(" "),s("p",[e._v(e._s(e.delegateInfo.rate))])]),e._v(" "),s("li",[s("p",[e._v("生产率")]),e._v(" "),s("p",[e._v(e._s(e.delegateInfo.productivity))])]),e._v(" "),s("li",[s("p",[e._v("得票率")]),e._v(" "),s("p",[e._v(e._s(e.delegateInfo.approval))])])])]),e._v(" "),s("p",{staticClass:"name",staticStyle:{"margin-top":"26px"}},[e._v("生产的区块")]),e._v(" "),s("div",{staticClass:"event"},[s("table",{directives:[{name:"show",rawName:"v-show",value:e.tableData.length,expression:"tableData.length"}],attrs:{width:"100%",border:"0",cellspacing:"0",cellpresumeing:"0"}},[e._m(0),e._v(" "),s("tbody",{staticClass:"table_tb"},e._l(e.tableData,function(t,a){return s("tr",{key:a},[s("td",{staticStyle:{color:"#399dff"}},[e._v(e._s(t.id))]),e._v(" "),s("td",[e._v(e._s(t.type))]),e._v(" "),s("td"),e._v(" "),s("td"),e._v(" "),s("td"),e._v(" "),s("td"),e._v(" "),s("td")])}))]),e._v(" "),s("no-data",{directives:[{name:"show",rawName:"v-show",value:!e.tableData.length,expression:"!tableData.length"}]})],1),e._v(" "),s("page",{directives:[{name:"show",rawName:"v-show",value:e.PageTotal>1,expression:"PageTotal > 1"}],attrs:{PageTotal:e.PageTotal},on:{renderDiff:e.renderDiff}}),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.showPop,expression:"showPop"}],staticClass:"popout"},[s("div",{staticClass:"close"},[s("span",{on:{click:e.hidePopout}},[e._v("×")])]),e._v(" "),s("p",{staticClass:"title"},[e._v("注册为受托人")]),e._v(" "),s("div",{staticClass:"input"},[s("label",[e._v("受托人名称：")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.delegateName,expression:"delegateName"}],attrs:{type:"text",placeholder:"用户名只能包含除了@$&_的字母、数字、字符"},domProps:{value:e.delegateName},on:{input:function(t){t.target.composing||(e.delegateName=t.target.value)}}})]),e._v(" "),s("div",{staticClass:"confirm"},[s("button",{on:{click:e.setDelegates}},[e._v("提交")])]),e._v(" "),s("p",{staticClass:"tips"},[e._v("注册需支付100Mole")])]),e._v(" "),s("s-secret",{directives:[{name:"show",rawName:"v-show",value:e.showPop1,expression:"showPop1"}],on:{hidePop:e.hidePop,inputSSecret:e.inputSSecret}}),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.submitVote,expression:"submitVote"}],staticClass:"tip",class:e.yesOrNo},[e._v("\n\t\t\t注册"+e._s(e.voteType)+"！\n\t\t")])],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("thead",{staticClass:"table_th"},[s("th",[e._v("高度")]),e._v(" "),s("th",[e._v("日期")]),e._v(" "),s("th",[e._v("ID")]),e._v(" "),s("th",[e._v("交易")]),e._v(" "),s("th",[e._v("金额")]),e._v(" "),s("th",[e._v("费用")]),e._v(" "),s("th",[e._v("奖励")])])}]};var h=s("VU/8")(r,v,!1,function(e){s("+6Bv")},"data-v-d544ea04",null);t.default=h.exports}});
//# sourceMappingURL=6.d424fade2d6ddc08a424.js.map