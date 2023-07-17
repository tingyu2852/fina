<template>
  <div>
    <div style="margin: 10px">
      <el-button
        style="margin-top: 10px"
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
        :disabled="!deleteBuild.length"
        @click="deleteBtn"
        >删除</el-button
      >
      <el-dialog
        title="单位添加"
        :visible.sync="dialogTableVisible"
        width="500px"
        @close="diagClose"
        :close-on-click-modal="false"
      >
        <el-form :model="from" label-width="100px">
          <el-form-item label="建筑名称">
            <el-input
              v-model="from.building_name"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="建筑层数">
            <el-input
              v-model="from.building_floor"
              placeholder="请输入"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属单位">
            <el-select v-model="from.school_id" placeholder="请选择单位">
              <el-option
                v-for="item in unitList"
                :label="item.school_name"
                :value="item.school_id"
                :key="item.school_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUnitBtn">确 定</el-button>
        </div>
      </el-dialog>
      <el-table
        :data="list"
        border
        @selection-change="handleSelectionChange"
        style="margin-top: 10px"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          label="建筑名称"
          prop="building_name"
        ></el-table-column>
        <el-table-column
          label="建筑层数"
          prop="building_floor"
        ></el-table-column>
        <el-table-column
          label="房间数量"
          prop="building_roomnum"
        ></el-table-column>
        <el-table-column label="所属单位" prop="school_name"></el-table-column>
        <el-table-column label="操作" min-width="100">
          <template slot-scope="{ row }">
            <el-button
              style="margin-right: 10px"
              type="text"
              plain
              icon="el-icon-plus"
              class="btn_1"
              @click="updateBtn(row)"
              >修改</el-button
            >

            <el-popconfirm
              :title="`确认删除“${row.building_name}”这条内容吗？`"
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
  </div>
</template>

<script>
export default {
  name: "building",
  data() {
    return {
      dialogTableVisible: false,
      list: [],
      unitList: [],
      deleteBuild: [],
      from: {
        building_name: "",
        school_id: "",
        building_floor: "",
      },
    };
  },
  mounted() {
    this.getBuildList();
    this.getUintList();
  },
  methods: {
    diagClose() {
      for (const key in this.from) {
        this.from[key] = "";
      }
    },
    //查询建筑信息列表
    async getBuildList() {
      let res = await this.$API.unit.reqBuild();
      this.list = res.data;
    },
    //查询单位信息列表
    async getUintList() {
      let res = await this.$API.shebei.reqSchoolList();
      this.unitList = res.data;
    },
    //每列修改按钮回调
    updateBtn(row) {
      this.from = { ...row };
      this.dialogTableVisible = true;
    },
    //diag保存按钮回调
    async addUnitBtn() {
      let res = await this.$API.unit.reqAddBuild(this.from);
      if (res.msg == "添加成功" || res.msg == "修改成功") {
        this.$message({
          type: "success",
          message: res.msg,
        });
      } else {
        this.$message({
          type: "warning",
          msg: res.msg,
        });
      }
      this.getBuildList();
      this.dialogTableVisible = false;
    },
    //多选按钮回调
    handleSelectionChange(val) {
      this.deleteBuild = val;
      
    },
    //批量删除按钮回调
    async deleteBtn() {
      let list = [];
      //如果没有传row那就是批量删除按钮，反之就是每列的删除按钮
      
        this.deleteBuild.forEach((item) => {
          list.push(item.building_id);
        });
        if (list.length) {
          this.$confirm("此操作将永久删除所选信息, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(async () => {
              let res = await this.$API.unit.reqDeleteBuild(list);
              await this.getBuildList();
              this.$message({
                type: res.type,
                message: res.msg,
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
        
      }
    },
    async deleteTableBtn(row) {
      let list = [row.building_id];

      let res = await this.$API.unit.reqDeleteBuild(list);
      await this.getBuildList();
      this.$message({
        type: res.type,
        message: res.msg,
      });
    },
  },
};
</script>

<style>
</style>