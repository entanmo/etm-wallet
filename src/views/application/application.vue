<template>
  <div class="application">
    <a-tabs defaultActiveKey="1" >
      <a-tab-pane :tab="$tc('application.app_list',1)" key="1">
        <div class="tab">
          <div class="card-list">
            <a-list
              :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
              :dataSource="dataSource"
            >
              <a-list-item slot="renderItem" slot-scope="item, index">
                <template v-if="!item.title">
                  <a-button class="new-btn" type="dashed">
                    <a-icon type="plus" />  {{$t('application.create_new')}}
                  </a-button>
                </template>
                <template v-else>
                  <a-card :hoverable="true">
                    <a-card-meta >
                      <div class="title" style="margin-bottom: 3px" slot="title">{{item.title}}</div>
                      <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="large" />
                      <div class="meta-content" :title="item.content" slot="description">{{item.content}}</div>
                    </a-card-meta>
                    <a href="javascript:;" @click="link(item.href)"  slot="actions">{{item.enter}}</a>
                    <a href="javascript:;" @click="link(item.recharge)" slot="actions">{{$t('application.app01.btn02')}}</a>
                    <a href="javascript:;" @click="link(item.withdraw)" slot="actions">{{$t('application.app01.btn03')}}</a>
                  </a-card>
                </template>
              </a-list-item>
            </a-list>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane :tab="$tc('application.app_list',0)" key="2" forceRender>
        <div class="tab">
          <no-data v-show="!tableData.length"></no-data>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import noData from '@/components/nodata/nodata'
import {loginDapp} from '@/api/funds'
import {mapState} from 'vuex'
import Vue from 'vue'
import {Avatar, List} from 'ant-design-vue'
Vue.use(Avatar)
Vue.use(List)

export default {
  data () {
    return {
      dataSource: [
        {
          title: i18n.t('application.app01.title'),
          href: 'http://epony.cn/',
          enter: i18n.t('application.app01.btn01'),
          avatar: 'static/epony.png',
          content: i18n.t('application.app01.content')
        }, {
          title: i18n.t('application.app02.title'),
          href: 'http://47.111.165.42:8088/#/',
          enter: i18n.t('application.app02.btn01'),
          withdraw: 'http://47.111.165.42:8088/#/withdraw',
          recharge: 'http://47.111.165.42:8088/#/recharge',
          avatar: 'static/shop.png',
          content: i18n.t('application.app02.content')
        }, {}
      ],
      tableData: []
    }
  },
  computed: {
    ...mapState({
      secret: state => state.user.secret || '',
      address: state => state.user.accountInfo.address || ''
    })
  },
  methods: {
    async link (href) {
      try {
        const result = await loginDapp({secret: this.secret, address: this.address})
        if (result && result.data.errno === 0) {
          let token = result.data.data.token
          window.location.href = href + '?token=' + token
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: {
    'no-data': noData
  }
}
</script>
<style lang="less" scoped>
.application{
  background: #fff;
  padding: 10px;
  min-height: 600px;
  .tab{
  position: relative;
  min-height: 500px;
  }
}
.card-list{
  .ant-card:hover{
    .title {
      color: #40a9ff
    }
  }
  .title{
    transition: color .3s;
  }
  .card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 48px;
  }
  .new-btn{
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 188px;
  }
  .meta-content{
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 64px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
</style>
