<template>
  <div>
    <div class="box_1">
      <el-radio v-model="radio" label="equipment_info.equipment_name"
        >按型号</el-radio
      >
      <el-radio v-model="radio" label="room.room_name">按房间</el-radio>
      <el-input
        v-model="shaixuan"
        placeholder="请输入"
        clearable
        maxlength="12"
        show-word-limit
        style="width: 200px; margin: 0 10px"
      ></el-input>
      <el-button
        style="margin: 10px"
        type="primary"
        icon="el-icon-search"
        @click="search_btn"
        plain
        :disabled="isdiable"
        >搜索</el-button
      >
      <el-button
        style="margin: 10px"
        type="primary"
        icon="el-icon-search"
        @click="clear_btn"
        plain
        :disabled="isdiable"
        >清空筛选</el-button
      >
    </div>
    <div>
      <el-dialog
        title="设备添加"
        :visible.sync="dialogTableVisible"
        width="500px"
        @close="dialogClose"
        :close-on-click-modal="false"
      >
        <el-form :model="from" label-width="100px">
          <el-form-item label="设备分类">
            <el-select
              v-model="from.equipment_cateid"
              placeholder="请选择设备类型"
              filterable
            >
              <el-option
                v-for="item in eqcateList"
                :label="item.equipment_catename"
                :value="item.equipment_cateid"
                :key="item.equipment_cateid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备型号">
            <el-select
              v-model="from.equipment_infoId"
              placeholder="请先选择设备类型"
              filterable
            >
              <el-option
                v-for="item in eqinfoList"
                :label="item.equipment_name"
                :value="item.equipment_id"
                :key="item.equipment_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="序列号">
            <el-input
              v-model="from.equipment_sn"
              placeholder="请输入序列号"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属单位">
            <el-select
              v-model="from.school_id"
              filterable
              placeholder="所属单位"
            >
              <el-option
                v-for="item in schoolList"
                :label="item.school_name"
                :value="item.school_id"
                :key="item.school_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属建筑">
            <el-select
              v-model="from.building_id"
              filterable
              placeholder="请先选择单位"
            >
              <el-option
                v-for="item in buildingList1"
                :label="item.building_name"
                :value="item.building_id"
                :key="item.building_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属房间">
            <el-select
              v-model="from.room_id"
              filterable
              placeholder="请先选择建筑"
            >
              <el-option
                v-for="item in roomList1"
                :label="item.room_name"
                :value="item.room_id"
                :key="item.room_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-select
              v-model="from.department_id"
              filterable
              placeholder="请先选择单位·"
            >
              <el-option
                v-for="item in departmentList"
                :label="item.department_name"
                :value="item.department_id"
                :key="item.department_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备状态">
            <el-radio v-model="from.eq_status" :label="1">正在使用</el-radio>
            <el-radio v-model="from.eq_status" :label="0">已报废</el-radio>
          </el-form-item>
          <el-form-item label="报废日期" v-if="from.eq_status === 0">
            <el-date-picker
              v-model="from.baofei_date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEqdetail">确 定</el-button>
        </div>
      </el-dialog>
      <el-button
        type="primary"
        plain
        size="small"
        icon="el-icon-plus"
        class="btn_1"
        @click="dialogTableVisible = true"
        >新增</el-button
      >
      <el-button
        type="danger"
        plain
        size="small"
        icon="el-icon-delete"
        class="btn_1"
        @click="deleteEqdetail"
        :disabled="!deleteEqdetailList.length"
        >删除</el-button
      >
      <el-table
        :data="list"
        border
        :header-cell-style="{ background: '#F5F5F5' }"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          label="设备名称"
          prop="equipment_name"
          ming-width="100"
          sortable="custom"
        ></el-table-column>
        <el-table-column label="序列号" prop="equipment_sn"></el-table-column>
        <el-table-column
          label="所在位置"
          sortable="custom"
          prop="room_name"
        ></el-table-column>
        <el-table-column
          label="设备分类"
          prop="equipment_catename"
        ></el-table-column>
        <el-table-column
          label="供应商"
          prop="supplier_name"
          min-width="150"
        ></el-table-column>
        <el-table-column
          label="厂商"
          prop="vendor_name"
          width="50"
        ></el-table-column>
        <el-table-column label="部门" prop="department_name"> </el-table-column>
        <el-table-column label="采购日期" prop="jinhuo_data"> </el-table-column>
        <el-table-column label="设备状态" min-width="130px">
          <template slot-scope="{ row }">
            <el-tag :type="row.eq_status ? 'success' : 'warning'">{{
              computed_date(row)
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template slot-scope="{ row }">
            <el-button
              type="text"
              plain
              icon="el-icon-plus"
              class="btn_1"
              @click="addEqdetail(row)"
              >修改</el-button
            >
            <!-- <el-button
              type="text"
              plain
              
              icon="el-icon-delete"
              class="btn_1"
              @click="deleteEqdetail(row)"
              >删除</el-button
            > -->
            <el-popconfirm
              :title="`确定删除这条内容吗？`"
              @onConfirm="btn_delete(row)"
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
  </div>
</template>

<script>
export default {
  name: "eqDetails",
  data() {
    return {
      list: [],
      schoolId: "",
      buildingId: "",
      roomId: "",
      total: 0,
      size: 10,
      sizes: [10, 20, 50, 100],
      current: 1,
      deleteEqdetailList: [],
      schoolList: [],
      buildingList: [],
      roomList: [],
      buildingList1: [],
      roomList1: [],
      departmentList: [],
      dialogTableVisible: false,
      eqinfoList: [],
      eqcateList: [],
      from: {
        equipment_sn: "",
        school_id: "",
        building_id: "",
        room_id: "",
        equipment_infoId: "",
        equipment_cateid: "",
        department_id: "",
        eq_status: "",
        baofei_date: "",
      },
      radio: "",
      shaixuan: "",
      sort: {
        name: "",
        fs: "",
      },
    };
  },
  mounted() {
    this.getSchoolList();
    this.getCateList();
    this.getEqDetail();
  },
  watch: {
    // from:{
    //   handler(newv,oldv){
    //     console.log(newv.school_id +'---'+oldv)
    //   },
    //   deep:true,
    //   immediate:true
    // },
    async "from.school_id"(newv, oldv) {
      if (newv) {
        let res = await this.$API.shebei.reqBuildingList(newv);
        let res1 = await this.$API.shebei.reDeparment();
        this.departmentList = res1.data;
        this.buildingList1 = res.data;
      }
    },
    async "from.building_id"(newv, oldv) {
      if (newv) {
        let res = await this.$API.shebei.reqRoomList(newv);
        this.roomList1 = res.data;
      }
    },
    async "from.equipment_cateid"(newv, oldv) {
      if (newv) {
        let res = await this.$API.shebei.reqEqList(newv);
        this.eqinfoList = res.data;
      } else {
        this.eqinfoList = [];
      }
    },
    // "from.eq_status"(newv){
    //   if(newv === 1){
    //     this.from.baofei_date=''
    //   }
    // }
  },
  computed: {
    isdiable() {
      if (this.radio == "" || this.shaixuan == "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    test(row) {},
    handleSelectionChange(val) {
      this.deleteEqdetailList = val;
    },
    async getEqDetail() {
      if (this.shaixuan) {
        let sx = {
          sxname: this.radio,
          sxtj: this.shaixuan,
          current: this.current,
          size: this.size,
          pxname: this.sort.name,
          pxfs: this.sort.fs,
        };
        let res = await this.$API.shebei.reqSxEqdetail(sx);
        this.list = res.date.eqDetailList;
        this.total = res.date.total;
      } else {
        let data = {
          pxname: this.sort.name,
          pxfs: this.sort.fs,
          current: this.current,
          size: this.size,
        };
        let res = await this.$API.shebei.reqEqDetail(data);
        this.list = res.data.eqDetailList;
        this.total = res.data.total;
      }
    },
    async getSchoolList() {
      let res = await this.$API.shebei.reqSchoolList();
      if (res.data) {
        this.schoolList = res.data;
      }
    },
    async schoolchange(val) {
      if (val) {
        let res = await this.$API.shebei.reqBuildingList(val);

        if (res.data) {
          this.buildingList = res.data;
        }
      } else {
        this.buildingId = "";
        this.buildingList = [];
        this.roomList = [];
        this.roomId = "";
      }
    },
    async buildingchange(val) {
      if (val) {
        let res = await this.$API.shebei.reqRoomList(val);
        if (res.data) {
          this.roomId = "";
          this.roomList = res.data;
        }
      } else {
        this.roomList = [];
        this.roomId = "";
      }
    },
    roomchange() {},
    async schoolchang1() {},
    async buildingchang1() {},
    async getCateList() {
      let res = await this.$API.shebei.reqCateList();
      this.eqcateList = res.data;
    },
    // async catechange(val) {
    //   this.from.eq_id = "";

    //   let res = await this.$API.shebei.reqEqList(val);
    //   this.eqinfoList = res.data;
    // },
    //新增窗口打开前的回调
    dialogClose() {
      for (const key in this.from) {
        this.from[key] = "";
      }
    },
    //修改内容
    addEqdetail(row) {
      this.dialogTableVisible = true;
      this.from = { ...row };
    },
    //保存信息按钮回调
    async saveEqdetail() {
      if (!this.from.eq_detailId) {
        const obj = this.eqinfoList.find(
          (item) => item.equipment_id === this.from.equipment_infoId
        );
        let kucun = obj.jinhuo_num - (obj.numa + (obj.numb - 0));
        if (kucun <= 0) {
          return this.$message({ type: "error", message: obj.equipment_name+`库存不足` });
        }
      }
      if (!this.from.equipment_sn) {
        let randomStr = "";
        let date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (let i = 0; i < 4; i++) {
          randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        let result = date + randomStr;
        this.from.equipment_sn = result;
        // return this.$message({
        //   type:'error',
        //   message:'序列号或设备状态不能为空'
        // })
      }
      if (this.from.eq_status !== 0 && this.from.eq_status !== 1) {
        return this.$message({
          type: "error",
          message: "设备状态不能为空",
        });
      } else if (this.from.eq_status === 1) {
        this.from.baofei_date = "";
      } else if (!this.from.baofei_date) {
        return this.$message({
          type: "error",
          message: "报废日期不能为空",
        });
      }

      let res = await this.$API.shebei.reqAddEqdetail(this.from);
      this.dialogTableVisible = false;
      this.getEqDetail();
    },
    //批量删除按钮
    async deleteEqdetail() {
      let list = [];
      this.$confirm("此操作将永久删除所选信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.deleteEqdetailList.forEach((item) => {
            list.push(item.eq_detailId);
          });
          await this.$API.shebei.reqDeleteEqdetail(list);
          this.getEqDetail();
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
    async btn_delete(row) {
      let list = [];
      list.push(row.eq_detailId);
      await this.$API.shebei.reqDeleteEqdetail(list);
      this.getEqDetail();
    },
    currentChange(cur) {
      this.current = cur;
      this.getEqDetail();
    },
    sizeChange(size) {
      this.size = size;
      this.getEqDetail();
    },
    jisuan_date(oldDate, newDate) {
      let oldV = new Date(oldDate);
      let newV = new Date(newDate);
      let timeDiff = Math.abs(oldV.getTime() - newV.getTime());
      let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysDiff;
    },
    computed_date(row) {
      if (row.eq_status) {
        let str = this.jisuan_date(row.jinhuo_data, new Date());
        return `正常(已使用${str}天)`;
      } else {
        let str = this.jisuan_date(row.jinhuo_data, row.baofei_date);
        return `于${row.baofei_date}报废(使用${str}天)`;
      }
    },
    async search_btn() {
      this.current = 1;
      let sx = {
        sxname: this.radio,
        sxtj: this.shaixuan,
        current: this.current,
        size: this.size,
        pxname: this.sort.name,
        pxfs: this.sort.fs,
      };
      let res = await this.$API.shebei.reqSxEqdetail(sx);
      this.list = res.date.eqDetailList;
      this.total = res.date.total;
    },
    clear_btn() {
      this.shaixuan = "";
      this.getEqDetail();
    },
    sortChange(sort) {
      if (sort.prop && sort.order) {
        console.log("2");
        this.sort.fs = sort.order == "ascending" ? "ASC" : "DESC";
        this.sort.name = sort.prop;
        this.getEqDetail();
      }
    },
  },
};
</script>

<style lang="scss">
.diav_1 {
  margin: 20px 0;
  display: inline-block;
  margin-right: 20px;
  span {
    font-weight: bold;
    font-size: 15px;
  }
}
.btn_1 {
  margin: 10px 0;
}
</style>