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
        type="danger"
        plain
        size="mini"
        @click="deleteBtn"
        :disabled="!selectList.length"
        >删除</el-button
      >
      <el-table :data="plList" @selection-change="selectChange" border>
        <el-table-column header-align="center" type="selection" width="55">
        </el-table-column>
        <el-table-column label="编号" prop="con_rec_id" header-align="center"></el-table-column>
        <el-table-column label="项目名称" prop="con_rec_name" header-align="center"></el-table-column>
        <el-table-column label="额度" prop="con_rec_amu" header-align="center" align="left">
          <template slot-scope="{ row }">
            {{ $format.money(row.con_rec_amu) }}
          </template>
        </el-table-column>
        <el-table-column label="合同编号" prop="agmt_id" header-align="center">
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
        </el-table-column >
        <el-table-column label="批准日期" prop="con_rec_date" header-align="center">
        </el-table-column>
        <el-table-column label="下款合计" prop="rec_total" header-align="center" align="right">
          <template slot-scope="{ row }">
            {{ $format.money(row.rec_total) }}
          </template>
        </el-table-column>
        <el-table-column label="剩余额度" header-align="center" align="right">
          <template slot-scope="{ row }">
            {{ $format.money(row.con_rec_amu - row.rec_total) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px" header-align="center">
          <template slot-scope="{ row }" >
            <el-button
              style="margin-right: 10px"
              type="text"
              plain
              icon="el-icon-document"
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
              @click="mtBtn(row)"
              >下款</el-button
            >
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
          <el-form-item label="额度">
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
          <el-form-item label="批准日期">
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
                <el-form-item label="授信种类：">
                  <span>？？？</span>
                </el-form-item></el-col
              >
              <el-col :span="8">
                <el-form-item label="批复金额">
                  <span>？？？</span>
                </el-form-item></el-col
              >
              <el-col :span="8"
                ><el-form-item label="批复文件">
                  <el-button type="primary" size="mini">下载</el-button>
                </el-form-item></el-col
              >
              <el-col :span="8">
                <el-form-item label="融资费用名称">
                  <span>？？？</span>
                </el-form-item></el-col
              >
              <el-col :span="8"
                ><el-form-item label="融资支付时间">
                  <span>？？？</span>
                </el-form-item></el-col
              >
              <el-col :span="8"
                ><el-form-item label="融资金额">
                  <span>？？？</span>
                </el-form-item></el-col
              >
              <el-col :span="8"
                ><el-form-item label="融资备注">
                  <span>？？？</span>
                </el-form-item></el-col
              >
              <el-col :span="8"
                ><el-form-item label="第一担保">
                  <span>？？？</span>
                </el-form-item></el-col
              >
              <el-col :span="8"
                ><el-form-item label="担保金额">
                  <span>？？？</span>
                </el-form-item></el-col
              >
              <el-col :span="8"
                ><el-form-item label="担保费率">
                  <span>？？？</span>
                </el-form-item></el-col
              >
              <el-col :span="8">
                <el-form-item label="担保方式">
                  <span>？？？</span>
                </el-form-item></el-col
              >
              <el-col :span="8"
                ><el-form-item label="担保文件">
                  <el-button type="primary" size="mini">下载</el-button>
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
            <el-col :span="8"
              ><el-form-item label="备注">
                <span>{{  agmtInfo.agmt_note?agmtInfo.agmt_note:'无'}}</span>
              </el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item label="借款合同">
                <el-button type="primary" size="mini">下载</el-button>
              </el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item label="利率">
                <span>？？？</span>
              </el-form-item></el-col
            >
            <el-col :span="24">
              <el-form-item label="还本计划" >
               <el-table :data="[{name:10000,time:'2011-01-01'},{name:10000,time:'2012-01-01'},{name:10000,time:'2013-01-01'}]" border>
                 <el-table-column type="index"></el-table-column>
                 <el-table-column label="时间" prop="time"></el-table-column>
                 <el-table-column label="金额" prop="name"></el-table-column>
               </el-table>
              </el-form-item></el-col
            >
           
            <el-col :span="8"
              ><el-form-item label="合计">
                <span>？？？</span>
              </el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item label="备注">
                <span>？？？</span>
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
  name: "Pl",
  data() {
    return {
      dialogAgmtInfo: false,
      dialogInfo: false,
      dialogVisible: false,
      plList: [
        {
          con_rec_id: "PL202308010001",
          con_rec_name: "金融大厦建设项目",
          con_rec_amu: "27,000",
          con_rec_date: "2023-08-01",
          rec_total: "17,000",
          rec_balance: "10,000",
        },
      ],
      selectList: [],
      current: 1,
      size: 50,
      sizes: [50, 100, 200, 500],
      total: 0,
      agmtInfo: {
        agmt_id:''
      },
      form: {
        con_rec_name: "",
        con_rec_amu: "",
        con_rec_date: "",
      },
    };
  },
  mounted() {
    this.getPlList();
    this.$store.dispatch("agmt/getAgmt");
  },
  computed: {
    agmtList() {
      const list = this.$store.getters.agmtList;
      // const res = list.find(item=>{
      //   return item.agmt_id.includes('AGPL')
      // })
      const newArray = list.filter((item) => item.agmt_id.includes("AGPL"));
      return newArray;
      //console.log(res);
    },
  },
  methods: {
    //获取放款页面信息
    async getPlList() {
      let res = await this.$API.caiwu.getPl(this.current, this.size, "pl");
      this.plList = res.data.plList;
      this.total = res.data.total;
    },
    selectChange(val) {
      this.selectList = val;
    },
    //下款跳转按钮
    mtBtn(row) {
      this.$router.push({
        path: `/cls/mt/${row.con_rec_id}`,
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
          this.getPlList();
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
      await this.$API.caiwu.addPl("PL", this.form);

      this.getPlList();
      this.$message({
        type: "success",
        message: "保存成功",
      });
      this.dialogVisible = false;
    },
    currentChange(val){
      this.current = val
      this.getPlList();
    },
    sizeChange(val){
      this.size = val
      this.getPlList();
    },
    //dialog关闭前的回调
    handleClose() {
      //清空表单
      for (let key in this.form) {
        this.form[key] = "";
      }
    },
    //修改信息按钮
    updateBtn(row) {
      this.form = { ...row };
      this.dialogVisible = true;
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