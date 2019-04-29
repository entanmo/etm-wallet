<template>
  <div>
    <!-- <a-spin :spinning="loading"> -->
      <a-row>
        <a-col :sm="24" :md="12" :xl="6" class="part part-row-left">
          <chart-card :title="$t('first-view.chart.income')" :point='2' :total='block.quantity'>
            <a-tooltip slot="action">
              <template slot="title">
                <div >{{$t('first-view.chart.tip.tip_income')}}</div>
                <div >{{$t('first-view.chart.tip.tip_rate')}}</div>
                <div>{{$t('first-view.chart.tip.tip_formula')}}</div>
                <div>{{$t('first-view.chart.tip.tip_allIncome')}}</div>
              </template>
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
              <trend style="margin-right: 16px" :term="$t('first-view.chart.rate')" :percent="block.rate" :is-increase="block.increase" :scale="2" />
            </div>
            <div slot="footer">{{$t('first-view.chart.allIncome')}}<span> {{unit(block.rewards)}} ETM</span></div>
          </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" class="part part-row-right row01">
          <chart-card :title="$t('first-view.chart.blockNum')" :total="block.total">
            <a-tooltip  slot="action">
              <template slot="title">
                <div>{{$t('first-view.chart.tip.tip_blockNum')}}</div>
                <div>{{$t('first-view.chart.tip.tip_dailyNum')}}</div>
              </template>
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
              <mini-area  :average.sync="block.numAverage"  ref="countArea"/>
            </div>
            <div slot="footer">{{$t('first-view.chart.dailyNum')}}<span> {{block.numAverage}}</span></div>
          </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" class="part part-row-left row01" >
          <chart-card :title="$t('first-view.chart.myPopularity')" :total="block.voteNum">
            <a-tooltip  slot="action">
              <template slot="title">
                <div>{{$t('first-view.chart.tip.tip_myPopularity')}}</div>
                <div >{{$t('first-view.chart.tip.tip_average')}}</div>
              </template>
              <a-icon type="info-circle-o" />
            </a-tooltip>
            <div>
              <mini-bar  :average.sync="block.popularAverage" ref="countBar" />
            </div>
            <div slot="footer">{{$t('first-view.chart.average')}} <span> {{block.popularAverage}}</span></div>
          </chart-card>
        </a-col>
        <a-col :sm="24" :md="12" :xl="6" class="part part-row-right">
          <chart-card :title="$t('first-view.chart.myRank')" :total="block.myRank">
            <!-- <a-tooltip title="指标说明" slot="action">
              <a-icon type="info-circle-o" />
            </a-tooltip> -->
            <div>
              <mini-progress :target="block.myRank" :percent="block.allDelegates" color="#13C2C2" height="8px"/>
            </div>
            <div slot="footer" style="height:21px">
            </div>
          </chart-card>
        </a-col>
      </a-row>
    <!-- </a-spin> -->
  </div>
</template>
<script>
import {unit} from '@/utils/utils'
import { getDelegate } from '@/api/block'
import ChartView from '@/components/chart-view/chart-view'
import AnimatedInteger from '@/components/animated-integer/animated-integer'
import ChartCard from '@/components/card/card'
import Trend from '@/components/chart/trend'
import {blocks} from '@/utils/mixins'

export default {
  mixins: [blocks],
  props: {},
  data () {
    return {
      unit: unit,
      block: {
        total: 0,
        quantity: 0,
        rewards: 0, // 收益
        rate: 0,
        increase: true,
        voteNum: 0,
        numAverage: 0,
        popularAverage: 0,
        myRank: 0,
        allDelegates: 0
      }
    }
  },
  computed: {
    address () {
      return this.$store.state.user.accountInfo.address
    }
  },
  mounted () {
    this.effectUser()
  },
  methods: {
    async effectUser () {
      try {
        const result = await this.$store.dispatch('_effectAccount')
        const resultDelegate = await getDelegate({publicKey: this.publicKey})
        if (result && result.data.success) {
          if (result.data.effectivity && resultDelegate && resultDelegate.data.success) {
            this.$refs.countArea.getDaysBlock(this.address)
            this.$refs.countBar.userVoteDayChart(this.address)
            this.blockDay(this.address)
            this.userVoteDay(this.address)
            this.userIncome()
            this.myRank()
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async userIncome () {
      try {
        const result = await this.incomeDayHandle(-1, 0)
        if (result && result.data.code === '200' && result.data.data > 0) {
          this.block.quantity = result.data.data
        }
        const oldResult = await this.incomeDayHandle(-8, -7)
        if (oldResult && oldResult.data.code === '200' && oldResult.data.data > 0) {
          const oldQuantity = oldResult.data.data
          this.block.rate = this.block.quantity / oldQuantity
          if (this.block.rate > 1) {
            this.block.increase = true
          } else {
            this.block.increase = false
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: {
    'animated-integer': AnimatedInteger,
    'chart-card': ChartCard,
    'mini-area': () => import('@/components/chart/miniArea'),
    'mini-bar': () => import('@/components/chart/miniBar'),
    'mini-progress': () => import('@/components/chart/miniProgress'),
    Trend,
    ChartView
  }
}
</script>
<style lang="less" scoped>
  .action-title{
    text-align: justify;
  }
</style>
