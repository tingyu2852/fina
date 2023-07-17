<template>
    <div>
      <div style="width: 98%; margin: auto">
        <el-button
          style="margin: 10px 0"
          type="primary"
          plain
          @click="dialogTableVisible = true"
          size="mini"
          >新增</el-button
        >
        <el-button
          type="danger"
          plain
          size="mini"
          @click="deleteBtn"
          :disabled="!delProj.length"
          >删除</el-button
        >
        <el-table
          :data="projList"
          @selection-change="handleSelectionChange"
          border
        >
          <el-table-column type="selection" width="55" > </el-table-column>
          <el-table-column label="序号" type="index" width="50" align="right" header-align="center"> </el-table-column>
          <el-table-column label="金融机构" prop="bank_name" align="left" header-align="center"></el-table-column>
          <el-table-column label="项目" prop="proj_name" align="left" header-align="center"></el-table-column>
          <el-table-column label="品种" prop="fina_name" align="left" header-align="center"></el-table-column>
          <el-table-column label="简介" prop="proj_intro" align="left" header-align="center"></el-table-column>
          <el-table-column label="担保方式" prop="guar_name" align="left" header-align="center"></el-table-column>
          <el-table-column label="批复金额" prop="cred_lim" align="right" header-align="center">
            <template slot-scope="{row}">
            <span>{{  formatNumber(row.cred_lim)}}</span>  
            </template>
          </el-table-column>
          <el-table-column label="起始日期" prop="bgn_date" align="left" header-align="center"></el-table-column>
          <el-table-column label="截止日期" prop="end_date" align="left" header-align="center"></el-table-column>
          <el-table-column label="还本计划" prop="map_rpy" align="left" header-align="center"></el-table-column>
          <el-table-column label="付息" prop="map_accr" align="left" header-align="center"></el-table-column>
         
          <el-table-column label="操作" width="200px" header-align="center">
            <template slot-scope="{ row }">
              <el-button
                style="margin-right: 10px"
                type="text"
                plain
                icon="el-icon-plus"
                class="btn_1"
                @click="bj_btn(row)"
                >编辑</el-button
              >
              <el-popconfirm
                :title="`确认删除这条内容吗？`"
                @onConfirm="deleteTableBtn(row)"
              >
                <el-button
                  slot="reference"
                  style="color: red"
                  type="text"
                  plain
                  icon="el-icon-delete"
                  class="btn_1"
                  >删除</el-button
                >
              </el-popconfirm>
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
      <el-dialog
        title="添加"
        width="500px"
        :visible.sync="dialogTableVisible"
        @close="AdddialogClose"
        :close-on-click-modal="false"
      >
        <div style="width: 80%; margin: auto" class="dialog_body">
          <el-form
            :model="addfrom"
            ref="ruleForm"
            label-width="100px"
            label-position="left"
            :rules="rules"
          >
          <el-form-item label="金融机构" prop="bank_id">
            <el-select
              clearable
              class="box_select"
              v-model="addfrom.bank_id"
              placeholder="请选择品种"
              filterable
            >
              <el-option
                v-for="item in bankList"
                :label="item.bank_name"
                :value="item.bank_id"
                :key="item.bank_id"
              ></el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="项目名称" prop="proj_name">
              <el-input v-model="addfrom.proj_name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="品种" prop="fina_id">
            <el-select
              clearable
              class="box_select"
              v-model="addfrom.fina_id"
              placeholder="请选择品种"
              filterable
            >
              <el-option
                v-for="item in finaList"
                :label="item.fina_name"
                :value="item.fina_id"
                :key="item.fina_id"
              ></el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="项目用途" prop="proj_intro">
              <el-input v-model="addfrom.proj_intro" placeholder="请输入"></el-input>
            </el-form-item>
            
          <el-form-item label="担保方式" prop="guar_id">
            <el-select
              clearable
              class="box_select"
              v-model="addfrom.guar_id"
              placeholder="请选择"
              filterable
            >
              <el-option
                v-for="item in guarList"
                :label="item.guar_name"
                :value="item.guar_id"
                :key="item.guar_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="批复金额" prop="cred_lim">
              <el-input v-model="addfrom.cred_lim" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="起始日期" prop="bgn_date">
            <el-date-picker
              v-model="addfrom.bgn_date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="截止日期" prop="end_date">
            <el-date-picker
              v-model="addfrom.end_date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
            <el-form-item label="还本计划" prop="map_rpy">
              <el-input v-model="addfrom.map_rpy" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="付息" prop="map_accr">
              <el-input v-model="addfrom.map_accr" placeholder="请输入"></el-input>
            </el-form-item>
        
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="addBxBtn">确 定</el-button>
        </div></el-dialog
      >
    </div>
  </template>
  
  <script>
  export default {
    name: "Proj",
    data() {
      return {
        dialogTableVisible: false,
        projList: [
        ],
        current: 1,
        size: 50,
        sizes: [50, 100, 200, 500],
        total: 1000,
        finaList:[],
        guarList:[],
        bankList:[],
        addfrom: {
            proj_name:'',
            proj_intro:'',
            fina_id:'',
            guar_id:'',
            bgn_date:'',
            end_date:'',
            cred_lim:'',
            map_rpy:'',
            map_accr:'',
            bank_id:''
        },
        rules: [],
        delProj: [],
        rules: {
          proj_name: [{ required: true, message: "不能为空", trigger: "blur" }],
          proj_intro: [{ required: true, message: "不能为空", trigger: "blur" }],
          fina_id: [{ required: true, message: "不能为空", trigger: "blur" }],
          guar_id: [{ required: true, message: "不能为空", trigger: "blur" }],
          bgn_date: [{ required: true, message: "不能为空", trigger: "blur" }],
          end_date: [{ required: true, message: "不能为空", trigger: "blur" }],
          cred_lim: [{ required: true, message: "不能为空", trigger: "blur" }],
          map_rpy: [{ required: true, message: "不能为空", trigger: "blur" }],
          map_accr: [{ required: true, message: "不能为空", trigger: "blur" }],
          bank_id: [{ required: true, message: "不能为空", trigger: "blur" }],
        },
      };
    },
    mounted() {
      this.getProj();
      this.getSelect()
    },
    methods: {
      async getSelect() {
      let res = await this.$API.caiwu.getSelect(2);
      this.finaList = res.data.finaList;
      this.guarList = res.data.guarList;
      this.bankList = res.data.bankList;
    },
      async getProj() {
        let res = await this.$API.caiwu.getProj(this.current, this.size);
        this.total = res.data.total;
        this.projList = res.data.projList;
      },
      //多选回调
      handleSelectionChange(row) {
        this.delProj = row;
      },
      async deleteBtn() {
        
          
           this.$confirm("此操作将永久删除所选信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            if (this.delProj.length) {
          let delList = [];
          this.delProj.forEach((item) => {
            delList.push(item.proj_id);
          });
          await this.$API.caiwu.delProj(delList);
          this.getProj();
          this.$message({
            type: "success",
            message: "删除成功",
          });
          }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
        
      },
      async deleteTableBtn(row) {
        let delList = [row.proj_id];
  
        await this.$API.caiwu.delProj(delList);
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.getProj();
      },
      //导出按钮
      dc_btn() {},
      currentChange(cur) {
        this.current = cur
        this.getProj()
      },
      //每页显示条数修改
      sizeChange(size) {
        this.size = size
        this.getProj()
        
      },
      //弹窗保存按钮
      addBxBtn() {
        this.$refs["ruleForm"].validate(async (valid) => {
          if (valid) {
            await this.$API.caiwu.addProj(this.addfrom);
            this.$message({
              type: "success",
              message: "保存成功",
            });
            this.getProj();
            this.dialogTableVisible = false;
          } else {
            return false;
          }
        });
      },
      //弹窗关闭前的回调
      AdddialogClose() {
        for(let key in this.addfrom){
          this.addfrom[key]=''
        }
      },
      bj_btn(row) {
        this.addfrom = { ...row };
        this.dialogTableVisible = true;
      },
      formatNumber(v, len, split) {
      (split = split || ","), (len = Math.abs(+len % 20 || 2));
      v = parseFloat((v + "").replace(/[^\d\.-]/g, "")).toFixed(len) + "";
      return v.replace(/\d+/, function (v) {
        let lit = v.length % 3 == 0;
        let index = lit ? v.length - 3 : -1;
        return v
          .split("")
          .reverse()
          .join("")
          .replace(/\d{3}/g, function (k, l) {
            return k + (l == index && lit ? "" : split);
          })
          .split("")
          .reverse()
          .join("");
      });
    },
    },
  };
  </script>
  
  <style>
  </style>