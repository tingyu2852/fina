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
        :disabled="!deleteRoom.length"
        @click="deleteBtn"
        >删除</el-button
      >
      <el-dialog
        title="设备添加"
        :visible.sync="dialogTableVisible"
        width="500px"
        @close="diagClose"
        :close-on-click-modal="false"
      >
        <div style="width: 80%">
          <el-form :model="from" label-width="100px">
            <el-form-item label="设备型号">
              <el-input
                v-model="from.equipment_name"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="设备分类">
              <el-select v-model="from.equipment_cateid" placeholder="请选择">
                <el-option
                  v-for="item in cateList"
                  :label="item.equipment_catename"
                  :value="item.equipment_cateid"
                  :key="item.equipment_cateid"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="供货商">
              <el-select v-model="from.supplier_id" placeholder="请选择">
                <el-option
                  v-for="item in ghsList"
                  :label="item.supplier_name"
                  :value="item.supplier_id"
                  :key="item.supplier_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="厂商">
              <el-select v-model="from.vendor_id" placeholder="请选择">
                <el-option
                  v-for="item in cjLIst"
                  :label="item.vendor_name"
                  :value="item.vendor_id"
                  :key="item.vendor_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="进货日期">
              <el-date-picker
                v-model="from.jinhuo_data"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="进货数量">
              <el-input
                v-model="from.jinhuo_num"
                type="number"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="单价">
              <el-input
                v-model="from.equipment_price"
                type="number"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <!-- <img :src="from.img_url" alt=""> -->
              <el-upload
                ref="upload"
                :file-list="from.img_url"
                action="https://ty-test.xyz/master/upload"
                list-type="picture-card"
                :limit="1"
                :headers="reqHeader"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-change="onChange"
                :on-success="imgSuccess"
                :before-upload="beforeAvatarUpload"
                :class="[from.img_url.length >= 1 ? 'disUoloadSty' : '']"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :modal="false"
                ref="dia"
              >
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </el-form-item>
            <el-form-item label="所属单位">
              <el-select v-model="from.school_id" placeholder="请先选择单位">
                <el-option
                  v-for="item in unitList"
                  :label="item.school_name"
                  :value="item.school_id"
                  :key="item.school_id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="备注">
              <el-input v-model="from.remark" placeholder=""></el-input>
            </el-form-item>
          </el-form>
        </div>
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
          label="配件名称"
          prop="equipment_name"
        ></el-table-column>

        <el-table-column
          label="配件分类"
          prop="equipment_catename"
        ></el-table-column>
        <el-table-column label="供货商" prop="supplier_name"></el-table-column>
        <el-table-column label="厂商" prop="vendor_name"></el-table-column>
        <el-table-column label="采购日期" prop="jinhuo_data"></el-table-column>
        <el-table-column label="进货数量" prop="jinhuo_num"></el-table-column>
        <el-table-column label="安装使用" prop="numa"></el-table-column>
        <el-table-column label="维修使用" prop="numb">
          <template slot-scope="{ row }">
            <span>{{ row.numb ? row.numb : 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="单价(单位:元)"
          prop="equipment_price"
        ></el-table-column>
        <el-table-column label="总金额(单位:元)" min-width="100">
          <template slot-scope="{ row }">
            <span>
              {{ (row.equipment_price * row.jinhuo_num).toFixed(2) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="图片">
          <template slot-scope="{ row }">
            <span v-if="!row.img_url || !row.img_url[0]">无</span>
            <el-image
              v-else
              style="width: 80px; height: 80px"
              :src="row.img_url[0].url"
              :preview-src-list="[row.img_url[0].url]"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="所属单位" prop="school_name"></el-table-column>

        <el-table-column label="库存">
          <template slot-scope="{ row }">
            <span>{{ row.jinhuo_num - (row.numa + (row.numb - 0)) }}</span>
          </template>
        </el-table-column>
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
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "accessories",
  data() {
    return {
      dialogTableVisible: false,
      dialogImageUrl: "http://localhost/li/1681366129420.jpg",
      dialogVisible: false,
      reqHeader: { "Access-Control-Allow-Origin": "*" },
      list: [],
      cjLIst: [],
      ghsList: [],
      cateList: [],
      unitList: [],
      deleteRoom: [],
      fileList: [{ url: "http://localhost/li/1681366129420.jpg" }],
      current: 1,
      size: 5,
      total: 100,
      sizes: [5, 10, 50, 100],
      from: {
        equipment_name: "",
        equipment_cateid: "",
        equipment_price: "",
        remark: "",
        supplier_id: "",
        vendor_id: "",
        jinhuo_data: "",
        school_id: "",
        jinhuo_num: "",
        img_url: [],
      },
      
    };
  },
  watch: {},
  mounted() {
    this.getUintList();
    this.getInfoLIst();
    this.getCj();
  },
  methods: {
    //查询厂家与供货商
    async getCj() {
      let res = await this.$API.shebei.reqCj();
      let res1 = await this.$API.shebei.reqCateList();
      this.cateList = res1.data;
      this.cjLIst = res.data.changjia;
      this.ghsList = res.data.gonghuoshang;
    },
    aaa(row) {
      console.log(row);
    },
    //当前页发生变化回调
    currentChange(curr) {
      this.current = curr;
      this.getInfoLIst();
      //console.log(curr);
    },
    //每页显示多少条发生变化回调
    sizeChange(size) {
      console.log(size);
      this.size = size;
      this.getInfoLIst();
    },
    //查询房间信息
    async getInfoLIst() {
      let res = await this.$API.shebei.reqEqInfo(this.current, this.size);
      this.total = res.data.total;
      this.list = res.data.infoList;
      console.log(res);
    },
    diagClose() {
      for (const key in this.from) {
        if (key == "img_url") {
          this.from[key] = [];
        } else {
          this.from[key] = "";
        }
      }
    },
    //查询单位信息列表
    async getUintList() {
      let res = await this.$API.shebei.reqSchoolList();
      this.unitList = res.data;
    },
    //每列修改按钮回调
    updateBtn(row) {
      this.from = { ...row };
      console.log(!Array.isArray(this.from.img_url));
      if (!Array.isArray(this.from.img_url)) {
        this.from.img_url = [];
      }
      this.dialogTableVisible = true;
    },
    //diag保存按钮回调
    async addUnitBtn() {
      for (let key in this.from.img_url[0]) {
        if (key !== "url") {
          //console.log(this.from.img_url[0][key]);
          delete this.from.img_url[0][key];
        }
      }
      let res = await this.$API.shebei.reqAddEqInfo(this.from);
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
      this.getInfoLIst();
      this.dialogTableVisible = false;
    },
    //多选按钮回调
    handleSelectionChange(val) {
      this.deleteRoom = val;
    },
    //批量删除按钮回调
    async deleteBtn() {
      let list = [];

      this.deleteRoom.forEach((item) => {
        list.push(item.equipment_id);
      });
      if (list.length) {
        this.$confirm("此操作将永久删除所选信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            let res = await this.$API.shebei.reqDelEqInfo(list);
            await this.getInfoLIst();
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
      
      let list = [row.equipment_id];

      let res = await this.$API.shebei.reqDelEqInfo(list);
      await this.getInfoLIst();
      this.$message({
        type: res.type,
        message: res.msg,
      });
    },
    //图片上传
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList);
      this.from.img_url = fileList;
    },
    beforeAvatarUpload() {},
    handlePictureCardPreview(file, fileList) {},
    imgSuccess(res, file, fileList) {
      if (res.code == 20000) {
        console.log(1);
        this.from.img_url[0].url = res.url;
      }
      console.log(file);
      console.log(fileList);
    },
    onChange(file, fileList) {
      this.from.img_url = fileList;
    },
  },
};
</script>
  
  <style scoped>
>>> .disUoloadSty .el-upload--picture-card {
  display: none; /* 上传按钮隐藏 */
}
</style>