<template>
    <div class="head flex">
        <div class="filter-btn flex">
            <button v-for="(item,index) in filterBtn" :key="index" 
            @click="selectBtn(index)"
            :class="{activeBtn: active === index}">
            <span class="fl" style="margin:0 10px;">{{item}}</span>
            <span class="flex fr" style="flex-direction:column;"  v-if="index === 0">
                <i class="icon icon-arrowup"></i>
                <i class="icon icon-arrowdown"></i>
            </span>
            <i class="icon icon-arrowdown" v-else></i>
            </button>
        </div>
        <div class="tip">
            <button @click="openTip">矿工说明</button>
        </div>
        <!-- 弹框 -->
    <div class="popout" v-show="showPop">
      <div class="close"><span @click="hidePopout">×</span></div>
      <p class="title">矿工说明</p>
      <div class="about clearfix">
          <div class="about-left fl">
              <p>正式矿工：</p>
              <p>候补矿工：</p>
              <p class="m">剩余矿工：</p>
          </div>
          <div class="about-right fr">
              <p>当前出块结果中，被挑选出来进行挖矿的矿工单位。</p>
              <p>当前出块结果中，被挑选出来进行挖矿的矿工单位。当正式矿工出块移除后，候补矿工将随机进入正式矿工列表</p>
              <p>当前出块结果中，未被挑选的矿工。这些剩余矿工将参与到其它币种的挖矿。</p>
          </div>
      </div>
      <div class="confirm"><button @click="hidePopout">确定</button></div>  
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      filterBtn: ["投票数", "算力", "加入时间", "运行时间"],
      active: 0,
      desc: true,
      showPop: false,
    };
  },
  updated() {
    Bus.$on("hideQrcode", data => {
      this.showPop = false;
    });
  },
  methods: {
    selectBtn(index) {
      this.active = index;
      if(index === 0) {
          this.desc = !this.desc
          this.$store.commit('reverseSort', this.desc)
          this.$store.commit('changeSort', index)
      }else {
         this.$store.commit('changeSort', index)
      }
      Bus.$emit('zeroPage')
    },
    openTip() {
        this.showPop = true
        Bus.$emit('showMask', true)
    },
    hidePopout() {
      this.showPop = false;
      Bus.$emit("showMask", false);
    },
  },
  watch: {
    active(newVal, oldVal) {
        this.$store.commit('reverseSort', true)
    }
  }
};
</script>

<style scoped>
.head {
  height: 60px;
  padding: 0 16px;
  border-bottom: 1px solid #e5e5e5;
  background: #fff;
}
.filter-btn button {
  height: 38px;
  line-height: 38px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  margin-left: 10px;
  color: #9e9e9e;
  padding-right: 10px;
}
i {
  height: 18px;
  margin-top: -6px;
}
.filter-btn button:first-child {
  margin-left: 0;
}
.head .tip button {
  width: 80px;
  height: 38px;
  border-radius: 5px;
  background: #169bd5;
  color: #fff;
}
.activeBtn {
  height: 38px;
  border-radius: 5px;
  background: #169bd5;
  color: #fff !important;
}
/*弹框*/
.popout {
  width: 600px;
  height: 380px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  z-index: 1000;
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
.about {
  width: 80%;
  margin: 0 auto;
  font-size: 14px;
}
.about p {
  margin: 20px 0;
}
.about-left p {
  font-weight: bold;
  text-align: right;
}
.m {
  padding-top: 20px;
}
.about-left {
  width: 16%;
}
.about-right {
  width: 84%;
}
.confirm {
  text-align: center;
  margin: 20px 0;
}
.confirm button {
  width: 64px;
  height: 40px;
  background: #169bd5;
  border-radius: 6px;
  color: #fff;
  line-height: 40px;
}
</style>