<template>
  <div class="w">
    <!-- info -->
    <p class="name">受托人基本信息<span class="btn">{{onOff}}</span><span class="btn" @click="showPopout">注册受托人</span></p>
    <div class="info">
        <ul class="flex">
            <li>
              <p>总收益</p>
              <p>44444</p>
            </li>
            <li>
              <p>排名</p>
              <p>4</p>
            </li>
            <li>
              <p>生产率</p>
              <p>V1.4</p>
            </li>
            <li>
              <p>得票率</p>
              <p>5.4%</p>
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
      <p class="tip">注册需支付100Mole</p>
    </div>
    
  </div>
</template>

<script>
import Page from '../base/page'
import NoData from '../base/nodata'
import {genPublicKey} from '../assets/js/gen'
export default {
  components: {
    Page,NoData
  },
  data () {
    return {
      PageTotal: 1,
      onOff: '未开启',
      delegateName:'',
      showPop: false,
      tableData: []
    }
  },
  activated () {
    this.$store.commit('changeTitle', '区块生产')
  },
  created () {
    let publickey = genPublicKey(localStorage.getItem('etmsecret') || sessionStorage.getItem('etmsecret'))
    this._getDelegateDetail(publickey)
  },
  methods: {
    showPopout() {
      this.showPop = true
      Bus.$emit('showMask', true)
    },
    hidePopout() {
      this.showPop = false
      Bus.$emit('showMask', false)
    },
    setDelegates() {
      this.$http.put('/api/delegates', {
        secret: localStorage.getItem('etmsecret') || sessionStorage.getItem('etmsecret'),
        username: this.delegateName
      }).then(res => {
        // 注册后关闭弹框
        this.hidePopout()
        if(res.data.success) {
          alert('注册成功')
          this.onOff = '已开启'
        }else {
          alert('注册失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取该受托人信息
    _getDelegateDetail(key) {
      this.$http.get('/api/delegates/get/', {
        params: {
          publickey: key
        }
      }).then(res => {
        console.log(res)
      })
    },
    renderDiff() {

    }
  }
}
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
.popout .tip {
  text-align: center;
}
</style>