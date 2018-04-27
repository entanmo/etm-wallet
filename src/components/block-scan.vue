<template>
  <div class="w">
    <div class="h">
      <div class="s">
        <input type="text" placeholder="搜索高度" v-model="searchBlock">
        <a href="javascript:;" @click="search">
          <i class="icon icon-search"></i>
        </a>
      </div>
    </div>
    <!-- table -->
    <div class="event" >
      <table width=100% border="0" cellspacing="0" cellpresumeing="0" v-show="tableData.length">
          <thead class="table_th">
              <th>高度</th>
              <th>日期</th>
              <th>ID</th>
              <th>生产者</th>
              <th>交易</th>
              <th>金额</th>
              <th>费用</th>
              <th>奖励</th>
          </thead>
          <tbody class="table_tb">
              <tr v-for="(item, index) in tableData" :key="index" @click="showDetail(item.height)">
                  <td style="color: #399dff;">{{item.height}}</td>
                  <td>{{convertTime(item.timestamp)}}</td>
                  <td style="color: #399dff;">{{item.id}}</td>
                  <td style="color: #399dff;">{{item.generatorId}}</td>
                  <td>{{item.numberOfTransactions}}</td>
                  <td>{{item.totalAmount}}</td>
                  <td>{{item.totalFee}}</td>
                  <td>{{item.reward}}</td>
              </tr>
          </tbody>
      </table>
      <!-- <loading v-show="!beforeConfirm.length && !cannotfind"></loading> -->
      <no-data v-show="!tableData.length"></no-data>
    </div>
    <!-- 分页 -->
    <page v-show="PageTotal > 1" :PageTotal="PageTotal" @renderDiff="renderDiff"></page>
    <!-- popout -->
    <div class="popout" v-show="showPop">
      <div class="close"><span @click="hidePopout">×</span></div>
      <p class="title">区块详情</p>
      <div class="input">
        <label>ID：</label>
        <span>{{blockDetail.id}}</span>
      </div>
      <div class="input">
        <label>版本：</label>
        <span>V{{blockDetail.version}}</span>
      </div>
      <div class="input">
        <label>时间：</label>
        <span>{{blockDetail.timestamp}}</span>
      </div>
      <div class="input">
        <label>高度：</label>
        <span>{{blockDetail.height}}</span>
      </div>
      <div class="input">
        <label>上一块：</label>
        <span>{{blockDetail.previousBlock}}</span>
      </div>
      <div class="input">
        <label>交易数：</label>
        <span>{{blockDetail.numberOfTransactions}}</span>
      </div>
      <div class="input">
        <label>交易总额：</label>
        <span>{{blockDetail.totalAmount}}</span>
      </div>
      <div class="input">
        <label>奖励：</label>
        <span>{{blockDetail.reward}}</span>
      </div>
      <div class="input">
        <label>摘要：</label>
        <span></span>
      </div>
      <div class="input">
        <label>生产者：</label>
        <span>{{blockDetail.generatorId}}</span>
      </div>
      <div class="input">
        <label>生产者公钥：</label>
        <span>{{blockDetail.generatorPublicKey}}</span>
      </div>
      <p class="selectBlock">
        <a href="javascript:;" @click="prevBlock">上一块</a>
        <a href="javascript:;" @click="nextBlock">下一块</a>
      </p>
    </div>
  </div>
</template>

<script>
import Page from '../base/page'
import NoData from '../base/nodata'
import {timestampToTime} from '../assets/js/utils'
export default {
  components: {
    Page,NoData
  },
  data () {
    return {
      PageTotal: 1,
      showPop: false,
      tableData: [],
      ONE_PAGE_NUM: 10,
      blockDetail: {},
      searchBlock: '',
      height: 0,
      blockHeight: 0
    }
  },
  created () {
    this._getBlocks(0)
  },
  updated() {
    Bus.$on('hideQrcode', data => {
      this.showPop = false
    })
  },
  activated () {
    this.$store.commit('changeTitle', '区块浏览')
  },
  methods: {
    search() {
      this.$http.get('/api/blocks/get', {
        params: {
          height: this.searchBlock         
        }
      }).then(res => {
        this.tableData = []
        this.tableData.push(res.data.block)
        this.PageTotal = 1
      }).catch(e => {console.log(e)})
    },
    _getBlocks(p) {
      this.$http.get('/api/blocks', {
        params: {
          limit: this.ONE_PAGE_NUM,
          offset: this.ONE_PAGE_NUM * p,
          orderBy: 'height:desc'
        }
      }).then(res => {
        this.tableData = res.data.blocks
        this.PageTotal = Math.ceil(res.data.count / this.ONE_PAGE_NUM)
      }).catch(e => {console.log(e)})
    },
    showDetail(height) {
      this.height = height
      this.showPop = true
      Bus.$emit('showMask', true)
      this.$http.get('/api/blocks/get', {
        params: {
          height: height
        }
      }).then(res => {
        this.blockDetail = res.data.block
      }).catch(e => {console.log(e)})
    },
    hidePopout() {
      this.showPop = false
      Bus.$emit('showMask', false)      
    },
    renderDiff(p) {
      this._getBlocks(p)
    },
    convertTime(time) {
      let stampTime = entanmoJs.transaction.getTime(time)
      return timestampToTime(stampTime)
    },
    prevBlock() {
      this.height -= 1
      this.showDetail(this.height)
    },
    nextBlock() {
      this.$http.get('/api/blocks/getHeight').then(res => {
        if(res.data.success) {
          this.blockHeight = res.data.height
          if(this.height === this.blockHeight) return
          this.height += 1
          this.showDetail(this.height)
        }
      }).catch(e => {console.log(e)})
      
      
    }
  },
  watch: {
    searchBlock(newVal,oldVal) {
      if(newVal === '') {
        this._getBlocks(0)
      }
    }
  }
}
</script>

<style scoped>
.w {
  padding: 0 24px;
}
.h {
  background: #fff;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #e5e5e5;
}
.s {
  margin-left: 10px;
  position: relative;
}
.s input {
  width: 280px;
  height: 36px;
  border: 1px solid #e5e5e5;
  padding-left: 10px;
  border-radius: 3px;
}
.icon-search {
  display: inline-block;
  background-size: 20px 20px;
  height: 20px;
  width: 20px;
  position: relative;
  top: 5px;
  right: 30px;
  background: url(../assets/images/m_sear.png) center center no-repeat;
}
/*弹框*/
.popout {
  width: 800px;
  height: 460px;
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
  font-size: 18px;
  color: #c3c3c3;
  text-align: center;
  margin-bottom: 20px;
}
.input {
  font-size: 16px;
  height: 30px;
  line-height: 30px;
}
.input label {
  display: inline-block;
  width: 120px;
  text-align: right;
  color: #343434;
}
td:hover {
  cursor: pointer;
}
.selectBlock {
  text-align: center;
  margin-top: 10px;
}
.selectBlock a {
  color: #399dff;
}
</style>