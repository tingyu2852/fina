<template>
  <div class="content-wrap">
    <div>
      <div class="custom-btn-wrap">
        <div class="add-custom-btn" @click="addRepay"><i class="el-icon-plus"></i>新增</div>
      </div>
      <!-- <el-button
        type="primary"
        plain
        size="mini"
        style="margin-bottom: 10px"
        @click="addRepay"
        >新增</el-button
      > -->
      <el-table 
        style="margin-top: 12px;"
        row-class-name="active-contnet" 
        header-cell-class-name='active-header'  
        :stripe="true"   
        :data="repayList" 
        v-loading="lodaing"
        border
      >
        <el-table-column label="日期">
          <template slot-scope="{ row }">
            <el-date-picker
              v-if="row.isEdit"
              v-model="row.date"
              type="date"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
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
              {{ $format.money(row.repay_plan) }}
            </div>
            <el-input
              v-else
              v-model="row.repay_plan"
              @input="row.repay_plan = $format.formatInput(row.repay_plan)"
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
        <el-table-column label="操作" min-width="60px">
          <template slot-scope="{ row }">
            <div class="custom-table-btn-wrap">
              <div v-show="row.isEdit" class="save-custom-table-btn"  @click="repaySave(row)"><i class="el-icon-document-checked"></i>保存</div>
              <div v-show="!row.isEdit" class="edit-custom-table-btn"    @click="repayEdit(row)"><i class="el-icon-edit"></i>编辑</div>
              <div v-show="!row.isEdit" class="delete-custom-table-btn"  @click="delInter(row)" ><i class="el-icon-delete"></i>删除</div>
            </div>
            <!-- <el-button
              v-show="!row.isEdit"
              type="primary"
              size="mini"
              icon="el-icon-edit-outline"
              @click="repayEdit(row)"
            ></el-button>
            <el-button
              v-show="row.isEdit"
              type="primary"
              size="mini"
              icon="el-icon-check"
              @click="repaySave(row)"
            ></el-button>

            <el-popconfirm
              title="这一段内容确定删除吗？"
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
            </el-popconfirm> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="text-align: right; margin-top: 20px">
        <el-pagination 
          style="margin: auto"
          background
          :total="total" 
          :current-page="current" 
          :page-size="size" 
          @current-change="curchange" 
          :layout="'prev, pager, next, jumper, ->, total'">
        </el-pagination>
      </div>
      <!-- <el-pagination
        :total="total"
        :current-page="current"
        :page-size="size"
        @current-change="curchange"
        @size-change="sizeChange"
        :layout="'prev, pager, next, jumper,sizes, ->, total'"
      ></el-pagination> -->
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
      size:10,
      sizes:[10,20,50,100],
      pickerOptions: {
        disabledDate: (time) => {
          //console.log(this.loanInfo.limit);
          let date = this.$dayjs(this.loanInfo.date).valueOf();
          let end = this.$dayjs(this.loanInfo.date)
            .add(this.loanInfo.limit, "month")
            .valueOf();
          // console.log(dayjs(end).format('YYYY-MM-DD'));
          // console.log(time.getTime());
          return time.getTime() < date || time.getTime() > end;
        },
      },
    };
  },
  props: {
    loanInfo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async getRepayList(loan_id) {
      this.loan_id = loan_id;
      this.lodaing = true;
      let res = await this.$API.fina.getRepay(loan_id, this.current, this.size);
      this.repayList = res.data.repayList;
      this.total = res.data.total;
      this.repayList.forEach((item) => {
        this.$set(item, "isEdit", false);
      });
      this.lodaing = false;
    },
    async repaySave(row) {
      row.isEdit = false;
      row.loan_id = this.loan_id;
      
         let form = {...row}
        form.repay_plan = form.repay_plan.substring(1).replace(/,/g, "")
        
        
      let res = await this.$API.fina.addRepay("one", form);
      this.getRepayList(this.loan_id);
      this.$emit('getinfo',this.loan_id)
    },
    repayEdit(row){
      row.repay_plan = this.$format.money(row.repay_plan)
      //$set(row, 'isEdit', true)
      row.isEdit = true
    },
    async delInter(row) {
      await this.$API.fina.delRepay({
        repay_id: row.repay_id,
        loan_id: this.loan_id,
        date: row.date,
      });
      this.getRepayList(this.loan_id);
    },
    curchange(cur) {
      this.current = cur;
      this.getRepayList(this.loan_id);
    },
    addRepay() {
      let obj = {
        date: null,
        repay_plan: '',
        remark: null,
        isEdit: true,
      };
      this.repayList.unshift(obj);
    },
    sizeChange(size){
      this.size = size
      this.getRepayList(this.loan_id);
    }
  },
};
</script>
  
  <style>
</style>