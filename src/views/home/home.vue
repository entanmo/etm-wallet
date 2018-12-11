<template>
  <a-layout id="components-layout-trigger">
    <drawer v-if="isMobile"  :openDrawer.sync="collapsed" :showHandler="showHandler">
      <sider-menu ></sider-menu>
    </drawer>
      <sider-menu v-else :collapsed="collapsed" ></sider-menu>

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => collapsed =!collapsed"
        />
        <a-icon class="trigger logout" :title="$t('router.loginOutTitle')" @click="logout" type="logout"/>
        <a-button size="small" @click="changeLang"  class="lang">{{ lang_text }}</a-button>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', paddingTop: '0', minHeight: '100vh' }">
        <div class="main-title">
          {{title}}
        </div>
        <transition name="page-toggle">
           <router-view/>
        </transition>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {mapActions} from 'vuex'
import {setup} from '@/lang'
import drawer from '@/components/drawer/drawer'
import siderMenu from '@/components/sider-menu/sider-menu'
export default {
  data () {
    return {
      collapsed: false,
      title: '',
      language: '',
      lang: '',
      phone: true,
      showHandler: true
    }
  },
  created () {
    this.title = i18n.t('router.' + this.$route.meta.title)
    this.language = sessionStorage.getItem('localeLanguage')
    this.lang = this.language !== 'en_GB'
  },
  computed: {
    lang_text () {
      return this.language === 'en_GB' ? '中文' : 'English'
    },
    isMobile () {
      return this.$store.state.user.isMobile
    }
  },
  watch: {
    '$route' (to, from) {
      this.title = i18n.t('router.' + to.meta.title)
    }
  },
  methods: {
    ...mapActions([
      'loginOut'
    ]),
    async logout () {
      await this.loginOut()
      this.$message.success(i18n.t('router.tip_success'))
      setTimeout(() => {
        location.reload()
      }, 500)
    },
    changeLang () {
      this.lang = !this.lang
      this.language = this.lang ? 'zh_CN' : 'en_GB'
      setup(this.language)
      location.reload()
    }
  },
  components: {
    drawer,
    'sider-menu': siderMenu
  }
}
</script>
<style scoped>
#components-layout-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

#components-layout-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-trigger .logout{
  float: right;
}
#components-layout-trigger .lang{
  float: right;
  margin-top: 20px;
}
.main-title{
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #858585;
  margin-bottom: 14px;
}

</style>
