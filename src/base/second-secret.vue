<template>
  <div class="popout">
    <div class="close"><span @click="hidePop">×</span></div>
    <p class="title">请输入二级密码</p>
    <input type="password" placeholder="请输入二级密码" v-model="secondSecret">
    <div class="confirm"><button @click="confirmIt">提交</button></div>
  </div>
</template>

<script>
export default {
  data () {
      return {
          secondSecret: ''
      }
  },
  // updated () {
  //   Bus.$on('clearSSecret', (d) => {
  //     this.secondSecret = d
  //   })
  // },
  methods: {
      confirmIt() {
        this.$emit('inputSSecret', this.secondSecret)
        this.$emit('hidePop', false)
      },
      hidePop() {
        this.$emit('hidePop', false)
      }
  },
  watch: {
    
  }
}
</script>

<style scoped>
.popout {
  width: 380px;
  height: 220px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  z-index: 1000;
  text-align: center;
  box-shadow: 0 0 20px rgb(200, 200, 200);
}
.close {
  font-size: 36px;
  text-align: right;
}
.close span {
  display: inline-block;
  width: 47px;
  text-align: center;
  cursor: pointer;
}
.title {
  font-size: 26px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 10px 0;
}
.popout input {
  width: 320px;
	height: 32px;
	margin: 0 auto;
  border: 1px solid #d9d9d9;
  padding-left: 10px;
	border-radius: 3px;
}
.popout .confirm {
  text-align: center;
  margin: 20px 0;
}
.popout .confirm button {
  width: 64px;
  height: 40px;
  background: #169bd5;
  border-radius: 6px;
  color: #fff;
  line-height: 40px;
}
</style>


