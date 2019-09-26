<template>
  <div>
    <div class="switch-chart"><span class="title">矿工模式 </span>  <a-switch   @change='handleSwitch'/></div>
    <!-- 信息 -->
    <div class="information">
      <a-row class="etm-info" type="flex" justify="space-around" align="middle">
          <a-col class="etm-info-li" :span="8">
            <p>{{$tc("first-view.information",0)}} (ETM)</p>
              <p><animated-integer :point='2' :value='balance'></animated-integer></p>
          </a-col>
          <a-col class="etm-info-li" :span="8">
            <p>{{$tc("first-view.information",1)}}</p>
            <p><animated-integer  :value='accounts.height'></animated-integer></p>
          </a-col>
          <a-col class="etm-info-li last" :span="8">
            <p>{{$tc("first-view.information",2)}}</p>
            <p>V{{accounts.version }}</p>
          </a-col>
      </a-row>
    </div>
    <!-- 图表 -->
    <div class="charts">
        <transition name="component-fade" mode="out-in">
            <component :is="showChart" ></component>
        </transition>
    </div>
    <!-- 排名 -->
    <div class="rank">
      <a-row>
        <a-col :sm="24" :md="24" :xl="12" class="part-left">
          <a-tabs default-active-key="1" class="part-content" size="large" :tab-bar-style="{marginBottom: '15px', paddingLeft: '16px'}">
          <div class="extra-wrap" slot="tabBarExtraContent">
            <tab :tabIndex.sync="tabIncomeIndex"  :fn="incomeTimeHandle"></tab>
          </div>
          <a-tab-pane loading="true" :tab="$t('first-view.chart.incomeRank')" key="1">
          <ranking-list :loading="rankLoading1"  :list="incomeRankList"/>
          </a-tab-pane>
          </a-tabs>
        </a-col>
        <a-col :sm="24" :md="24" :xl="12" class="part-right">
          <a-tabs default-active-key="1" class="part-content" size="large" :tab-bar-style="{marginBottom: '15px', paddingLeft: '16px'}">
          <div class="extra-wrap aaa" slot="tabBarExtraContent">
            <tab :tabIndex.sync="tabVotesIndex"  :fn="voteTimeHandle"></tab>
            </div>
          <a-tab-pane loading="true" :tab="$t('first-view.chart.votesRank')" key="1">
            <ranking-list :loading="rankLoading2"  :list="votesRankList"/>
          </a-tab-pane>
          </a-tabs>
        </a-col>
      </a-row>
    </div>
    <!-- 表格 -->
  <div class="transaction" >
    <a-tabs defaultActiveKey="1" >
      <a-tab-pane :tab="$tc('first-view.transaction',1)" key="1">
        <transfer-record ref="transfer" ></transfer-record>
      </a-tab-pane>
      <!-- <a-tab-pane :tab="$tc('first-view.transaction',2)" key="2" forceRender >
        <income-record ref="income"></income-record>
      </a-tab-pane> -->
    </a-tabs>
    </div>
  </div>
</template>
<script>

import {incomeTop, votesTop} from '@/api/extend'
import {unit, timestampToDay} from '@/utils/utils'
import TransferRecord from '@/components/transfer-record/transfer-record'
import AnimatedInteger from '@/components/animated-integer/animated-integer'
import ChartView from '@/components/chart-view/chart-view'
import ChartViewMiner from '@/components/chart-view-miner/chart-view-miner'
import RankingList from '@/components/chart/rankingList'
import Tab from '@/components/tab/tab'
import {blocks} from '@/utils/mixins'
import Vue from 'vue'
import Viser from 'viser-vue'
// qrcode
import VueQrcode from '@xkeshi/vue-qrcode'
Vue.component(VueQrcode.name, VueQrcode)

