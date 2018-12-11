<template>
  <span>{{tweeningValue}}</span>
</template>
<script>
var TWEEN = require('@tweenjs/tween.js')
export default{
  props: {
    value: {
      // type: Number,
      required: true
    },
    point: {
      type: Number,
      default: 0
    },
    speed: {
      type: Number,
      default: 1500
    }
  },
  data () {
    return {
      tweeningValue: 0
    }
  },
  watch: {
    value: function (newValue, oldValue) {
      this.tween(oldValue, newValue)
    }
  },
  mounted () {
    this.tween(0, this.value)
  },
  methods: {
    tween (startValue, endValue) {
      var vm = this
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      new TWEEN.Tween({tweeningValue: startValue})
        .to({tweeningValue: endValue}, this.speed)
        .onUpdate(function (object) {
          vm.tweeningValue = object.tweeningValue.toFixed(vm.point)
        })
        .start()
      animate()
    }
  }
}
</script>
<style>

</style>
