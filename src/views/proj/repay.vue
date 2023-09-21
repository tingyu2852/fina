<template>
  <div>
    <div>
      <el-button
        type="primary"
        plain
        size="mini"
        style="margin-bottom: 10px"
        @click="addRepay"
        >新增</el-button
      >
      <el-table :data="repayList" border v-loading="lodaing">
        <el-table-column label="日期">
          <template slot-scope="{ row }">
          <el-date-picker
            v-if="!row.date"
              v-model="row.date"
              type="date"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          
            <div v-else>
              {{ row.date }}
            </div>
            
          </template>
        </el-table-column>
        <el-table-column label="金额">
          <template slot-scope="{ row }">
            <div v-if="!row.isEdit">
              {{  $format.money(row.repay_plan)}}
            </div>
            <el-input
              v-else
              v-model="row.repay_plan"
              type="number"
              placeholder="请填写金额"
            ></el-input>
          </template>
        </el-table-column>

        <el-table-column label="备注">
          <template slot-scope="{ row }">
            <div v-if="!row.isEdit">
              {{ row.remark ? row.remark : "无" }}
            </div>
            <el-input
              v-else
              v-model="row.remark"
              type="textarea"
              placeholder="请填写备注（可不填）"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="{ row }">
            <el-button
              v-show="!row.isEdit"
              type="primary"
              size="mini"
              icon="el-icon-edit-outline"
              @click="$set(row, 'isEdit', true)"
            ></el-button>
            <el-button
              v-show="row.isEdit"
              type="primary"
              size="mini"
              icon="el-icon-check"
              @click="repaySave(row)"
            ></el-button>

            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @onConfirm="delInter(row)"
            >
              <el-button
                v-show="!row.isEdit"
                type="danger"
                size="mini"
                icon="el-icon-delete"
                slot="reference"
                style="margin-left: 10px"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        :current-page="current"
        :page-size="5"
        @current-change="curchange"
        :layout="'prev, pager, next, jumper, ->, total'"
      ></el-pagination>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "Interest",
  data() {
    return {
      lodaing: true,
      repayList: [],
      loan_id: 0,
      current: 1,
      total: 0,
    };
  },
  methods: {
    async getRepayList(loan_id) {
      this.loan_id = loan_id;
      this.lodaing = true;
      let res = await this.$API.fina.getRepay(loan_id, this.current, 5);
      this.repayList = res.data.repayList;
      this.total = res.data.total;
      this.repayList.forEach((item) => {
        this.$set(item, "isEdit", false);
      });
      this.lodaing = false;
    },
    async repaySave(row) {
      row.isEdit = false;
      row.loan_id = this.loan_id
      let res = await this.$API.fina.addRepay("one", row);
      this.getRepayList(this.loan_id);
    },
    async delInter(row) {
      await this.$API.fina.delRepay({repay_id:row.repay_id,loan_id:this.loan_id})
       this.getRepayList(this.loan_id)
       
    },
    curchange(cur) {
      this.current = cur;
      this.getRepayList(this.loan_id);
    },
    addRepay() {
      let obj = {
        date: null,
        repay_plan:null,
        remark:null,
        isEdit:true
      };
      this.repayList.unshift(obj);
    },
  },
};
</script>
  
  <style>
</style>