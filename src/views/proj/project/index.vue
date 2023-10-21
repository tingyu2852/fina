<template>
  <div class="content-wrap">
    <el-card style="margin: 0 auto">
      <!-- 步骤条 -->
      <el-steps :active="activeStatus" simple>
        <el-step
          class="custom-step"
          @click.native="handleStepClick(0)"
          title="基础信息"
          icon="el-icon-edit"
        ></el-step>
        <el-step
          class="custom-step"
          @click.native="handleStepClick(1)"
          title="批复信息"
          icon="el-icon-upload"
        ></el-step>
        <el-step
          class="custom-step"
          @click.native="handleStepClick(2)"
          title="其他信息"
          icon="el-icon-picture"
        ></el-step>
        <el-step
          class="custom-step"
          @click.native="handleStepClick(3)"
          title="借款信息"
          icon="el-icon-picture"
        ></el-step>
        <el-step
          class="custom-step"
          @click.native="handleStepClick(4)"
          title="下款信息"
          icon="el-icon-picture"
        ></el-step>
        <el-step
          class="custom-step"
          @click.native="handleStepClick(5)"
          title="走款信息"
          icon="el-icon-picture"
        ></el-step>
      </el-steps>

      <!-- 项目内容 -->
      <div class="project-content-wrap">
       <div v-if="activeStatus===0">
        <el-form
          :model="form"
          label-width="80px"
          label-position="right"
          :rules="infoRules"
          ref="proj"
        >
          <el-form-item label="项目名称" prop="proj_name">
            <el-input
              v-model="form.proj_name"
              placeholder="请填写项目名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="融资主体" prop="corp_name">
            <el-select v-model="form.corp_name" placeholder="请选择融资主体">
              <el-option
                v-for="item in $store.state.select.corpList"
                :label="item.corp_name"
                :value="item.corp_name"
                :key="item.corp_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="融资类型" prop="fina_name">
            <el-select v-model="form.fina_name" placeholder="请选择融资类型">
              <el-option
                v-for="item in $store.state.select.finaCate"
                :label="item.fina_name"
                :value="item.fina_name"
                :key="item.fina_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否隐债">
            <el-switch
              v-model="form.hidden_debt"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="项目说明">
            <el-input v-model="form.proj_remark" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="projNext"
          >下一步</el-button
        >
       </div>
       <enterRep v-if="activeStatus ===1" @stepNext="handleStepClick"  :projId="curProj"/>
       <enterOther v-if="activeStatus ===2" @stepNext="handleStepClick" :projId="curProj"/>
       <enterLoan v-if="activeStatus ===3" @stepNext="handleStepClick" :projId="curProj" @setId="setId"/>
       <enterMt v-if="activeStatus ===4" @stepNext="handleStepClick" :projId="curProj" @setId="setId" :loanId="curLoan"/>
       <enterSp v-if="activeStatus ===5" @stepNext="handleStepClick" :projId="curProj" @setId="setId" :mtId="curMT"/>
      </div>
    </el-card>
  </div>
</template>
  
  <script>
import projInfo from "../projInfo.vue";
import enterRep from "./enterRep.vue"
import enterOther from "./enterOther.vue";
import enterLoan from "./enterLoan.vue";
import enterMt from "./enterMt.vue";
import enterSp from "./enterSp.vue";
import { log } from 'console';
export default {
  components: {
    projInfo,
    enterRep,
    enterOther,
    enterLoan,
    enterMt,
    enterSp,
},
  data() {
    return {
      curProj:'',
      curLoan:null,
      curMT:null,
      activeStatus: 0,
      form: {
        proj_name: "",
        corp_name: "",
        fina_name: "",
        proj_remark: null,
        hidden_debt: 0,
      },
      corpList:[],
      finaCate:[],
      bankList:[],
      infoRules: {
        proj_name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
        corp_name: [
          { required: true, message: "请选择融资主体", trigger: "blur" },
        ],
        fina_name: [{ required: true, message: "请选择类型", trigger: "blur" }],
      },
    };
  },
  watch: {},
  computed: {},
  async mounted() {
    console.log(this.$store.state.select.corpList.length);
    if(!this.$store.state.select.corpList.length){
      //await this.$store.dispatch("select/getSelcet");
      console.log(123);
      this.getSelectList()
    }
    //console.log(this.$route);
    if(this.$route.query.proj_id){
      console.log('cunzai');
      this.curProj=this.$route.query.proj_id
      this.getInfo(this.$route.query.proj_id)
      let str = this.$route.query.name
      let list = str.split('_')
      console.log(list);
      if(list[0]==='rep'){
        this.activeStatus=1
        
      }else if(list[0]==='other'){
        this.activeStatus=2
      }else if(list[0]==='loan'){
        this.activeStatus=3
      }else if(list[0]==='mt'){
        this.activeStatus=4
        this.curLoan = parseInt(list[1])
      }else if(list[0]==='sp'){
        this.activeStatus=5
        this.curMT = parseInt(list[1])
      }

    }else{
      this.curProj=null
        this.curLoan=null
        this.curMT=null
        this.form= {
        proj_name: "",
        corp_name: "",
        fina_name: "",
        proj_remark: null,
        hidden_debt: 0,
      }
      this.activeStatus = 0
    }
  },
  methods: {
    handleStepClick(index) {
      this.activeStatus = index;
    },
      //获取一些列表信息
      async getSelectList() {
      if (!this.$store.state.select.corpList.length) {
        await this.$store.dispatch("select/getSelcet");
      }

      this.corpList = { ...this.$store.state.select.corpList };
      this.finaCate = { ...this.$store.state.select.finaCate };
      this.bankList = { ...this.$store.state.select.bankList };
    },
    //下一步按钮触发
    projNext(){
      this.$refs["proj"].validate(async(validate) => {
        console.log(validate);
        if (validate) {
          this.form.proj_id = this.curProj
           let res = await this.$API.enter.addProj(this.form)
           //console.log(res.data.proj_id);
           this.curProj=res.data.proj_id
           await this.$API.enter.getNext('rep',this.curProj)
          this.activeStatus = 1;
        } else {
          return false;
        }
      });
      return;
    },
    //如果url中携带参数获取信息
    async getInfo(proj_id){
      let res = await this.$API.enter.getProj(proj_id)
      this.form = res.data.projInfo
      console.log(res);
    },
    getProjId(){
      return this.curProj
    },
    setId(curObj){
      if(curObj.name==='loan'){
        this.curLoan = curObj.id
      }
      if(curObj.name==='mt'){
        this.curMT = curObj.id
      }
      if(curObj.name==='proj_end'){
        this.curProj=null
        this.curLoan=null
        this.curMT=null
        this.form= {
        proj_name: "",
        corp_name: "",
        fina_name: "",
        proj_remark: null,
        hidden_debt: 0,
      }
      }
      console.log(curObj);
    }
  },
};
</script>
  
  <style scoped>
.custom-step {
  cursor: pointer;
}
.project-content-wrap {
  width: 100%;
  margin-top: 12px;
}

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