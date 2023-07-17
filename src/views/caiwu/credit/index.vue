<template>
  <div>
    <div style="width: 98%; margin: auto">
      <el-button
        style="margin: 10px 0"
        type="primary"
        plain
        @click="dialogTableVisible = true"
        size="mini"
        >新增</el-button
      >
      <!-- <el-button
        style="margin: 10px"
        type="primary"
        plain
        @click="dc_btn"
        size="mini"
        >导出</el-button
      > -->
      <el-button
        type="danger"
        plain
        size="mini"
        @click="deleteBtn"
        :disabled="!delCreditList.length"
        >删除</el-button
      >
      <el-table
        :data="creditList"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column header-align="center" type="selection" width="55"> </el-table-column>
        <el-table-column header-align="center" label="贷款单位" prop="corp_name"></el-table-column>
        <el-table-column header-align="center" label="贷款项目" prop="proj_name"></el-table-column>
        <el-table-column header-align="center" label="放款银行" prop="bank_name"></el-table-column>
        <el-table-column header-align="center" label="放款金额" prop="rec_loan" align="right">
          <template slot-scope="{ row }">
            <span>{{ formatNumber(row.rec_loan) }}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="起始日期" prop="bgn_date"></el-table-column>
        <el-table-column header-align="center" label="截止日期" prop="end_date"></el-table-column>
        <el-table-column header-align="center" label="操作" min-width="80">
          <template slot-scope="{ row }">
            <el-button
              style="margin-right: 10px"
              type="text"
              plain
              icon="el-icon-plus"
              class="btn_1"
              @click="bj_btn(row)"
              >编辑</el-button
            >
            <el-popconfirm
              :title="`确认删除这条内容吗？`"
              @onConfirm="deleteTableBtn(row)"
            >
              <el-button
                slot="reference"
                style="color: red"
                type="text"
                plain
                icon="el-icon-delete"
                class="btn_1"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: center; margin-top: 10px">
      <el-pagination
        style="margin: auto"
        background
        :total="total"
        :current-page="current"
        :page-size="size"
        :page-sizes="sizes"
        @current-change="currentChange"
        layout="prev, pager, next,jumper,sizes,->,total"
        @size-change="sizeChange"
      ></el-pagination>
    </div>
    <el-dialog
      title="添加"
      width="500px"
      :visible.sync="dialogTableVisible"
      @close="AdddialogClose"
      :close-on-click-modal="false"
    >
      <div style="width: 80%; margin: auto" class="dialog_body">
        <el-form
          :model="addfrom"
          ref="ruleForm"
          label-width="100px"
          label-position="left"
          :rules="rules"
        >
          <el-form-item label="单位" prop="corp_id">
            <el-select
              clearable
              class="box_select"
              v-model="addfrom.corp_id"
              placeholder="请选择贷款单位"
              filterable
            >
              <el-option
                v-for="item in corpList"
                :label="item.corp_name"
                :value="item.corp_id"
                :key="item.corp_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目" prop="proj_id">
            <el-select
              clearable
              class="box_select"
              v-model="addfrom.proj_id"
              placeholder="请选择项目"
              filterable
            >
              <el-option
                v-for="item in projList"
                :label="item.proj_name"
                :value="item.proj_id"
                :key="item.proj_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="放款银行" prop="bank_id">
            <el-select
              clearable
              class="box_select"
              v-model="addfrom.bank_id"
              placeholder="请选择银行"
              filterable
            >
              <el-option
                v-for="item in bankList"
                :label="item.bank_name"
                :value="item.bank_id"
                :key="item.bank_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="到账金额" prop="rec_loan">
            <el-input v-model="addfrom.rec_loan" type="number"></el-input>
          </el-form-item>
          <el-form-item label="起始日期" prop="bgn_date">
            <el-date-picker
              v-model="addfrom.bgn_date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="截止日期" prop="end_date">
            <el-date-picker
              v-model="addfrom.end_date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBxBtn">确 定</el-button>
      </div></el-dialog
    >
  </div>
</template>

<script>
export default {
  name: "Credit",
  data() {
    return {
      dialogTableVisible: false,
      creditList: [],
      current: 1,
      size: 50,
      sizes: [50, 100, 200, 500],
      total: 1000,
      addfrom: {
        corp_id: "",
        bank_id: "",
        bgn_date: "",
        end_date: "",
        proj_id: "",
        rec_loan: "",
      },
      rules: [],
      corpList: [],
      bankList: [],
      projList: [],
      corpList: [],
      delCreditList: [],
      rules: {
        corp_id: [{ required: true, message: "不能为空", trigger: "blur" }],
        bank_id: [{ required: true, message: "不能为空", trigger: "blur" }],
        bgn_date: [{ required: true, message: "不能为空", trigger: "blur" }],
        end_date: [{ required: true, message: "不能为空", trigger: "blur" }],
        proj_id: [{ required: true, message: "不能为空", trigger: "blur" }],
        rec_loan: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getCreditList();
    this.getSelect();
  },
  methods: {
    async getCreditList() {
      let res = await this.$API.caiwu.getcredit(this.current, this.size);
      this.total = res.data.total;
      this.creditList = res.data.creditList;
    },
    async getSelect() {
      let res = await this.$API.caiwu.getSelect(1);
      this.bankList = res.data.bankList;
      this.corpList = res.data.corpList;
      this.projList = res.data.projList;
      console.log(res.data);
    },
    //多选回调
    handleSelectionChange(row) {
      this.delCreditList = row;
    },
    async deleteBtn() {
      this.$confirm("此操作将永久删除所选信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (this.delCreditList.length) {
            let delList = [];
            this.delCreditList.forEach((item) => {
              delList.push(item.crd_rec_id);
            });
            await this.$API.caiwu.delCredit(delList);
            this.getCreditList();
            this.$message({
              type: "success",
              message: "删除成功",
            });
          }
        })
        .catch(() => {
          console.log("1");
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async deleteTableBtn(row) {
      let delList = [row.crd_rec_id];

      await this.$API.caiwu.delCredit(delList);
      this.$message({
        type: "success",
        message: "删除成功",
      });
      this.getCreditList();
    },
    //导出按钮
    dc_btn() {},
    currentChange(cur) {
      this.current = cur;
      this.getCreditList();
    },
    //每页显示条数修改
    sizeChange(size) {
      this.size = size;
      this.getCreditList();
    },
    //弹窗保存按钮
    addBxBtn() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          await this.$API.caiwu.addCredit(this.addfrom);
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.getCreditList();
          this.dialogTableVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //弹窗关闭前的回调
    AdddialogClose() {
      for (let key in this.addfrom) {
        this.addfrom[key] = "";
      }
    },
    bj_btn(row) {
      this.addfrom = { ...row };
      this.dialogTableVisible = true;
    },
    // formatNumber(num) {
    //   num = num - 0;
    //   return num.toLocaleString();
    // },
    formatNumber(v, len, split) {
      (split = split || ","), (len = Math.abs(+len % 20 || 2));
      v = parseFloat((v + "").replace(/[^\d\.-]/g, "")).toFixed(len) + "";
      return v.replace(/\d+/, function (v) {
        let lit = v.length % 3 == 0;
        let index = lit ? v.length - 3 : -1;
        return v
          .split("")
          .reverse()
          .join("")
          .replace(/\d{3}/g, function (k, l) {
            return k + (l == index && lit ? "" : split);
          })
          .split("")
          .reverse()
          .join("");
      });
    },
  },
};
</script>

<style>



</style>