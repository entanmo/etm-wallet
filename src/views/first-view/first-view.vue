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
      <p class="title">{{$t("first-view.transaction")}}</p>
      <div class="lists" >
        <div>
          <a-table :columns="columns"
          :rowKey="record => record.id"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
            :scroll="{ x: 1300 }"
          @change="handleTableChange"
            >
            <template slot="typeIN" slot-scope="text, record">
              {{mapType(record.type)}}
            </template>
            <template slot="time" slot-scope="text, record">
              {{convertTime(record.timestamp)}}
            </template>
            <template slot="amount" slot-scope="text, record">
              {{unit(record.amount)}}
            </template>
          <template slot="footer" slot-scope="currentPageData">
            {{$t("first-view.all")}}:      {{totalAmount().toFixed(2)}} ETM
          </template>
          </a-table>
        </div>
        <no-data v-show="nodata"></no-data>
      </div>
    </div>
  </div>
</template>
<script>
import { getTransaction } from '@/api/account'
import { convertTime } from '@/utils/gen'
import {unit} from '@/utils/utils'
import noData from '@/components/nodata/nodata'
// import ChartCard from '@/components/card/card'
// import MiniArea from '@/components/chart/miniArea'
// import MiniBar from '@/components/chart/miniBar'
// import MiniProgress from '@/components/chart/miniProgress'
// import Trend from '@/components/chart/trend'
import AnimatedInteger from '@/components/animated-integer/animated-integer'
// import RankingList from '@/components/chart/rankingList'
// 表头
const columns = [{
  title: i18n.t('first-view.table_columns.th02'),
  scopedSlots: { customRender: 'typeIN' },
  dataIndex: 'type'
}, {
  title: i18n.t('first-view.table_columns.th03'),
  dataIndex: 'senderId'
}, {
  title: i18n.t('first-view.table_columns.th04'),
  dataIndex: 'recipientId'
}, {
  title: i18n.t('first-view.table_columns.th05'),
  dataIndex: 'timestamp',
  scopedSlots: {customRender: 'time'}
}, {
  title: i18n.t('first-view.table_columns.th06'),
  dataIndex: 'message'
}, {
  title: i18n.t('first-view.table_columns.th07'),
  dataIndex: 'amount',
  scopedSlots: {customRender: 'amount'}

}]
// 排名
const rankList = []

for (let i = 0; i < 10; i++) {
  rankList.push({
    name: '桃源村' + i + '号店',
    total: 1234 - i * 100
  })
}
export default {
  data () {
    return {
      data: [],
      columns,
      pagination: {
        defaultPageSize: 10 // 每页个数
      },
      loading: false,
      nodata: false,
      unit: unit,
      convertTime: convertTime, // 方法
      rankList // 排名

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
    'no-data': noData,
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
    this._getTransaction()
  },
  methods: {
    async _getTransaction (params = {senderId: this.address, orderBy: 't_timestamp:desc', limit: 10}) {
      this.loading = true
      const result = await getTransaction(params)
      if (result.data.success) {
        if (result.data.count === 0) {
          this.nodata = true
        }
        this.data = result.data.transactions
        const pagination = {...this.pagination}
        pagination.total = result.data.count
        this.pagination = pagination
        this.loading = false
      }
    },
    handleTableChange (pagination) {
      const pager = {...this.pagination}
      pager.current = pagination.current
      this.pagination = pager
      this._getTransaction({
        senderId: this.address,
        limit: pagination.pageSize,
        offset: pagination.pageSize * (pagination.current - 1),
        orderBy: 't_timestamp:desc'
      })
    },
    totalAmount () {
      if (!this.data.length) {
        return 0
      }
      const amount = this.data.map(item => unit(item.amount))
      return amount.reduce((prev, next) => {
        return prev + next
      })
    },
    mapType (type) {
      switch (type) {
        case 0:
          return i18n.t('first-view.transfer')
        case 1:
          return i18n.t('first-view.set')
        case 2:
          return i18n.t('first-view.register_voter')
        case 3:
          return i18n.t('first-view.vote')
        case 4:
          return i18n.t('first-view.multi_signature')
        case 5:
          return 'DAPP'
        case 6:
          return 'IN_TRANSFER'
        case 7:
          return 'OUT_TRANSFER'
        case 101:
          return i18n.t('first-view.lock')
        case 201:
          return i18n.t('first-view.unlock')
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
  margin: 20px 0 0 0;
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .lists{
  position: relative;
  background: #fff;
  border-radius: 2px;
  padding:10px;
  min-height: 500px;
  }
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
