<template>
  <div class="w">
    <p class="title">节点列表</p>
    <!-- table -->
      <el-table :data="tableData" style="width: 100%;">
      <el-table-column
        prop="date"
        label="IP">
      </el-table-column>
      <el-table-column
        prop="name"
        label="版本">
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作系统">
      </el-table-column>
      </el-table>
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
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>