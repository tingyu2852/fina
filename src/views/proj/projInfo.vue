<template>
  <div>
    <el-row :gutter="50" v-loading="proj_loding">
      <el-col :span="10">
        <div>
          <el-form
            :model="proj_form"
            ref="proj"
            :rules="infoRules"
            label-width="100px"
            label-position="left"
          >
            <el-form-item label="项目名称" prop="proj_name">
              <el-input
                v-model="proj_form.proj_name"
                placeholder=""
                v-if="is_status"
              ></el-input>
              <span v-else>{{ str_contet(proj_form.proj_name) }}</span>
            </el-form-item>
            <el-form-item label="项目编号">
              <span>{{ str_contet(proj_form.proj_id) }}</span>
            </el-form-item>
            <el-form-item label="融资主体" prop="corp_name">
              <el-select
                v-model="proj_form.corp_name"
                placeholder="请选择融资主体"
                v-if="is_status"
              >
                <el-option
                  v-for="item in corpList"
                  :label="item.corp_name"
                  :value="item.corp_name"
                  :key="item.corp_id"
                ></el-option>
              </el-select>
              <span v-else>{{ str_contet(proj_form.corp_name) }}</span>
            </el-form-item>
            <el-form-item label="融资类型" prop="fina_name">
              <el-select
                v-model="proj_form.fina_name"
                placeholder="请选择融资类型"
                v-if="is_status"
              >
                <el-option
                  v-for="item in finaCate"
                  :label="item.fina_name"
                  :value="item.fina_name"
                  :key="item.fina_id"
                ></el-option>
              </el-select>
              <span v-else>{{ str_contet(proj_form.fina_name) }}</span>
            </el-form-item>
            <el-form-item label="是否隐债" :disabled="!is_status">
              <el-switch v-model="proj_form.yz" :disabled="!is_status">
              </el-switch>
            </el-form-item>
            <el-form-item label="项目说明">
              <el-input
                v-model="proj_form.proj_remark"
                type="textarea"
                v-if="is_status"
              ></el-input>
              <span v-else>{{ str_contet(proj_form.rz_id) }}</span>
            </el-form-item>
            <!-- <el-button
              type="primary"
              v-show="!is_status"
              @click="projBtn('update')"
              >编辑</el-button
            >
            <el-button
              type="primary"
              v-show="is_status"
              @click="projBtn('save')"
              >保存</el-button
            >

            <el-button
              type="primary"
              v-show="is_status"
              @click="projBtn('cancle')"
              >取消</el-button
            > -->
          </el-form>
        </div></el-col
      >
      <el-col :span="10">
        <el-form
          :model="rep_form"
          ref="rep"
          :rules="repRules"
          label-width="100px"
          label-position="left"
        >
          <el-form-item label="是否银团">
            <el-switch
              v-model="rep_form.bank_consortium"
              :active-value="1"
              :inactive-value="0"
              :disabled="!is_status"
              @change="swichange"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="金融机构" prop="array_bank_name">
            <el-select
              v-if="is_status"
              v-model="rep_form.array_bank_name"
              placeholder="请选择金融机构"
              :multiple="true"
              :multiple-limit="rep_form.bank_consortium === 0 ? 1 : 0"
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
          <el-form-item label="批复金额" prop="rep_sum">
            <el-input
              v-if="is_status"
              v-model="rep_form.rep_sum"
              placeholder=""
              @input="rep_form.rep_sum = $format.formatInput(rep_form.rep_sum)"
            ></el-input>
            <span v-else>
              {{ str_contet($format.money(rep_form.rep_sum)) }}</span
            >
          </el-form-item>
          <el-form-item label="批复时间" prop="rep_date">
            <el-date-picker
              v-if="is_status"
              v-model="rep_form.rep_date"
              type="date"
              placeholder="选择日期"
              format="yyyy年M月d日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <span v-else> {{ str_contet(rep_form.rep_date) }}</span>
          </el-form-item>
          <el-form-item label="期限" prop="rep_limit">
            <el-input
              v-if="is_status"
              v-model="rep_form.rep_limit"
              type="number"
              placeholder="请输入期限"
            ></el-input>
            <span v-else> {{ str_contet(rep_form.rep_limit) }}</span>
          </el-form-item>
          <el-form-item label="还款来源" prop="rep_sou">
            <el-input
              v-if="is_status"
              v-model="rep_form.rep_sou"
              placeholder="请填写还款来源"
            ></el-input>
            <span v-else> {{ str_contet(rep_form.rep_sou) }}</span>
          </el-form-item>
          <el-form-item label="是否创建子项目" label-width="120px">
            <el-switch
              v-model="rep_form.sub_project"
              :active-value="1"
              :inactive-value="0"
              :disabled="!is_status"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="备注说明">
            <el-input
              v-if="is_status"
              v-model="rep_form.rep_remark"
              type="textarea"
            ></el-input>
            <span v-else>{{ str_contet(rep_form.rep_remark) }}</span>
          </el-form-item>
        </el-form>
        <!-- <el-button type="primary" v-show="!is_status" @click="repBtn('update')"
          >编辑</el-button
        >
        <el-button type="primary" v-show="!is_status" @click="repAddMt"
          >添加借款信息</el-button
        >
        <el-button type="primary" v-show="is_status" @click="repBtn('save')"
          >保存</el-button
        >
        <el-button type="primary" v-show="is_status" @click="repBtn('cancle')"
          >取消</el-button
        > --></el-col
      >
    </el-row>
    <el-button type="primary" v-show="!is_status" @click="edit_btn"
      >编辑</el-button
    >
    <el-button type="primary" v-show="is_status" @click="save_btn"
      >保存</el-button
    >
    <el-button type="primary" v-show="is_status" @click="cancle_btn"
      >取消</el-button
    >
    <el-button type="primary" v-show="!is_status" @click="dialogLoan = true"
      >添加借款信息</el-button
    >
    <div>
      <el-dialog
        title="借款信息添加"
        :visible.sync="dialogLoan"
        @close="loanClose"
        width="600px"
      >
        <el-form ref="loan" :model="loan_form" :rules="loanRules" label-width="100px" label-position="left">
          <el-form-item label="借款金额" :prop="loan_form.is_actual===0?'loan_sum':''">
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
              :disabled="loan_form.is_actual===1"
              @input="loan_form.loan_sum = $format.formatInput(loan_form.loan_sum)"
            ></el-input>
          </el-form-item>
          <el-form-item label="提交日期" prop="loan_date">
            <el-date-picker
              v-model="loan_form.loan_date"
              placeholder="请选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="付息" prop="inter_plan">
           <el-input v-model="loan_form.inter_plan" placeholder="请填写"></el-input>
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
            <el-input v-model="loan_form.rate" placeholder="请输入基准利率(%)" type="number"></el-input>
          </el-form-item>
          <el-form-item label="备注说明">
            <el-input
              v-model="loan_form.loan_remark"
              placeholder=""
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="loan_save">保存</el-button>
        <el-button type="primary" @click="dialogLoan = false">取消</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "projInfo",
  data() {
    return {
      loan_radio:null,
      dialogLoan: false,
      is_status: false,
      proj_loding: false,
      proj_form: {
        proj_name: "",
        corp_name: "",
        fina_name: "",
        proj_remark: null,
        hidden_debt: 0,
      },
      rep_form: {
        bank_consortium: 0,
        bank_name: [],
        rep_sum: null,
        rep_date: null,
        rep_sou: null,
        rep_limit: null,
        rep_remark: null,
        sub_project: 0,
      },
      loan_form: {
        is_float_rate: 0,
        loan_sum:null,
        loan_date:null,
        is_actual:0,
        rate:null,
        loan_remark:null
      },
      infoRules: {
        proj_name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
        corp_name: [
          { required: true, message: "请选择融资主体", trigger: "blur" },
        ],
        fina_name: [{ required: true, message: "请选择类型", trigger: "blur" }],
      },
      repRules: {
        array_bank_name: [
          { required: true, message: "请选择金融机构", trigger: "blur" },
        ],
        rep_sum: [
          { required: true, message: "请输入批复金额", trigger: "blur" },
        ],
        rep_date: [
          { required: true, message: "请选择批复日期", trigger: "blur" },
        ],
        rep_sou: [
          { required: true, message: "请输入还款来源", trigger: "blur" },
        ],
        rep_limit: [{ required: true, message: "请输入期限", trigger: "blur" }],
      },
      loanRules:{
        loan_sum: [
          { required: true, message: "请填写借款金额", trigger: "blur" },
        ],
        loan_date: [
          { required: true, message: "请选择提交日期", trigger: "blur" },
        ],
        inter_plan: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        rate: [
          { required: true, message: "请输入利率", trigger: "blur" },
        ],
      },
      bankList: [],
      corpList: [],
      finaCate: [],
      proj_form_copy: {},
      rep_form_copy: {},
    };
  },
  mounted() {
    this.getProjInfo();
    setTimeout(() => {
      this.corpList = { ...this.$store.state.select.corpList };
      this.finaCate = { ...this.$store.state.select.finaCate };
      this.bankList = { ...this.$store.state.select.bankList };
    }, 100);
    //this.$emit('abcde')
  },
  watch: {
    // "rep_form.array_bank_name": {
    //   handler(newv) {
    //     console.log("----");
    //     // this.rep_form.bank_name = '';
    //     this.rep_form.array_bank_name = [];
    //   },
    //   //immediate:false
    // },
  },
  methods: {
    //格式化字符串内容
    str_contet(str) {
      if (str) {
        return str;
      } else {
        return "无";
      }
    },
    //获取基本信息函数
    async getProjInfo() {
      this.proj_loding = true;
      let res = await this.$API.fina.getInfo("proj", this.$route.params.id);
      this.proj_form = { ...res.data.projInfo };
      //this.proj_form.ysProjId = res.data.projInfo.proj_id;
      this.rep_form = res.data.repInfo;
      this.rep_form.rep_sum = this.$format.money(this.rep_form.rep_sum);
      //this.rep_form.array_bank_name = res.data.repInfo.bank_name.split(",");
      //console.log(this.rep_form.array_bank_name);
      this.$set(
        this.rep_form,
        "array_bank_name",
        res.data.repInfo.bank_name.split(",")
      );
      //this.loanList = res.data.loanList;
      console.log(res.data);
      this.proj_loding = false;
    },
    swichange() {
      this.rep_form.array_bank_name = [];
      console.log(123);
    },
    //编辑按钮
    edit_btn() {
      this.is_status = true;
      this.proj_form_copy = { ...this.proj_form };
      this.rep_form_copy = { ...this.rep_form };
    },
    //取消按钮
    cancle_btn() {
      this.is_status = false;
      this.proj_form = { ...this.proj_form_copy };
      this.rep_form = { ...this.rep_form_copy };
      this.$refs["proj"].resetFields();
      this.$refs["rep"].resetFields();
    },
    //保存按钮
    async save_btn() {
      this.$refs["proj"].validate((validate) => {
        if (validate) {
          this.$refs["rep"].validate(async (isValidate) => {
            if (isValidate) {
              let repInfo = { ...this.rep_form };

              repInfo.bank_name = this.rep_form.array_bank_name.join(",");
              repInfo.rep_sum = parseFloat(
                this.rep_form.rep_sum.substring(1).replace(/,/g, "")
              );
              console.log(repInfo.bank_name);
              await this.$API.fina.addProj("update", {
                projForm: this.proj_form,
                repForm: repInfo,
              });
              this.$message({ type: "success", message: "修改成功" });
              //this.$route.params.id=this.proj_form.proj_id
              // this.routeParams.id = this.proj_form.proj_id;

              this.getProjInfo();
              this.is_status = false;
            } else {
              return false;
            }
          });
        } else {
          return false;
        }
      });
    },
    //借款信息添加窗口关闭时的回调函数
    loanClose() {
      this.$refs['loan'].resetFields()
    },
    //借款信息添加保存按钮回调
    loan_save(){
      this.$refs['loan'].validate(async validate =>{
        if(validate){
          let loan_info = {...this.loan_form}
          if(loan_info.is_actual===1){
            loan_info.loan_sum=0
          }else{
            loan_info.loan_sum=parseFloat(
                this.loan_form.loan_sum.substring(1).replace(/,/g, "")
              );
          }
          loan_info.rate = parseFloat((loan_info.rate/100).toFixed(2))
          loan_info.rep_id = this.rep_form.rep_id
          loan_info.rep_limit = this.rep_form.rep_limit
          console.log(loan_info);
          await this.$API.fina.addLoan(loan_info)
          this.$emit('loanList')
          this.dialogLoan = false
        }else{
          return false
        }
      })
      
    },
    //借款金额按钮触发
    is_actual_change(){
      if(this.loan_form.is_actual===1){
        this.$refs['loan'].resetFields()
      }
    }
  },
};
</script>

<style>
</style>