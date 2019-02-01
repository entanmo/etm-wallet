<template>
  <div class="mini-chart">
    <div class="chart-content" :style="{width:'100%',height: 46}">
      <v-chart :force-fit="true"   :height="height" :data="data" :padding="[36, 5, 18, 5]">
        <v-tooltip />
        <v-smooth-area position="x*出块数" />
      </v-chart>
    </div>
  </div>
</template>

<script>
import {format} from 'date-fns'
import { setTimeout } from 'timers'

const data = []
const beginDay = new Date().getTime() - 1000 * 60 * 60 * 24 * 14

const fakeY = [20, 5, 4, 2, 4, 20, 5, 6, 5, 9, 6, 3, 10, 5, 3]
setTimeout(() => {
  for (let i = 0; i < fakeY.length; i += 1) {
    data.push({
      x: format(new Date(beginDay + 1000 * 60 * 60 * 24 * i), 'YYYY-MM-DD'),
      '出块数': fakeY[i]
    })
  }
}, 1000)
const tooltip = [
  'x*y',
  (x, yy) => ({
    name: x,
    value: 'y'
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
  name: 'MiniArea',
  data () {
    return {
      data,
      scale,
      tooltip,
      height: 100
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
