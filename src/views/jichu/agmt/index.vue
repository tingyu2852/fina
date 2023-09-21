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
      <el-button
        type="danger"
        plain
        size="mini"
        @click="deleteBtn"
        :disabled="!delAgmt.length"
        >删除</el-button
      >
      <el-table
        :data="agmtList"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column header-align="center" type="selection" width="55">
        </el-table-column>
        <el-table-column
          header-align="center"
          label="合同编号"
          prop="agmt_id"
          align="left"
        ></el-table-column>
        <el-table-column
          header-align="center"
          label="合同名称"
          prop="agmt_name"
          align="left"
        ></el-table-column>
        <el-table-column header-align="center" label="合同类型" align="left">
          <template slot-scope="{ row }">
            <div>
              {{ agmt_cate(row.agmt_id) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          label="合同甲方"
          prop="agmt_part"
          align="left"
        >
          <template slot-scope="{ row }">
            <div>
              <span>{{ agmt_part1(row) }}</span>
            </div>
          </template></el-table-column
        >
        <el-table-column
          header-align="center"
          label="合同乙方"
          prop="bank_name"
          align="left"
        >
          <template slot-scope="{ row }">
            <div>
              <span>{{ agmt_part2(row) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          label="金额"
          prop="agmt_value"
          align="right"
        >
          <template slot-scope="{ row }">
            {{ $format.money(row.agmt_value) }}
          </template></el-table-column
        >
        <el-table-column
          header-align="center"
          label="起始日期"
          prop="beg_date"
          align="left"
        ></el-table-column>
        <el-table-column
          header-align="center"
          label="截止日期"
          prop="end_date"
          align="left"
        ></el-table-column>
        <el-table-column
          header-align="center"
          label="备注"
          prop="bank_name"
          align="left"
        >
          <template slot-scope="{ row }">
            <div>
              <span>{{ row.agmt_note ? row.agmt_note : "无" }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="操作" width="200px">
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
          :model="form"
          ref="ruleForm"
          label-width="100px"
          label-position="left"
          :rules="rules"
        >
          <el-form-item label="合同名称" prop="agmt_name">
            <el-input v-model="form.agmt_name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="合同类型" prop="agmt_cate">
            <el-select v-model="form.agmt_cate" placeholder="请选择">
              <el-option label="放款" value="AGPL"></el-option>
              <el-option label="下款" value="AGMT"></el-option>
              <el-option label="走款" value="AGSP"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合同方" prop="agmt_part">
            <el-select
              v-model="form.agmt_part"
              placeholder="请选选择合同类型"
              v-if="isCurSelect === 'corp'"
            >
              <el-option
                v-for="item in corpList"
                :label="item.corp_name"
                :value="item.corp_name"
                :key="item.corp_id"
              ></el-option>
            </el-select>
            <el-select
              v-model="form.agmt_part"
              placeholder="请选选择合同类型"
              v-else
            >
              <el-option
                v-for="item in curSelectList"
                :label="item.bank_name"
                :value="item.bank_name"
                :key="item.bank_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="金额" prop="agmt_value">
            <el-input
              type="number"
              v-model="form.agmt_value"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="起始日期" prop="beg_date">
            <el-date-picker
              v-model="form.beg_date"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="截止日期" prop="end_date">
            <el-date-picker
              v-model="form.end_date"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.agmt_note" placeholder="请输入"></el-input>
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
  name: "Agmt",
  data() {
    return {
      dialogTableVisible: false,
      agmtList: [],
      current: 1,
      size: 50,
      sizes: [50, 100, 200, 500],
      total: 1000,
      bankList: [],
      corpList: [],
      curSelectList: [],
      form: {
        agmt_cate: "",
        agmt_name: "",
        agmt_part: "",
        agmt_value: "",
        beg_date: "",
        end_date: "",
        agmt_note: "",
      },
      rules: [],
      delAgmt: [],
      rules: {
        agmt_cate: [{ required: true, message: "不能为空", trigger: "blur" }],
        agmt_name: [{ required: true, message: "不能为空", trigger: "blur" }],
        agmt_part: [{ required: true, message: "不能为空", trigger: "blur" }],
        agmt_value: [{ required: true, message: "不能为空", trigger: "blur" }],
        beg_date: [{ required: true, message: "不能为空", trigger: "blur" }],
        end_date: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },

  computed: {
    isCurSelect() {
      let str = this.form.agmt_cate.substring(0, 4);
      if (!str) {
        this.curSelectList = [];
        return "bank";
      }
      if (str === "AGSP") {
        return "corp";
      } else {
        this.curSelectList = this.bankList;
        return "bank";
      }
    },
  },
  mounted() {
    this.getAgmt();
    this.getAgmtPart();
  },
  methods: {
    async getAgmt() {
      let res = await this.$API.caiwu.getAgmt(this.current, this.size);
      this.total = res.data.total;
      this.agmtList = res.data.agmtList;
    },
    async getAgmtPart() {
      let res = await this.$API.caiwu.getSelect(1);
      console.log(res);
      this.bankList = res.data.bankList;
      this.corpList = res.data.corpList;
    },
    //多选回调
    handleSelectionChange(row) {
      this.delAgmt = row;
    },
    async deleteBtn() {
      this.$confirm("此操作将永久删除所选信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (this.delAgmt.length) {
            let delList = [];
            this.delAgmt.forEach((item) => {
              delList.push(item.agmt_index_id);
            });
            await this.$API.caiwu.delAgmt(delList);
            this.getAgmt();
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
      let delList = [row.agmt_index_id];

      await this.$API.caiwu.delAgmt(delList);
      this.$message({
        type: "success",
        message: "删除成功",
      });
      this.getAgmt();
    },
    //导出按钮
    dc_btn() {},
    currentChange(cur) {
      this.current = cur;
      this.getAgmt();
    },
    //每页显示条数修改
    sizeChange(size) {
      this.size = size;
      this.getAgmt();
    },
    //弹窗保存按钮
    addBxBtn() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          await this.$API.caiwu.addAgmt(this.form);
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.getAgmt();
          this.dialogTableVisible = false;
        } else {
          return false;
        }
      });
    },
    //弹窗关闭前的回调
    AdddialogClose() {
      for (let key in this.form) {
        this.form[key] = "";
      }
    },
    bj_btn(row) {
      this.form = { ...row };
      this.form.agmt_cate = this.form.agmt_id.substring(0, 4);
      this.dialogTableVisible = true;
    },
    agmt_cate(id) {
      let str = id.substring(0, 4);
      let agmt_cate_name = "";
      switch (str) {
        case "AGPL":
          agmt_cate_name = "批复协议";
          break;
        case "AGMT":
          agmt_cate_name = "借款合同";
          break;
        case "AGSP":
          agmt_cate_name = "走款合同";
          break;
        default:
          agmt_cate_name = "无";
          break;
      }
      return agmt_cate_name;
    },
    agmt_part2(row) {
      let str = row.agmt_id.substring(0, 4);
      let agmt_cate_name = "";
      switch (str) {
        case "AGPL":
          agmt_cate_name = "平台公司";
          break;
        case "AGMT":
          agmt_cate_name = "平台公司";
          break;
        case "AGSP":
          agmt_cate_name = row.agmt_part;
          break;
        default:
          agmt_cate_name = "无";
          break;
      }
      return agmt_cate_name;
    },
    agmt_part1(row) {
      let str = row.agmt_id.substring(0, 4);
      let agmt_cate_name = "";
      switch (str) {
        case "AGPL":
          agmt_cate_name = row.agmt_part;
          break;
        case "AGMT":
          agmt_cate_name = row.agmt_part;
          break;
        case "AGSP":
          agmt_cate_name = '平台公司';
          break;
        default:
          agmt_cate_name = "无";
          break;
      }
      return agmt_cate_name;
    },
  },
};
</script>
  
  <style>
</style>