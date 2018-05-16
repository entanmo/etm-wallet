<template>
  <div class="w">
    <div class="w-up">
      <div class="head flex">
        <p>矿工详情</p>
        <button @click="setBack">返回</button>
      </div>
      <div class="info">
        <div><span>妈呀ssssss</span><img src="../assets/images/icon-1.png" alt=""></div>
        <p>官方网址：333333</p>
        <p>公钥地址：88888</p>
      </div>
    </div>
    <div class="w-c clearfix">
      <div class="w-c-ability fl">
        <p class="title">矿工能力分布</p>
        
      </div>
      <div class="w-c-power fr">222</div>
    </div>
    <div class="w-b clearfix">
      <div class="w-b-dig fl">333</div>
      <div class="w-b-more fr">444</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
      return {
        
      }
  },
  created () {
    this.$emit('setMinerDetail', sessionStorage.getItem('minerDetail'))
  },
  methods: {
    setBack() {
      window.history.back()
    }
  },
  watch: {
    
  }
}
</script>

<style scoped>
.w {
  width: 96%;
  margin: 0 2%;
  background: rgb(245,245,245);
}
.head,
.w-up,
.w-c-ability,
.w-c-power,
.w-b-dig,
.w-b-more {
  background: #fff;
}
.head {
  height: 60px;
  padding: 0 16px;
  border-bottom: 1px solid #e5e5e5;
  
}
.head p {
  font-size: 18px;
}
.head button {
  width: 120px;
  height: 36px;
  background: #169bd5;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
}
.info {
  padding: 16px;
  line-height: 30px;
}
.info>div>span {
  font-size: 20px;
}
.info>div>img {
  vertical-align: -6px;
}
.w-up {
  margin-bottom: 20px;
}
.w-c,
.w-b {
  margin-bottom: 20px;
}
.w-c > div,
.w-b > div {
  padding: 2%;
  box-sizing: border-box;
}
.w-c-ability,
.w-b-dig {
  width: 38%;
  margin-right: 2%;
}
.w-c-power,
.w-b-more {
  width: 60%;
}
.title {
  font-weight: bolder;
}
</style>


