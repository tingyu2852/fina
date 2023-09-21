<template>
  <div style="width: 98%; height: 600px; margin: 20px auto">
    <el-button
      type="primary"
      style="margin: 10px 0px"
      @click="dialogVisible = true"
      >新增项目</el-button
    >
    <el-card style="margin: 0 auto">
      <div style="margin: 10px">
        <el-table
          v-loading="loading"
          :data="projList"
          @selection-change="selectChange"
        >
          <el-table-column
            header-align="center"
            type="selection"
            width="55"
          ></el-table-column>
          <el-table-column label="项目名称">
            <template slot-scope="{ row }">
              <div @click="edit_btn(row)" style="cursor: pointer">
                <span>{{ row.proj_name }}</span>
                <!-- <el-button
                type="text"
                icon="el-icon-edit-outline"
                
               
              ></el-button> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column label="项目编号" prop="proj_id"></el-table-column>
          <el-table-column label="融资类型" prop="fina_name"></el-table-column>
          <el-table-column label="项目状态" prop="proj_status">
            <template slot-scope="{ row }">
              <span>{{ row.proj_status ? "进行中" : "已完成" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="融资主体" prop="corp_name"></el-table-column>
          <el-table-column label="批准日期" prop="proj_date">
            <template slot-scope="{ row }">
              <span>{{ row.rep_date ? row.rep_date : "无" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="批复额度" prop="pf_ed">
            <template slot-scope="{ row }">
              <span>{{ $format.money(row.rep_total) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="下款合计" prop="xk_num" :formatter="asdd">
            <template slot-scope="{ row }">
              <span>{{ $format.money(row.mt_total) }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px; text-align: right">
          <el-pagination
            background
            :total="total"
            :current-page="current"
            :page-size="size"
            :page-sizes="sizes"
            @current-change="currentChange"
            layout="prev, pager, next,jumper,sizes,->,total"
            @size-change="sizeChange"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>

    <el-dialog
      title="项目基础信息"
      :visible.sync="dialogVisible"
      width="650px"
      @close="handleClose"
      
    >
      <div style="width: 600px">
        <el-form
          :model="form"
          label-width="100px"
          label-position="left"
          v-show="dialogShow === 1"
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
                v-for="item in corpList"
                :label="item.corp_name"
                :value="item.corp_name"
                :key="item.corp_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="融资类型" prop="fina_name">
            <el-select v-model="form.fina_name" placeholder="请选择融资类型">
              <el-option
                v-for="item in finaCate"
                :label="item.fina_name"
                :value="item.fina_name"
                :key="item.fina_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否隐债">
            <el-switch
              v-model="form.hidden_debt"
              :active-value="1" :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="项目说明">
            <el-input v-model="form.proj_remark" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="rep_form" :rules="repRules" ref="rep" v-show="dialogShow === 2" label-position="left" label-width="100px">
         
            <el-form-item label="是否银团">
              <el-switch v-model="rep_form.bank_consortium"  :active-value="1"
              :inactive-value="0"
               > </el-switch>
            </el-form-item>
            <el-form-item label="金融机构" prop="bank_name">
              <el-select
                v-model="rep_form.bank_name"
                placeholder="请选择金融机构"
                :multiple="true"
                :multiple-limit="rep_form.bank_consortium===0? 1:0"
              >
                <el-option
                  v-for="item in bankList"
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
                @input="
                  rep_form.rep_sum = $format.formatInput(rep_form.rep_sum)
                "
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
              <el-switch v-model="rep_form.sub_project" :active-value="1"
              :inactive-value="0"> </el-switch>
            </el-form-item>
            <el-form-item label="备注说明">
              <el-input
                v-model="rep_form.rep_remark"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          v-show="dialogShow === 2"
          @click="dialogShow = 1"
          >上一步</el-button
        >
        <el-button
          type="primary"
          v-show="dialogShow === 1"
          @click="projNext"
          >下一步</el-button
        >
        <el-button type="primary" @click="saveBtn" v-show="dialogShow === 2"
          >保存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogShow: 1,
      loading: false,
      selectList: [],
      dialogVisible: false,
      projList: [],
      bankList: [],
      corpList: [],
      finaCate: [],
      form: {
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
      total: 0,
      current: 1,
      size: 10,
      sizes: [10, 20, 50, 100],
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
  watch: {
    "rep_form.bank_consortium"(newv) {
      console.log(newv, "----");
      if (newv === 1) {
        // this.rep_form.bank_name = '';

        this.rep_form.bank_name = [];
      } else {
        this.rep_form.bank_name = "";
      }
    },
  },
  computed: {
    isbank() {
      let isbank = this.rep_form.bank_consortium === 0 ? false : true;
      // console.log(this.rep_form.bank_consortium);
      // console.log(isbank);
      return isbank;
    },
  },
  mounted() {
    this.getProjList();
    this.getSelectList();
    if (!this.$store.state.select.corpList.length) {
      this.$store.dispatch("select/getSelcet");
    }
    //this.getprojInfo();
  },
  methods: {
    //获取一些列表信息
    async getSelectList() {
      if (!this.$store.state.select.corpList.length) {
        await this.$store.dispatch("select/getSelcet");
      }

      this.corpList = { ...this.$store.state.select.corpList };
      this.finaCate = { ...this.$store.state.select.finaCate };
      this.bankList = { ...this.$store.state.select.bankList };
    },
    //获取项目基础信息列表
    async getProjList() {
      this.loading = true;
      //console.log(this.$API.fina);
      let res = await this.$API.fina.getProj(this.current, this.size);
      this.projList = res.data.projList;
      this.total = res.data.total;
      this.loading = false;
    },
    selectChange(val) {
      this.selectList = val;
    },
    //edit按钮
    edit_btn(row) {
      this.$router.push({
        path: `/projs/detail/${row.proj_id}`,
        query: {
          proj_name: row.proj_name,
        },
      });
    },
    handleClose() {
      this.dialogShow = 1;
      this.$refs["proj"].resetFields();
      this.$refs["rep"].resetFields();
      for(const key in this.form){
        // proj_remark: null,
        // hidden_debt: 0,
        if(key =='hidden_debt'){
          this.form[key]=0
        }else{
          this.form[key]=null
        }
      }
      for(const key in this.rep_form){
        // bank_consortium: 0,
        // bank_name: [],
        // rep_sum: null,
        // rep_date: null,
        // rep_sou: null,
        // rep_limit: null,
        // rep_remark: null,
        // sub_project: 0,
        if(key =='bank_name'){
          this.rep_form[key]=[]
        }else if(key =='bank_consortium' || key =='sub_project'){
          this.rep_form[key]=0
        }else {
          this.rep_form[key]=null
        }
       
      }
    },
    asdd(row, column, cellValue, index) {
      if (cellValue) {
        return cellValue;
      } else {
        return "无";
      }
    },
    //弹窗保存按钮
    async saveBtn() {
      this.$refs["rep"].validate(async (validate) => {
        if (validate) {
          // console.log(123123);
          let repInfo = { ...this.rep_form };
          repInfo.bank_name = this.rep_form.bank_name.join(",");
          // console.log(repInfo.bank_name);
          repInfo.rep_sum = parseFloat(
            this.rep_form.rep_sum.substring(1).replace(/,/g, "")
          );
          //console.log(list);
          await this.$API.fina.addProj("add", {
            projForm: this.form,
            repForm: repInfo,
          });
          this.getProjList();
          this.$message({
            type: "success",
            message: "添加成功",
          });
          this.dialogVisible = false;
        } else {
          return false;
        }
      });

      return;
    },
    sizeChange(size) {
      this.size = size;
      this.getProjList();
    },
    currentChange(cur) {
      this.current = cur;
      this.getProjList();
    },
    //填写完项目信息后点击下一步按钮
    projNext() {
      this.$refs["proj"].validate((validate) => {
        console.log(validate);
        if (validate) {
          this.dialogShow = 2;
        } else {
          return false;
        }
      });
      return;
    },
    //监听用户输入行为，只允许输入数字
    onKeyPress(event) {
      this.rep_form.rep_limit = parseInt(
        this.rep_form.rep_limit.replace(/[^0-9]/g, "")
      );
    },
  },
};
</script>

<style>
</style>