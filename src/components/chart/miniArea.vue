<template>
  <div class="mini-chart">
    <div class="chart-content" :style="{width:'100%',height: 46}">
      <v-chart :force-fit="true"   :height="height" :data="data" :padding="[36, 5, 18, 5]">
        <v-tooltip />
        <v-smooth-area position="dd*出块数" />
      </v-chart>
    </div>
  </div>
</template>

<script>
import {blocks} from '@/utils/mixins'
import {format} from 'date-fns'
const beginDay = new Date().getTime() - 1000 * 60 * 60 * 24 * 13
const data1 = Array.apply(null, {length: 14}).map((item, i) => {
  return {'dd': format(new Date(beginDay + 1000 * 60 * 60 * 24 * i), 'YYYY-MM-DD'), '出块数': 0}
})
const tooltip = [
  'x*y',
  (x, yy) => ({
    name: x,
    value: 'y'
  })
]
const scale = [{
  dataKey: 'x',
  min: 1
}, {
  dataKey: 'y',
  title: '时间',
  min: 1,
  max: 22
}]

export default {
  mixins: [blocks],
  props: {
    effectUser: {
      type: Boolean
    },
    average: {
      type: Number,
      default: 0
    }
  },
  name: 'MiniArea',
  data () {
    return {
      data: [],
      data1: data1,
      scale,
      tooltip,
      height: 100
    }
  },
  watch: {
    'effectUser': function () {
      if (this.effectUser) {
        this.getDaysBlock()
      }
    }
  },
  methods: {
    async getDaysBlock () {
      try {
        const result = await this.blockDayHandle(-13, 1)
        if (result.data.code === '200' && result.data.data.length > 0) {
          let arr = []
          for (let i = 0; i < this.data1.length; i++) {
            for (let j = 0; j < result.data.data.length; j++) {
              if (result.data.data[j]['dd'] === this.data1[i]['dd']) {
                this.data1[i]['出块数'] = result.data.data[j]['total']
              }
              arr.push(result.data.data[j]['total'])
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

<style scoped>
  .mini-chart {
    position: relative;
    width: 100%;
    height:46px;
  }
  .mini-chart .chart-content{
    position: absolute;
    bottom: -28px;
    width: 100%;
    /* overflow: hidden; */
  }
</style>
