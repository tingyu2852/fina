<template>
  <div>
    <div v-show="!dialogMt">
      <div class="custom-btn-wrap">
      <div class="add-custom-btn" @click="dialogMt = true">
        <i class="el-icon-plus"></i>新增下款
      </div>
    </div>
    <el-table
      style="margin-top: 16px"
      row-class-name="active-contnet"
      header-cell-class-name="active-header"
      :stripe="true"
      :data="mtList"
      border
    >
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
      <el-table-column label="下款项目" v-if="form.sub_project">
        <template slot-scope="{ row }">
          <el-tag
            style="margin-left: 5px; margin-bottom: 5px"
            type="primary"
            v-for="item in row.sub_project_list"
            :key="item"
            effect="dark"
            >{{ item }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="截止日期">
        <template slot-scope="{ row }">
          <span>{{ str_contet(row.start_end_date) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="匹配资本金">
        <template slot-scope="{ row }">
          <div class="custom-table-btn-wrap">
            <div class="edit-custom-table-btn" @click="showMaching(row)">
              <i style="padding-right: 3px" class="el-icon-view"></i>查看
            </div>
          </div>
          <!-- <el-button
                      type="primary"
                      size="mini"
                      @click="showMaching(row)"
                      >查看</el-button
                    > -->
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="{ row }">
          <div style="white-space: pre-line">{{ row.remark }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200">
        <template slot-scope="{ row }">
          <div class="custom-table-btn-wrap">
            <div class="edit-custom-table-btn" @click="mtEdit(row)">
              <i class="el-icon-edit"></i>编辑
            </div>
            <div class="delete-custom-table-btn" @click="delmt(row)">
              <i class="el-icon-delete"></i>删除
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="mtPre">上一步</el-button>
    <el-button type="primary" @click="mtNext">下一步</el-button>
    </div>
   <div style="width: 700px;" v-show="dialogMt">
    <!-- <el-dialog
      title="编辑下款信息"
      :visible.sync="dialogMt"
      width="700px"
      @close="handlerClose"
    > -->
      <!-- 自定义分割线 -->
      <div class="custom-horizontal-line"></div>
      <div class="dialog_body custom-dialog-table-body">
        <el-form
          :model="mt_form"
          label-width="100px"
          label-position="right"
          :rules="mtRules"
          ref="mt"
        >
          <el-form-item label="下款时间" prop="mt_date">
            <el-date-picker
              v-model="mt_form.mt_date"
              value-format="yyyy-MM-dd"
              placeholder="请选择下款时间"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="下款金额" prop="mt_sum">
            <el-input
              style="width: 200px"
              v-model="mt_form.mt_sum"
              placeholder="请填写下款金额"
              @input="mt_form.mt_sum = $format.formatInput(mt_form.mt_sum)"
            ></el-input>
          </el-form-item>
          <el-form-item label="下款项目" v-if="form.sub_project === 1">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
            <div style="margin: 15px 0"></div>
            <el-checkbox-group
              v-model="mt_form.sub_project_list"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="item in form.sub_project_list"
                :label="item"
                :key="item"
                >{{ item }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="截止日期" prop="start_end_date">
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
              placeholder="请选择下款截止日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <div style="display: flex; align-items: center">
            <div style="padding-right: 6px; font-weight: 700; font-size: 15px">
              <span>匹配资本金</span>
            </div>
            <div class="custom-btn-wrap">
              <div class="add-custom-btn" @click="addMatch">
                <i class="el-icon-plus"></i>新增
              </div>
            </div>
          </div>
          <!-- <el-form-item label="匹配资本金" label-position="top">
            <el-input
              v-model="mt_form.matching_capital"
              placeholder=""
              type="textarea"
            ></el-input> 
            <el-button type="primary" size="mini" @click="addMatch"
              >新增</el-button
            >
          </el-form-item> -->

          <el-table
            style="margin-bottom: 10px; margin-top: 12px"
            row-class-name="active-contnet"
            header-cell-class-name="active-header"
            :stripe="true"
            :data="mt_form.matching_capital"
            border
          >
            <el-table-column label="日期" min-width="100px">
              <template slot-scope="{ row }">
                <el-date-picker
                  size="mini"
                  v-model="row.date"
                  placeholder="请选择"
                  type="date"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="名称">
              <template slot-scope="{ row }"
                ><el-input
                  size="mini"
                  v-model="row.name"
                  placeholder=""
                ></el-input
              ></template>
            </el-table-column>
            <el-table-column label="金额">
              <template slot-scope="{ row }"
                ><el-input
                  size="mini"
                  v-model="row.num"
                  @input="row.num = $format.formatInput(row.num)"
                  placeholder=""
                ></el-input
              ></template>
            </el-table-column>
            <el-table-column label="收款人">
              <template slot-scope="{ row }">
                <el-select v-model="row.corp" placeholder="" size="mini">
                  <el-option
                    v-for="item in $store.state.select.corpList"
                    :label="item.corp_name"
                    :value="item.corp_name"
                    :key="item.corp_id"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="备注" min-width="100px">
              <template slot-scope="{ row }"
                ><el-input
                  v-model="row.remark"
                  placeholder=""
                  type="textarea"
                ></el-input
              ></template>
            </el-table-column>
          </el-table>
          <el-form-item label="备注">
            <el-input
              v-model="mt_form.remark"
              placeholder=""
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="custom-horizontal-line"></div>
      <div slot="footer" class="dialog-footer custom-dialog-btn-wrap">
        <div class="cancel-custom-dialog-btn" @click="dialogMt = false">
          取消
        </div>
        <div class="save-custom-dialog-btn" @click="mtSave">保存</div>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="mtSave">确 定</el-button>
      </span> -->
    <!-- </el-dialog> -->
   </div>
    <el-dialog title="匹配资本金" :visible.sync="dialogMatching" width="900px">
      <div class="custom-dialog-table-body" style="margin-top: 12px">
        <div class="custom-btn-wrap">
          <div class="add-custom-btn" @click="addMatching">
            <i class="el-icon-plus"></i>新增
          </div>
        </div>
        <!-- <el-button  type="primary" size="mini" @click="addMatching">新增</el-button> -->
        <el-table
          style="margin-top: 12px"
          row-class-name="active-contnet"
          header-cell-class-name="active-header"
          :stripe="true"
          :data="curMatching"
          border
        >
          <el-table-column label="日期" prop="date" min-width="100px">
            <template slot-scope="{ row }">
              <div v-if="!row.isEdit">{{ row.date }}</div>
              <el-date-picker
                v-else
                size="mini"
                v-model="row.date"
                placeholder="请选择"
                type="date"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="name">
            <template slot-scope="{ row }">
              <div v-if="!row.isEdit">{{ row.name }}</div>
              <el-input
                v-else
                size="mini"
                v-model="row.name"
                placeholder=""
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="金额" prop="num"
            ><template slot-scope="{ row }">
              <div v-if="!row.isEdit">{{ $format.money(row.num) }}</div>
              <el-input
                v-else
                size="mini"
                v-model="row.num"
                @input="$format.formatInput(row.num)"
                placeholder=""
              ></el-input> </template
          ></el-table-column>
          <el-table-column label="收款人" prop="corp">
            <template slot-scope="{ row }">
              <div v-if="!row.isEdit">{{ row.corp }}</div>
              <el-select v-else v-model="row.corp" placeholder="" size="mini">
                <el-option
                  v-for="item in $store.state.select.corpList"
                  :label="item.corp_name"
                  :value="item.corp_name"
                  :key="item.corp_id"
                ></el-option>
              </el-select> </template
          ></el-table-column>
          <el-table-column label="备注" prop="remark">
            <template slot-scope="{ row }">
              <div v-if="!row.isEdit">{{ row.remark }}</div>
              <el-input
                v-else
                v-model="row.remark"
                placeholder=""
                type="textarea"
              ></el-input
            ></template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="{ row, $index }">
              <div class="custom-table-btn-wrap">
                <div
                  v-show="row.isEdit"
                  class="save-custom-table-btn"
                  @click="mactingSave(row)"
                >
                  <i class="el-icon-document-checked"></i>保存
                </div>
                <div
                  v-show="!row.isEdit"
                  class="edit-custom-table-btn"
                  @click="$set(row, 'isEdit', true)"
                >
                  <i class="el-icon-edit"></i>编辑
                </div>
                <div
                  v-show="!row.isEdit"
                  class="delete-custom-table-btn"
                  @click="delMatch($index)"
                >
                  <i class="el-icon-delete"></i>删除
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog
      title="当前存在多条下款信息，请选择下款信息进行走款"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <el-radio-group v-model="curMt">
        <el-radio
          :label="item.mt_id"
          v-for="(item, index) in mtList"
          :key="item.mt_id"
          >{{ `下款信息${index + 1}` }}</el-radio
        >
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="nextConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "enterMt",
  props: {
    loanId: Number,
    projId:String
  },
  mounted() {
    if (this.loanId) {
      this.getMtList();
    } else {
      this.$emit("stepNext", 3);
    }
  },
  data() {
    return {
      mtList: [],
      dialogVisible: false,
      curMatching: [],
      dialogMt: false,
      dialogMatching: false,
      currentMt: null,
      curMt: null,
      mt_form: {
        mt_sum: null,
        mt_date: "",
        matching_capital: [],
        remark: "",
        start_end_date: "",
        sub_project_list: [],
        isIndeterminate: false,
        checkAll: false,
      },
      form: {},
      mtRules: {
        mt_sum: [
          { required: true, message: "请填写下款金额", trigger: "blur" },
        ],
        mt_date: [
          { required: true, message: "请选择下款日期", trigger: "blur" },
        ],
        start_end_date: [
          { required: true, message: "请选择截止日期", trigger: "blur" },
        ],
      },
      pickerOptions: {
        disabledDate: (time) => {
          return this.$dayjs(time).isBefore(this.$dayjs(this.form.loan_date));
        },
      },
    };
  },
  watch:{
    dialogMt(nv,ov){
      if(nv===false){
        this.handlerClose()
      }
    }
  },
  methods: {
    //获取下款列表
    async getMtList() {
      let res = await this.$API.enter.getMt(this.loanId);
      this.form = res.data.loanInfo;
      this.mtList = res.data.mtList;
      this.mtList.forEach((item) => {
        item.mt_sum = this.$format.money(item.mt_sum);
      });
      //console.log(res);
    },
    //下款信息编辑弹窗保存按钮
    mtSave() {
      this.$refs["mt"].validate(async (validate) => {
        if (validate) {
          let mt_info = { ...this.mt_form };
          mt_info.mt_sum = this.$format.restoreMoney(mt_info.mt_sum);
          mt_info.loan_id = this.loanId;
          let res = await this.$API.fina.addMt(mt_info);

          if (res.code == 20000) {
            this.getMtList();
            this.$message({ type: "success", message: "保存成功" });
          }
          this.dialogMt = false;
        } else {
          return false;
        }
      });
    },
    handleCheckAllChange(val) {
      console.log(val);
      // return
      this.loan_form.sub_project_list = val ? this.form.sub_project_list : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;

      this.checkAll = checkedCount === this.form.sub_project_list.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.form.sub_project_list.length;

      // this.isIndeterminate = !this.isIndeterminate
    },
    //下款编辑弹窗关闭回调
    handlerClose() {
      let obj = {
        mt_sum: null,
        mt_date: "",
        matching_capital: [],
        remark: "",
        start_end_date: "",
        sub_project_list: [],
      };
      this.mt_form = obj;
    },
    //下款信息编辑窗口内添加匹配资本金按钮触发
    addMatch() {
      this.mt_form.matching_capital.unshift({
        name: null,
        num: null,
        date: null,
        remark: null,
        corp: null,
      });
    },
    //用于显示字符串
    str_contet(str) {
      if (str) {
        return str;
      } else {
        return "无";
      }
    },
    //下款编辑
    mtEdit(row) {
      this.mt_form = { ...row };
      this.dialogMt = true;
    },
    //下款信息删除回调
    async delmt(row) {
      this.$confirm(
        "此操作将永久删除该下款信息及其所有子信息, 是否继续?",
        "警告",
        {
          confirmButtonText: "删除",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          let obj = {
            loan_id: this.form.loan_id,
            date: row.mt_date,
            mt_id: row.mt_id,
          };
          await this.$API.fina.delMt(obj);
          this.getMtList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {});
    },
    //匹配资本金窗口内新增按钮触发
    addMatching() {
      this.curMatching.unshift({
        name: null,
        num: null,
        date: null,
        remark: null,
        corp: null,
        isEdit: true,
      });
    },
    //查看匹配资本金触发
    async showMaching(row) {
      let res = await this.$API.fina.getMatch(row.mt_id);
      this.currentMt = row.mt_id;
      this.curMatching = res.data.matching;
      if (!this.curMatching) {
        this.curMatching = [];
      }
      this.curMatching.forEach((item) => {
        this.$set(item, "isEdit", false);
        item.num = this.$format.money(item.num);
      });
      this.dialogMatching = true;
    },
    //保存匹配资本金
    async mactingSave(row) {
      row.num = this.$format.restoreMoney(row.num);
      await this.$API.fina.addMatch({
        mt_id: this.currentMt,
        matching_capital: this.curMatching,
      });
      let res = await this.$API.fina.getMatch(this.currentMt);
      this.curMatching = res.data.matching;
      if (!this.curMatching) {
        this.curMatching = [];
      }
      this.curMatching.forEach((item) => {
        this.$set(item, "isEdit", false);
      });
    },
    //下一步按钮触发
    async mtNext() {
      if (this.mtList.length === 0) {
        return this.$message({
          type: "error",
          message: "请先添加下款信息",
        });
      } else if (this.mtList.length === 1) {
        this.$emit("setId", {
          name: "mt",
          id: this.mtList[0].mt_id,
        });
      } else {
        console.log(123123);
        return (this.dialogVisible = true);
      }
      await this.$API.enter.getNext('sp',this.loanId,this.projId)
      this.$emit("stepNext", 5);
    },
    async nextConfirm() {
      if(!this.curMt){
        return this.$message({
          type:'error',
          message:'请选择下款'
        })
      }
      await this.$API.enter.getNext('sp',this.loanId,this.projId)
      this.$emit("setId", {
        name: "mt",
        id: this.curMt,
      });

      this.$emit("stepNext", 5);
    },
    mtPre(){
      this.$emit('setId',{
        name:'loan',
        id:this.loanId
      })
      this.$emit('stepNext',3)
    }
  },
};
</script>

<style>
</style>