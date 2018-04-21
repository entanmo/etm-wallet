<template>
  <div class="w">
    <!-- info -->
    <p class="name">受托人基本信息<span class="btn">未开启</span><span class="btn" @click="showPopout">注册受托人</span></p>
    <div class="info">
        <ul class="flex">
            <li>
              <p>总收益</p>
              <p>44444</p>
            </li>
            <li>
              <p>排名</p>
              <p>4</p>
            </li>
            <li>
              <p>生产率</p>
              <p>V1.4</p>
            </li>
            <li>
              <p>得票率</p>
              <p>5.4%</p>
            </li>
        </ul>
    </div>
    <!-- table -->
    <p class="name" style="margin-top:26px;">生产的区块</p>
    <!-- table -->
      <el-table :data="tableData" style="width: 100%;">
      <el-table-column
        prop="date"
        label="高度">
      </el-table-column>
      <el-table-column
        prop="name"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="name"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="name"
        label="交易">
      </el-table-column>
      <el-table-column
        prop="name"
        label="金额">
      </el-table-column>
      <el-table-column
        prop="name"
        label="费用">
      </el-table-column>
      <el-table-column
        prop="name"
        label="奖励">
      </el-table-column>
      </el-table>
    <div class="popout" v-show="showPop">
      <div class="close"><span @click="hidePopout">×</span></div>
      <p class="title">注册为受托人</p>
      <div class="input">
        <label>受托人名称：</label>
        <input type="text" placeholder="请输入名称">
      </div>
      <div class="confirm"><button>提交</button></div>
      <p class="tip">注册需支付100Mole</p>
    </div>
    
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      showPop: false,
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  },
  methods: {
    showPopout() {
      this.showPop = true
      Bus.$emit('showMask', true)
    },
    hidePopout() {
      this.showPop = false
      Bus.$emit('showMask', false)
    }
  }
}
</script>

<style scoped>
.w {
    padding: 0 24px;
}
.name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.w .btn {
  display: inline-block;
  margin-left: 20px;
  font-size: 14px;
  font-weight: normal;
  color: #fff;
  width: 140px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  background: #169bd5;
  border-radius: 3px;
  cursor: pointer;
}
/*主要信息*/
.info {
  width: 100%;
  height: 100px;
  line-height: 100px;
  background: #fff;
  border-radius: 3px;
  padding-top: 20px;
  box-sizing: border-box;
}
.info ul {
  height: 100%;
}
.info li {
  width: 33.3%;
  height: 100%;
  text-align: center;
  line-height: 30px;
}
.info li > p {
  border-right: 1px solid #e9e9e9;
}
.info li:last-child > p {
  border-right: 0;
}
.info li > p:first-child {
  color: #8d8d8d;
  font-size: 14px;
}
.info li > p:last-child {
  color: #4b4b4b;
  font-size: 24px;
}
/*弹框*/
.popout {
  width: 560px;
  height: 300px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  z-index: 1000;
}
.close {
  font-size: 36px;
  text-align: right;
}
.close span {
  display: inline-block;
  width: 47px;
  text-align: center;
  cursor: pointer;
}
.title {
  font-size: 26px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 20px 0;
}
.popout .input label {
  display: inline-block;
  width: 160px;
  text-align: right;
  color: #343434;
  font-weight: bold;
}
.popout .input input {
  width: 240px;
  height: 32px;
  border: 1px solid #d9d9d9;
  padding-left: 10px;
  border-radius: 3px;
}
.popout .confirm {
  text-align: center;
  margin: 20px 0;
}
.popout .confirm button {
  width: 64px;
  height: 40px;
  background: #169bd5;
  border-radius: 6px;
  color: #fff;
  line-height: 40px;
}
.popout .tip {
  text-align: center;
}
</style>