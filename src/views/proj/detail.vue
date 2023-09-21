<template>
  <div>
    <el-card style="margin: 10px">
      <div style="margin: 10px; min-width: 800px">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          @tab-remove="tabsRemove"
        >
          <el-tab-pane label="基本信息" name="proj">
            <projInfo @loanList="getLoanList" />
          </el-tab-pane>
          <el-tab-pane
            label="批复信息"
            name="rep"
            :lazy="true"
            v-if="proj_form.isRep"
            v-loading="rep_loading"
          >
            <div style="width: 100%">
              <el-row :gutter="50">
                <el-col :span="10">
                  <el-form
                    :model="pf_form"
                    label-width="100px"
                    label-position="left"
                  >
                    <el-form-item label="是否银团">
                      <el-switch v-model="rep_form.yz"> </el-switch>
                    </el-form-item>
                    <el-form-item label="金融机构">
                      <el-select
                        v-if="rep_status"
                        v-model="rep_form.bank_name"
                        placeholder="请选择金融机构"
                      >
                        <el-option
                          v-for="item in bankList"
                          :label="item.bank_name"
                          :value="item.bank_name"
                          :key="item.bank_id"
                        ></el-option>
                      </el-select>
                      <span v-else> {{ str_contet(rep_form.bank_name) }}</span>
                    </el-form-item>
                    <el-form-item label="批复金额">
                      <el-input
                        v-if="rep_status"
                        v-model="rep_form.rep_sum"
                        placeholder=""
                        @input="
                          rep_form.rep_sum = $format.formatInput(
                            rep_form.rep_sum
                          )
                        "
                      ></el-input>
                      <span v-else>
                        {{ str_contet($format.money(rep_form.rep_sum)) }}</span
                      >
                    </el-form-item>
                    <el-form-item label="批复时间">
                      <el-date-picker
                        v-if="rep_status"
                        v-model="rep_form.rep_date"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy年M月d日"
                        value-format="yyyy-MM-dd"
                      >
                      </el-date-picker>
                      <span v-else> {{ str_contet(rep_form.rep_date) }}</span>
                    </el-form-item>
                    <el-form-item label="期限">
                      <!-- <el-input
                        v-if="rep_status"
                        v-model="rep_form.rep_limit"
                        type="number"
                        placeholder="请输入期限"
                      ></el-input> -->
                      <span> {{ str_contet(rep_form.rep_limit) }}</span>
                    </el-form-item>
                    <el-form-item label="还款来源">
                      <el-input
                        v-if="rep_status"
                        v-model="rep_form.rep_sou"
                        placeholder="请填写还款来源"
                      ></el-input>
                      <span v-else> {{ str_contet(rep_form.rep_sou) }}</span>
                    </el-form-item>
                    <el-form-item label="是否创建子项目" label-width="120px">
                      <el-switch v-model="rep_form.yz"> </el-switch>
                    </el-form-item>
                    <el-form-item label="备注说明">
                      <el-input
                        v-if="rep_status"
                        v-model="rep_form.rep_remark"
                        type="textarea"
                      ></el-input>
                      <span v-else>{{ str_contet(rep_form.rep_remark) }}</span>
                    </el-form-item>
                  </el-form>
                  <el-button
                    type="primary"
                    v-show="!rep_status"
                    @click="repBtn('update')"
                    >编辑</el-button
                  >
                  <el-button
                    type="primary"
                    v-show="!rep_status"
                    @click="repAddMt"
                    >添加借款信息</el-button
                  >
                  <el-button
                    type="primary"
                    v-show="rep_status"
                    @click="repBtn('save')"
                    >保存</el-button
                  >
                  <el-button
                    type="primary"
                    v-show="rep_status"
                    @click="repBtn('cancle')"
                    >取消</el-button
                  ></el-col
                >
                <el-col :span="14">
                  <el-form label-position="top">
                    <el-form-item label="asd">
                      <template #label>
                        <div style="display: flex; align-items: center">
                          <div>
                            <span>融资费用</span>
                          </div>
                          <div>
                            <i
                              class="el-icon-plus"
                              style="color: #409eff; cursor: pointer"
                              @click="finADD"
                              v-show="rep_status"
                            ></i>
                          </div>
                        </div>
                      </template>

                      <el-table :data="rep_form.finaList" border>
                        <el-table-column label="名称" prop="cost_name">
                          <template slot-scope="{ row }">
                            <span v-if="!row.isEdit">{{
                              str_contet(row.cost_name)
                            }}</span>
                            <el-input
                              v-model="row.cost_name"
                              placeholder="请输入"
                              v-else
                            ></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="金额" prop="cost_sum">
                          <template slot-scope="{ row }">
                            <span v-if="!row.isEdit">{{
                              str_contet($format.money(row.cost_sum))
                            }}</span>
                            <el-input
                              v-model="row.cost_sum"
                              type="number"
                              placeholder="请输入"
                              v-else
                            ></el-input> </template
                        ></el-table-column>
                        <el-table-column label="时间" prop="cost_date">
                          <template slot-scope="{ row }">
                            <span v-if="!row.isEdit">{{
                              str_contet(row.cost_date)
                            }}</span>

                            <el-date-picker
                              v-model="row.cost_date"
                              placeholder="请选择"
                              value-format="yyyy-MM-dd"
                              v-else
                            ></el-date-picker>
                          </template>
                        </el-table-column>
                        <el-table-column label="收款单位" prop="corp_name">
                          <template slot-scope="{ row }">
                            <span v-if="!row.isEdit">{{
                              str_contet(row.corp_name)
                            }}</span>

                            <el-select
                              v-model="row.corp_name"
                              placeholder="请选择"
                              v-else
                            >
                              <el-option
                                v-for="item in corpList"
                                :label="item.corp_name"
                                :value="item.corp_name"
                                :key="item.corp_id"
                              ></el-option>
                            </el-select> </template
                        ></el-table-column>
                        <el-table-column label="备注" prop="cost_remark">
                          <template slot-scope="{ row }">
                            <span v-if="!row.isEdit">{{
                              str_contet(row.cost_remark)
                            }}</span>
                            <el-input
                              v-model="row.cost_remark"
                              placeholder="请输入"
                              v-else
                            ></el-input> </template
                        ></el-table-column>
                        <el-table-column
                          label="操作"
                          width="150px"
                          v-if="rep_status"
                        >
                          <template slot-scope="{ row }">
                            <el-button
                              v-show="!row.isEdit"
                              type="primary"
                              size="mini"
                              icon="el-icon-edit-outline"
                              @click="$set(row, 'isEdit', true)"
                            ></el-button>
                            <el-button
                              v-show="row.isEdit"
                              type="primary"
                              size="mini"
                              icon="el-icon-check"
                              @click="finaSave(row)"
                            ></el-button>

                            <el-popconfirm
                              title="这是一段内容确定删除吗？"
                              @onConfirm="delFina(row)"
                            >
                              <el-button
                                v-show="!row.isEdit"
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
                    </el-form-item>
                    <el-form-item label="保证担保">
                      <template #label>
                        <div style="display: flex; align-items: center">
                          <div>
                            <span>保证担保</span>
                          </div>
                          <div>
                            <i
                              class="el-icon-plus"
                              style="color: #409eff; cursor: pointer"
                              @click="bondADD"
                              v-show="rep_status"
                            ></i>
                          </div>
                        </div>
                      </template>
                      <el-table :data="rep_form.bondList" border>
                        <!-- <el-table-column label="金额" prop="bond_sum">
                          <template slot-scope="{ row }">
                            <span v-if="!row.isEdit">{{
                              str_contet(row.bond_sum)
                            }}</span>
                            <el-input
                              v-model="row.bond_sum"
                              placeholder="请输入"
                              type="number"
                              v-else
                            ></el-input>
                          </template>
                        </el-table-column> -->
                        <el-table-column label="担保人" prop="bond_name">
                          <template slot-scope="{ row }">
                            <span v-if="!row.isEdit">{{
                              str_contet(row.bond_name)
                            }}</span>
                            <el-select
                              v-else
                              v-model="row.bond_name"
                              placeholder="请选择担保"
                            >
                              <el-option
                                v-for="item in corpList"
                                :label="item.corp_name"
                                :value="item.corp_name"
                                :key="item.corp_id"
                              ></el-option>
                            </el-select> </template
                        ></el-table-column>
                        <el-table-column label="备注" prop="bond_remark">
                          <template slot-scope="{ row }">
                            <span v-if="!row.isEdit">{{
                              str_contet(row.bond_remark)
                            }}</span>
                            <el-input
                              v-model="row.bond_remark"
                              placeholder="请输入"
                              v-else
                            ></el-input> </template
                        ></el-table-column>
                        <el-table-column label="操作" v-if="rep_status">
                          <template slot-scope="{ row }">
                            <el-button
                              v-show="!row.isEdit"
                              type="primary"
                              size="mini"
                              icon="el-icon-edit-outline"
                              @click="$set(row, 'isEdit', true)"
                            ></el-button>
                            <el-button
                              v-show="row.isEdit"
                              type="primary"
                              size="mini"
                              icon="el-icon-check"
                              @click="bondSave(row)"
                            ></el-button>

                            <el-popconfirm
                              title="这是一段内容确定删除吗？"
                              @onConfirm="delBond(row)"
                            >
                              <el-button
                                v-show="!row.isEdit"
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
                    </el-form-item>
                    <el-form-item label="抵押担保">
                      <template #label>
                        <div style="display: flex; align-items: center">
                          <div>
                            <span>抵押担保</span>
                          </div>
                          <div>
                            <i
                              class="el-icon-plus"
                              style="color: #409eff; cursor: pointer"
                              @click="pawnADD"
                              v-show="rep_status"
                            ></i>
                          </div>
                        </div>
                      </template>
                      <el-table :data="rep_form.pawnList" border>
                        <!-- <el-table-column label="金额" prop="pawn_sum">
                          <template slot-scope="{ row }">
                            <span v-if="!row.isEdit">{{
                              str_contet(row.pawn_sum)
                            }}</span>
                            <el-input
                              v-model="row.pawn_sum"
                              placeholder="请输入"
                              type="number"
                              v-else
                            ></el-input> </template
                        ></el-table-column> -->
                        <el-table-column label="押品" prop="pawn_name">
                          <template slot-scope="{ row }">
                            <span v-if="!row.isEdit">{{
                              str_contet(row.pawn_name)
                            }}</span>
                            <el-input
                              v-model="row.pawn_name"
                              placeholder="请输入"
                              v-else
                            ></el-input> </template
                        ></el-table-column>
                        <el-table-column label="所有权人" prop="pawn_bond">
                          <template slot-scope="{ row }">
                            <span v-if="!row.isEdit">{{
                              str_contet(row.pawn_bond)
                            }}</span>
                            <el-select
                              v-else
                              v-model="row.pawn_bond"
                              placeholder="请选择担保"
                            >
                              <el-option
                                v-for="item in corpList"
                                :label="item.corp_name"
                                :value="item.corp_name"
                                :key="item.corp_id"
                              ></el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column label="备注" prop="pawn_remark">
                          <template slot-scope="{ row }">
                            <span v-if="!row.isEdit">{{
                              str_contet(row.bond_sum)
                            }}</span>
                            <el-input
                              v-model="row.bond_sum"
                              placeholder="请输入"
                              type="number"
                              v-else
                            ></el-input> </template
                        ></el-table-column>
                        <el-table-column label="操作" v-if="rep_status">
                          <template slot-scope="{ row }">
                            <el-button
                              v-show="!row.isEdit"
                              type="primary"
                              size="mini"
                              icon="el-icon-edit-outline"
                              @click="$set(row, 'isEdit', true)"
                            ></el-button>
                            <el-button
                              v-show="row.isEdit"
                              type="primary"
                              size="mini"
                              icon="el-icon-check"
                              @click="pawnSave(row)"
                            ></el-button>

                            <el-popconfirm
                              title="这是一段内容确定删除吗？"
                              @onConfirm="delPawn(row)"
                            >
                              <el-button
                                v-show="!row.isEdit"
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
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane
            v-loading="loan_loading"
            :label="`借款信息${index + 1}`"
            :name="`loan${item.loan_id}`"
            :lazy="true"
            v-for="(item, index) in loanList"
            :key="item.loan_id"
            :loan_id="item.loan_id"
            :closable="true"
          >
            <Loan :loanInfo="{ a: '123', b: [1, 2, 3] }" @getInfos="getloan" />
          </el-tab-pane>
          <el-tab-pane label="其他信息" name="fourth" :lazy="true"
            >其他信息</el-tab-pane
          >
        </el-tabs>
      </div>
    </el-card>

    <el-dialog
      title="借款信息添加"
      :visible.sync="dialogMtInfo"
      @close="mtClose"
      width="600px"
    >
      <el-form :model="mt_form" label-width="100px" label-position="left">
        <el-form-item label="借款合同">
          <el-select
            v-model="mt_form.loan_con_id"
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
        <el-form-item label="借款金额">
          <el-input
            v-model="mt_form.loan_sum"
            placeholder="请填写借款金额"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="提交时间">
          <el-date-picker
            v-model="mt_form.loan_date"
            placeholder="请选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结息方式">
          <el-radio-group v-model="mt_form.inter_plan">
            <el-radio label="按年">按年</el-radio>
            <el-radio label="按季度">按季度</el-radio>
            <el-radio label="按月">按月</el-radio>
            <el-radio label="不规则">不规则</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="备注说明">
          <el-input
            v-model="mt_form.loan_remark"
            placeholder=""
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="addMtSave">保存</el-button>
      <el-button type="primary" @click="dialogMtInfo = false">取消</el-button>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="addRepDialog" width="600px">
      <el-form :model="pf_form" label-width="100px" label-position="left">
        <el-form-item label="是否银团">
          <el-switch v-model="rep_form.yz"> </el-switch>
        </el-form-item>
        <el-form-item label="金融机构">
          <el-select v-model="rep_form.bank_name" placeholder="请选择金融机构">
            <el-option
              v-for="item in bankList"
              :label="item.bank_name"
              :value="item.bank_name"
              :key="item.bank_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批复金额">
          <el-input v-model="rep_form.rep_sum" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="批复时间">
          <el-date-picker
            v-model="rep_form.rep_date"
            type="date"
            placeholder="选择日期"
            format="yyyy年M月d日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="期限">
          <el-input
            v-model="rep_form.rep_limit"
            type="number"
            placeholder="请输入期限"
          ></el-input>
        </el-form-item>
        <el-form-item label="还款来源">
          <el-input
            v-model="rep_form.rep_sou"
            placeholder="请填写还款来源"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否创建子项目" label-width="120px">
          <el-switch v-model="rep_form.yz"> </el-switch>
        </el-form-item>

        <el-form-item label="备注说明">
          <el-input v-model="rep_form.rep_remark" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRepDialog = false">取 消</el-button>
        <el-button type="primary" @click="addRepSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Loan from "./loan.vue";
