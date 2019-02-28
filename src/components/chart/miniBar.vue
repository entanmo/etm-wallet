<template>
  <div class="mini-chart">
    <div class="chart-content" :style="{height: 46}">
      <v-chart :force-fit="true" :height="height" :data="data" :padding="[36, 5, 18, 5]">
        <v-tooltip />
        <v-bar position="dd*人气量" />
      </v-chart>
    </div>
  </div>
</template>

<script>
import {blocks} from '@/utils/mixins'
import {format} from 'date-fns'
const beginDay = new Date().getTime() - 1000 * 60 * 60 * 24 * 13
const data1 = Array.apply(null, {length: 14}).map((item, i) => {
  return {'dd': format(new Date(beginDay + 1000 * 60 * 60 * 24 * i), 'YYYY-MM-DD'), '人气量': 0}
})
const tooltip = [
  'x*y',
  (x, y) => ({
    name: x,
    value: y
  })
]

const scale = [{
  dataKey: 'x',
  min: 2
}, {
  dataKey: 'y',
  title: '时间',
  min: 1,
  max: 22
}]

export default {
  mixins: [blocks],
  name: 'MiniBar',
  props: {
    average: {
      type: Number,
      default: 0
    },
    effectUser: {
      type: Boolean
    }
  },
  data () {
    return {
      data: [],
      data1: data1,
      scale,
      tooltip,
      height: 100,
      width: '100%'
    }
  },
  watch: {
    'effectUser': function () {
      if (this.effectUser) {
        this.userVoteDay()
      }
    }
  },
  methods: {
    async userVoteDay () {
      try {
        const result = await this.votesDayHandle(-13, 1)
        if (result.data.code === '200' && result.data.data.length > 0) {
          let arr = []
          for (let i = 0; i < this.data1.length; i++) {
            for (let j = 0; j < result.data.data.length; j++) {
              if (result.data.data[j]['dd'] === this.data1[i]['dd']) {
                this.data1[i]['人气量'] = result.data.data[j]['votes']
              }
              arr.push(result.data.data[j]['votes'])
            }
          }
          this.data = [...this.data1]
          const allData = arr.reduce((pro, next) => {
            return pro + next
          }, 0)
          if (arr.length > 0) {
            const num = Number((allData / arr.length).toFixed(0))
            this.$emit('update:average', num)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "index.less";
</style>