Vue.use(Viser)
export default {
  mixins: [blocks],
  sockets: {
    'blocks/change': function (data) {
      this.accounts.height = data.height || this.accounts.height
    },
    'rounds/change': function (data) {
      this.$store.dispatch('_getBalance')
      this.voteTimeHandle()
      this.incomeTimeHandle()
    }
  },
  data () {
    return {
      rankList: [], // 排名
      active: false,
      tabIncomeIndex: 0, // 收益排名index
      tabVotesIndex: 0,
      incomeRankList: [],
      votesRankList: [],
      rankLoading1: false,
      rankLoading2: false,
      unit: unit,
      switchChange: false,
      minerLoading: false
    }
  },
  computed: {
    accounts () {
      return this.$store.state.user.accountInfo || {}
    },
    address () {
      return this.$store.state.user.accountInfo.address
    },
    balance () {
      return unit(this.accounts.balance).toFixed(2) * 1 || 0
    },
    publicKey () {
      const data = (this.$storage.getItem('etmUse', false) || this.$storage.getItem('etmUse', true)).account.publicKey
      return this.$store.state.user.accountInfo.publicKey || data
    },
    showChart () {
      return this.switchChange ? 'ChartViewMiner' : 'ChartView'
    }
  },
  components: {
    TransferRecord,
    AnimatedInteger,
    ChartView,
    Tab,
    RankingList,
    ChartViewMiner
  },
  created () {
    this.$store.dispatch('GetInfo')
    this.voteTimeHandle()
    this.incomeTimeHandle()
  },
  methods: {
    // changePane (key) {
    //   if (key === '1') {
    //     this.$refs.transfer._getTransaction()
    //   } else if (key === '2') {
    //     this.$refs.income.getIncome()
    //   }
    // }
    handleSwitch (checked) {
      this.switchChange = checked
    },
    voteTimeHandle (key) {
      const beginTime = timestampToDay(Date.now())
      const endTime = timestampToDay(Date.now() + 24 * 1000 * 60 * 60)
      switch (key) {
        case 0:
          this.votesRank(beginTime, endTime)
          break
        case 1:
          const week = this.week()
          this.votesRank(week.beginTime, week.endTime)
          break
        case 2:
          const month = this.month()
          this.votesRank(month.beginTime, month.endTime)
          break
        case 3:
          const year = this.year()
          this.votesRank(year.beginTime, year.endTime)
          break
        default:
          this.votesRank(beginTime, endTime)
      }
    },
    incomeTimeHandle (key) {
      const beginTime = timestampToDay(Date.now())
      const endTime = timestampToDay(Date.now() + 24 * 1000 * 60 * 60)
      switch (key) {
        case 0:
          this.incomeRank(beginTime, endTime)
          break
        case 1:
          const week = this.week()
          this.incomeRank(week.beginTime, week.endTime)
          break
        case 2:
          const month = this.month()
          this.incomeRank(month.beginTime, month.endTime)
          break
        case 3:
          const year = this.year()
          this.incomeRank(year.beginTime, year.endTime)
          break
        default:
          this.incomeRank(beginTime, endTime)
      }
    },
    async incomeRank (beginTime, endTime) {
      try {
        this.rankLoading1 = true
        const params = {'beginTime': beginTime, 'endTime': endTime}
        const result = await incomeTop(params)
        if (result && result.data.code === '200') {
          this.rankLoading1 = false
          this.incomeRankList = result.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    async votesRank (beginTime, endTime) {
      try {
        this.rankLoading2 = true
        const params = {'beginTime': beginTime, 'endTime': endTime}
        const result = await votesTop(params)
        if (result && result.data.code === '200') {
          this.rankLoading2 = false
          this.votesRankList = result.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    formatDate (date) {
      var myyear = date.getFullYear()
      var mymonth = date.getMonth() + 1
      var myweekday = date.getDate()
      if (mymonth < 10) {
        mymonth = '0' + mymonth
      }
      if (myweekday < 10) {
        myweekday = '0' + myweekday
      }
      return (myyear + '-' + mymonth + '-' + myweekday)
    },
    week () {
      const now = new Date()
      const nowDay = now.getDate()
      const nowMonth = now.getMonth()
      let nowYear = now.getYear()
      nowYear += (nowYear < 2000) ? 1900 : 0
      const nowDayOfWeek = (now.getDay() + 7 - 1) % 7
      const weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek)
      const weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek))
      return {
        beginTime: this.formatDate(weekStartDate),
        endTime: this.formatDate(weekEndDate)

      }
    },
    month () {
      const now = new Date()
      const nowMonth = now.getMonth()
      let nowYear = now.getYear()
      nowYear += (nowYear < 2000) ? 1900 : 0
      const monthStartDate = new Date(nowYear, nowMonth, 1)
      const monthLastDate = new Date(nowYear, nowMonth + 1, 1)
      const days = (monthLastDate - monthStartDate) / (1000 * 60 * 60 * 24)
      const monthEndDate = new Date(nowYear, nowMonth, days)
      return {
        beginTime: this.formatDate(monthStartDate),
        endTime: this.formatDate(monthEndDate)
      }
    },
    year () {
      const now = new Date()
      const year = now.getFullYear()
      return {
        beginTime: year + '-01-01',
        endTime: year + '-12-31'
      }
    }
  }
}
</script>
<style lang="less" >
.information {
  background: #fff;
  border-radius: 2px;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.65);
  height: 100px;
  padding-top: 20px;
  .etm-info {
    text-align: center;
    .etm-info-li {
      p {
        border-right: 1px solid #e9e9e9;
        margin: 0;
      }
      p:first-child {
        color: #8d8d8d;
        font-size: 14px;
      }
      p:last-child {
        color: #4b4b4b;
        font-size: 24px;
      }
    }
    .last {
      p {
        border: none;
      }
    }
  }
}
.switch-chart{
  text-align: right;
  position: absolute;
  right: 0;
  top:0;
  .title{
    vertical-align: middle;
    margin-right: 5px;
  }
}
// .voteCharts, .charts{
//   transition: all 1s;

// }
.charts{
  margin-top: 20px;
}
.rank{
  padding-top: 30px;
  .part-left{
    padding:0 12px 0 0
  }
  .part-right{
    padding:0 0 0 12px
  }
  .part-content{
    background-color: #fff;
  }
  .ant-tabs-top-content{
    overflow:auto;
  }

}
.transaction {
    background: #fff;
    padding: 10px;
    min-height: 600px;
    margin-top: 37px;

}
@media (max-width: 768px){
  .information .etm-info .etm-info-li p:last-child{
    font-size: 20px;
  }
  .charts{
    .part{
      padding: 0;
      padding-bottom: 15px;
    }
  }
  .rank{
    .part-right,.part-left{
      padding: 0 0 15px 0;
    }
  }
}
@media (min-width: 768px){
  .charts{
    .part-row-left{
      padding: 12px 12px 15px 0px;
    }
    .part-row-right{
      padding: 12px 0 15px 12px;
    }
  }
  .rank{
    .part-right,.part-left{
      padding: 0 0 15px 0;
    }
  }
}

@media (min-width: 1200px){
    .charts{
    .part-row-left{
      padding: 12px 12px 15px 0;
    }
    .part-row-right{
      padding: 12px 0 15px 12px;
    }
    .row01{
      padding: 12px 12px 15px;
    }
  }
  .rank{
    .part-left{
    padding:0 12px 0 0
  }
  .part-right{
    padding:0 0 0 12px
  }
  }

}
</style>
