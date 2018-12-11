<template>
    <a-layout-sider class="etm-side"
      :trigger="null"
      collapsible
      v-model="collapsed"
    >
      <div ref="login" class="logo" />

      <a-menu theme="dark" mode="inline"  >
        <router-link class="ant-menu-item" role="menuitem" tag="li" exact to="/home">
            <a-icon type="home" />
            <span>{{$t("router.home")}}</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/person">
            <a-icon type="user" />
            <span>{{$t("router.person")}}</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/block-production">
            <a-icon type="line-chart" />
            <span>{{$t("router.block_production")}}</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/block-scan">
            <a-icon type="scan" />
            <span>{{$t("router.block_scan")}}</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/vote">
             <a-icon type="like-o" />
            <span>{{$t("router.vote")}}</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/transfer">
            <a-icon type="pay-circle-o" />
            <span>{{$t("router.transfer")}}</span>
        </router-link>
        <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/application">
            <a-icon type="appstore" />
            <span>{{$t("router.app")}}</span>
        </router-link>
        <!-- <router-link  class="ant-menu-item" role="menuitem" tag="li"  to="/miners-list">
            <a-icon type="pie-chart" />
            <span>SCV矿工列表</span>
        </router-link> -->
      </a-menu>
    </a-layout-sider>
</template>
<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
.etm-side{
 -webkit-box-shadow: 2px 0 6px rgba(0,21,41,.35);
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
    min-height: 100vh;
    position: relative;
    z-index: 10;
}
.logo {
  height: 32px;
  background: url("../../assets/images/logo-white.png") no-repeat;
  margin: 16px 0;
}
#components-layout-trigger .ant-layout-sider-collapsed .logo{
    background-image: url('../../assets/images/logoWithoutText.png');
    margin-left: 16px

}
</style>
