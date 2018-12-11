<template>
    <div ref="coin" class="addMoneyAnim"></div>
</template>
<script>
var TWEEN = require('@tweenjs/tween.js')

export default{
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      amount: 1,
      repeat: 0,
      ease: 'linear',
      startArea: {
        x: -300, y: 1000, width: 1920, height: 30
      },
      endArea: {
        x: -200, y: '100%', width: 1000, height: 500
      },
      basicToDuration: 1200,
      randomToDuration: 800,
      startDelayRandom: 800,
      rotateRandom: 180,
      bezierSegmentation: 2,
      flag: false
    }
  },
  computed: {
    coins () {
      return Array(this.amount).fill(1)
    }
  },
  created () {
    // const rect = this.$refs
    // console.log(rect.coin)
    // this.tween()

    // console.log(this.$refs.coin)
  },
  mounted () {
    // console.log(this.$refs.coin)
    // if (this.index) {
    //   this.tween()
    // }
  },
  methods: {
    dataToNumber (obj, rect) {
      const toNumber = (v, full) => {
        if (typeof v === 'number') {
          return v
        }
        const unit = v.replace(/[0-9|.]/g, '')
        switch (unit) {
          case '%':
            return parseFloat(v) * full / 100
          case 'em':
            return parseFloat(v) * 16
          default:
            return null
        }
      }
      return {
        x: toNumber(obj.x, rect.width),
        y: toNumber(obj.y, rect.height),
        width: toNumber(obj.width, rect.width),
        height: toNumber(obj.height, rect.height)
      }
    },
    tween () {
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween({ x: 500, y: -50 })
        .to({
          x: Math.random() * (this.startArea.width) + this.startArea.x,
          y: Math.random() * (this.startArea.height) + this.startArea.y
        }, this.basicToDuration + Math.random() * this.randomToDuration)
        .onUpdate((object) => {
          this.$refs.coin.style.transform = `translate(${object.x}px, ${object.y}px)`
        })
        .onComplete(() => {
          // this.back()

          // console.log(this.show)
        })
        .start()
      animate()
    },
    back () {
      this.show = false
      this.$emit('back', this.show)
    }
  }
}
</script>
<style lang="less" scoped>

.addMoneyAnim {
  background: url('https://gw.alipayobjects.com/zos/rmsportal/fseEOKMDOXOieJiHKuQg.png') no-repeat;
  background-size: 420px 104px;
  width: 52px;
  height: 52px;
  animation: rotateMoney 0.45s step-start infinite;
  position: absolute;
  top: 10px;
  left: 300px;
  z-index: 10000;
}

.addMoneyFrame(@one, @frame, @i: 0, @name: 0%) when (@i =< @frame) {
  .addMoneyFrame(@one, @frame, @i + 1, (100% / @frame * (@i + 1)));
  @{name} {
    background-position: -(mod(@i, @one) * 52px) -(floor(@i / @one)*52px);
  }
}

@keyframes rotateMoney {
  .addMoneyFrame(8, 15);
}

</style>
