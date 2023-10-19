<template>
  <div>
    <div class="custom-btn-wrap">
      <div class="add-custom-btn" @click="dialogLoan = true">
        <i class="el-icon-plus"></i>新增借款
      </div>
    </div>
    <el-table :data="loanList">
      <el-table-column label="借款金额" prop="loan_sum"></el-table-column>
      <el-table-column label="提交时间" prop="loan_date"></el-table-column>
      <el-table-column label="付息" prop="inter_plan"></el-table-column>
      <el-table-column label="是否浮动利率" prop="is_float"></el-table-column>
      <el-table-column label="基准利率" prop="rate"></el-table-column>
      <el-table-column label="子项目" prop="sub_project_list"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
    </el-table>
    <el-button type="primary" @click="$emit('stepNext', 4)">下一步</el-button>
    <div>
      <el-dialog
        title="添加借款信息"
        :visible.sync="dialogLoan"
        @close="loanClose"
        width="500px"
      >
        <div class="custom-horizontal-line"></div>
        <div class="dialog_body custom-dialog-body">
          <el-form
            ref="loan"
            :model="loan_form"
            :rules="loanRules"
            label-width="100px"
            label-position="right"
          >
            <el-form-item
              label="借款金额"
              :prop="loan_form.is_actual === 0 ? 'loan_sum' : ''"
            >
              <el-switch
                v-model="loan_form.is_actual"
                active-text="实际为准"
                inactive-text="固定金额"
                :active-value="1"
                :inactive-value="0"
                @change="is_actual_change"
              >
              </el-switch>
              <el-input
                v-model="loan_form.loan_sum"
                placeholder="请填写借款金额"
                :disabled="loan_form.is_actual === 1"
                @input="
                  loan_form.loan_sum = $format.formatInput(loan_form.loan_sum)
                "
              ></el-input>
            </el-form-item>
            <el-form-item label="所属子项目" v-if="rep_form.sub_project === 1">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
                >全选</el-checkbox
              >
              <div style="margin: 15px 0"></div>
              <el-checkbox-group
                v-model="loan_form.sub_project_list"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox
                  v-for="item in rep_form.sub_project_list"
                  :label="item"
                  :key="item"
                  >{{ item }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="提交日期" prop="loan_date">
              <el-date-picker
                v-model="loan_form.loan_date"
                placeholder="请选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="付息" prop="inter_plan">
              <el-input
                v-model="loan_form.inter_plan"
                placeholder="请填写"
              ></el-input>
            </el-form-item>
            <el-form-item label="付息规则">
            <el-radio-group v-model="loan_form.inter_radio">
              <el-radio label="按月">按月</el-radio>
              <el-radio label="按季度">按季度</el-radio>
              <el-radio label="按半年">按半年</el-radio>
              <el-radio label="按年">按年</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="第一次结息时间">
            <el-date-picker
              v-model="loan_form.startDate"
              placeholder="请选择"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
            <el-form-item label="利率(%)" prop="rate">
              <el-switch
                v-model="rep_form.is_float_rate"
                active-text="浮动利率"
                inactive-text="固定利率"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
              <el-input
                v-model="loan_form.rate"
                placeholder="请输入基准利率(%)"
                type="number"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注说明">
              <el-input
                v-model="loan_form.loan_remark"
                placeholder=""
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="custom-horizontal-line"></div>
        <div slot="footer" class="dialog-footer custom-dialog-btn-wrap">
          <div class="cancel-custom-dialog-btn" @click="dialogLoan = false">
            取消
          </div>
          <div class="save-custom-dialog-btn" @click="loan_save">保存</div>
        </div>
        <!-- <el-button type="primary" @click="loan_save">保存</el-button>
        <el-button type="primary" @click="dialogLoan = false">取消</el-button> -->
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "enterLoan",
  props: {
    projId: String,
  },
  mounted() {
    if (this.projId) {
      this.getLoanList();
    }
  },
  data() {
    return {
      pickerOptions: {
        disabledDate: (time) => {
          return this.$dayjs(time).isBefore(this.$dayjs(this.rep_form.rep_date));
        },
      },
      dialogLoan: false,
      rep_form: {
        sub_project: 0,
        rep_date:'2023-10-19'
      },
      loanList: [
        {
          loan_sum: 10000,
          loan_date: "2021-10-10",
          inter_plan: "每月20日",
          is_float: 1,
          rate: "5.145%",
          sub_project_list: ["1", "2", "3"],
          remark: "无",
        },
      ],
      loan_form: {
        is_float_rate: 0,
        loan_sum: null,
        loan_date: null,
        is_actual: 0,
        rate: null,
        loan_remark: null,
        inter_plan: null,
        sub_project_list: [],
        inter_radio:''
      },
      loanRules: {
        loan_sum: [
          { required: true, message: "请填写借款金额", trigger: "blur" },
        ],
        loan_date: [
          { required: true, message: "请选择提交日期", trigger: "blur" },
        ],
        inter_plan: [{ required: true, message: "请输入", trigger: "blur" }],
        rate: [{ required: true, message: "请输入利率", trigger: "blur" }],
      },
    };
  },
  methods: {
    //获取借款信息列表
    async getLoanList() {
      let res = await this.$API.enter.getLoan(this.projId);
      console.log(res);
      this.loanList = res.data.loanList;
    },
    //弹窗关闭回调
    loanClose() {
      // this.$refs["loan"].resetFields();
      // this.loan_form.sub_project_list=[]
      // this.isIndeterminate = false
      // this.checkAll =false
    },
    //借款金额按钮触发
    is_actual_change() {
      if (this.loan_form.is_actual === 1) {
        this.$refs["loan"].resetFields();
        this.loan_form.loan_sum = 0;
      }
    },
    //弹窗保存按钮
    loan_save(){

    },

  },
};
</script>

<style>
</style>