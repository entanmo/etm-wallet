<template>
  <div >
    <!-- <a-spin  :spinning="loading"> -->
    <a-row>
      <a-col :sm="24" :md="12" :xl="6" class="part part-row-left">
        <chart-card :title="$t('first-view.chart.bonus')" :point='2' :total='bonus'>
          <a-tooltip slot="action">
              <template slot="title">
                <div>{{$t('first-view.chart.tip.tip_bonus')}}</div>
              </template>
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
          </div>
          <div slot="footer" style="height:21px"></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" class="part part-row-right row01">
        <chart-card :title="$t('first-view.chart.voteMinerNum')" :total="block.total">
          <a-tooltip slot="action">
              <template slot="title">
                <div>{{$t('first-view.chart.tip.tip_voteMinerNum')}}</div>
                <div>{{$t('first-view.chart.tip.tip_voteDailyNum')}}</div>
              </template>
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-area :average.sync="block.numAverage" ref="countArea" />
          </div>
          <div slot="footer">{{$t('first-view.chart.dailyNum')}}<span> {{block.numAverage}}</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" class="part part-row-left row01" >
        <chart-card :title="$t('first-view.chart.voteMinerPopular')" :total="block.voteNum">
          <a-tooltip  slot="action">
              <template slot="title">
                <div>{{$t('first-view.chart.tip.tip_voteMinerPopular')}}</div>
                <div>{{$t('first-view.chart.tip.tip_vote_average')}}</div>
              </template>
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <mini-bar :average.sync="block.popularAverage" ref="countBar" />
          </div>
          <div slot="footer">{{$t('first-view.chart.average')}} <span> {{block.popularAverage}}</span></div>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" class="part part-row-right">
        <chart-card :title="$t('first-view.chart.voteMinerRank')" :total="block.myRank">
          <!-- <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip> -->
          <div>
            <mini-progress :target="block.myRank" :percent="block.allDelegates" color="#13C2C2" height="8px"/>
          </div>
          <div slot="footer" style="height:21px"></div>
        </chart-card>
      </a-col>
    </a-row>
    <!-- </a-spin> -->
  </div>
</template>
<script>
import {unit} from '@/utils/utils'
import AnimatedInteger from '@/components/animated-integer/animated-integer'
import ChartCard from '@/components/card/card'
import Trend from '@/components/chart/trend'
import {getRecord} from '@/api/account'
import {blocks} from '@/utils/mixins'

export default {
  mixins: [blocks],
  props: {},
  data () {
    return {
      unit: unit,
      minerAddress: '',
      minerPublicKey: '',
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
    },
    bonus () {
      return unit(this.$store.state.user.accountInfo.bonus).toFixed(2) * 1 || 0
    }
  },
  mounted () {
    this.effectUser()
  },
  methods: {
    async isVote () {
      try {
        const params = {address: this.address}
        const result = await getRecord(params)
        if (result && result.data.success && result.data.delegates.length > 0) {
          this.minerAddress = result.data.delegates[0].address
          this.minerPublicKey = result.data.delegates[0].publicKey
          return true
        } else {
          return false
        }
      } catch (error) {
        console.log(error)
      }
    },
    async effectUser () {
      try {
        const result = await this.$store.dispatch('_effectAccount')
        const isVoteResult = await this.isVote()
        if (result && result.data.success) {
          if (result.data.effectivity && isVoteResult) {
            this.$refs.countArea.getDaysBlock(this.minerAddress)
            this.$refs.countBar.userVoteDayChart(this.minerAddress)
            this.blockDay(this.minerAddress)
            this.userVoteDay(this.minerAddress)
            this.myRank({publicKey: this.minerPublicKey})
          }
        } else {

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
    Trend
  }
}
</script>
<style lang="less" scoped>

</style>
