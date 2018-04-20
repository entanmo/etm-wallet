<template>
  <div class="w">
    <div class="info">
        <ul class="flex">
            <li>
              <p>我的余额</p>
              <p>44444 Mole</p>
            </li>
            <li>
              <p>最后出块高度</p>
              <p>35346456</p>
            </li>
            <li>
              <p>版本信息</p>
              <p>V1.4</p>
            </li>
        </ul>
    </div>
    <div class="transaction">
      <p>交易记录</p>
      <!-- table -->
      <el-table :data="tableData" style="width: 100%;">
      <el-table-column
        prop="date"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="name"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="name"
        label="发送者">
      </el-table-column>
      <el-table-column
        prop="name"
        label="接收者">
      </el-table-column>
      <el-table-column
        prop="name"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="name"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="name"
        label="金额">
      </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
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
  }
}
</script>

<style scoped>
.w {
    padding: 0 24px;
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
/*交易记录*/
.transaction {
  margin-top: 20px;
}
.transaction p {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>


