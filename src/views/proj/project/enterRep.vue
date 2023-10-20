<template>
  <div>
    <el-form
      :model="rep_form"
      :rules="repRules"
      ref="rep"
      label-position="right"
      label-width="110px"
    >
      <el-form-item label="是否银团">
        <el-switch
          v-model="rep_form.bank_consortium"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="金融机构" prop="bank_name">
        <el-select
          v-model="rep_form.bank_name"
          placeholder="请选择金融机构"
          :multiple="true"
          :multiple-limit="rep_form.bank_consortium === 0 ? 1 : 0"
        >
          <el-option
            v-for="item in $store.state.select.bankList"
            :label="item.bank_name"
            :value="item.bank_name"
            :key="item.bank_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="批复金额(元)" prop="rep_sum">
        <el-input
          v-model="rep_form.rep_sum"
          placeholder="请输入批复的金额"
          @input="rep_form.rep_sum = $format.formatInput(rep_form.rep_sum)"
        ></el-input>
      </el-form-item>
      <el-form-item label="批复时间" prop="rep_date">
        <el-date-picker
          v-model="rep_form.rep_date"
          type="date"
          placeholder="选择日期"
          format="yyyy年M月d日"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="期限(月)" prop="rep_limit">
        <el-input
          v-model="rep_form.rep_limit"
          type="number"
          placeholder="请输入期限"
          @input="onKeyPress"
        ></el-input>
      </el-form-item>
      <el-form-item label="还款来源" prop="rep_sou">
        <el-input
          v-model="rep_form.rep_sou"
          placeholder="请填写还款来源"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否创建子项目" label-width="120px">
        <el-switch
          v-model="rep_form.sub_project"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="子项目" v-if="rep_form.sub_project === 1">
        <el-tag
          :key="index"
          v-for="(tag, index) in rep_form.sub_project_list"
          closable
          :disable-transitions="false"
          @close="sub_handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button
          v-else
          class="button-new-tag"
          type="primary"
          plain
          size="small"
          @click="showInput"
          >+子项目</el-button
        >
      </el-form-item>
      <el-form-item label="备注说明">
        <el-input v-model="rep_form.rep_remark" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="$emit('stepNext',0)">上一步</el-button>
    <el-button type="primary" @click="repNext">下一步</el-button>
  </div>
</template>

<script>
export default {
  name: "enterRep",
  props:{
    projId:String
  },
  watch: {
    "rep_form.bank_consortium"(newv) {
      if (newv === 1) {
        // this.rep_form.bank_name = '';

        this.rep_form.bank_name = [];
      } else {
        this.rep_form.bank_name = "";
      }
    },
  },
  mounted() {
    if(this.projId){
      console.log(this.projId);
      this.getRep()
    }else{
      //console.log(123);
      
      this.$message({
        type: "error",
        message: "请先添加基础信息",
      });
      this.$emit('stepNext',0)
    }
  },
  data() {
    return {
     // curProj: "",
      inputVisible: false,
      inputValue: "",
      rep_form: {
        bank_consortium: 0,
        bank_name: [],
        rep_sum: null,
        rep_date: null,
        rep_sou: null,
        rep_limit: null,
        rep_remark: null,
        sub_project: 0,
        sub_project_list: [],
      },
      repRules: {
        bank_name: [
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
    };
  },
  watch:{
    
  },
  methods: {
    //如果projId存在发送请求获取批复信息
    async getRep(){
      let res = await this.$API.enter.getRep(this.projId)
      if(res.data.repInfo){
        this.rep_form=res.data.repInfo
        this.$set(
        this.rep_form,
        "bank_name",
        res.data.repInfo.bank_name.split(",")
      );     
      this.rep_form.rep_sum = this.$format.money(this.rep_form.rep_sum)
      }
    },
    //监听用户输入行为，只允许输入数字
    onKeyPress(event) {
      this.rep_form.rep_limit = parseInt(
        this.rep_form.rep_limit.replace(/[^0-9]/g, "")
      );
    },
    //子项目里tag标签关闭执行
    sub_handleClose(tag) {
      this.rep_form.sub_project_list.splice(
        this.rep_form.sub_project_list.indexOf(tag),
        1
      );
    },
    //点击添加子项目时显示文本输入框
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //保存输入完毕的子项目
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.rep_form.sub_project_list.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    repNext(){
      
      this.$refs["rep"].validate(async (validate) => {
        if (validate) {
          // console.log(123123);
          let repInfo = { ...this.rep_form };
          repInfo.bank_name = this.rep_form.bank_name.join(",");
          // console.log(repInfo.bank_name);
          repInfo.rep_sum = this.$format.restoreMoney(repInfo.rep_sum)
          repInfo.proj_id=this.projId
          
          let res =  await this.$API.enter.addRep(repInfo)
          await this.$API.enter.getNext('other',this.projId)
          
          this.$emit('stepNext', 2)
        } else {
          return false;
        }
      });

      return;
    }
    
  },
};
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>