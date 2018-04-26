<template>
  <div class="w">
    <!-- info -->
    <p class="name">受托人基本信息
      <span class="btn">{{onOff}}</span>
      <button class="btn" ref="registerBtn" @click="showPopout">注册受托人</button>
    </p>
    <div class="info">
        <ul class="flex">
            <li>
              <p>总收益</p>
              <p>{{delegateInfo.rewards}}</p>
            </li>
            <li>
              <p>排名</p>
              <p>{{delegateInfo.rate}}</p>
            </li>
            <li>
              <p>生产率</p>
              <p>{{delegateInfo.productivity}}</p>
            </li>
            <li>
              <p>得票率</p>
              <p>{{delegateInfo.approval}}</p>
            </li>
        </ul>
    </div>
    <p class="name" style="margin-top:26px;">生产的区块</p>
    <!-- table -->
    <div class="event" >
      <table width=100% border="0" cellspacing="0" cellpresumeing="0" v-show="tableData.length">
          <thead class="table_th">
              <th>高度</th>
              <th>日期</th>
              <th>ID</th>
              <th>交易</th>
              <th>金额</th>
              <th>费用</th>
              <th>奖励</th>
          </thead>
          <tbody class="table_tb">
              <tr v-for="(item, index) in tableData" :key="index">
                  <td style="color: #399dff;">{{item.id}}</td>
                  <td>{{item.type}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
          </tbody>
      </table>
      <!-- <loading v-show="!beforeConfirm.length && !cannotfind"></loading> -->
      <no-data v-show="!tableData.length"></no-data>
    </div>
    <!-- 分页 -->
    <page v-show="PageTotal > 1" :PageTotal="PageTotal" @renderDiff="renderDiff"></page>
    <!-- 弹框 -->
    <div class="popout" v-show="showPop">
      <div class="close"><span @click="hidePopout">×</span></div>
      <p class="title">注册为受托人</p>
      <div class="input">
        <label>受托人名称：</label>
        <input type="text" placeholder="用户名只能包含除了@$&_的字母、数字、字符" v-model="delegateName">
      </div>
      <div class="confirm"><button @click="setDelegates">提交</button></div>
      <p class="tips">注册需支付100Mole</p>
    </div>
    <s-secret v-show="showPop1" @hidePop="hidePop" @inputSSecret="inputSSecret"></s-secret>

    <div class="tip" v-show="submitVote" :class="yesOrNo">
			注册{{voteType}}！
		</div>
  </div>
</template>

<script>
import Page from "../base/page";
import NoData from "../base/nodata";
import SSecret from "../base/second-secret";
import { genPublicKey } from "../assets/js/gen";
export default {
  components: {
    Page,
    NoData,
    SSecret
  },
  data() {
    return {
      PageTotal: 1,
      onOff: "未开启",
      delegateName: "",
      showPop: false,
      delegateInfo: {},
      tableData: [],
      publickey: "",
      ONE_PAGE_NUM: 10,
      submitVote: false,
      voteType: "",
      showPop1: false,
      secondSecret: ""
    };
  },
  computed: {
    yesOrNo() {
      return this.voteType === "成功" ? "success-tip" : "fail-tip";
    }
  },
  updated() {
    Bus.$on("hideQrcode", data => {
      this.showPop = false;
    });
  },
  activated() {
    this.$store.commit("changeTitle", "区块生产");
  },
  created() {
    this.publickey = genPublicKey(
      localStorage.getItem("etmsecret") || sessionStorage.getItem("etmsecret")
    );
    // 根据公钥查看受托人详情
    this._getDelegateDetail(this.publickey);
  },
  methods: {
    showPopout() {
      this.showPop = true;
      Bus.$emit("showMask", true);
    },
    hidePopout() {
      this.showPop = false;
      Bus.$emit("showMask", false);
    },
    setDelegates() {
      this.showPop = false;
      Bus.$emit("showMask", false);

      // 是否需要二级密码
      if (this.$store.state.needsSecondSecret) {
        this.showPop1 = true;
      } else {
        this._setDelegates();
      }
    },
    _setDelegates() {
      this.$http
        .put("/api/delegates", {
          secret:
            localStorage.getItem("etmsecret") ||
            sessionStorage.getItem("etmsecret"),
          username: this.delegateName,
          secondSecret: this.secondSecret
        })
        .then(res => {
          // 注册后关闭弹框
          this.hidePopout();
          if (res.data.success) {
            this.onOff = "已开启";
            this.voteType = "成功";
            this.submitVote = true;
            setTimeout(() => {
              this.submitVote = false;
            }, 2000);
          } else {
            this.voteType = "失败";
            this.submitVote = true;
            setTimeout(() => {
              this.submitVote = false;
            }, 2000);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取该受托人信息
    _getDelegateDetail(key) {
      this.$http
        .get("/api/delegates/get/", {
          params: {
            publicKey: key
          }
        })
        .then(res => {
          if (res.data.success) {
            this.onOff = "已开启";
            // this.$refs.registerBtn.disabled = true
            this.delegateInfo = res.data.delegate;
            // 如果有受托人，那么获取其生产的区块
            this._getBlocks(key, 0);
          } else {
            this.onOff = "未开启";
          }
        });
    },
    // 获取受托人生产的区块
    _getBlocks(key, p) {
      this.$http
        .get("/api/blocks", {
          params: {
            generatorPublicKey: key,
            offset: this.ONE_PAGE_NUM * p,
            limit: this.ONE_PAGE_NUM
          }
        })
        .then(res => {
          if (res.data.success) {
            this.tableData = res.data.blocks;
            this.PageTotal = Math.ceil(
              res.data.blocks.length / this.ONE_PAGE_NUM
            );
          }
        });
    },
    renderDiff(p) {
      this._getBlocks(this.publickey, p);
    },
    hidePop(data) {
      this.showPop1 = data;
    },
    inputSSecret(data) {
      this.secondSecret = data;
      this._setDelegates();
    }
  },
  watch: {
    // 关闭弹窗后清空输入框
    // showPop(newVal) {
    //   if(newVal === false) {
    //     this.delegateName = ''
    //   }
    // },
    // sjowPop1(newVal) {
    //   if(newVal === false) {
    //     Bus.$emit('clearSSecret', '')
    //   }
    // }
  }
};
</script>

<style scoped>
.w {
  padding: 0 24px;
}
.name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.w .btn {
  display: inline-block;
  margin-left: 20px;
  font-size: 14px;
  font-weight: normal;
  color: #fff;
  width: 140px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  background: #169bd5;
  border-radius: 3px;
  cursor: pointer;
}
/*主要信息*/
.info {
  width: 100%;
  height: 100px;
  line-height: 100px;
  background: #fff;
  border-radius: 3px;
  padding-top: 20px;
  box-sizing: border-box;
}
.info ul {
  height: 100%;
}
.info li {
  width: 33.3%;
  height: 100%;
  text-align: center;
  line-height: 30px;
}
.info li > p {
  border-right: 1px solid #e9e9e9;
}
.info li:last-child > p {
  border-right: 0;
}
.info li > p:first-child {
  color: #8d8d8d;
  font-size: 14px;
}
.info li > p:last-child {
  color: #4b4b4b;
  font-size: 24px;
}
/*弹框*/
.popout {
  width: 560px;
  height: 300px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  z-index: 1000;
}
.close {
  font-size: 36px;
  text-align: right;
}
.close span {
  display: inline-block;
  width: 47px;
  text-align: center;
  cursor: pointer;
}
.title {
  font-size: 26px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 20px 0;
}
.popout .input label {
  display: inline-block;
  width: 160px;
  text-align: right;
  color: #343434;
  font-weight: bold;
}
.popout .input input {
  width: 320px;
  height: 32px;
  border: 1px solid #d9d9d9;
  padding-left: 10px;
  border-radius: 3px;
}
.popout .confirm {
  text-align: center;
  margin: 20px 0;
}
.popout .confirm button {
  width: 64px;
  height: 40px;
  background: #169bd5;
  border-radius: 6px;
  color: #fff;
  line-height: 40px;
}
.popout .tips {
  text-align: center;
}
.tip {
  width: 160px;
  height: 80px;
  position: absolute;
  top: 3%;
  left: 48%;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 0 0 20px rgb(200, 200, 200);
  text-align: center;
  line-height: 80px;
  color: #fff;
  font-size: 18px;
}
.success-tip {
  background: #399bff;
}
.fail-tip {
  background: #ee4000;
}
</style>