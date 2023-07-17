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
          :disabled="!delGuar.length"
          >删除</el-button
        >
        <el-table
          :data="guarList"
          @selection-change="handleSelectionChange"
          border
        >
          <el-table-column header-align="center" type="selection" width="55"> </el-table-column>
          <el-table-column header-align="center" label="序号" type="index" width="50" align="right"></el-table-column>
          <el-table-column header-align="center" label="担保方式" prop="guar_name" align="left"></el-table-column>
          
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
           
            <el-form-item label="担保方式" prop="guar_name">
              <el-input v-model="addfrom.guar_name" placeholder="请输入"></el-input>
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
    name: "Guar",
    data() {
      return {
        dialogTableVisible: false,
        guarList: [
        ],
        current: 1,
        size: 50,
        sizes: [50, 100, 200, 500],
        total: 1000,
        addfrom: {
            guar_name:''
        },
        rules: [],
        delGuar: [],
        rules: {
          guar_name: [{ required: true, message: "不能为空", trigger: "blur" }],
        },
      };
    },
    mounted() {
      this.getGuar();
    },
    methods: {
      async getGuar() {
        let res = await this.$API.caiwu.getGuar(this.current, this.size);
        this.total = res.data.total;
        this.guarList = res.data.guarList;
      },
      //多选回调
      handleSelectionChange(row) {
        this.delGuar = row;
      },
      async deleteBtn() {
        
          
           this.$confirm("此操作将永久删除所选信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            if (this.delGuar.length) {
          let delList = [];
          this.delGuar.forEach((item) => {
            delList.push(item.guar_id);
          });
          await this.$API.caiwu.delGuar(delList);
          this.getGuar();
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
        let delList = [row.guar_id];
  
        await this.$API.caiwu.delGuar(delList);
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.getGuar();
      },
      //导出按钮
      dc_btn() {},
      currentChange(cur) {
        this.current = cur
        this.getGuar()
      },
      //每页显示条数修改
      sizeChange(size) {
        this.size = size
        this.getGuar()
        
      },
      //弹窗保存按钮
      addBxBtn() {
        this.$refs["ruleForm"].validate(async (valid) => {
          if (valid) {
            await this.$API.caiwu.addGuar(this.addfrom);
            this.$message({
              type: "success",
              message: "保存成功",
            });
            this.getGuar();
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
    },
  };
  </script>
  
  <style>
  </style>