<template>
  <div>
    <div class="main-content">
      <ul class="nav-left" v-show="!minerDetail">
        <router-link to="formal-miners" tag="li">正式矿工</router-link>
        <router-link to="candidate-miners" tag="li">候补矿工</router-link>
        <router-link to="remaining-miners" tag="li">剩余矿工</router-link>
      </ul>
      <div class="nav-content">
        <keep-alive>
          <router-view @setMinerDetail="setMinerDetail"></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      minerDetail: ''
    }
  },
  // activated () {
  //   this.$store.commit('changeTitle', 'SCV旷工列表')
  // },
  methods: {
    setMinerDetail(data) {
      this.minerDetail = data
    }
  },
  watch: {
    '$route'(newVal) {
        this.minerDetail = this.$route.params.id
        sessionStorage.setItem('minerDetail', this.minerDetail)
      }
  }
}
</script>

<style scoped>
.nav-content {
    /* background: #fff; */
    position: relative;
    min-height: 600px;
}
.main-content {
    width: 97.34%;
    padding-left: 1.28%;
    padding-right: 1.38%;
}
.nav-left {
    display: flex;
    justify-content: flex-start;
    width: 85%;
}
.nav-left > li {
    margin-right: 5px;
    width: 10%;
    height: 36px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    text-align: center;
    line-height: 36px;
    color: #000;
    cursor: pointer;
    background: #eee;
}
.nav-left > li.in {
    background: #fff;
    color: #399bff;
}
</style>