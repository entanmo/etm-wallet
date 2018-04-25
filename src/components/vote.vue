<template>
  <div>
    <div class="main-content">
      <ul class="nav-left">
        <router-link to="trustee-list" tag="li">受托人列表</router-link>
        <router-link to="record" tag="li">投票记录</router-link>
        <router-link to="vote-for-me" tag="li">谁投了我</router-link>
      </ul>
      <div class="nav-content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    
  },
  activated () {
    this.$store.commit('changeTitle', '投票')
  }
}
</script>

<style scoped>
.nav-content {
    background: #fff;
    position: relative;
    min-height: 800px;
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