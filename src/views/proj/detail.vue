<template>
  <div>
    <el-card style="margin: 10px">
      <div style="margin: 10px; min-width: 800px">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
         
        >
          <!-- 基本信息 -->
          <el-tab-pane label="基本信息" name="proj">
            <projInfo @loanList="getLoanList" @setRep="setRepId" />
          </el-tab-pane>
          
          <!-- 借款信息 -->
          <el-tab-pane
            v-loading="loan_loading"
            :label="`借款信息${index + 1}`"
            :name="`loan${item.loan_id}`"
            :lazy="true"
            v-for="(item, index) in loanList"
            :key="item.loan_id"
            :loan_id="item.loan_id"
            
          >
            <Loan :loanInfo="{ a: '123', b: [1, 2, 3] }" @loanList="getLoanList" />
          </el-tab-pane>
          
          <!-- 其他信息 -->
          <el-tab-pane label="其他信息" name="fourth" :lazy="true"
            ><el-form label-position="top">
              
              <div style="display: flex; align-items: center">
                <div>
                  <span>1、融资费用：</span>
                </div>
                <div class="custom-btn-wrap">
                  <!-- <i
                    class="el-icon-plus"
                    style="color: #409eff; cursor: pointer"
                    @click="bondADD"
                  ></i> -->
                  <div class="add-custom-btn" @click="finADD"><i class="el-icon-plus"></i>新增</div>
                </div>
              </div>
              <el-form-item label="">
                <!-- <template #label>
                  <div style="display: flex; align-items: center">
                    <div>
                      <span></span>
                    </div>
                    <div>
                      <i
                        class="el-icon-plus"
                        style="color: #409eff; cursor: pointer"
                        @click="finADD"
                      ></i>
                    </div>
                  </div>
                </template> -->

                <el-table
                  style="margin-top: 12px;"
                  row-class-name="active-contnet" 
                  header-cell-class-name='active-header'  
                  :stripe="true" 
                  :data="finaList" 
                  border
                >
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
                       
                        placeholder="请输入"
                        @input="row.cost_sum = $format.formatInput(row.cost_sum)"
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
                  <el-table-column label="操作" width="200px" >
                    <template slot-scope="{ row }">
                      <div class="custom-table-btn-wrap">
                        <div v-show="row.isEdit" class="save-custom-table-btn"   @click="finaSave(row)"><i class="el-icon-document-checked"></i>保存</div>
                        <div v-show="!row.isEdit" class="edit-custom-table-btn"  @click="finaEdit(row)"><i class="el-icon-edit"></i>编辑</div>
                        <div v-show="!row.isEdit" class="delete-custom-table-btn"  @click="delFina(row)" ><i class="el-icon-delete"></i>删除</div>
                      </div>
                      <!-- <el-button
                        v-show="!row.isEdit"
                        type="primary"
                        size="mini"
                        icon="el-icon-edit-outline"
                        @click="finaEdit(row)"
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
                      </el-popconfirm> -->
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>

              <div class="custom-horizontal-line" style="margin-top:12px;margin-bottom:12px;"></div>

              <div style="display: flex; align-items: center">
                <div>
                  <span>2、保证担保：</span>
                </div>
                <div class="custom-btn-wrap">
                  <!-- <i
                    class="el-icon-plus"
                    style="color: #409eff; cursor: pointer"
                    @click="bondADD"
                  ></i> -->
                  <div class="add-custom-btn" @click="bondADD"><i class="el-icon-plus"></i>新增</div>
                </div>
              </div>

              <el-form-item label="">
                <!-- <template #label>
                  <div style="display: flex; align-items: center">
                    <div>
                      <span>保证担保</span>
                    </div>
                    <div class="custom-btn-wrap">
                      <i
                        class="el-icon-plus"
                        style="color: #409eff; cursor: pointer"
                        @click="bondADD"
                      ></i>
                    </div>
                  </div>
                </template> -->
                <el-table 
                  style="margin-top: 12px;"
                  row-class-name="active-contnet" 
                  header-cell-class-name='active-header'  
                  :stripe="true"  
                  :data="bondList" 
                  border
                >
                  <el-table-column label="担保人" prop="bond_name" >
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
                  <el-table-column label="操作" >
                    <template slot-scope="{ row }">
                      <div class="custom-table-btn-wrap">
                        <div v-show="row.isEdit" class="save-custom-table-btn"  @click="bondSave(row)"><i class="el-icon-document-checked"></i>保存</div>
                        <div v-show="!row.isEdit" class="edit-custom-table-btn"   @click="$set(row, 'isEdit', true)"><i class="el-icon-edit"></i>编辑</div>
                        <div v-show="!row.isEdit" class="delete-custom-table-btn"  @click="delBond(row)" ><i class="el-icon-delete"></i>删除</div>
                      </div>
                      <!-- <el-button
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
                      </el-popconfirm> -->
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>

             
              <div class="custom-horizontal-line" style="margin-top:12px;margin-bottom:12px;"></div>

              <div style="display: flex; align-items: center">
                <div>
                  <span>3、抵押担保：</span>
                </div>
                <div class="custom-btn-wrap">
                  <!-- <i
                    class="el-icon-plus"
                    style="color: #409eff; cursor: pointer"
                    @click="bondADD"
                  ></i> -->
                  <div class="add-custom-btn" @click="pawnADD"><i class="el-icon-plus"></i>新增</div>
                </div>
              </div>
              <el-form-item label="">
                <!-- <template #label>
                  <div style="display: flex; align-items: center">
                    <div>
                      <span>抵押担保</span>
                    </div>
                    <div>
                      <i
                        class="el-icon-plus"
                        style="color: #409eff; cursor: pointer"
                        @click="pawnADD"
                      ></i>
                    </div>
                  </div>
                </template> -->
                <el-table 
                  style="margin-top: 12px;"
                  row-class-name="active-contnet" 
                  header-cell-class-name='active-header'  
                  :stripe="true" 
                  :data="pawnList" 
                  border>
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
                        str_contet(row.pawn_remark)
                      }}</span>
                      <el-input
                        v-model="row.pawn_remark"
                        placeholder="请输入"
                        v-else
                      ></el-input> </template
                  ></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="{ row }">
                      <div class="custom-table-btn-wrap">
                        <div v-show="row.isEdit" class="save-custom-table-btn"  @click="pawnSave(row)"><i class="el-icon-document-checked"></i>保存</div>
                        <div v-show="!row.isEdit" class="edit-custom-table-btn"  @click="$set(row, 'isEdit', true)"><i class="el-icon-edit"></i>编辑</div>
                        <div v-show="!row.isEdit" class="delete-custom-table-btn"  @click="delPawn(row)" ><i class="el-icon-delete"></i>删除</div>
                      </div>
                      <!-- <el-button
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
                      </el-popconfirm> -->
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item> </el-form
          ></el-tab-pane>
        </el-tabs>
      </div>
      <!-- <money-input v-model="moneyInput" /> -->
    </el-card>

    
    
  </div>
