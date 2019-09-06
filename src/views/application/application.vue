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
                    <a href="http://epony.cn/" target='_blank' slot="actions">{{$t('application.app.btn01')}}</a>
                    <a slot="actions">{{$t('application.app.btn02')}}</a>
                    <a slot="actions">{{$t('application.app.btn03')}}</a>
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
export default {
  data () {
    return {
      dataSource: [
        {
          title: i18n.t('application.app.title'),
          avatar: 'static/epony.png',
          content: i18n.t('application.app.content')
        }, {}
      ],
      tableData: []
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
  height: 500px;
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
