<template>
  <div>
    借款信息
    <el-table :data="loanInfo">
      <el-table-column label="借款金额" prop="loan_sum"></el-table-column>
      <el-table-column label="提交时间" prop="loan_date"></el-table-column>
      <el-table-column label="付息" prop="inter_plan"></el-table-column>
      <el-table-column label="是否浮动利率" prop="is_float"></el-table-column>
      <el-table-column label="基准利率" prop="rate"></el-table-column>
      <el-table-column label="子项目" prop="sub_project_list"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
    </el-table>
    <el-button type="primary" @click="$emit('stepNext',4)"
          >下一步</el-button
        >
  </div>
</template>

<script>
export default {
    name:'enterLoan',
    data(){
        return {
            loanInfo:[
                {
                    loan_sum:10000,
                    loan_date:'2021-10-10',
                    inter_plan:'每月20日',
                    is_float:1,
                    rate:'5.145%',
                    sub_project_list:['1','2','3'],
                    remark:'无'
                }
            ]
        }
    }
}
</script>

<style>

</style>