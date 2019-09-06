<template>
  <div class="assets">
    <a-row>
      <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24" style="padding-right:12px;">
          <a-card :bordered="false" title="我发行的资产" :body-style="{padding: 0}">
          <a slot="extra"><a-button type="primary" @click="registeredAssets">注册资产</a-button></a>
          <div class="table">
            <div>
              <a-table :rowSelection="rowSelection"
                :rowKey="record => record.address"
                :columns="columns"
                :dataSource="data"
                :pagination="pagination"
                :loading="loading"
                :scroll="{ x: 800 }"
                @change="handleTableChange"
                >
                <template slot="productivity" slot-scope="text,record">
                  {{record.productivity}}%
                </template>
                </a-table>
            </div>
              <no-data v-show="nodata"></no-data>
          </div>
          </a-card>
      </a-col>
      <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24" style="padding-left:12px;">
        <a-card :bordered="false" title="注册发行商" :body-style="{padding: 0}">
          <div class="publish">
            <p>您还不是发行商</p>
            <a-button type="primary" @click="() => visible = true">成为发行商</a-button>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <!-- 注册发行商 -->
    <a-modal
      title="注册发行商"
      v-model="visible"
      :destroyOnClose=true
    >
    <template slot="footer">
      <div class="detail-foot">
        <a-button style="marginRight:10px" @click="cancel">取消</a-button>
        <a-button  type="primary" @click="handleOk">同意</a-button>
      </div>
    </template>
      <div class="agreement">
        <div class="content">
          <h3>用户协议</h3>
          <p>用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内</p>
        </div>
        <div class="footer-content">
          <a-checkbox @change="onChange">我同意</a-checkbox>
          <span class="explan">注册发行商将消耗100 ETM</span>
        </div>

      </div>
    </a-modal>

    <a-modal
      title="注册发行商"
      :destroyOnClose=true
      v-model="visible1"
    >
    <template slot="footer">
      <div class="detail-foot">
        <a-button style="marginRight:10px" @click="cancel">取消</a-button>
        <a-button  type="primary" @click="submitOk">提交</a-button>
      </div>
    </template>
    <div>
      <a-form :form="form">
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="名称"
        >
        <a-input type="text"
          v-decorator="[
            'name',
            {rules: [{ required: true,max:16, message: '名称只能为数字和字母的16位组合',whitespace: true }]}
          ]"
        placeholder="请输入数字和字母的16位组合发行商名称" />
        </a-form-item>
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="简介"
        >
        <a-input type="text"
        v-decorator="[
          'confirm_password',
          {rules: [{ required: true, message :'请输入内容，长度在500字符长度以内',whitespace: true }]}
        ]"
        placeholder="请输入发行商简介" />
        </a-form-item>
      </a-form>
    </div>
    </a-modal>
    <!-- 注册资产 -->
    <a-modal
      title="注册资产"
      :destroyOnClose=true
      v-model="visible2"
    >
    <template slot="footer">
      <div class="detail-foot">
        <a-button style="marginRight:10px" @click="cancel">取消</a-button>
        <a-button  type="primary" @click="submitOk1">提交</a-button>
      </div>
    </template>
    <div>
      <a-form :form="form">
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="名称"
        >
        <a-input type="text"
          v-decorator="[
            'name',
            {rules: [{ required: true,max:16, message: '最多五个英文字符',whitespace: true }]}
          ]"
        placeholder="请输入五个英文字符组合名称" />
        </a-form-item>
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="简介"
        >
        <a-input type="text"
        v-decorator="[
          'confirm_password',
          {rules: [{ required: true, message :'请输入内容，长度在500字符长度以内',whitespace: true }]}
        ]"
        placeholder="请输入发行商简介" />
        </a-form-item>
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="发行上限"
        >
        <a-input type="text"
        v-decorator="[
          'confirm_password',
          {rules: [{ required: true, message :'发行总量，不可增发',whitespace: true }]}
        ]"
        placeholder="请输入发行上限" />
        </a-form-item>
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="精度"
        >
        <a-input type="text"
        v-decorator="[
          'confirm_password',
          {rules: [{ required: true, message :'0~16位小数',whitespace: true }]}
        ]"
        placeholder="请输入精度" />
        </a-form-item>
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="策略"
        >
        <a-input type="text"
        v-decorator="[
          'confirm_password',
          {rules: [{ required: false, message :'1111',whitespace: true }]}
        ]"
        placeholder="请输入释放车略" />
        </a-form-item>
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="附加功能"
        >
        <div class="footer-content">
          <a-checkbox v-model="whitelist">白名单</a-checkbox>
          <a-checkbox v-model="blacklist">黑名单</a-checkbox>
          <a-checkbox v-model="logout">注销</a-checkbox>
        </div>
        </a-form-item>
      </a-form>

    </div>
    </a-modal>

    <a-modal
    v-model="visible3"
    >
      <template slot="footer">
      <div class="detail-foot">
        <a-button  type="primary" @click="() => visible3 = false">确定</a-button>
      </div>
    </template>
    <a-icon type="check-circle" />
    </a-modal>
  </div>
</template>
<script>
import noData from '@/components/nodata/nodata'
import {transactionSigned} from '@/api/trs.js'
import {mapState} from 'vuex'
const columns = [{
  title: '资产名称',
  dataIndex: 'rate'
}, {
  title: '最大发行量',
  dataIndex: 'username'
}, {
  title: '精度',
  dataIndex: 'address'
}, {
  title: '当前存量',
  dataIndex: 'vote'
}, {
  title: '日期',
  dataIndex: 'producedblocks'
}, {
  title: '白名单',
  dataIndex: 'productivity'
}, {
  title: '黑名单',
  dataIndex: 'productivity'
}, {
  title: '注销',
  dataIndex: 'productivity'
}, {
  title: '发行',
  dataIndex: 'productivity'
}]
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      columns,
      data: [],
      pagination: {
        defaultPageSize: 10, // 每页个数
        current: 1,
        pageSize: 10
      },
      loading: false,
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      checked: false,
      whitelist: false,
      blacklist: false,
      logout: false,
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 16
      }
    }
  },
  created () {

  },
  computed: {
    ...mapState({
      secret: state => state.user.secret
    })
  },
  methods: {
    async aaa () {
      const params = {type: 9, secret: this.secret, secondSecret: '234', fee: 10000000000, name: 'aaa', desc: 'bbb'}
      const result = await transactionSigned(params)
      console.log(result)
    },
    handleTableChange () {

    },
    cancel () {
      this.visible = false
    },
    handleOk () {
      if (this.checked) {
        this.visible = false
        this.visible1 = true
      } else {
        this.$message.error('111')
      }
    },
    submitOk (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
        }
      })
    },
    onChange (e) {
      this.checked = e
    },
    registeredAssets () {
      this.visible2 = true
    }
  },
  components: {
    noData
  }
}
</script>

<style lang="less" scoped>
  .assets{
    .publish{
      text-align: center;
      padding-top: 60px;
      height: 400px;
      p{
        font-size: 18px;
      }
    }
  }
  .agreement{
    .content{
      height: 200px;
      overflow-y: scroll;
      h3{
        text-align: center;
      }

    }
    .footer-content{
      margin-top: 10px;
      .explan{
        float: right;
      }
    }
  }
</style>
