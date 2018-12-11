<template>
  <div id="app">
    <transition name="page-toggle">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import enquireScreen from './utils/device'

export default {
  name: 'App',
  created () {
    let _this = this
    enquireScreen(isMobile => {
      _this.$store.commit('SET_DEVICE', isMobile)
    })
  }
}
</script>

<style>

</style>
