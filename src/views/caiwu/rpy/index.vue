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
        :disabled="!delRpy.length"
        >删除</el-button
      >
      <el-table
        :data="rpyList"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column header-align="center" type="selection" width="55"> </el-table-column>
        <el-table-column header-align="center" label="贷款单位" prop="corp_name"></el-table-column>
        <el-table-column header-align="center" label="贷款项目" prop="proj_name"></el-table-column>
        <el-table-column header-align="center" label="放款银行" prop="bank_name"></el-table-column>
        <el-table-column header-align="center" label="还款金额" prop="prin_rec" align="right">
          <template slot-scope="{ row }">
            <span>{{ formatNumber(row.prin_rec) }}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="利息" prop="accr_rec" align="right">
          <template slot-scope="{ row }">
            <span>{{ formatNumber(row.accr_rec) }}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="还款日期" prop="rpy_date"></el-table-column>
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
          <el-form-item label="还款本金" prop="prin_rec">
            <el-input v-model="addfrom.prin_rec" type="number"></el-input>
          </el-form-item>
          <el-form-item label="还款利息" prop="accr_rec">
            <el-input v-model="addfrom.accr_rec" type="number"></el-input>
          </el-form-item>
          <el-form-item label="还款日期" prop="rpy_date">
            <el-date-picker
              v-model="addfrom.rpy_date"
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
  name: "Rpy",
  data() {
    return {
      dialogTableVisible: false,
      rpyList: [],
      current: 1,
      size: 50,
      sizes: [50, 100, 200, 500],
      total: 1000,
      addfrom: {
        corp_id: "",
        bank_id: "",
        rpy_date: "",
        accr_rec: "",
        proj_id: "",
        prin_rec: "",
      },
      rules: [],
      corpList: [],
      bankList: [],
      projList: [],
      corpList: [],
      delRpy: [],
      rules: {
        corp_id: [{ required: true, message: "不能为空", trigger: "blur" }],
        bank_id: [{ required: true, message: "不能为空", trigger: "blur" }],
        rpy_date: [{ required: true, message: "不能为空", trigger: "blur" }],
        accr_rec: [{ required: true, message: "不能为空", trigger: "blur" }],
        proj_id: [{ required: true, message: "不能为空", trigger: "blur" }],
        prin_rec: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getRpy();
    this.getSelect();
  },
  methods: {
    async getRpy() {
      let res = await this.$API.caiwu.getrpy(this.current, this.size);
      this.total = res.data.total;
      this.rpyList = res.data.rpyList;
    },
    async getSelect() {
      let res = await this.$API.caiwu.getSelect(1);
      this.bankList = res.data.bankList;
      this.corpList = res.data.corpList;
      this.projList = res.data.projList;
    },
    //多选回调
    handleSelectionChange(row) {
      this.delRpy = row;
    },
    async deleteBtn() {
      this.$confirm("此操作将永久删除所选信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (this.delRpy.length) {
            let delList = [];
            this.delRpy.forEach((item) => {
              delList.push(item.rpy_rec_id);
            });
            await this.$API.caiwu.delRpy(delList);
            this.getRpy();
            this.$message({
              type: "success",
              message: "删除成功",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async deleteTableBtn(row) {
      let delList = [row.rpy_rec_id];

      await this.$API.caiwu.delRpy(delList);
      this.$message({
        type: "success",
        message: "删除成功",
      });
      this.getRpy();
    },
    //导出按钮
    dc_btn() {},
    currentChange(cur) {
      this.current = cur;
      this.getRpy();
    },
    //每页显示条数修改
    sizeChange(size) {
      this.size = size;
      this.getRpy();
    },
    //弹窗保存按钮
    addBxBtn() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          await this.$API.caiwu.addRpy(this.addfrom);
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.getRpy();
          this.dialogTableVisible = false;
        } else {
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