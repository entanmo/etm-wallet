<template>
  <div>
    <div class="tip" v-show="tipShow" :class="yesOrNo">
			{{tip}}
		</div>
  </div>
</template>
<script>
export default {
  props:{
    tip:{
      type:String,
      default:''
    },
    tipShow:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
    }
  },
  computed:{
      yesOrNo() {
        return this.tip === "登录成功" ? "success-tip" : "fail-tip";
    }
  },
  watch:{
    tipShow(){
      if(this.tipShow){
        setTimeout(() => {
          this.$emit('hidden')
        },2000)
      }
    }
  }
}
</script>
<style scoped>
  .tip {
    width: 160px;
    height: 60px;
    position: absolute;
    top: 30px;
    left: 50%;
    margin-left: -80px;
    border-radius: 5px;
    box-shadow: 0 0 20px rgb(200, 200, 200);
    text-align: center;
    line-height: 60px;
    color: #fff;
    font-size: 14px;
  }
  .success-tip {
    background: #399bff;
  }
  .fail-tip {
    background: #ee4000;
  }
</style>
