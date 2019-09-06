<template>
  <div class="wrapper">
    <div class="no-data">
        <img src="../../assets/images/no-data.png"/>
        <p>{{$t('no_found.p')}}</p>
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
