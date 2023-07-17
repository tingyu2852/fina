<template>
  <div>
    <div>
      <el-select v-model="unitId" placeholder="请选择单位" :clearable="true">
        <el-option v-for="item in unitList" :key="item.school_id" :label="item.school_name" :value="item.school_id"></el-option>
      </el-select>
      <el-select v-model="buildId" placeholder="请先选择单位" :clearable="true">
        
      </el-select>
    </div>
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
        title="单位添加"
        :visible.sync="dialogTableVisible"
        width="500px"
        @close="diagClose"
        :close-on-click-modal="false"
      >
        <div style="width: 80%">
          <el-form :model="from" label-width="100px">
            <el-form-item label="房间名称">
              <el-input
                v-model="from.room_name"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item label="房间分类">
              <el-input
                v-model="from.room_cate"
                placeholder="请输入"
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
            <el-form-item label="所属建筑">
              <el-select v-model="from.building_id" placeholder="请先选择单位">
                <el-option
                  v-for="item in buildingList1"
                  :label="item.building_name"
                  :value="item.building_id"
                  :key="item.building_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="图片">
              <!-- <img :src="from.room_img" alt=""> -->
              <el-upload
                ref="upload"
                :file-list="from.room_img"
                action="https://ty-test.xyz/master/upload"
                list-type="picture-card"
                :limit="1"
                :headers="reqHeader"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-change="onChange"
                :on-success="imgSuccess"
                :before-upload="beforeAvatarUpload"
                :class="[from.room_img.length >= 1 ? 'disUoloadSty' : '']"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" :modal="false" :close-on-click-modal="false" ref="dia">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
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
        <el-table-column label="房间名称" prop="room_name"></el-table-column>

        <el-table-column label="房间分类" prop="room_cate"></el-table-column>
        <el-table-column
          label="所属建筑"
          prop="building_name"
        ></el-table-column>
        <el-table-column label="所属单位" prop="school_name"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="{ row }">
            
            <!-- <div v-if="!row.room_img.length">
              <span >无</span>
            </div> -->
            <div v-if="!row.room_img.length">
              <span >无</span>
            </div>
            <template v-else>
              
            <el-image
              
              style="width: 100px; height: 100px"
              :src="row.room_img[0].url"
              :preview-src-list="[row.room_img[0].url]"
            >
            </el-image>
           
            </template>
           
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark">
          <template slot-scope="{ row }">
            <span>{{ row.remark ? row.remark : "无" }}</span>
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
              :title="`确认删除“${row.room_name}”这条内容吗？`"
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
  name: "room",
  data() {
    return {
      dialogTableVisible: false,
      dialogImageUrl: "http://localhost/li/1681366129420.jpg",
      dialogVisible: false,
      reqHeader: { "Access-Control-Allow-Origin": "*" },
      list: [],
      unitList: [],
      deleteRoom: [],
      fileList: [{ url: "http://localhost/li/1681366129420.jpg" }],
      buildingList1: [],
      showBtnImg: true,
      noneBtnImg: false,
      current: 1,
      size: 5,
      total: 100,
      sizes: [5, 10, 50, 100],
      unitId:'',
      buildId:'',
      from: {
        room_name: "",
        school_id: "",
        building_id: "",
        remark: "",
        room_cate: "",
        room_img: [],
      },
    };
  },
  watch: {
    async "from.school_id"(newv, oldv) {
      if (newv) {
        let res = await this.$API.shebei.reqBuildingList(newv);

        this.buildingList1 = res.data;
      }
    },
  },
  mounted() {
    console.log(Boolean([]));
    this.getBuildList();
    this.getUintList();
    this.getRoomLIst();
  },
  methods: {
    aaa(row) {
      console.log(row);
    },
    //当前页发生变化回调
    currentChange(curr) {
      this.current = curr;
      this.getRoomLIst();
      //console.log(curr);
    },
    //每页显示多少条发生变化回调
    sizeChange(size) {
      console.log(size);
      this.size = size;
      this.getRoomLIst();
    },
    //查询房间信息
    async getRoomLIst() {
      let res = await this.$API.unit.reqRoom(this.current, this.size);
      this.total = res.data.total;
      this.list = res.data.roomList;
      console.log(res);
    },
    diagClose() {
      for (const key in this.from) {
        if (key == "room_img") {
          this.from[key] = [];
        } else {
          this.from[key] = "";
        }
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
      if (!Array.isArray(this.from.room_img)) {
        this.from.room_img = [];
      }
      this.dialogTableVisible = true;
    },
    //diag保存按钮回调
    async addUnitBtn() {
      for (let key in this.from.room_img[0]) {
        if (key !== "url") {
          console.log(this.from.room_img[0][key]);
          delete this.from.room_img[0][key];
        }
      }
      let res = await this.$API.unit.reqAddroom(this.from);
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
      this.getRoomLIst();
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
        list.push(item.room_id);
      });
      if (list.length) {
        this.$confirm("此操作将永久删除所选信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            let res = await this.$API.unit.reqDeleteRoom(list);
            await this.getRoomLIst();
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
      let list = [row.room_id];

      let res = await this.$API.unit.reqDeleteRoom(list);
      await this.getRoomLIst();
      this.$message({
        type: res.type,
        message: res.msg,
      });
    },
    //图片上传
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList);
      this.from.room_img = fileList;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if(!isLt2M){
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isLt2M
    },
    handlePictureCardPreview(file, fileList) {
      
    },
    imgSuccess(res, file, fileList) {
      if (res.code == 20000) {
        console.log(1);
        this.from.room_img[0].url = res.url;
      }
      console.log(file);
      console.log(fileList);
    },
    onChange(file, fileList) {
      this.from.room_img = fileList;
    },
  },
};
</script>
  
  <style scoped>
>>> .disUoloadSty .el-upload--picture-card {
  display: none; /* 上传按钮隐藏 */
}
</style>