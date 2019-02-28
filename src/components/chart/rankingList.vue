<template>
  <div class="rank clearfix">
    <a-spin  :spinning="loading">
    <div>
      <h4 class="title">{{title}}</h4>
      <ul class="list">
        <li :key="index" v-for="(item, index) in first">
          <span :class="index < 3 ? 'active' : null">{{index + 1}}</span>
          <span >{{item.userName || item.voter | long}}</span>
          <span v-if="item.quantity" >{{item.quantity}} ETM</span>
          <span v-else >{{item.votes}}</span>
        </li>
      </ul>
      <ul class="list" style="float:right">
        <li :key="index" v-for="(item, index) in second">
          <span >{{index + 6}}</span>
          <span >{{item.userName || item.voter | long}}</span>
          <span v-if="item.quantity" >{{item.quantity}} ETM</span>
          <span v-else >{{item.votes}}</span>
        </li>
      </ul>
    </div>
       </a-spin>
      <no-data v-show="nodata"></no-data>
  </div>
</template>
<script>
import {unit} from '@/utils/utils'
import noData from '@/components/nodata/nodata'

export default {
  name: 'RankingList',
  props: {
    title: {
      type: String
    },
    list: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      unit: unit,
      nodata: true
    }
  },
  created () {
  },
  watch: {
    'list': function () {
      if (this.list.length > 0) {
        this.nodata = false
      } else {
        this.nodata = true
      }
    }
  },
  computed: {
    first () {
      return this.list.slice(0, 5)
    },
    second () {
      return this.list.slice(5)
    }
  },
  filters: {
    long (value) {
      if (!value) return ''
      value = value.toString()
      if (value.length > 15) {
        return value.substr(0, 15) + '...'
      } else {
        return value
      }
    }
  },
  components: {
    noData
  }
}
</script>
<style lang="less" scoped>
  .rank{
    padding: 0 8px 16px 16px;
    width: 100%;
    position: relative;
    height: 222px;
    .wrapper{
      height: 222px;
    }
    .title{
      // border-bottom: 1px solid rgb(232, 232, 232);
      // line-height: 35px;
    }
    .list{
      padding: 0;
      list-style: none;
      // height: 300px;
      width: 46%;
      margin-right: 2%;
      overflow: hidden;
      float: left;
      li {
        margin-top: 16px;
        span {
          color: rgba(0,0,0,.65);
          font-size: 14px;
          line-height: 22px;
        }
        span:first-child {
          background-color: #f5f5f5;
          border-radius: 20px;
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          margin-right: 24px;
          height: 20px;
          line-height: 20px;
          width: 20px;
          text-align: center;
        }
        span.active {
          background-color: #314659;
          color: #fff;
        }
        span:last-child {
          float: right;
        }
      }
    }
  }
</style>