import projInfo from "./projInfo.vue";
import otherInfo from "./otherInfo.vue";

import dayjs from "dayjs";
export default {
  components: {
    Loan,
    projInfo,
    otherInfo,
  },
  data() {
    return {
      loan_loading: true,
      rep_loading: true,
      addRepDialog: false,
      agmtList: [],
      loanList: [],
      dialogMtInfo: false,
      routeParams: this.$route.params,
      proj_loding: true,
      rep_status: false,
      radio: "",
      activeName: "proj",
      proj_form: {
        ysProjId: "",
        proj_name: "",
        corp_name: "",
        fina_name: "",
        proj_id: "",
        proj_remark: "",
        yz: false,
      },
      rep: {
        finaList: [
          {
            corp_name: "阿萨德",
            cost_date: "2023-08-13",
            cost_id: 3,
            cost_name: "买存款",
            cost_remark: null,
            cost_sum: 30000,
            isEdit: false,
            rep_id: 1,
          },
        ],
      },
      finaList: [
        {
          corp_name: "阿萨德",
          cost_date: "2023-08-13",
          cost_id: 3,
          cost_name: "买存款",
          cost_remark: null,
          cost_sum: 30000,
          isEdit: false,
          rep_id: 1,
        },
      ],
      rep_form: {
        proj_id: "",
        yz: false,
        bank_name: "",
        rep_sum: "",
        rep_date: "",
        rep_limit: "",
        rep_sou: "",
        Interest_settlement: "",
        rep_remark: "",
        finaList: [],
        bondList: [],
        pawnList: [],
      },
      form: {
        Interest_settlement: "",
      },
      mt_form: {
        loan_agmt_index_id: "",
        loan_sum: 0,
        loan_date: "",
        loan_remark: "",
        repayment_plan: "",
      },

      yz: false,
      pf_form: {
        jiexiCate: "",
      },
      corpList: [],
      finaCate: [],
      bankList: [],
      dialogVisible: false,
      info_status: false,
    };
  },
  watch: {
    // 'rep_form.rep_sum'(newv){
    //   this.rep_form.rep_sum =  this.formatInput(newv)
    // }
  },
  async mounted() {
    //this.calculateQuarters("2020-01-01", "2050-06-30");
    if (!this.$store.state.select.corpList.length) {
      await this.$store.dispatch("select/getSelcet");
    }
    this.getLoanList();
    this.corpList = { ...this.$store.state.select.corpList };
    this.finaCate = { ...this.$store.state.select.finaCate };
    this.bankList = { ...this.$store.state.select.bankList };
    this.agmtList = { ...this.$store.state.select.agmtList };
  },
  methods: {
    fuzujian() {
      console.log("123333333");
    },
    async getLoanList() {
      let res = await this.$API.fina.getLoanList(this.$route.params.id);
      this.loanList = res.data.loanList;
    },
    calculateQuarters(startDates, endDates) {
      const startDate = dayjs("2020-01-01");
      const endDate = dayjs("2050-07-30");
      // 计算季度数量
      const totalQuarters = Math.ceil(endDate.diff(startDate, "quarter", true));

      // 打印每个季度末月的10日
      for (let i = 0; i < totalQuarters; i++) {
        const quarterEndDate = startDate
          .add((i + 1) * 3 - 1, "month")
          .endOf("month");
        console.log(quarterEndDate.format("YYYY-MM-10"));
      }
    },
    handleClicks() {
      console.log("点击事件触发了");
    },
    async getprojInfo() {
      this.proj_loding = true;
      let res = await this.$API.fina.getInfo("proj", this.$route.params.id);
      this.proj_form = { ...res.data.projInfo };
      this.proj_form.ysProjId = res.data.projInfo.proj_id;
      this.loanList = res.data.loanList;
      console.log(res.data);
      this.proj_loding = false;
    },
    async handleClick(tab, event) {
      //console.log(tab, event);
      //console.log(tab);
      let name = tab.name;
      if (name == "proj") {
      }
      if (name == "rep") {
        this.rep_form.proj_id = this.proj_form.ysProjId;
        this.getRepInfo();
      }
      if (name.substring(0, 4) == "loan") {
        this.loan_loading = true;
        console.log(tab.$attrs.loan_id);

        setTimeout(() => {
          //console.log(tab.$children[0].)
          tab.$children[0].getInfo(tab.$attrs.loan_id);
          this.loan_loading = false;
        }, 100);
      }
      if (name == "fourth") {
      }
    },
    handleClose() {},
    save_btn() {
      this.rep_form.Interest_settlement = this.form.Interest_settlement;

      this.dialogVisible = false;
    },
    str_contet(str) {
      if (str) {
        return str;
      } else {
        return "无";
      }
    },
    async projBtn(name) {
      switch (name) {
        case "update":
          this.info_status = true;
          break;
        case "save":
          await this.$API.fina.addProj("update", this.proj_form);
          this.$message({ type: "success", message: "修改成功" });
          //this.$route.params.id=this.proj_form.proj_id
          this.routeParams.id = this.proj_form.proj_id;

          this.getprojInfo();
          this.info_status = false;
          break;
        case "cancle":
          this.getprojInfo();
          this.info_status = false;
          break;
        default:
          break;
      }
    },
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
    async getRepInfo() {
      this.rep_loading = true;
      let res1 = await this.$API.fina.getInfo("rep", this.proj_form.ysProjId);
      this.rep_form = res1.data.repInfo;

      this.rep_form.rep_sum = this.$format.money(this.rep_form.rep_sum);
      console.log(this.rep_form);
      for (let key in this.rep_form) {
        if (Array.isArray(this.rep_form[key])) {
          this.listIsEdit(this.rep_form[key]);
        }
      }
      this.rep_loading = false;
    },
    //批复信息内按钮
    async repBtn(name) {
      switch (name) {
        case "update":
          this.rep_status = true;
          break;
        case "save":
          const formObj = { ...this.rep_form };
          formObj.rep_sum = parseFloat(
            this.rep_form.rep_sum.substring(1).replace(/,/g, "")
          );
          console.log(formObj);

          let res = await this.$API.fina.addRep(formObj);
          if (res.code == 20000) {
            this.$message({ type: "success", message: "修改成功" });
          } else {
            this.$message({ type: "error", message: "失败" });
          }
          this.getRepInfo();
          //this.rep_form = res1.data.repInfo;
          this.rep_status = false;
          break;
        case "cancle":
          this.getRepInfo();
          this.rep_status = false;
          break;
        default:
          break;
      }
    },
    eidt_btn(row) {
      console.log(row.isEdit);
      //row.isEdit = true;
      this.$set(row, "isEdit", true);
      console.log(row.isEdit);
    },
    //融资费用行内添加按钮
    finADD() {
      let obj = {
        corp_name: "",
        cost_date: "",
        cost_id: "",
        cost_name: "",
        cost_remark: "",
        cost_sum: 0,
        isEdit: true,
      };
      this.rep_form.finaList.unshift(obj);
    },
    async finaSave(row) {
      row.rep_id = this.rep_form.rep_id;
      let res = await this.$API.fina.addCost(row);
      row.isEdit = false;
      this.$message({ type: "success", message: "保存成功" });
      this.getRepInfo();
    },
    async delFina(row) {
      let res = await this.$API.fina.delCost({ cost_id: row.cost_id });
      this.$message({ type: "success", message: "删除成功" });
      this.getRepInfo();
    },
    //融资费用行内添加按钮
    bondADD() {
      let obj = {
        bond_sum: 0,
        bond_name: "",
        bond_remark: "",
        isEdit: true,
      };
      this.rep_form.bondList.unshift(obj);
    },
    async bondSave(row) {
      row.rep_id = this.rep_form.rep_id;
      let res = await this.$API.fina.addBond(row);
      row.isEdit = false;
      this.$message({ type: "success", message: "保存成功" });
      this.getRepInfo();
    },
    async delBond(row) {
      let res = await this.$API.fina.delBond({ bond_id: row.bond_id });
      this.$message({ type: "success", message: "删除成功" });
      this.getRepInfo();
    },
    //融资费用行内添加按钮
    pawnADD() {
      let obj = {
        pawn_sum: 0,
        pawn_name: "",
        pawn_remark: "",
        pawn_bond: "",
        isEdit: true,
      };
      this.rep_form.pawnList.unshift(obj);
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
    getloan() {},
    //批复信息内添加借款信息按钮
    repAddMt() {
      this.dialogMtInfo = true;
    },
    mtClose() {
      console.log(123);
    },
    addRep() {
      this.addRepDialog = true;
    },
    async addRepSave() {
      this.rep_form.proj_id = this.proj_form.ysProjId;
      let res = await this.$API.fina.addRep(this.rep_form);
      if (res.code == 20000) {
        this.$message({ type: "success", message: "修改成功" });
        this.getprojInfo();
      } else {
        this.$message({ type: "error", message: "失败" });
      }

      this.addRepDialog = false;
    },
    async addMtSave() {
      console.log("123123");
      this.mt_form.rep_id = this.rep_form.rep_id;

      this.mt_form.rep_limit = this.rep_form.rep_limit;
      console.log(this.mt_form);
      //console.log(endDate);
      //return
      //this.repBtn('save')
      //let res = await this.$API.fina.addMt(this.mt_form)

      let res = await this.$API.fina.addLoan(this.mt_form);
      if (res.code == 20000) {
        this.$message({ type: "success", message: "修改成功" });
      } else {
        this.$message({ type: "error", message: "失败" });
      }
      this.getprojInfo();
      //this.rep_status = false;

      this.dialogMtInfo = false;
    },
    tabsRemove(a) {
      //console.log(a[4]);
      const loan_id = parseInt(a.substring(4));
      console.log(loan_id);
      this.$confirm("此操作将永久删除该借款信息, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$API.fina.delLoan({ loan_id: loan_id });
          this.getprojInfo();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    formatInput(number) {
      // 限制只允许输入数字和小数点
      number = number.replace(/[^\d.]/g, "");

      // 格式化数字为带逗号的字符串
      if (number.includes(".")) {
        const parts = number.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        parts[1] = parts[1].slice(0, 2); // 限制小数位数最多为两位
        number = "￥" + parts.join(".");
      } else {
        number = "￥" + number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return number;
    },
    saveData() {
      // 将格式化后的字符串转换为数字类型数据
      const formattedNumber = parseFloat(
        this.rep_form.rep_sum.replace(/,/g, "")
      );
      // 发送数据给后端
      // ...
    },
  },
};
</script>

<style>
.lable-click {
  cursor: pointer;
}
</style>