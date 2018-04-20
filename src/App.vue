<template>
  <div class="page-container clearfix">
    <transition name="l">
    <div class="page-sidebar fl page-scroll" ref="l">
      <div class="page-detail">
        <!-- Site header  -->
        <header class="site-header">
          <div class="site-logo">
            <a href="javascript:;"><img src="./assets/images/logo.png"></a>
          </div>
        </header>
        <!-- /site header -->
        <!-- Main navigation -->
        <ul class="main-menu">
          <li class="has-sub" @click="changeTitle('首页')">
            <router-link to="/first-view">
              <i class="icon icon-department"></i>
              <span class="title">首页</span>
            </router-link>
          </li>
        </ul>
        <ul class="main-menu">
          <li class="has-sub" @click="changeTitle('资产')">
            <router-link to="/assets">
              <i class="icon icon-post"></i>
              <span class="title">资产</span>
            </router-link>
          </li>
        </ul>
        <ul class="main-menu">
          <li class="has-sub" @click="changeTitle('个人中心')">
            <router-link to="/person">
              <i class="icon icon-employee"></i>
              <span class="title">个人中心</span>
            </router-link>
          </li>
        </ul>
        <ul class="main-menu">
          <li class="has-sub" @click="changeTitle('应用中心')">
            <router-link to="/application">
              <i class="icon icon-probation"></i>
              <span class="title">应用中心</span>
            </router-link>
          </li>
        </ul>
        <ul class="main-menu">
          <li class="has-sub" @click="changeTitle('区块产生')">
            <router-link to="/block-appear">
              <i class="icon icon-promote"></i>
              <span class="title">区块产生</span>
            </router-link>
          </li>
        </ul>
        <ul class="main-menu">
          <li class="has-sub" @click="changeTitle('区块浏览')">
            <router-link to="/block-scan">
              <i class="icon icon-transfer"></i>
              <span class="title">区块浏览</span>
            </router-link>
          </li>
        </ul>
        <ul class="main-menu">
          <li class="has-sub" @click="changeTitle('投票')">
            <router-link to="/vote">
              <i class="icon icon-holiday"></i>
              <span class="title">投票</span>
            </router-link>
          </li>
        </ul>
        <ul class="main-menu">
          <li class="has-sub" @click="changeTitle('转账')">
            <router-link to="/transfer">
              <i class="icon icon-dismiss"></i>
              <span class="title">转账</span>
            </router-link>
          </li>
        </ul>
        <ul class="main-menu">
          <li class="has-sub" @click="changeTitle('节点')">
            <router-link to="/node">
              <i class="icon icon-service"></i>
              <span class="title">节点</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    </transition>
    <transition name="r">
    <div class="main-container fr" ref="r">
      <div class="main-top flex">
        <i class="icon icon-menu" @click="toggleMenu"></i>
        <i class="icon icon-loginout" @click="loginout"></i>
      </div>
      <p class="main-title">
        {{title}}
      </p>
      <router-view></router-view>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
    data() {
        return {
          title: '首页',
          flag: false,
          showL: true
        }
    },
    methods: {
      changeTitle(title) {
        this.title = title
      },
      toggleMenu() {
        if( !this.flag ) {
          this.$refs.r.style.width = '100%'
          this.$refs.l.style.width = 0
          this.flag = true
        }else {
          this.$refs.r.style.width = '85.4%'
          this.$refs.l.style.width = '14.6%'
          this.flag = false
        }
      },
      loginout() {

      }
    }
};
</script>
<style scoped>
html,body {
    height: 100%;
}
.page-container {
    width: 100%;
    /* height: 100%; */
    position: relative;
    min-width: 1220px;
}

/* 侧边栏导航 */

.page-sidebar {
    width: 14.6%;
    height: 100%;
    background-color: #00284d;
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
    height: 60px;
    box-sizing: border-box;
}

.site-logo a {
    display: block;
    width: 100%;
}

.site-logo img {
    width: 100%;
}

.main-menu>li>a {
    display: block;
    padding: 14px 8.2%;
    color: #a2aab2;
}
.main-menu>li>a:hover {
  color: #fff;
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
.icon-department::before {
    background: url(./assets/images/1.png) 0px 2px no-repeat;
}

.icon-post::before {
  background: url(./assets/images/2.png) 0px 2px no-repeat;
}

.icon-employee::before {
  background: url(./assets/images/3.png) 0px 2px no-repeat;
}

.icon-probation::before {
  background: url(./assets/images/4.png) 0px 2px no-repeat;
}

.icon-promote::before {
  background: url(./assets/images/5.png) 0px 2px no-repeat;
}

.icon-transfer::before {
  background: url(./assets/images/6.png) 0px 2px no-repeat;
}

.icon-holiday::before {
  background: url(./assets/images/7.png) 0px 2px no-repeat;
}

.icon-dismiss::before {
  background: url(./assets/images/8.png) 0px 2px no-repeat;
}

.icon-service::before {
    background: url(./assets/images/9.png) 0px 5px no-repeat;
}
.icon-arrow::before {
    background: url(./assets/images/11.png) 0px 1px no-repeat;
}
.icon-menu::before {
    background: url(./assets/images/12.png) 0px 1px no-repeat;
}
.icon-loginout::before {
    background: url(./assets/images/13.png) 0px 1px no-repeat;
}

.page-footer {
    width: 100%;
    margin-top: 70px;
}

.page-footer ul {
    width: 100%;
    text-align: center;
}

.person {
    font-size: 1.1em;
    color: #D8D8D8;
    margin-bottom: 4px;
}

.time {
    font-size: 0.875em;
    color: #777;
}

.logout {
    font-size: 0.875em;
    margin: 10px 0 15px 0;
}

.logout a {
    color: #F68271;
}

.version {
    color: #777777;
    font-size: 0.9em;
}

.home {
    margin-top: 25px;
}
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
    background-color: #F68271;
}

.page-simple a {
    display: block;
    background: url(./assets/images/8.png) center center no-repeat;
    height: 47px;
}

.main-container {
    width: 85.4%;
    min-height: 560px;
    
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
  height: 70px;
  line-height: 70px;
  font-size: 16px;
  color: #858585;
  padding-left: 24px;
}
.color {
    color: #F9AA9E!important;
}
.color>span.level2{
    color:#858585;
}
.page-footer > ul > li:first-child > img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}
.mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    background: rgba(0, 0, 0, .5);
    z-index: 999;
}
/* .l-enter-active, .l-leave-active {
  transition: all .5s;
}
.l-enter, .l-leave-to {
  left: -200px;
}
.r-enter-active, .r-leave-active {
  transition: all .5s;
}
.r-enter, .r-leave-to {
  width: 100%;
} */
</style>
