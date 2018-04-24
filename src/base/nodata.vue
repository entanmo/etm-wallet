<template>
  <div class="wrapper">
    <div class="no-data">
        <img src="../assets/images/no-data.png"/>
        <!-- <p>抱歉，暂无相关数据</p> -->
        <p>{{pleaseSelect}}</p>
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
      default: "抱歉，暂无相关数据"
    }
  }
}
</script>

<style scoped>
.wrapper {
    position: relative;
    height: 500px;
    /* background: #f0f2f5; */
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