<template>
  <div class="chart-trend">
    {{term}}
    <span>{{caulateRate}}%</span>
    <span :class="['chart-trend-icon', caulateTrend]" style=""><a-icon :type="'caret-' + caulateTrend" /></span>
  </div>
</template>

<script>
export default {
  name: 'Trend',
  props: {
    term: {
      type: String,
      required: true
    },
    target: {
      type: Number,
      required: false,
      default: 0
    },
    value: {
      type: Number,
      required: false,
      default: 0
    },
    isIncrease: {
      type: Boolean,
      required: false,
      default: null
    },
    percent: {
      type: Number,
      required: false,
      default: null
    },
    scale: {
      type: Number,
      required: false,
      default: 2
    }
  },
  data () {
    return {
      trend: this.isIncrease ? 'up' : 'down',
      rate: this.percent
    }
  },
  // created () {
  //   this.trend = this.caulateTrend()
  //   this.rate = this.caulateRate()
  // },
  computed: {
    caulateRate () {
      return (this.percent === null ? Math.abs(this.value - this.target) * 100 / this.target : this.percent).toFixed(this.scale)
    },
    caulateTrend () {
      let isIncrease = this.isIncrease === null ? this.value >= this.target : this.isIncrease
      return isIncrease ? 'up' : 'down'
    }
  }
}
</script>

<style lang="less" scoped>
  .chart-trend{
    display: inline-block;
    font-size: 14px;
    line-height: 22px;
    .chart-trend-icon{
      font-size: 12px;
      &.up{
        color: #f5222d;
      }
      &.down{
        color: #52c41a;
      }
    }
  }
</style>
