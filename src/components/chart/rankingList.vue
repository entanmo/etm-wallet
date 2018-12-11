<template>
  <div class="rank clearfix">
    <h4 class="title">{{title}}</h4>

    <ul class="list">
      <li :key="index" v-for="(item, index) in first">
        <span :class="index < 3 ? 'active' : null">{{index + 1}}</span>
        <span >{{item.name}}</span>
        <span >{{item.total}}</span>
      </li>
    </ul>
    <ul class="list" style="float:right">
      <li :key="index" v-for="(item, index) in second">
        <span >{{index + 6}}</span>
        <span >{{item.name}}</span>
        <span >{{item.total}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RankingList',
  props: ['title', 'list'],
  computed: {
    first () {
      return this.list.slice(0, 5)
    },
    second () {
      return this.list.slice(5)
    }
  }
}
</script>

<style lang="less" scoped>
  .rank{
    padding: 0 8px 16px 16px;
    width: 100%;
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
