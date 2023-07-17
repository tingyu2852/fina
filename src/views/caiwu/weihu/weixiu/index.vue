<template>
  <div>
    <div style="display: flex; align-items: center">
      <el-input
        v-model="shaixuan.name"
        placeholder="请输入教室"
        clearable
        maxlength="6"
        show-word-limit
        style="width: 200px; margin: 0 10px"
      ></el-input>
      <el-date-picker
        v-model="shaixuan.time1"
        type="datetimerange"
        range-separator="至"
        start-placeholder="要筛选的起始维修日期"
        end-placeholder="要筛选的结束维修日期"
        value-format="yyyy-MM-dd HH:mm:ss"
      >
      </el-date-picker>
      <el-button
        style="margin: 10px"
        type="primary"
        icon="el-icon-search"
        @click="search_btn"
        plain
        :disabled="isDisabled"
        >搜索</el-button
      >
      <el-button
        style="margin: 10px"
        type="primary"
        icon="el-icon-search"
        @click="clear_btn"
        plain
        :disabled="isDisabled"
        >清空筛选</el-button
      >
    </div>
    <el-button
      style="margin: 10px 0"
      type="primary"
      plain
      @click="dialogTableVisible = true"
      size="mini"
      >新增</el-button
    >
    <el-button
      style="margin: 10px"
      type="primary"
      plain
      @click="dc_btn"
      :disabled="!deleteWx.length"
      size="mini"
      >导出</el-button
    >
    <el-button
      type="danger"
      plain
      size="mini"
      :disabled="!deleteWx.length"
      @click="deleteBtn"
      >删除</el-button
    >
    <el-table :data="list" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="设备问题" prop="eq_guzhang"></el-table-column>
      <el-table-column
        label="设备名称(型号)"
        prop="equipment_name"
      ></el-table-column>
      <el-table-column label="设备序列号" prop="equipment_sn"></el-table-column>
      <el-table-column label="设备位置" prop="room_name"></el-table-column>
      <el-table-column label="解决方法" prop="wx_method"></el-table-column>
      <el-table-column label="使用配件" prop="wx_eqname">
        <template slot-scope="{ row }">
          <span v-show="!row.wx_eqid">无</span>
          <span v-show="row.wx_eqid">{{ row.wx_eqname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="使用配件数量" prop="wx_eqnum">
        <template slot-scope="{ row }">
          <span v-show="!row.wx_eqid">无</span>
          <span v-show="row.wx_eqid">{{ row.wx_eqnum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="维修人" prop="wx_ren"></el-table-column>
      <el-table-column label="维修时间" prop="wx_time" min-width="100">
      </el-table-column>
      <el-table-column label="操作" min-width="130">
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
          <el-button
            style="margin-right: 10px"
            type="text"
            plain
            icon="el-icon-plus"
            class="btn_1"
            @click="xq_btn(row)"
            >详情</el-button
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
    <el-drawer title="详情" :visible.sync="drawer" :direction="direction">
      <div style="height: 700px">
        <el-scrollbar
          :min-width="200"
          style="height: 95%; width: 90%; margin: auto; min-width: 200px"
        >
          <el-form class="dar_form" ref="dr_form" style="height: 500px">
            <el-form-item label="设备问题" class="dar_form_item">
              <!-- <template #label><span style="font-size: 18px;">设备问题</span></template> -->
              <div>{{ wxInfo.eq_guzhang }}</div>
            </el-form-item>
            <el-form-item label="设备型号">
              {{ wxInfo.equipment_name }}
            </el-form-item>
            <el-form-item label="设备分类">
              {{ wxInfo.equipment_catename }}
            </el-form-item>
            <el-form-item label="序列号">
              {{ wxInfo.equipment_sn }}
            </el-form-item>
            <el-form-item label="位置">
              {{ wxInfo.room_name }}
            </el-form-item>
            <el-form-item label="报修人">
              {{ wxInfo.bx_ren }}
            </el-form-item>
            <el-form-item label="报修人联系方式">
              {{ wxInfo.bx_phone }}
            </el-form-item>
            <el-form-item label="报修单位">
              {{ wxInfo.school_name }}
            </el-form-item>
            <el-form-item label="报修时间">
              {{ wxInfo.bx_time }}
            </el-form-item>
            <el-form-item label="维修方式">
              {{ wxInfo.wx_method }}
            </el-form-item>
            <el-form-item label="维修使用配件">
              {{ wxInfo.wx_eqname }}
            </el-form-item>
            <el-form-item label="使用配件数量">
              {{ wxInfo.wx_eqnum }}
            </el-form-item>
            <el-form-item label="维修人">
              {{ wxInfo.wx_ren }}
            </el-form-item>
            <el-form-item label="维修时间">
              {{ wxInfo.wx_time }}
            </el-form-item>

            <el-form-item label="备注">
              {{ wxInfo.remark }}
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
    </el-drawer>
    <el-dialog
      title="添加"
      width="500px"
      :visible.sync="dialogTableVisible"
      @close="AdddialogClose"
      :close-on-click-modal="false"
    >
      <div style="width: 80%; margin: auto" class="dialog_body">
        <el-form :model="addfrom" ref="ruleForm" :rules="rules">
          <el-form-item label="报修原因" prop="eq_guzhang">
            <br />
            <!-- <textarea v-model="addfrom.wx_method" style="min-height: 100px;min-width: 200px;" maxlength="100"></textarea> -->
            <el-input
              v-model="addfrom.eq_guzhang"
              type="textarea"
              maxlength="50"
            ></el-input>
          </el-form-item>
          <el-form-item label="报修人:">
            <el-input v-model="addfrom.bx_ren"></el-input>
          </el-form-item>
          <el-form-item label="报修人联系方式:">
            <el-input v-model="addfrom.bx_phone" type="number"></el-input>
          </el-form-item>
          <el-form-item label="所属单位" prop="bx_unitid">
            <el-select
              clearable
              v-model="addfrom.bx_unitid"
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
              clearable
              v-model="addfrom.building_id"
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
          <el-form-item label="所属房间" prop="room_id">
            <el-select
              clearable
              v-model="addfrom.room_id"
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
          <el-form-item label="故障设备" prop="shebei_id">
            <el-select
              clearable
              v-model="addfrom.shebei_id"
              placeholder="请先选择房间"
            >
              <el-option
                v-for="item in roomEqList"
                :label="item.equipment_name"
                :value="item.eq_detailId"
                :key="item.eq_detailId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报修日期" prop="bx_time">
            <el-date-picker
              v-model="addfrom.bx_time"
              type="datetime"
              placeholder="选择日期时间"
              :editable="false"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker
          ></el-form-item>
          <el-form-item label="是否使用配件:">
            <br />
            <div style="display: flex; flex-wrap: wrap">
              <div style="width: 100%">
                <!-- <el-radio v-model="addfrom.pj" :label="true">是</el-radio>
                <el-radio v-model="addfrom.pj" :label="false">否</el-radio> -->
                <el-radio-group v-model="pj" @change="radiochange">
                  <el-radio :label="true" ref="radio1">是</el-radio>
                  <el-radio :label="false" ref="radio2">否</el-radio>
                </el-radio-group>
              </div>

              <el-select
                clearable
                class="box_select"
                v-model="addfrom.wx_cateid"
                placeholder="请选择配件类型"
                v-if="pj"
                @change="addfrom.wx_eqid = ''"
              >
                <el-option
                  v-for="item in eqcateList"
                  :label="item.equipment_catename"
                  :value="item.equipment_cateid"
                  :key="item.equipment_cateid"
                ></el-option>
              </el-select>
              <el-select
                clearable
                class="box_select"
                v-model="addfrom.wx_eqid"
                placeholder="请先选择配件类型"
                v-if="pj"
              >
                <el-option
                  v-for="item in eqinfoList"
                  :label="item.equipment_name"
                  :value="item.equipment_id"
                  :key="item.equipment_id"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item
            label="配件使用数量:"
            v-if="addfrom.wx_eqid"
            prop="wx_eqnum"
          >
            <!-- <textarea v-model="addfrom.wx_method" style="min-height: 100px;min-width: 200px;" maxlength="100"></textarea> -->
            <el-input v-model="addfrom.wx_eqnum" type="number"></el-input>
          </el-form-item>
          <el-form-item
            label="维修方式:"
            :show-overflow-tooltip="true"
            prop="wx_method"
          >
            <br />
            <!-- <textarea v-model="addfrom.wx_method" style="min-height: 100px;min-width: 200px;" maxlength="100"></textarea> -->
            <el-input
              v-model="addfrom.wx_method"
              type="textarea"
              maxlength="50"
            ></el-input>
          </el-form-item>
          <el-form-item label="维修人:" prop="wx_ren">
            <el-input v-model="addfrom.wx_ren"></el-input>
          </el-form-item>
          <el-form-item label="维修日期" prop="wx_time">
            <el-date-picker
              v-model="addfrom.wx_time"
              type="datetime"
              placeholder="选择日期时间"
              :editable="false"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker
          ></el-form-item>
          <el-form-item label="备注:">
            <el-input v-model="addfrom.remark"></el-input>
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
  name: "weihu",
  data() {
    return {
      activeName: "first",
      radio3: "",
      total: 0,
      current: 1,
      dialogTableVisible: false,
      size: 10,
      sizes: [10, 20, 50, 100],
      list: [],
      deleteWx: [],
      schoolList: [],
      buildingList1: [],
      roomList1: [],
      roomEqList: [],
      eqinfoList: [],
      eqcateList: [],
      drawer: false,
      direction: "rtl",
      wxInfo: {},
      cate_id: "",
      pj: "",
      shaixuan: {
        time1: null,
        name: "",
      },
      addfrom: {
        eq_guzhang: "",
        bx_ren: "",
        bx_phone: "",
        bx_unitid: "",
        building_id: "",
        room_id: "",
        shebei_id: "",
        bx_time: "",
        wx_ren: "",
        wx_time: "",
        wx_eqid: "",
        wx_eqnum: "",
        remark: "",
        equipment_cateid: "",
        pj: 0,
        wx_cateid: "",
      },
      rules: {
        eq_guzhang: [
          { required: true, message: "请输入报修原因", trigger: "blur" },
        ],
        shebei_id: [
          { required: true, message: "请选择设备", trigger: "change" },
        ],
        wx_time: [
          { required: true, message: "请选择维修时间", trigger: "change" },
        ],
        bx_unitid: [
          { required: true, message: "请选择单位", trigger: "change" },
        ],
        room_id: [{ required: true, message: "请选择房间", trigger: "change" }],
        wx_ren: [{ required: true, message: "请输入维修人", trigger: "blur" }],
        wx_method: [
          { required: true, message: "请输入维修方式", trigger: "blur" },
        ],
        wx_eqid: [
          { required: true, message: "请选择使用的配件", trigger: "blur" },
        ],
        wx_eqnum: [
          { required: true, message: "请输入维修配件数量", trigger: "blur" },
        ],
        eq_guzhang: [
          { required: true, message: "请输入报修原因", trigger: "blur" },
        ],
        eq_guzhang: [
          { required: true, message: "请输入报修原因", trigger: "blur" },
        ],
      },
      time1: "",
      time2: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  computed:{
    isDisabled(){
      return !this.shaixuan.time1 && !this.shaixuan.name
    }
  },
  mounted() {
    this.getWxList();
    this.getSchoolList();
    this.getCateList();
  },
  watch: {
    async "addfrom.wx_cateid"(newv, oldv) {
      if (newv) {
        let res = await this.$API.shebei.reqEqList(newv);
        this.eqinfoList = res.data;
      } else {
        this.eqinfoList = [];
      }
    },
    async "addfrom.bx_unitid"(newv, oldv) {
      if (newv) {
        let res = await this.$API.shebei.reqBuildingList(newv);
        this.buildingList1 = res.data;
      }
    },
    async "addfrom.building_id"(newv, oldv) {
      if (newv) {
        let res = await this.$API.shebei.reqRoomList(newv);
        this.roomList1 = res.data;
      }
    },
    async "addfrom.room_id"(newv, oldv) {
      if (newv) {
        let res = await this.$API.weihu.reqRoomEq(newv);
        this.roomEqList = res.eqList;
      }
    },
  },
  methods: {
    //获取维修记录函数
    async getWxList() {
      if (this.shaixuan.time1 || this.shaixuan.name) {
        let res = await this.$API.weihu.reqSxWX(
          this.current,
          this.size,
          this.shaixuan
        );
        this.list = res.date.WxList;
        this.total = res.date.total;
      } else {
        let res = await this.$API.weihu.reqWxList(this.current, this.size);
        this.list = res.data.WxList;
        this.total = res.data.total;
      }
    },
    //当前页发生变化时触发
    currentChange(cur) {},
    //当前每页显示条数变化时触发
    sizeChange(size) {},
    //批量删除按钮
    async deleteBtn() {
      let list = [];

      this.$confirm("此操作将永久删除所选信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.deleteWx.forEach((item) => {
            list.push(item.id);
          });
          await this.$API.weihu.reqDeleteWx(list);
          await this.getWxList();
          this.$message({
            type: 'success',
            message: '删除成功',
          });
        })
        .catch(() => {
          console.log("1");
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //多选触发函数
    handleSelectionChange(val) {
      this.deleteWx = val;
    },
    //弹窗中确定按钮
    addBxBtn() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          try {
            let res = await this.$API.weihu.reqAddWx(this.addfrom);
            await this.getWxList();
            this.dialogTableVisible = false;
            this.$message({
              type: "success",
              message: "保存成功",
            });
          } catch (error) {
            return this.$message({
              type: "error",
              message: "保存失败",
            });
          }
        } else {
          return false;
        }
      });
    },
    //弹窗关闭前的回调
    AdddialogClose() {
      this.$refs["ruleForm"].clearValidate();
      for (let key in this.addfrom) {
        this.addfrom[key] = "";
      }
    },
    //表格中删除按钮
    async deleteTableBtn(row) {
      let list = [];
      list.push(row.id);

      await this.$API.weihu.reqDeleteWx(list);
      await this.getWxList();
    },
    //表格中编辑按钮
    bj_btn(row) {
      this.addfrom = { ...row };

      if (this.addfrom.wx_eqname) {
        this.pj = true;
      }
      //else {
      //   console.log("0");
      //   this.addfrom.pj = false;
      // }
      this.dialogTableVisible = true;
    },
    //表格中详情按钮
    xq_btn(row) {
      this.wxInfo = row;
      this.drawer = true;
    },
    async getSchoolList() {
      let res = await this.$API.shebei.reqSchoolList();
      if (res.data) {
        this.schoolList = res.data;
      }
    },
    async getCateList() {
      let res = await this.$API.shebei.reqCateList();
      this.eqcateList = res.data;
    },
    radiochange(row) {
      //this.$refs['radio'].setCurrentValue(this.addfrom.pj)
      // console.log(this.$refs['radio1']['$el']);
      // this.$refs['radio1']['$el'].click()
      // this.$refs['radio2']['$el'].click()

      if (!row) {
        this.addfrom.wx_cateid = "";
        this.addfrom.wx_eqid = "";
        this.addfrom.wx_eqnum = "";
      }
    },
    //导出按钮
    dc_btn() {
      let list = this.deleteWx.slice();
      let list1 = [];
      this.list.forEach((item) => {
        let {
          eq_guzhang,
          equipment_name,
          equipment_catename,
          equipment_sn,
          room_name,
          bx_ren,
          bx_phone,
          school_name,
          bx_time,
          wx_method,
          wx_eqname,
          wx_eqnum,
          wx_ren,
          wx_time,
          remark,
        } = item;
        list1.push({
          eq_guzhang,
          equipment_name,
          equipment_catename,
          equipment_sn,
          room_name,
          bx_ren,
          bx_phone,
          school_name,
          bx_time,
          wx_method,
          wx_eqname,
          wx_eqnum,
          wx_ren,
          wx_time,
          remark,
        });
      });
      //let title = this.$refs['dr_form'].items.map(item => item.label)
      let title = [
        "设备问题",
        "设备型号",
        "设备分类",
        "序列号",
        "位置",
        "报修人",
        "报修人电话",
        "报修单位",
        "报修时间",
        "维修方式",
        "维修使用配件",
        "使用数量",
        "维修人",
        "维修时间",
        "备注",
      ];
      //console.log( this)
      this.$dc_excel(list1, title, "123");

      //console.log(title);
    },
    clear_btn() {
      for (let key in this.shaixuan) {
        this.shaixuan[key] = "";
      }
      this.getWxList();
    },
    //搜索按钮触发
    async search_btn() {
      if (this.shaixuan.time1 || this.shaixuan.name) {
        let res = await this.$API.weihu.reqSxWX(1, this.size, this.shaixuan);
        this.list = res.date.WxList;
        this.total = res.date.total;
      } else {
        return this.$message({
          type: "info",
          message: "请输入条件",
        });
      }
    },
  },
};
</script>

<style scoped>
>>> .el-scrollbar__wrap {
  overflow-x: hidden;
}

.dialog_body span {
  font-size: inherit;
}
.box_select {
  margin: 10px 10px;
  width: 150px;
}
</style>