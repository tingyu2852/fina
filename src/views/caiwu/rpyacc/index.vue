<template>
  <div>
    <el-table :data="tableData" :expand-row-keys="expandedRows">
  <!-- 表格列定义 -->
</el-table>
  </div>
</template>

<script>
export default {
  data() {
    
  return {
    tableData: [{},{}
      // 表格数据
    ],
    expandedRows: [] // 控制展开行显示隐藏的数组
  }
}
}
</script>

<style>

</style>
<!-- <el-table-column type="expand" width="1">
  <template slot-scope="props">
    <el-form
      label-position="left"
      inline
      class="demo-table-expand"
      id="asd"
    >
      <el-row :gutter="5">
        <div v-if="curck == 'sx'">
          <el-col :span="8">
            <el-form-item label="授信种类：">
              <span>测试</span>
            </el-form-item></el-col
          >
          <el-col :span="8">
            <el-form-item label="批复金额">
              <span>123456</span>
            </el-form-item></el-col
          >
          <el-col :span="8"
            ><el-form-item label="批复文件">
              <el-button type="primary" size="mini">下载</el-button>
            </el-form-item></el-col
          >
          <el-col :span="8">
            <el-form-item label="融资费用名称">
              <span>测试</span>
            </el-form-item></el-col
          >
          <el-col :span="8"
            ><el-form-item label="融资支付时间">
              <span>测试</span>
            </el-form-item></el-col
          >
          <el-col :span="8"
            ><el-form-item label="融资金额">
              <span>测试</span>
            </el-form-item></el-col
          >
          <el-col :span="8"
            ><el-form-item label="融资备注">
              <span>测试</span>
            </el-form-item></el-col
          >
          <el-col :span="8"
            ><el-form-item label="第一担保">
              <span>测试</span>
            </el-form-item></el-col
          >
          <el-col :span="8"
            ><el-form-item label="担保金额">
              <span>测试</span>
            </el-form-item></el-col
          >
          <el-col :span="8"
            ><el-form-item label="担保费率">
              <span>测试</span>
            </el-form-item></el-col
          >
          <el-col :span="8">
            <el-form-item label="担保方式">
              <span>测试</span>
            </el-form-item></el-col
          >
          <el-col :span="8"
            ><el-form-item label="担保文件">
              <el-button type="primary" size="mini">下载</el-button>
            </el-form-item></el-col
          >
        </div>
        <div v-if="curck == 'hk'">
          <el-col :span="8"
            ><el-form-item label="还款来源">
              <span>测试</span>
            </el-form-item></el-col
          >
          <el-col :span="8"
            ><el-form-item label="还款期限">
              <span>测试</span>
            </el-form-item></el-col
          >
          <el-col :span="8"
            ><el-form-item label="借款合同">
              <span>测试</span>
            </el-form-item></el-col
          >
          <el-col :span="8">
            <el-form-item label="还本计划">
              <span>测试</span>
            </el-form-item></el-col
          >
        </div>
        <div v-if="curck == 'sx'">
          <el-col :span="8"></el-col>
          <el-col :span="8"></el-col>
        </div>
      </el-row>
    </el-form>
  </template>
</el-table-column> -->