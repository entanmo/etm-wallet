<template>
  <div class="w">
    <!-- table -->
      <el-table :data="tableData" style="width: 100%;">
      <el-table-column
        prop="date"
        label="图标">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="name"
        label="应用描述">
      </el-table-column>
      <el-table-column
        prop="name"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="name"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="name"
        label="余额详情">
      </el-table-column>
      <el-table-column
        prop="name"
        label="源码">
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
  padding: 10px;
}
</style>