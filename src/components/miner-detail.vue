<template>
  <div class="w">
    <div class="w-up">
      <div class="head flex">
        <p>矿工详情</p>
        <button @click="setBack">返回</button>
      </div>
      <div class="info">
        <div>
          <span>{{detailInfo.minerName}}</span>
          <img src="../assets/images/icon-1.png" v-show="showV">
        </div>
        <p>官方网址：www.entanmo.com</p>
        <p>公钥地址：{{detailInfo.publicKey}}</p>
      </div>
    </div>
    <div class="w-c clearfix">
      <div class="w-c-ability fl">
        <p class="title">矿工能力分布</p>
        <div id="eRadar" style="width:100%;height:300px;"></div>
      </div>
      <div class="w-c-power fr">
        <p class="title">实时算力图</p>
        <div id="eLine" style="width:100%;height:300px;"></div>
      </div>
    </div>
    <div class="w-b clearfix">
      <div class="w-b-dig fl">
        <p class="title">双挖</p>
        <p class="digging">正在进行{{digWhat}}挖矿</p>
        <div class="dig-rotate">
          <img :src="src1" class="big-dig">
          <img :src="src2" class="little-dig">
        </div>
      </div>
      <div class="w-b-more fr">
        <p class="title">更多详情</p>
        <div class="more-info" v-for="(item,index) in register" :key="index">
          <p>{{item.title}}</p>
          <p>{{item.msg}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailInfo: {},
      doubledig: {},
      register: {},
      isDoubleDiging: "",
      digWhat: "",
      powers: []
    };
  },
  computed: {
    showV() {
      return this.detailInfo.certified === "N" ? false : true;
    },
    src1() {
      return require(`../assets/images/${this.digWhat}1.png`);
    },
    src2() {
      return require(`../assets/images/${this.digWhat}2.png`);
    }
  },
  created() {
    this.$emit("setMinerDetail", sessionStorage.getItem("minerDetail"));
    this.detailInfo = JSON.parse(sessionStorage.getItem("detailInfo"));
    this.getMinerProp();
    this.getPowers();
  },
  mounted() {
    // this.radar();
    // this.line();
  },
  methods: {
    setBack() {
      window.history.back();
    },
    getMinerProp() {
      this.$http
        .get("http://118.24.135.98:4096/api/miner/prop", {
          params: {
            minerNo: sessionStorage.getItem("minerDetail")
          }
        })
        .then(res => {
          if (res.data.success) {
            this.doubledig = res.data.data.doubledig;
            this.isDoubleDiging =
              this.doubledig.enable === "Y" ? "开启中" : "未开启";
            this.digWhat = this.doubledig.currency;
            this.register = res.data.data.register;
            // 拿到数据后再渲染
            this.radar();
            
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    getPowers() {
      this.$http.get('http://118.24.135.98:4096/api/miner/powers', {
        params: {
          minerNo: sessionStorage.getItem("minerDetail")
        }
      }).then(res => {
        if(res.data.success) {
          this.powers = res.data.powers
          // 拿到数据后再渲染
          this.line();
        }
      }).catch(e => {
        console.log(e)
      })
    },
    radar() {
      const eRadar = this.$echarts.init(document.getElementById("eRadar"));
      let option = {
        tooltip: {},
        radar: {
          name: {
            textStyle: {
              color: "#878788"
            }
          },
          // nameGap: 0,
          splitNumber: 3,
          axisLine: {
            lineStyle: {
              color: "#dae9f3"
            }
          },
          splitLine: {
            show: false
          },
          splitArea: {
            areaStyle: {
              color: ["#bce0f2", "cfe8f5", "#e4f2fa"]
            }
          },
          indicator: [
            {
              name:
                "已运行时间 " + this.calcTime(this.detailInfo.alreadyruntime),
              max: 100000*60
            },
            { name: "双挖能力 " + this.isDoubleDiging, max: 1 },
            { name: "生产块数 " + this.detailInfo.producedblocks, max: 50000 },
            {
              name:
                "生产率 " +
                (this.detailInfo.productivity * 100).toFixed(2) +
                "%",
              max: 100
            },
            { name: "欺诈次数 " + this.detailInfo.cheat, max: 10 },
            {
              name:
                "平均算力" + this.detailInfo.averagepower.toFixed(2) + "MH/s",
              max: 500
            }
          ]
        },
        series: [
          {
            type: "radar",
            symbol: "none",
            itemStyle: {
              normal: {
                color: "#4eb3df", // 图表中各个图区域的边框线拐点颜色
                lineStyle: {
                  color: "#4eb3df" // 图表中各个图区域的边框线颜色
                },
                areaStyle: {
                  type: "default"
                }
              }
            },
            data: [
              {
                value: [
                  this.detailInfo.alreadyruntime,
                  this.doubledig.enable === 'Y' ? 1 : 0,
                  this.detailInfo.producedblocks,
                  this.detailInfo.productivity * 100,
                  this.detailInfo.cheat,
                  this.detailInfo.averagepower
                  ],
                name: "综合信息"
              }
            ]
          }
        ]
      };
      eRadar.setOption(option);
    },
    calcTime(t) {
      let h = Math.floor(t / 3600);
      let m = Math.floor((t - h * 3600) / 60);
      return h === 0 ? m + "min" : h + "h " + m + "min";
    },
    line() {
      const eLine = this.$echarts.init(document.getElementById("eLine"));
      let option = {
        title: {
          text: "单位：MH/s",
          textStyle: {
            fontSize: 14,
            color: "#707070",
            fontWeight: "normal"
          },
          top: 10
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          boundaryGap: false,
          // type: "category",
          data: ["0","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12","13", "14", "15", "16", "17", "18", "19","20","21","22","23"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.powers,
            type: "line",
            lineStyle: {
              color: '#169bd5'
            },
            itemStyle: {
              color: '#169bd5'
            },
            // markPoint: {
                // data: [
                //     {type: 'max', name: '最大值'},
                //     {type: 'min', name: '最小值'}
                // ]
            // },
            // markLine: {
            //     data: [
            //         {type: 'average', name: '平均值'}
            //     ]
            // }
          }
        ]
      };
      eLine.setOption(option);
    }
  },
  watch: {
    $route(newVal) {
      this.detailInfo = JSON.parse(sessionStorage.getItem("detailInfo"));
      if (newVal.name === "minerDetail") {
        this.getMinerProp()
        this.getPowers()
      }
    }
  }
};
</script>

<style scoped>
.w {
  width: 96%;
  margin: 0 2%;
  background: rgb(245, 245, 245);
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
.info > div > span {
  font-size: 20px;
}
.info > div > img {
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
  width: 46%;
}
.w-c-power,
.w-b-more {
  width: 52%;
  margin-left: 2%;
}
.w-b-dig,
.w-b-more {
  height: 380px;
}
.title {
  font-weight: bolder;
}
.echarts div {
  width: 100%;
}
.digging {
  text-align: center;
  line-height: 30px;
  color: #888;
}
.dig-rotate {
  text-align: center;
  margin: 40px 0;
}
.big-dig {
  animation: bigrotate 4s linear infinite;
}
.little-dig {
  animation: littlerotate 4s linear infinite;
  margin-left: -10px;
  vertical-align: 7px;
}
@keyframes bigrotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes littlerotate {
  0% {
    transform: rotate(360deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.more-info {
  margin: 20px 0;
  line-height: 20px;
}
.more-info p:last-child {
  color: #7c7c7c;
}
</style>


