<template>
  <div class="wrapper">
    <div class="no-data">
        <img src="../../assets/images/no-data.png"/>
        <p>{{$t('no_found.miner')}}</p>
        <a-button type="primary" @click="linkChange">{{$t('no_found.btn_miner')}}</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    pleaseSelect: {
      type: String,
      default: '抱歉，暂无相关数据'
    }
  },
  methods: {
    linkChange () {
      this.$router.push({path: '/block-production'})
    }
  }
}
</script>

<style scoped>
.wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 500px;
    width: 100%;
    background: #fff;
    z-index: 10;
}
.no-data {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: rgb(153, 153, 153);
}
p {
    margin-top: 16px;
}
</style>