</template>

<script>
import Loan from "./loan.vue";
import projInfo from "./projInfo.vue";
import otherInfo from "./otherInfo.vue";
import moneyInput from '@/views/proj/money-input'

import dayjs from "dayjs";
import MoneyInput from './money-input.vue';
export default {
  components: {
    Loan,
    projInfo,
    otherInfo,
    moneyInput,
    MoneyInput
  },
  data() {
    return {
      moneyInput:1000,
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
      // finaList: [
      //   {
      //     corp_name: "阿萨德",
      //     cost_date: "2023-08-13",
      //     cost_id: 3,
      //     cost_name: "买存款",
      //     cost_remark: null,
      //     cost_sum: 30000,
      //     isEdit: false,
      //     rep_id: 1,
      //   },
      // ],
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
        
      },
      finaList: [],
      bondList: [],
      pawnList: [],
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
      rep_id: null,
    };
  },
  watch: {
    // 'rep_form.rep_sum'(newv){
    //   this.rep_form.rep_sum =  this.formatInput(newv)
    // }
  },
  async mounted() {
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
      //设置rep_id
     setRepId(rep_id) {
      this.rep_id = rep_id;
      this.getBasics()
    },
    //获取一些基础的列表
    async getBasics(){
      let res = await this.$API.fina.getBasics(this.rep_id);
      this.finaList=res.data.finaList
      this.bondList=res.data.bondList
      this.pawnList=res.data.pawnList
      this.listIsEdit(this.finaList)
      this.listIsEdit(this.bondList)
      this.listIsEdit(this.pawnList)
    },
    //获取借款信息列表
    async getLoanList() {
      console.log('loanlist');
      let res = await this.$API.fina.getLoanList(this.$route.params.id);
      this.loanList = res.data.loanList;
      this.activeName="proj"
    }, 
    async getprojInfo() {
      this.proj_loding = true;
      let res = await this.$API.fina.getInfo("proj", this.$route.params.id);
      this.proj_form = { ...res.data.projInfo };
      this.proj_form.ysProjId = res.data.projInfo.proj_id;
      this.loanList = res.data.loanList;
     
      this.proj_loding = false;
    },
    //当tab标签被点击时触发
    async handleClick(tab, event) {
      //console.log(tab, event);
      //console.log(tab);
      let name = tab.name;
      if (name == "proj") {
      }
      
      if (name.substring(0, 4) == "loan") {
        this.loan_loading = true;
        

        setTimeout(() => {
          //console.log(tab.$children[0].)
          tab.$children[0].getInfo(tab.$attrs.loan_id);
          this.loan_loading = false;
        }, 100);
      }
      if (name == "fourth") {
      }
    },
    //用于显示字符串
    str_contet(str) {
      if (str) {
        return str;
      } else {
        return "无";
      }
    },
    
    //该函数用来给每条列表添加一个布尔值用来表示是否处于编辑状态
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
      this.finaList.unshift(obj);
     
    },
    //融资费用行内编辑按钮
    finaEdit(row){
      row.isEdit = true
      row.cost_sum = this.$format.money(row.cost_sum)
    },
    //融资费用行内保存按钮
    async finaSave(row) {
      row.rep_id = this.rep_id;
      let info = {...row}
      info.cost_sum = parseFloat(info.cost_sum.substring(1).replace(/,/g, ""))
      let res = await this.$API.fina.addCost(info);
      row.isEdit = false;
      this.$message({ type: "success", message: "保存成功" });
      this.getBasics();
    },
    //融资费用行内删除按钮
    async delFina(row) {
      let res = await this.$API.fina.delCost({ cost_id: row.cost_id });
      this.$message({ type: "success", message: "删除成功" });
      this.getBasics();
    },
    //保证担保行内添加按钮
    bondADD() {
      let obj = {
        bond_sum: 0,
        bond_name: "",
        bond_remark: "",
        isEdit: true,
      };
      this.bondList.unshift(obj);
    },
     //保证担保行内编辑按钮
    async bondSave(row) {
      row.rep_id = this.rep_id;
      let res = await this.$API.fina.addBond(row);
      row.isEdit = false;
      this.$message({ type: "success", message: "保存成功" });
      this.getBasics();
    },
     //保证担保行内删除按钮
    async delBond(row) {
      let res = await this.$API.fina.delBond({ bond_id: row.bond_id });
      this.$message({ type: "success", message: "删除成功" });
      this.getBasics();
    },
    //抵押担保行内添加按钮
    pawnADD() {
      let obj = {
        pawn_sum: 0,
        pawn_name: "",
        pawn_remark: "",
        pawn_bond: "",
        isEdit: true,
      };
      this.pawnList.unshift(obj);
    },
    //抵押担保行保存按钮
    async pawnSave(row) {
      row.rep_id = this.rep_id;
      let res = await this.$API.fina.addPawn(row);
      row.isEdit = false;
      this.$message({ type: "success", message: "保存成功" });
      this.getBasics();
    },
    //抵押担保行内删除按钮
    async delPawn(row) {
      let res = await this.$API.fina.delPawn({ pawn_id: row.pawn_id });
      this.$message({ type: "success", message: "删除成功" });
      this.getBasics();
    },
   
    //当借款信息tab上的关闭按钮点击时触发
    tabsRemove(a) {
      //console.log(a[4]);
      //获取要删除的借款信息id
      const loan_id = parseInt(a.substring(4));
     
      this.$confirm("此操作将永久删除该借款信息, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$API.fina.delLoan({ loan_id: loan_id });
          this.getLoanList()
          this.activeName="proj"
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
    //用于限制input输入
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
.has-gutter{
  line-height: 20px !important;
}
</style>