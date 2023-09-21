<template>
  <div>
    <div style="width: 98%; margin: auto">
      <el-button
        style="margin: 10px 0"
        type="primary"
        plain
        @click="dialogVisible = true"
        size="mini"
        >新增</el-button
      >
      <el-button
        style="margin: 10px 10px"
        type="danger"
        plain
        size="mini"
        @click="deleteBtn"
        :disabled="!selectList.length"
        >删除</el-button
      >
      <el-button
        style="margin: 10px 0"
        type="primary"
        plain
        @click="exitBtn"
        size="mini"
        >返回上一级</el-button
      >
      <el-table :data="mtList" @selection-change="selectChange" border>
         <el-table-column header-align="center" align="left"  type="selection" width="55">
        </el-table-column>
         <el-table-column header-align="center" align="left" label="编号" prop="con_rec_id"></el-table-column>
         <el-table-column header-align="center" align="left" label="项目名称" prop="con_rec_name"></el-table-column>
         <el-table-column header-align="center" align="left" label="到账金额" prop="con_rec_amu">
            <template slot-scope="{ row }">
            {{ $format.money(row.con_rec_amu) }}
          </template>
        </el-table-column>
         <el-table-column header-align="center" align="left" label="合同编号" prop="agmt_id">
          <template slot-scope="{ row }">
            <el-button
              v-if="row.agmt_id"
              style="margin-right: 10px"
              type="text"
              plain
              class="btn_1"
              @click="agInfoBtn(row)"
              >{{ row.agmt_id }}</el-button
            >
            <span v-else>无</span>
          </template>
        </el-table-column>
         <el-table-column header-align="center" align="left" label="到账日期" prop="con_rec_date"></el-table-column>
         <el-table-column header-align="center" align="right" label="走款合计" prop="rec_total">
            <template slot-scope="{ row }">
            {{ $format.money(row.rec_total) }}
          </template>
        </el-table-column>
         <el-table-column header-align="center" align="right" label="剩余额度" prop="rec_balance">
          <template slot-scope="{ row }">
            {{ $format.money(row.con_rec_amu - row.rec_total) }}
          </template>
        </el-table-column>
         <el-table-column header-align="center" align="left" label="操作" width="300px">
          <template slot-scope="{ row }">
            <el-button
              style="margin-right: 10px"
              type="text"
              plain
              icon="el-icon-plus"
              class="btn_1"
              @click="dialogInfo = true"
              >项目信息</el-button
            >
            <el-button
              style="margin-right: 10px"
              type="text"
              plain
              icon="el-icon-edit"
              class="btn_1"
              @click="updateBtn(row)"
              >修改</el-button
            >
            <el-button
              style="margin-right: 10px"
              type="text"
              plain
              icon="el-icon-plus"
              class="btn_1"
              @click="spBtn(row)"
              >走款</el-button
            >
          </template>
        </el-table-column>
        <div slot="append">
          <el-row>
            <el-form>
              <el-col :span="8"
                ><el-form-item label="下款合计到账金额"
                  ><span>{{ this.$format.money(num1) }}</span></el-form-item
                ></el-col
              >
              <el-col :span="8"
                ><el-form-item label="资金来源"
                  ><span>{{ $route.query.rec_pl_name }}</span></el-form-item
                ></el-col
              >
              <el-col :span="8"
                ><el-form-item label="额度剩余"
                  ><span>{{ this.$format.money(num2) }}</span></el-form-item
                ></el-col
              >
            </el-form>
          </el-row>
        </div>
      </el-table>
    </div>
    <div>
      <el-dialog
        title="添加/修改"
        :visible.sync="dialogVisible"
        width="550px"
        @close="handleClose"
        :close-on-click-modal="false"
      >
        <el-form :model="form" label-width="100px">
          <el-form-item label="项目名称">
            <el-input
              v-model="form.con_rec_name"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="到账金额">
            <el-input
              v-model="form.con_rec_amu"
              type="number"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目合同">
            <el-select v-model="form.agmt_id" placeholder="请选择" filterable >
              <el-option
                v-for="item in agmtList"
                :label="item.agmt_name"
                :value="item.agmt_id"
                :key="item.agmt_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="到账日期">
            <el-date-picker
              v-model="form.con_rec_date"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save_btn">保存</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="项目信息"
        :visible.sync="dialogInfo"
        width="700px"
        :close-on-click-modal="false"
      >
        <div>
          <el-form>
            <el-row :gutter="3">
              <el-col :span="8">
                <el-form-item label="金额">
                  <span>？？？</span>
                </el-form-item></el-col
              >
              <el-col :span="8">
                <el-form-item label="日期">
                  <span>？？？</span>
                </el-form-item></el-col
              >
              <el-col :span="8">
                <el-form-item label="起止日期">
                  <span>？？？</span>
                </el-form-item></el-col
              >
              <el-col :span="8">
                <el-form-item label="结息方式">
                  <span>？？？</span>
                </el-form-item></el-col
              >

              <el-col :span="24">
                <el-form-item label="匹配资本金" label-width="100px">
                  <el-col :span="8"
                    ><el-form-item label="收款单位">
                      <span>？？？</span>
                    </el-form-item></el-col
                  >
                  <el-col :span="8"
                    ><el-form-item label="金额">
                      <span>？？？</span>
                    </el-form-item></el-col
                  >
                  <el-col :span="8"
                    ><el-form-item label="日期">
                      <span>？？？</span>
                    </el-form-item></el-col
                  > <el-col :span="8"
                    ><el-form-item label="备注">
                      <span>？？？</span>
                    </el-form-item></el-col
                  >
                </el-form-item></el-col
              >
             
            </el-row>
          </el-form>
        </div>
      </el-dialog>
      <el-dialog
        title="合同信息"
        :visible.sync="dialogAgmtInfo"
        width="700px"
        :close-on-click-modal="false"
      >
        <el-form>
          <el-row :gutter="3">
            <el-col :span="8">
              <el-form-item label="合同编号：">
                <span>{{ agmtInfo.agmt_id }}</span>
              </el-form-item></el-col
            >
            <el-col :span="8">
              <el-form-item label="合同名称">
                <span>{{ agmtInfo.agmt_name }}</span>
              </el-form-item></el-col
            >
            <el-col :span="8">
              <el-form-item label="合同分类">
                <span>
                  {{ agmt_cate(agmtInfo.agmt_id) }}
                </span>
              </el-form-item></el-col
            >
            <el-col :span="8">
              <el-form-item label="合同方">
                <span>
                  {{ agmtInfo.agmt_part }}
                </span>
              </el-form-item></el-col
            >
            <el-col :span="8">
              <el-form-item label="金额">
                <span>
                  {{ $format.money(agmtInfo.agmt_value) }}
                </span>
              </el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item label="起始日期">
                <span>{{agmtInfo.beg_date}}</span>
              </el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item label="截止日期">
                <span>{{  agmtInfo.end_date}}</span>
              </el-form-item></el-col
            >
            <el-col :span="24">
              <el-form-item label="匹配资本金" >
               <el-table :data="[{name:10000,corp_name:'???',time:'2011-01-01'},{name:10000,corp_name:'???',time:'2012-01-01'},{name:10000,corp_name:'???',time:'2013-01-01'}]" border>
                 <el-table-column type="index"></el-table-column>
                 <el-table-column label="收款单位" prop="corp_name"></el-table-column>
                 <el-table-column label="时间" prop="time"></el-table-column>
                 <el-table-column label="金额" prop="name"></el-table-column>
               </el-table>
              </el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item label="备注">
                <span>{{  agmtInfo.agmt_note?agmtInfo.agmt_note:'无'}}</span>
              </el-form-item></el-col
            >
            
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mt",
  data() {
    return {
      dialogAgmtInfo: false,
      dialogInfo: false,
      dialogVisible: false,
      mtList: [],
      selectList: [],
      agmtInfo: {
        agmt_id:''
      },
      form: {
        con_rec_name: "",
        con_rec_amu: "",
        con_rec_date: "",
        agmt_id:''
      },
    };
  },
  computed: {
    num1() {
      let sum = this.mtList.reduce((a, b) => {
        return a + b.con_rec_amu;
      }, 0);

      return sum;
    },
    num2() {
      let num1 = this.$route.query.rec_pl_total;

      return num1 - this.num1;
    },
  
    agmtList() {
      const list = this.$store.getters.agmtList;
      // const res = list.find(item=>{
      //   return item.agmt_id.includes('AGPL')
      // })
      const newArray = list.filter((item) => item.agmt_id.includes("AGMT"));
      return newArray;
      //console.log(res);
    },
  
  },
  mounted() {
    
    //console.log(this.$route.params.ptid);
    this.getMtList();
  },
  methods: {
    //获取走款信息表
    async getMtList() {
      let res = await this.$API.caiwu.getPl(
        "",
        "",
        "mt",
        this.$route.params.ptid
      );
      this.mtList = res.data.mtList;
      console.log(res);
    },
    selectChange(val) {
      this.selectList = val;
    },
    spBtn(row) {
      //this.$router.push(`/cls/mt/${row.con_rec_id}`)

      this.$router.push({
        path: `/cls/sp/${row.con_rec_id}`,
        query: {
          rec_pl_name: row.con_rec_name,
          rec_pl_total: row.con_rec_amu,
        },
      });
    },
    //删除按钮
    deleteBtn() {
      this.$confirm("此操作将永久删除所选信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let list = [];
          this.selectList.forEach((item) => {
            list.push(item.con_id);
          });
          await this.$API.caiwu.delPl(list);
          this.getMtList();
          this.$message({
            type: "success",
            message: "删除成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //保存按钮
    async save_btn() {
      let num = (this.num1-0)+(this.form.con_rec_amu-0)
      let num2 = (this.$route.query.rec_pl_total-0)
      if(num>num2){
        return this.$message({
          type:'error',
          message:'额度不足,剩余额度为'+this.num2
        })
      }
      for (let key in this.form) {
        if (key == "con_rec_note" || key == "con_rec_sou") {
          continue;
        }
        if (!this.form[key]) {
          return this.$message({
            type: "error",
            message: "不能为空",
          });
        }
      }
      this.form.con_rec_sou = this.$route.params.ptid;

      await this.$API.caiwu.addPl("MT", this.form);

      this.getMtList();
      this.$message({
        type: "success",
        message: "保存成功",
      });
      this.dialogVisible = false;
    },
    //dialog关闭前的回调
    handleClose() {
      //清空表单
      console.log("close");
      for (let key in this.form) {
        this.form[key] = "";
      }
    },
    //修改信息按钮
    updateBtn(row) {
      this.form = { ...row };
      this.dialogVisible = true;
    },
    exitBtn() {
      this.$router.go(-1);
    },
    async agInfoBtn(row) {
      let res = await this.$API.caiwu.getAgmt("", "", "agmt_id", row.agmt_id);
      if (res.data.agmtList.length) {
        this.agmtInfo = res.data.agmtList[0];
      } else {
        this.agmtInfo = {
          agmt_id: "无",
          agmt_cate: "无",
          agmt_name: "无",
          agmt_part: "无",
          agmt_value: 0,
          beg_date: "无",
          end_date: "无",
          agmt_note: "无",
        };
      }
      this.dialogAgmtInfo = true;
      // const newArray = list.filter(item => item.agmt_id.includes('AGPL'));
      // return newArray
      //console.log(res);
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
  },
};
</script>

<style>
</style>