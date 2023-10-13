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
          :disabled="!delRate.length"
          >删除</el-button
        >
        <el-table
          :data="reteList"
          @selection-change="handleSelectionChange"
          border
        >
          <el-table-column header-align="center" type="selection" width="55"> </el-table-column>
          <el-table-column header-align="center" label="日期" prop="date" align="left"></el-table-column>
          <el-table-column header-align="center" label="利率" prop="rate" align="left">
            <template slot-scope="{row}">
                <div>{{ row.rate? `${((row.rate)*100).toFixed(3)}%`:'无' }}</div>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="备注" prop="remark" align="left">
            <template slot-scope="{row}">
                <div>{{ row.remark? row.remark:'无' }}</div>
            </template>
          </el-table-column>
          
          <el-table-column header-align="center" label="操作" width="200px">
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
           
            <el-form-item label="日期" prop="date" >
              <el-date-picker v-model="addfrom.date" value-format="yyyy-MM-dd" placeholder="请选择变更日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="利率(%)" prop="rate" >
              <el-input v-model="addfrom.rate" type="number" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="备注"  >
              <el-input v-model="addfrom.remark" placeholder="请输入"></el-input>
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
    name: "Bank",
    data() {
      return {
        dialogTableVisible: false,
        reteList: [
        ],
        current: 1,
        size: 50,
        sizes: [50, 100, 200, 500],
        total: 1000,
        addfrom: {
            rate:''
        },
        rules: [],
        delRate: [],
        rules: {
          date: [{ required: true, message: "不能为空", trigger: "blur" }],
          rate: [{ required: true, message: "不能为空", trigger: "blur" }],
        },
      };
    },
    mounted() {
      this.getRate();
    },
    methods: {
      async getRate() {
        let res = await this.$API.caiwu.getRate(this.current, this.size);
        this.total = res.data.total;
        this.reteList = res.data.rateList;
      },
      //多选回调
      handleSelectionChange(row) {
        this.delRate = row;
      },
      async deleteBtn() {
        
          
           this.$confirm("此操作将永久删除所选信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            if (this.delRate.length) {
          let delList = [];
          this.delRate.forEach((item) => {
            delList.push(item.rate_id);
          });
          await this.$API.caiwu.delRate(delList);
          this.getRate();
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
        let delList = [row.rate_id];
  
        await this.$API.caiwu.delRate(delList);
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.getRate();
      },
      //导出按钮
      dc_btn() {},
      currentChange(cur) {
        this.current = cur
        this.getRate()
      },
      //每页显示条数修改
      sizeChange(size) {
        this.size = size
        this.getRate()
        
      },
      //弹窗保存按钮
      addBxBtn() {
        this.$refs["ruleForm"].validate(async (valid) => {
          if (valid) {
            //this.addfrom.rate = this.addfrom.rate /100
            let form = {...this.addfrom}
          form.rate = (form.rate /100).toFixed(5)
          console.log(form);
          
            await this.$API.caiwu.addRate(form);
            this.$message({
              type: "success",
              message: "保存成功",
            });
            this.getRate();
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
        this.addfrom.rate = (this.addfrom.rate*100).toFixed(3)
        this.dialogTableVisible = true;
      },
    },
  };
  </script>
  
  <style>
  </style>