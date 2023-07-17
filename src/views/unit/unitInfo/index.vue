<template>
  <div>
    <div style="margin:20px 20px" >
      <el-button
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
        @click="deleteUnit"
        :disabled="!list.length"
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
          <el-form-item label="单位名称">
            <el-input
              v-model="from.school_name"
              placeholder="请输入单位名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="单位地址">
            <el-input
              v-model="from.unit_address"
              placeholder="请输入单位地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="单位电话">
            <el-input
              v-model="from.unit_phone"
              placeholder="请输入单位联系方式"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input
              v-model="from.contact_name"
              placeholder="单位联系人"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系人电话">
            <el-input
              v-model="from.contact_phone"
              placeholder="请输入联系人电话"
            ></el-input>
          </el-form-item>
          <el-form-item label="单位网址">
            <el-input v-model="from.unit_url" placeholder="请输入单位网址">
              <template slot="prepend">Http://</template>
            </el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="from.unit_remark" type=" textarea"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUnitBtn">确 定</el-button>
        </div>
      </el-dialog>
      <el-table :data="unitList" @selection-change="handleSelectionChange" style="margin-top: 10px;">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="单位名称" prop="school_name"></el-table-column>
        <el-table-column label="单位地址" prop="unit_address" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="单位电话" prop="unit_phone"></el-table-column>
        <el-table-column label="联系人" prop="contact_name"></el-table-column>
        <el-table-column
          label="联系人电话"
          prop="contact_phone"
        ></el-table-column>
        <el-table-column label="单位官网">
          <template slot-scope="{ row }">
            <el-link type="primary" @click="linkUrl(row)">{{
              row.unit_url
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template slot-scope="{ row }">
            <el-button
            style="margin-right: 10px;"
              type="text"
              plain
              icon="el-icon-plus"
              class="btn_1"
              @click="updateUnit(row)"
              >修改</el-button
            >
            
            <el-popconfirm
              :title="`确认删除“${row.school_name}”这条内容吗？`"
              @onConfirm="deleteUnitInfo(row)"
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
  name: "unitInfo",
  data() {
    return {
      list: [],
      dialogTableVisible: false,
      unitList: [],
      from: {
        school_name: "",
        unit_address: "",
        unit_phone: "",
        contact_name: "",
        contact_phone: "",
        unit_url: "",
      },
    };
  },
  mounted() {
    this.getUnitList();
  },
  methods: {
    linkUrl(row) {
      let url = row.unit_url;
      
      if (
        url.substr(0, 7).toLowerCase() == "http://" ||
        url.substr(0, 8).toLowerCase() == "https://"
      ) {
        url = url;
      } else {
        url = "http://" + url;
      }
      
      window.open(url, "_blank");
    },
    //查询单位信息列表
    async getUnitList() {
      let res = await this.$API.shebei.reqSchoolList();
      this.unitList = res.data;
    },
    diagClose() {
      for (const key in this.from) {
        this.from[key] = "";
      }
    },
    async addUnitBtn() {
      let res = await this.$API.unit.reqAddUnit(this.from);
      if (res.code == 20000) {
        this.$message({
          type: "success",
          message: "添加成功",
        });
      }
      this.getUnitList();
      this.dialogTableVisible = false;
    },
    handleSelectionChange(val) {
      this.list = val;
    },
    async deleteUnit() {
      let list = [];
      this.list.forEach((item) => {
        list.push(item.school_id);
      });

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$API.unit.reqDeleteUnit(list);
          this.getUnitList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    updateUnit(row) {
      this.from = { ...row };
      this.dialogTableVisible = true;
    },
    //单独删除信息按钮确认回调
    async deleteUnitInfo(row) {
      let res = await this.$API.unit.reqDeleteUnit([row.school_id])
      if(res.code==20000){
        this.$message({
          type:'success',
          message:'删除成功'
        })
      }
      this.getUnitList();
    },
  },
};
</script>

<style>
</style>