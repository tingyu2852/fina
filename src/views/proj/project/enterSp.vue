<template>
  <div>
    走款信息
    <el-table
          style="margin-top: 12px;"
          row-class-name="active-contnet" 
          header-cell-class-name='active-header'  
          :stripe="true"    
          :data="spList"
          border
        >
          <el-table-column label="收款单位" prop="corp_name"></el-table-column>
          <el-table-column label="走款时间" prop="sp_date"></el-table-column>
          <el-table-column label="走款金额" prop="sp_num">
            <template slot-scope="{ row }">
              <div>
                {{ $format.money(row.sp_num) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="回款金额" prop="refund">
            <template slot-scope="{ row }">
              <div>
                {{ $format.money(row.refund) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="实际支付金额"
            prop="actul_num"
            min-width="100px"
          >
            <template slot-scope="{ row }">
              <div>
                {{ $format.money(row.actul_num) }}
              </div>
            </template></el-table-column
          >
          <el-table-column label="用途" prop="sp_use"></el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
          <el-table-column label="操作" prop="remark" min-width="140px">
            <template slot-scope="{ row }">
              <div class="custom-table-btn-wrap">
                <div class="edit-custom-table-btn"  ><i class="el-icon-edit"></i>编辑</div>
                <div  class="delete-custom-table-btn"   ><i class="el-icon-delete"></i>删除</div>
              </div>
             
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="$emit('stepNext',0)"
          >完成</el-button
        >
  </div>
</template>

<script>
export default {
    name:'enterSp',
    data() {
        return {
            spList:[]
        }
    },
}
</script>

<style>

</style>