<template>
  <div>
    <div v-show="!dialogLoan">
      <div class="custom-btn-wrap">
      <div class="add-custom-btn" @click="dialogLoan = true">
        <i class="el-icon-plus"></i>新增借款
      </div>
    </div>
    <el-table :data="loanList">
      <el-table-column label="借款金额" prop="loan_sum"></el-table-column>
      <el-table-column label="提交时间" prop="loan_date"></el-table-column>
      <el-table-column label="付息" prop="inter_plan"></el-table-column>
      <el-table-column label="是否浮动利率" prop="is_float">
        <template slot-scope="{ row }">
          <div>
            {{ row.is_float_rate === 1 ? "是" : "否" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="基准利率" prop="rate">
        <template slot-scope="{ row }">
          <div>
            {{ row.rate + "%" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="子项目"
        prop="sub_project_list"
        v-if="rep_form.sub_project === 1"
      >
        <template slot-scope="{ row }">
          <el-tag
            style="margin-left: 5px; margin-bottom: 5px"
            type="primary"
            v-for="item in row.sub_project_list"
            :key="item"
            effect="dark"
            >{{ item }}</el-tag
          ></template
        ></el-table-column
      >
      <el-table-column label="备注" prop="loan_remark"></el-table-column>
      <el-table-column label="操作" prop="inter_plan">
        <template slot-scope="{ row }">
          <el-button type="primary" plain size="mini" @click="loanEdit(row)"
            >编辑</el-button
          >
          <el-button type="danger" plain size="mini" @click="loanDel(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="$emit('stepNext', 2)">上一步</el-button>
    <el-button type="primary" @click="loanNext">下一步</el-button>
    </div>
    <div>
      
      <div style="width: 600px;" v-show="dialogLoan">
        <!-- <el-dialog
        title="添加借款信息"
        :visible.sync="dialogLoan"
        @close="loanClose"
        width="500px"
      > -->
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
              <!-- <el-input
                v-model="loan_form.inter_plan"
                placeholder="请填写"
              ></el-input> -->
              <el-radio-group v-model="loan_form.inter_plan">
                <el-radio label="每月">每月</el-radio>
                <el-radio label="每季度">每季度</el-radio>
                <el-radio label="每半年">每半年</el-radio>
                <el-radio label="每年">每年</el-radio>
                <el-radio label="不规则">不规则</el-radio>
                <!-- <el-date-picker
              v-if="loan_form.inter_plan && loan_form.inter_plan !== '不规则'"
              v-model="loan_form.inter_first_date"
              placeholder="请选择首期结息日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker> -->
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="付息规则">
            <el-radio-group v-model="loan_form.inter_radio">
              <el-radio label="按月">按月</el-radio>
              <el-radio label="按季度">按季度</el-radio>
              <el-radio label="按半年">按半年</el-radio>
              <el-radio label="按年">按年</el-radio>
            </el-radio-group>
          </el-form-item> -->
            <el-form-item
              label="首期结息"
              v-if="loan_form.inter_plan && loan_form.inter_plan !== '不规则'"
              prop="inter_first_date"
            >
              <el-date-picker
                v-model="loan_form.inter_first_date"
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
        <div slot="footer" class="dialog-footer custom-dialog-btn-wrap" >
          <div class="cancel-custom-dialog-btn" @click="dialogLoan = false">
            取消
          </div>
          <div class="save-custom-dialog-btn" @click="loan_save">保存</div>
        </div>
        <!-- <el-button type="primary" @click="loan_save">保存</el-button>
        <el-button type="primary" @click="dialogLoan = false">取消</el-button> -->
      
      </div>
      <el-dialog
        title="当前存在多条借款信息，请选择借款信息进入下款"
        :visible.sync="dialogVisible"
        width="600px"
      >
        <el-radio-group v-model="curLoan">
          <el-radio
            :label="item.loan_id"
            v-for="(item, index) in loanList"
            :key="item.loan_id"
            >{{ `借款信息${index + 1}` }}</el-radio
          >
        </el-radio-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="nextConfirm">确 定</el-button>
        </span>
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
    } else {
      this.$emit("stepNext", 1);
      this.$message({
        type: "error",
        message: "请先添加批复信息",
      });
    }
  },
  watch: {},
  data() {
    return {
      pickerOptions: {
        disabledDate: (time) => {
          return this.$dayjs(time).isBefore(
            this.$dayjs(this.rep_form.rep_date)
          );
        },
      },
      dialogLoan: false,
      dialogVisible: false,
      isIndeterminate: false,
      checkAll: false,
      curLoan: "",
      rep_form: {
        rep_id:null,
        sub_project: 0,
        rep_date: "2023-10-19",
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
        inter_radio: "",
      },
      loanRules: {
        loan_sum: [
          { required: true, message: "请填写借款金额", trigger: "blur" },
        ],
        loan_date: [
          { required: true, message: "请选择提交日期", trigger: "blur" },
        ],
        inter_plan: [
          { required: true, message: "请选择付息规则", trigger: "blur" },
        ],
        rate: [{ required: true, message: "请输入利率", trigger: "blur" }],
        inter_first_date: [
          { required: true, message: "请选择首期结息日期", trigger: "blur" },
        ],
      },
    };
  },
  watch:{
    dialogLoan(nv,ov){
      if(nv===false){
        this.loanClose()
      }

    }
  },
  methods: {
    //获取借款信息列表
    async getLoanList() {
      let res = await this.$API.enter.getLoan(this.projId);

      this.loanList = res.data.loanList;
      this.loanList.forEach((item) => {
        item.loan_sum = this.$format.money(item.loan_sum);
        item.rate = (parseFloat(item.rate) * 100).toFixed(3);
      });
      if (!res.data.repInfo) {
        this.$emit("stepNext", 1);
        return this.$message({
          type: "error",
          message: "请先添加批复信息",
        });
      }
      this.rep_form = res.data.repInfo;
      console.log(res);
      
    },
    //弹窗关闭回调
    loanClose() {
      this.$refs["loan"].resetFields();
      this.loan_form.sub_project_list = [];
      this.isIndeterminate = false;
      this.checkAll = false;
      this.loan_form = {
        is_float_rate: 0,
        loan_sum: null,
        loan_date: null,
        is_actual: 0,
        rate: null,
        loan_remark: null,
        inter_plan: null,
        sub_project_list: [],
        inter_radio: "",
      };
    },
    //借款金额按钮触发
    is_actual_change() {
      if (this.loan_form.is_actual === 1) {
        this.$refs["loan"].resetFields();
        this.loan_form.loan_sum = 0;
      }
    },
    //弹窗保存按钮
    loan_save() {
      this.$refs["loan"].validate(async (validate) => {
        if (validate) {
          //this.$message({type:'success',message:'成功'})
          let loan_info = { ...this.loan_form };
          if (loan_info.is_actual === 1) {
            loan_info.loan_sum = 0;
          } else {
            loan_info.loan_sum = this.$format.restoreMoney(loan_info.loan_sum);
          }
          loan_info.rate = parseFloat((loan_info.rate / 100).toFixed(5));
          loan_info.proj_id = this.projId;
          loan_info.rep_id = this.rep_form.rep_id;

          await this.$API.enter.addLoan(loan_info);
          this.getLoanList();
          this.dialogLoan = false;
        } else {
          return false;
        }
      });
    },
    //下一步按钮
    async loanNext() {
      if (this.loanList.length < 1) {
        return this.$message({
          type: "error",
          message: "当前没有借款信息，添加借款信息后可进入下一步",
        });
      } else if (this.loanList.length === 1) {
        this.$emit("setId", {
          name: "loan",
          id: this.loanList[0].loan_id,
        });
      } else {
        return this.dialogVisible = true;
      }
      await this.$API.enter.getNext('mt',this.curLoan,this.projId)
      this.$emit("stepNext", 4);
    },
    handleCheckAllChange(val) {
      console.log(val);
      // return
      this.loan_form.sub_project_list = val
        ? this.rep_form.sub_project_list
        : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;

      this.checkAll = checkedCount === this.rep_form.sub_project_list.length;
      this.isIndeterminate =
        checkedCount > 0 &&
        checkedCount < this.rep_form.sub_project_list.length;

      // this.isIndeterminate = !this.isIndeterminate
    },
    async nextConfirm() {
      this.$emit("setId", {
        name: "loan",
        id: this.curLoan,
      });
      await this.$API.enter.getNext('mt',this.curLoan,this.projId)
      this.$emit("stepNext", 4);
    },
    //借款信息编辑按钮
    loanEdit(row) {
      this.loan_form = { ...row };
      this.dialogLoan = true;
    },
    // 借款信息删除按钮
    async loanDel(row) {
      this.$confirm(
        "此操作将永久删除该借款信息及其所有子信息, 是否继续?",
        "警告",
        {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          await this.$API.fina.delLoan({ loan_id: row.loan_id });
          this.getLoanList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style>
</style>