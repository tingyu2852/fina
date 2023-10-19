<template>
  <div>
    下款信息
    <el-table 
                style="margin-top: 16px;"
                row-class-name="active-contnet" 
                header-cell-class-name='active-header'  
                :stripe="true"   
                :data="mtList" 
                border
              >
                <el-table-column label="下款时间" >
                  <template slot-scope="{ row }">
                    <span>{{ str_contet(row.mt_date) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="下款金额" >
                  <template slot-scope="{ row }">
                    <span>{{ str_contet($format.money(row.mt_sum)) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="下款项目" >
                  <template slot-scope="{ row }">
                    <el-tag
                      style="margin-left: 5px; margin-bottom: 5px"
                      type="primary"
                      v-for="item in row.sub_project_list"
                      :key="item"
                      effect="dark"
                      >{{ item }}</el-tag
                    >
                  </template>
                </el-table-column>
                <el-table-column label="截止日期" >
                  <template slot-scope="{ row }">
                    <span>{{ str_contet(row.start_end_date) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="匹配资本金">
                  <template slot-scope="{ row }">
                    <div class="custom-table-btn-wrap">
                      <div class="edit-custom-table-btn"  @click="showMaching(row)"><i style="padding-right: 3px" class="el-icon-view"></i>查看</div>
                    </div>
                    <!-- <el-button
                      type="primary"
                      size="mini"
                      @click="showMaching(row)"
                      >查看</el-button
                    > -->
                  </template>
                </el-table-column>
                <el-table-column label="备注">
                  <template slot-scope="{ row }">
                    <div style="white-space: pre-line">{{ row.remark }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="200">
                  <template slot-scope="{ row }">
                    <div class="custom-table-btn-wrap">
                      <div class="edit-custom-table-btn"><i style="padding-right: 3px" class="el-icon-more"></i>走款信息</div>
                      <div v-show="info_status" class="edit-custom-table-btn"  ><i class="el-icon-edit"></i>编辑</div>
                      <div v-show="info_status" class="delete-custom-table-btn"  ><i class="el-icon-delete"></i>删除</div>
                    </div>
                    
                  </template>
                </el-table-column>
              </el-table>
              <el-button type="primary" @click="$emit('stepNext',5)"
          >下一步</el-button
        >
  </div>
</template>

<script>
export default {
    name:'enterLoan',
    data(){
        return {
            mtList:[]
        }
    }
}
</script>

<style>

</style>