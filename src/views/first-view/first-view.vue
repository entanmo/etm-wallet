<template>
  <div>
    <!-- 信息 -->
    <div class="information" >
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
            <p>V{{accounts.version}}</p>
          </a-col>
      </a-row>
    </div>
    <!-- 图表 -->
    <!-- <div class="charts">
      <a-row>
      <a-col :sm="24" :md="12" :xl="6" class="part" style="padding: 12px 12px 15px 0;">
        <chart-card title="昨日收益 (ETM)" total="19,34">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend style="margin-right: 16px" term="同周比" :percent="12" :is-increase="true" :scale="0" />
          </div>
          <div slot="footer">累计获得收益<span> 8888 ETM</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" class="part" style="padding: 12px 12px 15px;">
        <chart-card title="昨日出块数量" total="100">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-area />
          </div>
          <div slot="footer">日出块数量<span> 100</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" class="part" style="padding: 12px 12px 15px;">
        <chart-card title="我的得票率 (%)" total="80">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-bar />
          </div>
          <div slot="footer">平均得票率 <span>60 %</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" class="part" style="padding: 12px 0 15px 12px;">
        <chart-card title="我的排名" total="21">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-progress target="78" percent="78" color="#13C2C2" height="8px"/>
          </div>
          <div slot="footer">
            <trend style="margin-right: 16px" term="同周比" :percent="78" :is-increase="true" :scale="0" />
          </div>
        </chart-card>
      </a-col>
      </a-row>
    </div> -->
    <!-- 排名 -->
    <!-- <div class="rank ">
      <a-row>
        <a-col :sm="24" :md="12" :xl="12" class="part-left">
          <a-tabs default-active-key="1" class="part-content" size="large" :tab-bar-style="{marginBottom: '15px', paddingLeft: '16px'}">
          <div class="extra-wrap" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>今日</a>
              <a>本周</a>
              <a>本月</a>
              <a>本年</a>
            </div>
          </div>
          <a-tab-pane loading="true" tab="收益排名" key="1">
          <ranking-list title="" :list="rankList"/>
          </a-tab-pane>
          </a-tabs>
        </a-col>
        <a-col :sm="24" :md="12" :xl="12" class="part-right">
          <a-tabs default-active-key="1" class="part-content" size="large" :tab-bar-style="{marginBottom: '15px', paddingLeft: '16px'}">
          <div class="extra-wrap" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>今日</a>
              <a>本周</a>
              <a>本月</a>
              <a>本年</a>
            </div>
          </div>
          <a-tab-pane loading="true" tab="得票率排名" key="1">
          <ranking-list title="" :list="rankList"/>
          </a-tab-pane>
          </a-tabs>
        </a-col>
      </a-row>
    </div> -->
    <!-- 表格 -->
  <div class="transaction">
    <a-tabs defaultActiveKey="1" @change="changePane">
      <a-tab-pane :tab="$tc('first-view.transaction',1)" key="1">
        <transfer-record ref="transfer" ></transfer-record>
      </a-tab-pane>
      <a-tab-pane :tab="$tc('first-view.transaction',2)" key="2" forceRender >
        <income-record ref="income"></income-record>
      </a-tab-pane>
    </a-tabs>

    </div>
  </div>
</template>
<script>
import {unit} from '@/utils/utils'
import TransferRecord from '@/components/transfer-record/transfer-record'
import IncomeRecord from '@/components/income-record/income-record'
// import ChartCard from '@/components/card/card'
// import MiniArea from '@/components/chart/miniArea'
// import MiniBar from '@/components/chart/miniBar'
// import MiniProgress from '@/components/chart/miniProgress'
// import Trend from '@/components/chart/trend'
import AnimatedInteger from '@/components/animated-integer/animated-integer'
// import RankingList from '@/components/chart/rankingList'

// 排名
const rankList = []

for (let i = 0; i < 10; i++) {
  rankList.push({
    name: '桃源村' + i + '号店',
    total: 1234 - i * 100
  })
}
export default {
  sockets: {
    'blocks/change': function (data) {
      this.accounts.height = data.height
    },
    'rounds/change': function (data) {
      this.$store.dispatch('_getBalance')
    }
  },
  data () {
    return {
      rankList // 排名
      // forceRender: true
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
      return unit(this.accounts.balance).toFixed(2) * 1
    }
  },
  components: {
    TransferRecord,
    IncomeRecord,
    // 'chart-card': ChartCard,
    // 'mini-area': MiniArea,
    // 'mini-bar': MiniBar,
    // 'mini-progress': MiniProgress,
    'animated-integer': AnimatedInteger
    // 'ranking-list': RankingList,
    // Trend
  },
  created () {
    this.$store.dispatch('GetInfo')
  },
  methods: {
    changePane (key) {
      if (key === '1') {
        this.$refs.transfer._getTransaction()
      } else if (key === '2') {
        this.$refs.income.getIncome()
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
  .extra-item{
    margin-top:10px;
    a{
      margin-right: 24px;
    }
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
      padding: 0!important;
      padding-bottom: 15px!important;
    }
  }
  .rank{
    .part-right,.part-left{
      padding: 0 0 15px 0;
    }
  }
}
</style>
