<template>
  <div class="custom-dialog-table-body">
    <div v-loading="lodaing">
      <div v-show="!switchover">
        <div class="custom-btn-wrap">
          <div class="add-custom-btn" @click="addPlan"><i class="el-icon-plus"></i>新增</div>
          <div class="add-custom-btn" @click="switchover = 1"><i class="el-icon-plus"></i>快速生成</div>
        </div>
        <!-- <el-button
          type="primary"
          size="mini"
          style="margin-bottom: 10px"
          @click="addPlan"
          >新增</el-button
        >
        <el-button
          type="primary"
          size="mini"
          style="margin-bottom: 10px"
          @click="switchover = 1"
          >快速生成</el-button
        > -->
        <div>
          <el-table 
            style="margin-top: 12px;"
            row-class-name="active-contnet" 
            header-cell-class-name='active-header'  
            :stripe="true"   
            :data="planList" 
            border
          >
            <el-table-column label="日期">
              <template slot-scope="{ row }">
                <div v-if="row.isEdit">
                  <el-date-picker
                    v-model="row.date"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                  >
                  </el-date-picker>
                </div>
                <div v-else>
                  {{ row.date }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="金额">
              <template slot-scope="{ row }">
                <div>
                  {{ $format.money(row.inter_actual) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160px">
              <template slot-scope="{ row, $index }">
                <div class="custom-table-btn-wrap">
                  <div v-show="row.isEdit" class="save-custom-table-btn"  @click="savePlan(row)"><i class="el-icon-check"></i>确定</div>
                  <div v-show="row.isEdit" class="cancle-custom-table-btn"   @click="planList.splice($index, 1)"><i class="el-icon-close"></i>取消</div>
                  <div v-show="!row.isEdit" class="delete-custom-table-btn"  @onConfirm="delPlan(row)" ><i class="el-icon-delete"></i>删除</div>
                </div>
                 <!--  <div>
                  <el-button
                    v-show="row.isEdit"
                    type="primary"
                    size="mini"
                    style="margin-bottom: 10px"
                    @click="savePlan(row)"
                    icon="el-icon-check"
                  ></el-button>
                  <el-button
                    v-show="row.isEdit"
                    type="info"
                    size="mini"
                    style="margin-bottom: 10px"
                    @click="planList.splice($index, 1)"
                    icon="el-icon-close"
                  ></el-button>

                 <el-popconfirm
                    title="确定删除吗？"
                    @onConfirm="delPlan(row)"
                    v-show="!row.isEdit"
                  >
                    <el-button
                      slot="reference"
                      type="danger"
                      size="mini"
                      style="margin-bottom: 10px"
                      icon="el-icon-delete"
                    ></el-button>
                  </el-popconfirm>
                </div> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div style="text-align: right; margin-top: 20px">
          <el-pagination 
            style="margin: auto"
            background
            :total="total" 
            :current-page="current" 
            :page-size="10" 
            @current-change="curchange" 
            :layout="'prev, pager, next, jumper, ->, total'">
          </el-pagination>
        </div>
        <!-- <el-pagination
          :total="total"
          :current-page="current"
          :page-size="12"
          @current-change="curchange"
          :layout="'prev, pager, next, jumper, ->, total'"
        ></el-pagination> -->
      </div>
      <div v-show="switchover">
        <el-button
          type="primary"
          size="mini"
          style="margin-bottom: 10px"
          @click="switchover = 0"
          >返回</el-button
        >
        <el-form :model="planForm">
          <el-form-item label="付息规则">
            <el-radio-group v-model="planForm.inter_radio">
              <el-radio :label="1">按月</el-radio>
              <el-radio :label="2">按季度</el-radio>
              <el-radio :label="3">按年</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="第一次结息时间">
            <el-date-picker
              v-model="planForm.startDate"
              placeholder="请选择"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <el-button
              type="primary"
              @click="saveFastPlan"
              size="mini"
              style="margin-left: 20px"
              >生成</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
const QuarterOfYear = require("dayjs/plugin/quarterOfYear");
//const isBefore = require('dayjs/plugin/isBefore')

dayjs.extend(QuarterOfYear);
export default {
  name: "interPlan",
  props: {
    loanInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      switchover: 0,
      lodaing: true,
      a: 1,
      loan_id: 0,
      current: 1,
      total: 0,
      planList: [],
      pickerOptions: {
        disabledDate: (time) => {
          //console.log(this.loanInfo.limit);
          let date = dayjs(this.loanInfo.date).valueOf();
          let end = dayjs(this.loanInfo.date)
            .add(this.loanInfo.limit, "month")
            .valueOf();
          // console.log(dayjs(end).format('YYYY-MM-DD'));
          // console.log(time.getTime());
          return time.getTime() < date || time.getTime() > end;
        },
      },
      planForm: {
        startDate: null,
        inter_radio: null,
      },
    };
  },
  methods: {
    //获取结息计划
    async getPlanList(loan_id) {
      this.loan_id = loan_id;
      this.lodaing = true;
      let res = await this.$API.fina.getPlan(loan_id, this.current, 12);
      this.planList = res.data.planList;
      this.total = res.data.total;
      this.planList.forEach((item) => {
        this.$set(item, "isEdit", false);
      });
      this.lodaing = false;
    },
    //更新结息计划
    async updatePlan(row) {
      await this.$API.fina.updatePlan("one", {
        loan_id: this.loan_id,
        date: row.date,
      });
      //setTimeout(async() => {
      await this.getPlanList(this.loan_id);
    },
    curchange(cur) {
      this.current = cur;
      this.getPlanList(this.loan_id);
    },
    //添加结息计划按钮
    addPlan() {
      let obj = {
        date: null,
        inter_actual: 0,
        isEdit: true,
      };
      this.planList.unshift(obj);
    },
    quxiao(row) {
    },
    //保存结息计划
    savePlan(row) {
      if (!row.date) {
        return this.$message({
          type: "error",
          message: "请选择日期",
        });
      }
      this.updatePlan(row);
    },
    //切换到生成结息计划的场景
    fastPlan() {
      this.switchover = 1;
    },
    //告诉后端需要再哪个事件节点结息
    async saveFastPlan() {
      //this.switchover = 0;
      if(!this.planForm.inter_radio || !this.planForm.startDate){
        return this.$message({
          type:'error',
          message:'请选择规则和第一次结息时间'
        })
      }
      const str = this.planForm.inter_radio;
      let list = [];
      let curDate = dayjs(this.planForm.startDate);
      //console.log(this.planForm.startDate);
      //结束时间
      let endDate = dayjs(this.loanInfo.loan_date).add(
        this.loanInfo.limit,
        "month"
      );
      switch (str) {
        case 1:
          //
          while (curDate.isBefore(endDate)) {
            list.push(curDate.format("YYYY-MM-DD"));
            curDate = curDate.add(1, "month");
            //console.log(endDate.format('YYYY-MM-DD'));
          }
          // console.log(list);
          break;

        case 2:
          while (curDate.isBefore(endDate)) {
            list.push(curDate.format("YYYY-MM-DD"));
            curDate = curDate.add(1, "quarter");
          }
          // console.log(list);
          break;
        case 3:
          while (curDate.isBefore(endDate)) {
            list.push(curDate.format("YYYY-MM-DD"));
            curDate = curDate.add(1, "year");
          }
          // console.log(list);
          break;

        default:
          this.$message({ type: "error", message: "该结息方式不支持快速生成" });
          break;
      }
      
      await this.$API.fina.updatePlan("plan", {
        loan_id: this.loan_id,
        dateList: list,
      });
      this.getPlanList(this.loan_id);
      this.switchover=0
    },
    //删除计划按钮
    async delPlan(row) {
      await this.$API.fina.delPlan({
        date: row.date,
        loan_id: this.loan_id,
      });
      this.getPlanList(this.loan_id);
    },
  },
};
</script>

<style>
</style>