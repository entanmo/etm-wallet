webpackJsonp([18],{kxaV:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("LHK4"),o=s("av1y"),i=s("DfFo"),c=s("OUwZ"),n=s("KvKp"),l=s("mtWM"),r=s.n(l),d={components:{Page:a.a,NoData:o.a,SSecret:i.a},data:function(){return{totalVoters:0,selectDelegates:[],delegate:[],PageTotal:1,showPop:!1,tableData:[],haveVoted:[],ONE_PAGE_NUM:10,voteType:"",submitVote:!1,filterDisabled:[],secondSecret:"",showSecondSecretPop:!1}},computed:{yesOrNo:function(){return"成功"===this.voteType?"success-tip":"fail-tip"}},mounted:function(){r.a.all([this._getTotalDelegates(0),this._getRecord()]).then(r.a.spread(function(){})),this.delegate.length?this.$refs.voteBtn.disabled=!1:this.$refs.voteBtn.disabled=!0},created:function(){this.$store.needsSecondSecret&&(this.showSecondSecretPop=!0)},updated:function(){var e=this;Bus.$on("hideQrcode",function(t){e.showPop=!1})},methods:{_getRecord:function(){var e=this;this.$http.get("/api/accounts/delegates",{params:{address:Object(c.a)(localStorage.getItem("etmsecret")||sessionStorage.getItem("etmsecret"))}}).then(function(t){t.data.success&&(e.haveVoted=t.data.delegates)}).catch(function(e){console.log(e)})},_getTotalD:function(){var e=this;this.$http.get("/api/delegates/",{params:{orderby:"approval:desc"}}).then(function(t){e.filterDisabled=Object(n.a)(e.haveVoted,t.data.delegates).result})},_getTotalDelegates:function(e){var t=this;this.$http.get("/api/delegates/",{params:{orderby:"approval:desc",offset:this.ONE_PAGE_NUM*e,limit:this.ONE_PAGE_NUM}}).then(function(e){if(e.data.success){t.tableData=e.data.delegates,t.totalVoters=e.data.totalCount,t.PageTotal=Math.ceil(e.data.totalCount/t.ONE_PAGE_NUM);Object(n.b)(t.filterDisabled,t.tableData).result;var s=Object(n.b)(t.filterDisabled,t.tableData).indexs;t.$nextTick(function(){for(var e=0;e<t.$refs.checkBox.length;e++){t.$refs.checkBox[e].disabled=!0}s.forEach(function(e){t.$refs.checkBox[e].disabled=!1})})}}).catch(function(e){console.log(e)})},submitVoter:function(){this.showPop=!1,Bus.$emit("showMask",!1),this.$store.state.needsSecondSecret?this.showSecondSecretPop=!0:this._submitVoter()},_submitVoter:function(){var e=this;this.$http.put("/api/accounts/delegates",{secret:localStorage.getItem("etmsecret")||sessionStorage.getItem("etmsecret"),delegates:this.delegate,secondSecret:this.secondSecret}).then(function(t){Bus.$emit("showMask",!1),e.showPop=!1,t.data.success?(e.voteType="成功",e.submitVote=!0,setTimeout(function(){e.submitVote=!1},2e3)):(e.voteType="失败",e.submitVote=!0,setTimeout(function(){e.submitVote=!1},2e3))})},vote:function(){this.showPop=!0,Bus.$emit("showMask",!0)},hidePopout:function(){this.showPop=!1,Bus.$emit("showMask",!1)},renderDiff:function(e){this._getTotalDelegates(e)},hidePop:function(e){this.showSecondSecretPop=e},inputSSecret:function(e){this.secondSecret=e,this._submitVoter()}},watch:{selectDelegates:function(e,t){var s=this;this.delegate=[],e.forEach(function(e){s.delegate.push("+"+e.publicKey)}),this.delegate.length?this.$refs.voteBtn.disabled=!1:this.$refs.voteBtn.disabled=!0},haveVoted:function(e){e.length&&this._getTotalD()}}},h={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"w"},[s("div",{staticClass:"head flex"},[s("p",[e._v("共"+e._s(e.totalVoters)+"人")]),e._v(" "),s("button",{ref:"voteBtn",on:{click:e.vote}},[e._v("投票")])]),e._v(" "),s("div",{staticClass:"event"},[s("table",{directives:[{name:"show",rawName:"v-show",value:e.tableData.length,expression:"tableData.length"}],attrs:{width:"100%",border:"0",cellspacing:"0",cellpresumeing:"0"}},[e._m(0),e._v(" "),s("tbody",{staticClass:"table_tb"},e._l(e.tableData,function(t,a){return s("tr",{key:a},[s("td",[s("input",{directives:[{name:"model",rawName:"v-model",value:e.selectDelegates,expression:"selectDelegates"}],ref:"checkBox",refInFor:!0,attrs:{type:"checkbox",disabled:""},domProps:{value:t,checked:Array.isArray(e.selectDelegates)?e._i(e.selectDelegates,t)>-1:e.selectDelegates},on:{change:function(s){var a=e.selectDelegates,o=s.target,i=!!o.checked;if(Array.isArray(a)){var c=t,n=e._i(a,c);o.checked?n<0&&(e.selectDelegates=a.concat([c])):n>-1&&(e.selectDelegates=a.slice(0,n).concat(a.slice(n+1)))}else e.selectDelegates=i}}})]),e._v(" "),s("td",[e._v(e._s(t.rate))]),e._v(" "),s("td",[e._v(e._s(t.username))]),e._v(" "),s("td",{staticStyle:{color:"#399dff"}},[e._v(e._s(t.address))]),e._v(" "),s("td",[e._v(e._s(t.productivity)+"%")]),e._v(" "),s("td",[e._v(e._s(t.producedblocks))]),e._v(" "),s("td",[e._v(e._s(t.approval)+"%")])])}))]),e._v(" "),s("no-data",{directives:[{name:"show",rawName:"v-show",value:!e.tableData.length,expression:"!tableData.length"}]})],1),e._v(" "),s("page",{directives:[{name:"show",rawName:"v-show",value:e.PageTotal>1,expression:"PageTotal > 1"}],attrs:{PageTotal:e.PageTotal},on:{renderDiff:e.renderDiff}}),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.showPop,expression:"showPop"}],staticClass:"popout"},[s("div",{staticClass:"close"},[s("span",{on:{click:e.hidePopout}},[e._v("×")])]),e._v(" "),s("p",{staticClass:"title"},[e._v("投票给受托人")]),e._v(" "),s("p",{staticClass:"care"},[e._v("请确认您的选择与投票，每张票最多可同时投33人")]),e._v(" "),s("div",{staticClass:"input-list"},e._l(e.selectDelegates,function(t,a){return s("div",{key:a,staticClass:"input-line"},[s("div",{staticClass:"input clearfix"},[s("span",{staticClass:"fl"},[e._v(e._s(t.username))]),e._v(" "),s("span",{staticClass:"gre fr"},[e._v(e._s(t.address))])])])})),e._v(" "),s("div",{staticClass:"set-btm"},[s("div",{staticClass:"confirm"},[s("button",{on:{click:e.submitVoter}},[e._v("提交")])]),e._v(" "),s("p",{staticClass:"tips"},[e._v("投票需支付0.01Mole")])])]),e._v(" "),s("s-secret",{directives:[{name:"show",rawName:"v-show",value:e.showSecondSecretPop,expression:"showSecondSecretPop"}],on:{hidePop:e.hidePop,inputSSecret:e.inputSSecret}}),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.submitVote,expression:"submitVote"}],staticClass:"tip",class:e.yesOrNo},[e._v("\n\t\t\t投票"+e._s(e.voteType)+"！\n\t\t")])],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("thead",{staticClass:"table_th"},[s("th"),e._v(" "),s("th",[e._v("排名")]),e._v(" "),s("th",[e._v("受托人")]),e._v(" "),s("th",[e._v("地址")]),e._v(" "),s("th",[e._v("生产率")]),e._v(" "),s("th",[e._v("生产块数")]),e._v(" "),s("th",[e._v("得票率")])])}]};var v=s("VU/8")(d,h,!1,function(e){s("zlIx")},"data-v-36ce8b82",null);t.default=v.exports},zlIx:function(e,t){}});
//# sourceMappingURL=18.fec4667005ad628b30c1.js.map