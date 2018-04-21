<template>
  <div>
    <div class="main-content">
      <ul class="nav-left">
        <router-link to="applist" tag="li">应用列表</router-link>
        <router-link to="download" tag="li">已下载</router-link>
      </ul>
      <div class="nav-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
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
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
    line-height: 36px;
    color: #fff;
    cursor: pointer;
    background: #ccc;
}
.nav-left > li.in {
    background: rgb(246, 130, 113);
}
</style>