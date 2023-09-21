<template>
  <div>
    <div style="width: 100%">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form :model="form" label-width="100px" label-position="left"
            >
            <el-form-item label="借款金额">
              <div v-if="!info_status">{{ str_contet($format.money(form.loan_sum)) }}</div>
              <el-input
                v-else
                v-model="form.loan_sum"
                type="number"
                placeholder=""
              ></el-input>
            </el-form-item>
            <el-form-item label="提交时间">
              <div v-if="!info_status">{{ str_contet(form.loan_date) }}</div>
              <el-date-picker
                v-else
                v-model="form.loan_date"
                type="date"
                placeholder="请选择日期"
                format="yyyy年M月d日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="付息">
              <div v-if="!info_status">
                {{ str_contet(form.inter_plan) }}
              </div>
              <el-input v-model="form.inter_plan" placeholder="请填写" v-else></el-input>
              <!-- <el-button
                type="primary"
                size="mini"
                @click="interInfo('insert')"
                v-else
                >录入</el-button
              > -->
            </el-form-item>
            <el-form-item label="结息详情">
              <el-button type="primary" size="mini" @click="interInfo('view')"
                >查看</el-button
              >
              <!-- <el-button
                type="primary"
                size="mini"
                @click="interInfo('insert')"
                v-else
                >录入</el-button
              > -->
            </el-form-item>
            <el-form-item label="结息计划">
              <el-button type="primary" size="mini" @click="planInfo"
                >查看</el-button
              >
              <!-- <el-button
                type="primary"
                size="mini"
                @click="interInfo('insert')"
                v-else
                >录入</el-button
              > -->
            </el-form-item>
            <el-form-item label="还本计划">
              <el-button type="primary" size="mini" @click="repayInfo('view')"
                >查看</el-button
              >
            </el-form-item>
            <el-form-item label="备注说明">
              <div v-if="!info_status">{{ str_contet(form.loan_remark) }}</div>
              <el-input
                v-else
                v-model="form.loan_remark"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="14">
          <el-form label-position="top">
            <el-form-item label="下款信息">
              <template #label>
                <div style="display: flex; align-items: center">
                  <div>
                    <span>下款信息</span>
                  </div>
                  <div>
                    <i
                      class="el-icon-plus"
                      style="color: #409eff; cursor: pointer"
                      @click="mtADD"
                      v-show="info_status"
                    ></i>
                  </div>
                </div>
              </template>
              <el-table :data="mtList" border>
                <el-table-column label="合同编号">
                  <template slot-scope="{ row }">
                    <span>{{ str_contet(row.agmt_id) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="下款时间">
                  <template slot-scope="{ row }">
                    <span>{{ str_contet(row.mt_date) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="下款金额">
                  <template slot-scope="{ row }">
                    <span>{{ str_contet($format.money(row.mt_sum)) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="截止日期" min-width="150px">
                  <template slot-scope="{ row }">
                    <span>{{ str_contet(row.start_end_date) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="匹配资本金">
                  <template slot-scope="{ row }">
                    <div>{{ row.matching_capital }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="备注">
                  <template slot-scope="{ row }">
                    <div style="white-space: pre-line">{{ row.remark }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="180x">
                  <template slot-scope="{ row }">
                    <el-button
                      type="primary"
                      size="mini"
                      icon="el-icon-more"
                      @click="spInfo(row)"
                    ></el-button>
                    <el-button
                      v-show="info_status"
                      type="primary"
                      size="mini"
                      icon="el-icon-edit-outline"
                      @click="mtEdit(row)"
                    ></el-button>

                    <el-popconfirm
                      v-show="info_status"
                      title="删除该信息会导致子信息也被删除，确定删除吗？"
                      @onConfirm="delmt(row)"
                    >
                      <el-button
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
            </el-form-item> </el-form
        ></el-col>
      </el-row>

      <div style="margin-top: 50px">
        <el-button
          type="primary"
          v-show="!info_status"
          @click="info_status = true"
          >编辑</el-button
        >
        <el-button type="primary" v-show="info_status" @click="loan_save"
          >保存</el-button
        >
        <el-button
          type="primary"
          v-show="info_status"
          @click="info_status = false"
          >取消</el-button
        >
      </div>
    </div>
    <el-dialog
      title="下款信息编辑"
      :visible.sync="dialogVisible"
      width="30%"
      @close="handlerClose"
    >
      <el-form :model="mt_form" label-width="100px" label-position="left">
        <el-form-item label="下款合同">
          <el-select
            v-model="mt_form.mt_con_id"
            placeholder="请选择合同"
            filterable
          >
            <el-option
              v-for="item in agmtList"
              :label="item.agmt_name"
              :value="item.agmt_index_id"
              :key="item.agmt_index_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下款时间">
          <el-date-picker
            v-model="mt_form.mt_date"
            value-format="yyyy-MM-dd"
            placeholder="请选择下款时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="下款金额">
          <el-input
            style="width: 200px"
            v-model="mt_form.mt_sum"
            type="number"
            placeholder="请填写下款金额"
          ></el-input>
        </el-form-item>
        <el-form-item label="截止日期">
          <!-- <el-date-picker
            v-model="mt_form.start_end_date"
            value-format="yyyy-MM-dd"
            size="mini"
            format="yyyy-MM-dd"
          >
         
          </el-date-picker> -->
          <el-date-picker
            v-model="mt_form.start_end_date"
            value-format="yyyy-MM-dd"
            placeholder="请选择下款时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="匹配资本金">
          <el-input
            v-model="mt_form.matching_capital"
            placeholder=""
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="mt_form.remark"
            placeholder=""
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="mtSave">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="走款信息" :visible.sync="spDialog" width="900px">
      <el-button type="primary" size="mini" @click="addSp" plain
        >新增</el-button
      >
      <el-table :data="spList">
        <el-table-column label="合同编号" prop="agmt_id"></el-table-column>
        <el-table-column label="收款单位" prop="corp_name"></el-table-column>
        <el-table-column label="走款时间" prop="sp_date"></el-table-column>
        <el-table-column label="走款金额" prop="sp_num"></el-table-column>
        <el-table-column label="回款金额" prop="refund"></el-table-column>
        <el-table-column
          label="实际支付金额"
          prop="actul_num"
        ></el-table-column>
        <el-table-column label="用途" prop="sp_use"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="操作" prop="remark" min-width="140px">
          <template slot-scope="{ row }">
            <div style="">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit-outline"
                @click="spEdit(row)"
                plain
              ></el-button>
             
              <el-popconfirm
                      
                      title="确定删除该走款信息吗？"
                      @onConfirm="delsp(row)"
                    >
                      <el-button
                        type="danger"
                        size="mini"
                        icon="el-icon-delete"
                        slot="reference"
                        style="margin-left: 10px"
                      ></el-button>
                    </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        width="500px"
        title="走款添加"
        :visible.sync="innerVisible"
        append-to-body
        @close="spDialogClose"
      >
        <el-form :model="sp_form" label-width="100px" label-position="left">
          <el-form-item label="合同">
            <el-select
              v-model="sp_form.con_id"
              placeholder="请选择合同"
              filterable
            >
              <el-option
                v-for="item in agmtList"
                :label="item.agmt_name"
                :value="item.agmt_index_id"
                :key="item.agmt_index_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收款单位">
            <el-select
              v-model="sp_form.corp_name"
              placeholder="请选择收款单位"
              filterable
            >
              <el-option
                v-for="item in corpList"
                :label="item.corp_name"
                :value="item.corp_name"
                :key="item.agmt_index_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="走款时间">
            <el-date-picker
              v-model="sp_form.sp_date"
              placeholder="请选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="走款金额">
            <el-input
              style="width: 200px"
              v-model="sp_form.sp_num"
              type="number"
              placeholder="请输入走款金额"
            ></el-input>
          </el-form-item>
          <el-form-item label="回款金额"
            ><el-input
              type="number"
              style="width: 200px"
              v-model="sp_form.refund"
              placeholder="请输入回款金额"
            ></el-input
          ></el-form-item>
          <el-form-item label="实际支付金额"
            ><el-input
              type="number"
              style="width: 200px"
              v-model="sp_form.actul_num"
              placeholder="请输入实际支付金额"
            ></el-input
          ></el-form-item>
          <el-form-item label="用途"
            ><el-input
              style="width: 200px"
              v-model="sp_form.sp_use"
              placeholder="请输入用途"
            ></el-input
          ></el-form-item>
          <el-form-item label="备注"
            ><el-input
              style="width: 200px"
              type="textarea"
              v-model="sp_form.remark"
              placeholder=""
            ></el-input
          ></el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="spSave">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>

    <el-dialog title="每日详情" :visible.sync="interestDialog" width="900px">
      <el-form :model="interest_form" v-if="false">
        <el-form-item label="结息方式">
          <el-radio-group v-model="interest_form.radio">
            <el-radio :label="1">按年</el-radio>
            <el-radio :label="2">按季度</el-radio>
            <el-radio :label="3">按月</el-radio>
            <el-radio :label="4">不规则</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="时间"
          v-if="interest_form.radio != 4 && interest_form.radio"
        >
          <el-date-picker
            v-if="interest_form.radio == 1"
            v-model="interest_form.Interest_settlement"
            type="date"
            placeholder="每年*月*日"
            format="每年M月d日"
            value-format="MM-dd"
          >
          </el-date-picker>
          <el-date-picker
            v-if="interest_form.radio == 2"
            v-model="interest_form.Interest_settlement"
            type="date"
            placeholder="每季度末*日"
            format="每季度末d日"
            value-format="dd"
          >
          </el-date-picker>
          <el-date-picker
            v-if="interest_form.radio == 3"
            v-model="interest_form.Interest_settlement"
            type="date"
            placeholder="每月*日"
            format="每月d日"
            value-format="dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="开始日期"
          v-if="interest_form.Interest_settlement || interest_form.radio == 4"
        >
          <el-date-picker
            v-model="interest_form.bgn_end_date"
            type="date"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <interest ref="inter" v-else />
      <!-- <span slot="footer" class="dialog-footer" v-if="!this.form.inter_total">
        <el-button type="primary" @click="jisuandate(interest_form.radio)"
          >确 定</el-button
        >
      </span> -->
    </el-dialog>

    <el-dialog title="还本计划" :visible.sync="repayDialog" width="700px">
      <Repay ref="repay" />
    </el-dialog>
    <el-dialog title="结息计划" :visible.sync="interPlanDialog" width="700px">
      <InterPlan ref="interPlan"  :loanInfo="{date:form.loan_date,limit:form.rep_limit,inter_plan:form.inter_plan}" />
    </el-dialog>
  </div>
</template>

<script>
import Interest from "./interest.vue";
import Repay from "./repay.vue";
import InterPlan from "./interPlan.vue";
import dayjs from "dayjs";
const isBetween = require("dayjs/plugin/isBetween");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
export default {
  components: {
    Interest,
    Repay,
    InterPlan,
  },
  name: "Loan",
  props: { loanInfo: Object, required: true },
  mounted() {
    console.log(123);
  },
  data() {
    return {
      interPlanDialog: false,
      interPlan: false,
      repayDialog: false,
      interest_form: {
        radio: 0,
        Interest_settlement: "",
        bgn_end_date: "",
      },
      repay_form: {
        radio: 0,
        Interest_settlement: "",
        bgn_end_date: "",
      },
      interestDialog: false,
      innerVisible: false,
      spList: [],
      spDialog: false,
      dialogVisible: false,
      activeName: "mt1",
      form: {
        loan_con: "",
        loan_sum: 0,
        loan_data: "",
        loan_remark: "",
        inter_plan: "",
      },
      mtList: [],
      agmtList: [],
      corpList: [],
      proj_id: "",
      info_status: false,
      loan_id: 0,
      mt_form: {
        mt_sum: 0,
        mt_date: "",
        matching_capital: "",
        remark: "",
        start_end_date: "",
        mt_con_id: "",
      },
      sp_form: {
        sp_date: "",
        corp_name: "",
        sp_num: 0,
        refund: 0,
        actul_num: 0,
        invoice: 0,
        sp_use: "",
        remark: "",
        con_id: "",
      },
      curMtId: 0,
      curmt_id:null
    };
  },
  async mounted() {
    //console.log(this);

    this.agmtList = { ...this.$store.state.select.agmtList };
    this.corpList = { ...this.$store.state.select.corpList };
  },
  watch: {
    "interest_form.radio"(newv, oldv) {
      console.log(this.interest_form.Interest_settlement);
      this.interest_form.Interest_settlement = "";
      // if (newv == 4) {
      //   this.interest_form.Interest_settlement = "不规则";
      // }
    },
  },
  methods: {
    shuaxin() {},
    str_contet(str) {
      if (str) {
        return str;
      } else {
        return "无";
      }
    },
    async getInfo(loan_id) {
      this.loan_id = loan_id;
      let res = await this.$API.fina.getLoan(loan_id);
      this.form = res.data.loanInfo;
      this.mtList = res.data.mtList;
      if (res.data.loanInfo.is_repay === 0) {
        let { loan_date, loan_id, rep_limit } = res.data.loanInfo;
        let res1 = this.$API.fina.addRepayment({
          loan_date,
          loan_id,
          rep_limit,
        });
      } else {
        let { loan_id } = res.data.loanInfo;
        if(res.data.loanInfo.is_inter===0){
          this.$API.fina.updateInter(loan_id);
        }
       
      }
      //   this.proj_id=proj_id
      //   let res = await this.$API.fina.getMt(proj_id)
      //   console.log(res.data);
    },
    handleClick(tab, event) {},
    //该函数用来给没跳列表添加一个布尔值用来表示是否处于编辑状态
    listIsEdit(arr) {
      if (Array.isArray(arr)) {
        // for(let item of arr){
        //   console.log('edit');
        //   arr.isEdit=false
        // }
        arr.forEach((item) => {
          //item.isEdit = false;
          this.$set(item, "isEdit", false);
        });
      } else {
        throw new Error("传入的参数不是数组");
      }
    },
    async pawnSave(row) {
      row.rep_id = this.rep_form.rep_id;
      let res = await this.$API.fina.addPawn(row);
      row.isEdit = false;
      this.$message({ type: "success", message: "保存成功" });
      this.getRepInfo();
    },
    async delPawn(row) {
      let res = await this.$API.fina.delPawn({ pawn_id: row.pawn_id });
      this.$message({ type: "success", message: "删除成功" });
      this.getRepInfo();
    },
    mtADD() {
      this.dialogVisible = true;
      console.log("23333");
    },
    async spInfo(row) {
      this.curMtId = row.mt_id;
      let res = await this.$API.fina.getSp(row.mt_id);
      this.spList = res.data.spList;
      this.spDialog = true;
      console.log(res);
    },
    async loan_save() {
      let res = await this.$API.fina.addLoan(this.form);
      if (res.code == 20000) {
        this.$message({ type: "success", message: "保存成功" });
      }
      this.getInfo(this.form.loan_id);
      this.info_status = false;
    },
    handlerClose() {
      let obj = {
        mt_sum: 0,
        mt_con_id: "",
        mt_date: "",
        matching_capital: "",
        remark: "",
        start_end_date: "",
      };
      this.mt_form = obj;
      // for (let key in this.mt_form) {
      //   if (key == "mt_sum") {
      //     this.mt_form[key] = 0;
      //   } else {
      //     this.mt_form[key] = "";
      //   }
      // }
    },
    async mtSave() {
      if (!this.mt_form.loan_id) {
        this.mt_form.loan_id = this.form.loan_id;
      }
      for (let key in this.mt_form) {
        if (key !== "remark") {
          if (this.mt_form[key] == "") {
            return this.$message({
              type: "error",
              message: "除备注以外不能为空",
            });
          }
        }
      }
      let res = await this.$API.fina.addMt(this.mt_form);
      if (res.code == 20000) {
        this.$message({ type: "success", message: "保存成功" });
      }
      this.getInfo(this.form.loan_id);
      this.dialogVisible = false;
    },
    mtEdit(row) {
      this.mt_form = { ...row };
      this.dialogVisible = true;
    },
    spEdit(row) {
      this.sp_form = { ...row };
      this.innerVisible = true;
    },
    spDialogClose() {
      this.sp_form = {
        sp_date: "",
        corp_name: "",
        sp_num: 0,
        refund: 0,
        actul_num: 0,
        invoice: 0,
        sp_use: "",
        remark: "",
        con_id: "",
      };
    },
    async spSave() {
      this.sp_form.mt_id = this.curMtId;
      let res = await this.$API.fina.addSp(this.sp_form);
      if (res.code == 20000) {
        this.$message({ type: "success", message: "保存成功" });
      }
      let res1 = await this.$API.fina.getSp(this.curMtId);
      this.spList = res1.data.spList;
      this.innerVisible = false;
    },
    addSp() {
      this.curMtId;
      this.innerVisible = true;
    },
    interInfo(name) {
      if (name == "view") {
        setTimeout(() => {
          //console.log(this.$refs.inter);
          this.$refs.inter.getInterList(this.form.loan_id);
        }, 100);
      }
      this.interestDialog = true;
    },
    repayInfo(name) {
      if (name == "view") {
        setTimeout(() => {
          //console.log(this.$refs.inter);
          this.$refs.repay.getRepayList(this.form.loan_id);
        }, 100);
      }
      this.repayDialog = true;
    },
    async repaySave(radio) {
      if (!this.repay_form.bgn_end_date) {
        return this.$message({ type: "error", message: "请填写开始日期" });
      }
      const start_date = this.repay_form.bgn_end_date;
      const end_date = dayjs(start_date).add(this.form.rep_limit - 0, "month");

      const formdate = this.repay_form.Interest_settlement;
      switch (radio) {
        case 1:
          let a = this.yeardate(start_date, end_date, formdate);
          await this.$API.fina.addRepay(this.form.loan_id, a);
          break;
        case 2:
          let b = this.calculateQuarters(start_date, end_date, formdate);
          await this.$API.fina.addRepay(this.form.loan_id, b);
          break;
        case 3:
          let c = this.printMonthsTenth(start_date, end_date, formdate);
          await this.$API.fina.addRepay(this.form.loan_id, c);
          break;
        case 4:
          console.log(1);
          await this.$API.fina.addRepay(this.form.loan_id, [start_date]);
          break;
        default:
          break;
      }

      this.repayDialog = false;
      this.getInfo(this.form.loan_id);
    },
    async jisuandate(radio) {
      if (!this.interest_form.bgn_end_date) {
        return this.$message({ type: "error", message: "请填写开始日期" });
      }
      const start_date = this.interest_form.bgn_end_date;
      const end_date = dayjs(start_date).add(this.form.rep_limit - 0, "month");

      const formdate = this.interest_form.Interest_settlement;
      switch (radio) {
        case 1:
          let a = this.yeardate(start_date, end_date, formdate);
          await this.$API.fina.addInter(this.form.loan_id, a);
          break;
        case 2:
          let b = this.calculateQuarters(start_date, end_date, formdate);
          console.log(b);
          break;
          await this.$API.fina.addInter(this.form.loan_id, b);

        case 3:
          let c = this.printMonthsTenth(start_date, end_date, formdate);
          await this.$API.fina.addInter(this.form.loan_id, c);
          break;
        case 4:
          await this.$API.fina.addInter(this.form.loan_id, [start_date]);
          break;
        default:
          break;
      }

      this.interestDialog = false;
      this.getInfo(this.form.loan_id);
    },
    //打印出时间范围内的每个制定日期
    yeardate(start_date, end_date, formdate) {
      // 设置起始日期和结束日期
      let list = [];
      const startDate = dayjs(start_date);
      const endDate = dayjs(end_date);

      // 循环遍历每一年的五月十日
      for (let year = startDate.year(); year <= endDate.year(); year++) {
        const date = dayjs(`${year}-${formdate}`);

        // 判断日期是否在范围内
        if (date.isBetween(startDate, endDate, null, "[]")) {
          list.push(date.format("YYYY-MM-DD"));
        }
      }

      return list;
    },
    calculateQuarters(startDates, endDates, formdate) {
      let currentDate = dayjs(startDates);
      const end = dayjs(endDates);
      let list = [];
      while (currentDate.isBefore(end)) {
        const year = currentDate.year();
        const month = currentDate.month();

        // 检查当前月份是否是季度的最后一个月
        if (month === 2 || month === 5 || month === 8 || month === 11) {
          list.push[currentDate.format(`YYYY-MM-${formdate}`)];
        }

        currentDate = currentDate.add(1, "month");
      }
      const endQuarter = Math.floor((end.month() + 1) / 3);
      const endQuarterEndDate = dayjs()
        .month(endQuarter * 3 - 1)
        .endOf("month");
      if (end.isBefore(endQuarterEndDate)) {
        list.push[end.format(`YYYY-MM-${formdate}`)];
      }
      return list;
    },
    printMonthsTenth(startDate, endDate, formdate) {
      let list = [];
      let currentDate = dayjs(startDate).startOf("month").add(9, "day");
      const endOfMonth = dayjs(endDate).endOf("month");

      while (
        currentDate.isSameOrBefore(endDate) &&
        currentDate.isSameOrBefore(endOfMonth)
      ) {
        //console.log(currentDate.format(`YYYY-MM-${formdate}`));
        list.push(currentDate.format(`YYYY-MM-${formdate}`));
        currentDate = currentDate.add(1, "month");
      }
      return list;
    },
    planInter() {
      this.interPlan = true;
    },
    interPlanSave() {
      this.form.radio = this.interest_form.radio;
      this.form.inter_plan = this.interest_form.Interest_settlement;
    },
    planInfo() {
      this.interPlanDialog = true;
      //console.log( this.$refs);
      //this.$refs.interPlan.getPlanList(this.form.loan_id);
      setTimeout(() => {
        //console.log(this.$refs.inter);
        this.$refs.interPlan.getPlanList(this.form.loan_id);
      }, 100);
    },
    //下款信息删除回调
    async delmt(row){
      let obj = {
        loan_id:this.form.loan_id,
        date:row.mt_date,
        mt_id:row.mt_id
      }
      await this.$API.fina.delMt(obj)
      this.getInfo(this.form.loan_id);
    },
    //删除偶组款信息按钮
    async delsp(row){
      let obj = {
        sp_id:row.sp_id
      }
      await  this.$API.fina.delSp(obj)
      this.spInfo(this.curMtId)
    }
  },
};
</script>

<style>
</style>