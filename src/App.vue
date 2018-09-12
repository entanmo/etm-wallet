<template>
  <div class="page-container clearfix">
    <transition name="l">
    <div class="page-sidebar fl page-scroll" ref="l" v-show="flag">
      <div class="page-detail">
        <!-- Site header  -->
        <header class="site-header">
          <div class="site-logo">
            <a href="javascript:;"><img src="./assets/images/logo-white.png"></a>
          </div>
        </header>
        <!-- /site header -->
        <!-- Main navigation -->
        <ul class="main-menu">
          <li class="has-sub">
            <router-link exact to="/">
              <i class="iconfont icon-home"></i>
              <span class="title">首页</span>
            </router-link>
          </li>
        </ul>
        <!-- <ul class="main-menu">
          <li class="has-sub" @click="changeTitle('资产')">
            <router-link to="/assets">
              <i class="icon icon-post"></i>
              <span class="title">资产</span>
            </router-link>
          </li>
        </ul> -->
        <ul class="main-menu">
          <li class="has-sub">
            <router-link to="/person">
              <i class="iconfont icon-user"></i>
              <span class="title">个人中心</span>
            </router-link>
          </li>
        </ul>
        <ul class="main-menu">
          <li class="has-sub">
            <router-link to="/application">
              <i class="iconfont icon-appstore"></i>
              <span class="title">应用中心</span>
            </router-link>
          </li>
        </ul>
        <ul class="main-menu">
          <li class="has-sub">
            <router-link to="/block-appear">
              <i class="iconfont icon-block"></i>
              <span class="title">区块生产</span>
            </router-link>
          </li>
        </ul>
        <ul class="main-menu">
          <li class="has-sub">
            <router-link to="/block-scan">
              <i class="iconfont icon-compass"></i>
              <span class="title">区块浏览</span>
            </router-link>
          </li>
        </ul>
        <ul class="main-menu">
          <li class="has-sub">
            <router-link to="/vote">
              <i class="iconfont icon-like"></i>
              <span class="title">投票</span>
            </router-link>
          </li>
        </ul>
        <ul class="main-menu">
          <li class="has-sub">
            <router-link to="/transfer">
              <i class="iconfont icon-transaction"></i>
              <span class="title">转账</span>
            </router-link>
          </li>
        </ul>
        <!-- 投票 -->
        <ul class="main-menu">
          <li class="has-sub">
            <router-link to="/select-miners">
              <i class="iconfont icon-star"></i>
              <span class="title">选择矿工</span>
            </router-link>
          </li>
        </ul>
        <!-- 节点 -->
        <ul class="main-menu">
          <li class="has-sub">
            <router-link to="/miners-list">
              <i class="iconfont icon-barchart"></i>
              <span class="title">SCV矿工列表</span>
            </router-link>
          </li>
        </ul>
        <ul class="main-menu">
          <li class="has-sub">
            <router-link to="/selected-miners">
              <i class="iconfont icon-check-circle"></i>
              <span class="title">已选矿工</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    </transition>
    <div class="main-container fr" ref="r">
      <div class="main-top flex">
        <i class="icon icon-menu" @click="toggleMenu"></i>
        <i class="iconfont icon-logout" @click="loginout" title="退出登录"></i>
      </div>
      <p class="main-title">
        {{title}}
      </p>
      <!-- <keep-alive> -->
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <!-- </keep-alive> -->
    </div>
    <div class="mask" v-show="showPop" @click="hidePop"></div>
  </div>
</template>

<script>
import { genAddress } from './assets/js/gen'
const HOST = require('../config/ip')

export default {
  data () {
    return {
      title: '',
      flag: true,
      showPop: false
    }
  },
  updated () {
    window.Bus.$on('showMask', data => {
      this.showPop = data
    })
    // this.title = this.$store.state.title;
  },
  created () {
    let address = genAddress(
      localStorage.getItem('etmsecret') || sessionStorage.getItem('etmsecret')
    )
    // console.log(address)
    this._getAccounts(address)
  },
  methods: {
    changeTitle (title) {
      this.title = title
    },
    toggleMenu () {
      if (this.flag) {
        this.$refs.r.style.width = '100%'
        this.flag = false
      } else {
        this.$refs.r.style.width = '85.4%'
        this.flag = true
      }
    },
    loginout () {
      localStorage.removeItem('etmsecret') ||
        sessionStorage.removeItem('etmsecret')
      window.location.reload()
    },
    hidePop () {
      this.showPop = false
      window.Bus.$emit('hideQrcode', true)
    },
    // 全局，判断该账户是否设置了二级密码
    _getAccounts (address) {
      this.$http
        .get(HOST + '/api/accounts', {
          params: {
            address
          }
        })
        .then(res => {
          if (res.data.success) {
            // console.log(res.data)
            // 如果设置了二级密码，那么以后要根据这个状态来决定交易时是否弹出二级密码框
            if (res.data.account.secondSignature) {
              this.$store.commit('changeNeedsSecondSecret', true)
            }
          }
        })
    }
  },
  watch: {
    '$route' (to, from) {
      this.title = to.meta.title
    }
  }
}
</script>
<style scoped>
html,
body {
  height: 100%;
}
.page-container {
  width: 100%;
  position: relative;
  min-width: 1220px;
}

/* 侧边栏导航 */

.page-sidebar {
  width: 14.6%;
  height: 100%;
  background-color:#00284d;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 997;
}
.page-detail {
  padding-bottom: 15px;
}
.site-header {
  padding: 15px 7%;
  /* height: 60px; */
  box-sizing: border-box;
}

.site-logo a {
  display: block;
  width: 100%;
}

.site-logo img {
  /* width: 100%; */

  display: block;
  margin: auto;
}

.main-menu > li > a {
  display: block;
  padding: 14px 8.2%;
  color: #a2aab2;
  transition: all 0.2s;
}
.main-menu > li > a:hover {
  color: #fff;
  background: #001529;
}
.in {
  background-color: #001529;
  color: #fff !important;
}
.icon::before {
  content: " ";
  float: left;
  display: block;
  height: 25px;
  width: 25px;
  cursor: pointer;
}
.icon-menu::before {
  background: url(./assets/images/12.png) 0px 1px no-repeat;
  background-position: center;
  margin: 0 10px;
}
/* .icon-loginout::before {
  background: url(./assets/images/13.png) 0px 1px no-repeat;
  background-position: center;
  margin: 0 10px;
} */

/*导航侧边框*/

.page-simple {
  padding-top: 20px;
  display: none;
  height: 1000px;
}

.page-simple li {
  width: 100%;
}

.page-simple li.simple-in {
  background-color: #f68271;
}

.page-simple a {
  display: block;
  background: url(./assets/images/8.png) center center no-repeat;
  height: 47px;
}

.main-container {
  width: 85.4%;
  min-height: 780px;
  transition: width 0.5s;
}

.main-top {
  background-color: #fff;
  padding: 0 20px;
  height: 60px;
  line-height: 60px;
}

.main-top ul li {
  float: left;
}

.main-top ul li a {
  color: #858585;
  font-size: 1em;
}
.main-title {
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  color: #858585;
  padding-left: 24px;
}

.mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.l-enter-active,
.l-leave-active {
  transition: all 0.5s;
}
.l-enter,
.l-leave-to {
  left: -14.6%;
}
</style>
