<template>
  <div class="w">
    <div class="head flex">
        <p>共{{totalVoters}}人</p>
        <button @click="vote">投票</button>
    </div>
    <div class="event" >
      <table width=100% border="0" cellspacing="0" cellpresumeing="0" v-show="tableData.length">
          <thead class="table_th">
              <th></th>
              <th>排名</th>
              <th>受托人</th>
              <th>地址</th>
              <th>生产率</th>
              <th>生产块数</th>
              <th>得票率</th>
          </thead>
          <tbody class="table_tb">
              <tr v-for="(item, index) in tableData" :key="index">
                  <td><input type="checkbox" :value="item" v-model="selectDelegates"></td>
                  <td>{{index + 1}}</td>
                  <td>{{item.username}}</td>
                  <td style="color: #399dff;">{{item.address}}</td>
                  <td>{{item.productivity}}%</td>
                  <td>{{item.producedblocks}}</td>
                  <td>{{item.approval}}%</td>
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
      <p class="title">投票给受托人</p>
      <p class="care">请确认您的选择与投票，每张票最多可同时投33人</p>
      <div class="input-list">
      <div class="input-line" v-for="(item,index) in selectDelegates" :key="index">
        <div class="input clearfix">
        <span class="fl">{{item.username}}</span>
        <span class="gre fr">{{item.address}}</span>
        </div>
      </div>
      </div>
      <div class="set-btm">
        <div class="confirm"><button @click="submitVote">提交</button></div>
        <p class="tip">投票需支付0.01Mole</p>
      </div>
    </div>
  </div>
</template>

<script>
import Page from '../page'
import NoData from '../nodata'
export default {
  components: {
    Page,NoData
  },
  data() {
      return {
        totalVoters: 0,
        selectDelegates: [],
        delegate: [],
        PageTotal: 1,
        showPop: false,
        tableData: [],
        ONE_PAGE_NUM: 10 //每页展示10条数据
      }
  },
  computed: {
    // delegate() {
    //   return this.selectDelegates.forEach(item => {
    //     return item.publicKey
    //   })
    // }
  },
  created () {
    this.routeName = this.$route.name
  },
  mounted () {
    this._getTotalDelegates(0)
  },
  methods: {
      _getTotalDelegates(p) {
        // 受托人列表及总数
        this.$http.get('/api/delegates/', {
          params: {
            orderby: 'approval:desc',
            offset: this.ONE_PAGE_NUM * p,
            limit: this.ONE_PAGE_NUM
          }
        }).then(res => {
          if(res.data.success) {
            this.tableData = res.data.delegates
            this.totalVoters = res.data.totalCount
            this.PageTotal = Math.ceil(res.data.totalCount / this.ONE_PAGE_NUM)
          }
        }).catch(err => {console.log(err)})
      },
      submitVote() {
        this.$http.put('/api/accounts/delegates', {
          secret: localStorage.getItem('etmsecret') || sessionStorage.getItem('etmsecret'),
          delegates: this.delegate
        }).then(res => {
          console.log(res)
        })
      },
      vote() {
        this.showPop = true
        Bus.$emit('showMask', true)
      },
      hidePopout() {
        this.showPop = false
        Bus.$emit('showMask', false)
      },
      renderDiff(p) {
        this._getTotalDelegates(p)
      }
  },
  watch: {
    selectDelegates(newV, oldV) {
      this.delegate = []
      newV.forEach(item => {
        this.delegate.push('+' + item.publicKey)
      })
      console.log(this.delegate)
    },
  }
}
</script>

<style scoped>
.gre {
    color: #1890ff;
}
.head {
    height: 60px;
    padding: 0 16px;
    border-bottom: 1px solid #e5e5e5;
}
.head p {
    font-size: 18px;
}
.head button {
    width: 120px;
    height: 36px;
    background: #169bd5;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
}
/*弹框*/
.popout {
  width: 560px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  z-index: 1000;
  max-height: 500px;
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
  margin: 10px 0;
}
.care {
  font-size: 16px;
  color: #afafaf;
  text-align: center;
  margin-bottom: 10px;
}
.input-list {
    max-height: 260px;
    overflow: auto;
}
.input-line {
  text-align: center;
}
.input {
  width: 480px;
  height: 32px;
  line-height: 32px;
  border: 1px solid #d9d9d9;
  padding: 0 6px;
  border-radius: 3px;
  display: inline-block;
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
.set-btm {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}
</style>