<template>
  <div class="extra-item">
    <a :class="[tabIndex === item.index ? 'active' :'']"
     v-for="(item,key) in btnName" :key="item.index"
      @click="changeTab(key)">
      {{item.name}}
    </a>
  </div>
</template>
<script>
const btnName = [{
  index: 0,
  name: i18n.t('first-view.chart.timeBtn.dailyBtn')
}, {
  index: 1,
  name: i18n.t('first-view.chart.timeBtn.weekBtn')
}, {
  index: 2,
  name: i18n.t('first-view.chart.timeBtn.monthBtn')
}, {
  index: 3,
  name: i18n.t('first-view.chart.timeBtn.yearBtn')
}]
export default {
  props: {
    btnName: {
      type: Array,
      default: () => btnName
    },
    fn: {
      type: Function,
      default: () => {}
    },
    tabIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {

    }
  },
  methods: {
    changeTab (key) {
      this.$emit('update:tabIndex', key)
      this.fn(key)
      // this.$emit(this.fnName, key)
    }
  }
}
</script>

<style lang="less">
  .extra-item{
    margin-top:10px;
    a{
      color: rgba(0, 0, 0, 0.65);
      margin-right: 24px;
    }
    .active{
      color: #1890ff;
    }

  }
</style>
