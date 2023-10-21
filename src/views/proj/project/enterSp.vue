<template>
  <div>
    <div v-show="!dialogSp">
      <div class="custom-btn-wrap">
        <div class="add-custom-btn" @click="dialogSp = true">
          <i class="el-icon-plus"></i>新增下款
        </div>
      </div>
      <el-table
        style="margin-top: 12px"
        row-class-name="active-contnet"
        header-cell-class-name="active-header"
        :stripe="true"
        :data="spList"
        border
      >
        <el-table-column label="收款单位" prop="corp_name"></el-table-column>
        <el-table-column label="走款时间" prop="sp_date"></el-table-column>
        <el-table-column label="走款金额" prop="sp_num">
          <template slot-scope="{ row }">
            <div>
              {{ $format.money(row.sp_num) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="回款金额" prop="refund">
          <template slot-scope="{ row }">
            <div>
              {{ $format.money(row.refund) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="实际支付金额"
          prop="actul_num"
          min-width="100px"
        >
          <template slot-scope="{ row }">
            <div>
              {{ $format.money(row.actul_num) }}
            </div>
          </template></el-table-column
        >
        <el-table-column label="用途" prop="sp_use"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="操作" prop="remark" min-width="140px">
          <template slot-scope="{ row }">
            <div class="custom-table-btn-wrap">
              <div class="edit-custom-table-btn" @click="spEdit(row)">
                <i class="el-icon-edit"></i>编辑
              </div>
              <div class="delete-custom-table-btn">
                <i class="el-icon-delete"></i>删除
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="spPre">上一步</el-button>
      <el-button type="primary" @click="endBtn">完成</el-button>
    </div>
    <div v-show="dialogSp" style="width: 600px">
      <!-- <el-dialog
      width="500px"
      title="走款信息"
      :visible.sync="dialogSp"
      @close="handleClose"
    > -->
      <!-- 自定义分割线 -->
      <div class="custom-horizontal-line"></div>
      <div class="dialog_body custom-dialog-body">
        <el-form
          label-width="100px"
          label-position="right"
          :model="sp_form"
          :rules="spRules"
          ref="sp"
        >
          <el-form-item label="收款单位" prop="corp_name">
            <el-select
              v-model="sp_form.corp_name"
              placeholder="请选择收款单位"
              filterable
            >
              <el-option
                v-for="item in $store.state.select.corpList"
                :label="item.corp_name"
                :value="item.corp_name"
                :key="item.agmt_index_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="走款时间" prop="sp_date">
            <el-date-picker
              v-model="sp_form.sp_date"
              placeholder="请选择日期"
              value-format="yyyy-MM-dd"
              :picker-options="sp_pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="走款金额" prop="sp_num">
            <el-input
              style="width: 200px"
              v-model="sp_form.sp_num"
              @input="sp_form.sp_num = $format.formatInput(sp_form.sp_num)"
              placeholder="请输入走款金额"
            ></el-input>
          </el-form-item>
          <el-form-item label="回款金额" prop="refund"
            ><el-input
              style="width: 200px"
              v-model="sp_form.refund"
              @input="sp_form.refund = $format.formatInput(sp_form.refund)"
              placeholder="请输入回款金额"
            ></el-input
          ></el-form-item>
          <el-form-item label="实际支付金额" prop="actul_num"
            ><el-input
              style="width: 200px"
              v-model="sp_form.actul_num"
              @input="
                sp_form.actul_num = $format.formatInput(sp_form.actul_num)
              "
              placeholder="请输入实际支付金额"
            ></el-input
          ></el-form-item>
          <el-form-item label="用途" prop="sp_use"
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
      </div>
      <div class="custom-horizontal-line"></div>
      <div slot="footer" class="dialog-footer custom-dialog-btn-wrap">
        <div class="cancel-custom-dialog-btn" @click="dialogSp = false">
          取消
        </div>
        <div class="save-custom-dialog-btn" @click="spSave">保存</div>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="spSave">确 定</el-button>
        </span> -->
      <!-- </el-dialog> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "enterSp",

  props: {
    mtId: Number,
    projId: String,
  },
  data() {
    return {
      spList: [],
      mtInfo: {},
      dialogSp: false,
      sp_form: {
        sp_date: "",
        corp_name: "",
        sp_num: null,
        refund: null,
        actul_num: null,
        sp_use: "",
        remark: "",
      },
      sp_pickerOptions: {
        disabledDate: (time) => {
          return this.$dayjs(time).isBefore(this.$dayjs(this.mtInfo.mt_date));
        },
      },
      spRules: {
        sp_num: [
          { required: true, message: "请填写走款金额", trigger: "blur" },
        ],
        refund: [
          { required: true, message: "请填写回款金额", trigger: "blur" },
        ],
        actul_num: [
          { required: true, message: "请填写实际支付金额", trigger: "blur" },
        ],
        sp_date: [
          { required: true, message: "请选择走款日期", trigger: "blur" },
        ],
        sp_use: [{ required: true, message: "请填写用途", trigger: "blur" }],
        corp_name: [
          { required: true, message: "请选择收款单位", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    if (this.mtId) {
      this.getSpList();
    } else {
      this.$emit("stepNext", 4);
    }
  },
  watch: {
    dialogSp(nv, ov) {
      if (nv === false) {
        this.handleClose();
      }
    },
  },
  methods: {
    async getSpList() {
      let res = await this.$API.enter.getSp(this.mtId);
      this.spList = res.data.spList;
      this.mtInfo = this.mtInfo;
      this.spList.forEach((item) => {
        item.sp_num = this.$format.money(item.sp_num);
        item.refund = this.$format.money(item.refund);
        item.actul_num = this.$format.money(item.actul_num);
      });
      console.log(res);
    },
    handleClose() {
      this.sp_form = {
        sp_date: "",
        corp_name: "",
        sp_num: null,
        refund: null,
        actul_num: null,
        sp_use: "",
        remark: "",
      };
    },
    async spSave() {
      this.$refs["sp"].validate(async (validate) => {
        if (validate) {
          //this.sp_form.mt_id = this.mtId;
          let sp_info = { ...this.sp_form };
          sp_info.mt_id = this.mtId;
          sp_info.sp_num = parseFloat(
            sp_info.sp_num.substring(1).replace(/,/g, "")
          );
          sp_info.refund = parseFloat(
            sp_info.refund.substring(1).replace(/,/g, "")
          );
          sp_info.actul_num = parseFloat(
            sp_info.actul_num.substring(1).replace(/,/g, "")
          );
          let res = await this.$API.fina.addSp(sp_info);
          this.getSpList();
          if (res.code == 20000) {
            this.$message({ type: "success", message: "保存成功" });
          }
          this.dialogSp = false;
        } else {
          return false;
        }
      });
      return;
    },
    //走款编辑
    spEdit(row) {
      this.sp_form = { ...row };
      this.dialogSp = true;
    },
    spPre() {
      this.$emit("setId", {
        name: "mt",
        id: this.mtId,
      });
      this.$emit("stepNext", 4);
    },
    async endBtn() {
      this.$confirm("确定完成该项目的录入吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.$emit("setId", {
            name: "proj_end",
          });
          await this.$API.enter.getNext("end", null, this.projId);
          this.$emit("seiId", {
            name: "proj_end",
          });
          this.$emit("stepNext", 0);
          this.$router.push({
            path: `/projs/enter`,
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style>
</style>