<template>
  <div>
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
        :disabled="!deleteBx.length"
        @click="deleteBtn"
        >删除</el-button
      >
    <el-table :data="list" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="设备问题" prop="bx_name"></el-table-column>
      <el-table-column
        label="设备名称(型号)"
        prop="equipment_name"
      ></el-table-column>
      <el-table-column label="设备序列号" prop="equipment_sn"></el-table-column>
      <el-table-column label="设备分类" prop="equipment_catename"></el-table-column>
      <el-table-column label="设备位置" prop="room_name"></el-table-column>
      <el-table-column label="报修人" prop="bx_ren"></el-table-column>
      <el-table-column label="报修人电话" prop="bx_phone"></el-table-column>
      <el-table-column label="报修单位" prop="school_name"></el-table-column>
      <el-table-column label="报修时间" prop="time" min-width="100"></el-table-column>
      <el-table-column label="进度">
        <template slot-scope="{ row }">
          <el-tag type="success" v-if="row.bx_status">已处理</el-tag>
          <el-tag type="warning" v-else>未处理</el-tag>
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
            @click="cl_btn(row)"
            v-show="!row.bx_status"
            >处理</el-button
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
    <el-dialog
      title="报修处理"
      width="500px"
      :visible.sync="dialogFormVisible"
      @close="dialogClose"
      :close-on-click-modal="false"
    >
      <div style="width: 80%; margin: auto" class="dialog_body">
        <el-form :model="from">
          <!-- <el-form-item label="设备问题:" >
          <span>{{ from.bx_name }}</span>
        </el-form-item>
        <el-form-item label="设备分类:" >
          <span>{{ from.shebei_cate}}</span>
        </el-form-item>
        <el-form-item label="设备名称:" >
          <span>{{ from.shebei_name }}</span>
        </el-form-item>
        <el-form-item label="设备位置:" >
          <span>{{ from.weizhi }}</span>
        </el-form-item> -->

          <el-form-item label="是否使用配件:">
            <br />
            <div style="display: flex; flex-wrap: wrap">
              <div style="width: 100%">
                <el-radio v-model="from.pj" :label="1">是</el-radio>
                <el-radio v-model="from.pj" :label="0">否</el-radio>
              </div>

              <el-select
                class="box_select"
                v-model="cate_id"
                placeholder="请选择配件类型"
                v-if="from.pj"
              >
                <el-option
                  v-for="item in eqcateList"
                  :label="item.equipment_catename"
                  :value="item.equipment_cateid"
                  :key="item.equipment_cateid"
                ></el-option>
              </el-select>
              <el-select
                class="box_select"
                v-model="from.eq_id"
                placeholder="请先选择配件类型"
                v-if="from.pj"
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
          <el-form-item label="配件使用数量:" v-if="from.pj">
            <!-- <textarea v-model="from.wx_method" style="min-height: 100px;min-width: 200px;" maxlength="100"></textarea> -->
            <el-input v-model="from.eq_num" type="number"></el-input>
          </el-form-item>
          <el-form-item label="解决方法:">
            <br />
            <!-- <textarea v-model="from.wx_method" style="min-height: 100px;min-width: 200px;" maxlength="100"></textarea> -->
            <el-input
              v-model="from.wx_method"
              type="textarea"
              maxlength="50"
            ></el-input>
          </el-form-item>
          <el-form-item label="维修人:">
            <el-input v-model="from.wx_ren"></el-input>
          </el-form-item>
          <el-form-item label="维修日期">
            <el-date-picker
              v-model="from.wx_data"
              type="datetime"
              placeholder="选择日期时间"
              :editable="false"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker
          ></el-form-item>
          <el-form-item label="备注:">
            <el-input v-model="from.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save_btn">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加" width="500px" :visible.sync="dialogTableVisible" :close-on-click-modal="false" @close="AdddialogClose">
      <div style="width: 80%; margin: auto" class="dialog_body">
        <el-form :model="addfrom">
          <!-- <el-form-item label="设备问题:" >
          <span>{{ addfrom.bx_name }}</span>
        </el-form-item>
        <el-form-item label="设备分类:" >
          <span>{{ addfrom.shebei_cate}}</span>
        </el-form-item>
        <el-form-item label="设备名称:" >
          <span>{{ addfrom.shebei_name }}</span>
        </el-form-item>
        <el-form-item label="设备位置:" >
          <span>{{ addfrom.weizhi }}</span>
        </el-form-item> -->
          <el-form-item label="故障问题">
            <br />
            <!-- <textarea v-model="addfrom.wx_method" style="min-height: 100px;min-width: 200px;" maxlength="100"></textarea> -->
            <el-input
              v-model="addfrom.bx_name"
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
          <el-form-item label="所属单位">
            <el-select
              v-model="addfrom.school_id"
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
          <el-form-item label="所属房间">
            <el-select
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
          <el-form-item label="故障设备">
            <el-select
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
          <el-form-item label="报修日期">
            <el-date-picker
              v-model="addfrom.time"
              type="datetime"
              placeholder="选择日期时间"
              :editable="false"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker
          ></el-form-item>
          
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBxBtn">确 定</el-button>
      </div></el-dialog>
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
  name: "baoxiu",
  data() {
    return {
      current: 1,
      total: 1,
      size: 10,
      sizes: [10, 20, 50, 100],
      cate_id: "",
      dialogFormVisible: false,
      dialogTableVisible:false,
      list: [],
      eqcateList: [],
      eqinfoList: [],
      schoolList:[],
      roomEqList:[],
      roomList1:[],
      buildingList1:[],
      deleteBx:[],
      from: {
        pj: "",
        wx_method: "",
        eq_id: "",
        eq_num: "",
        wx_ren: "",
        wx_data: "",
        remark: "",
      },
      addfrom:{
        bx_name:'',
        bx_ren:'',
        bx_phone:'',
        school_id:'',
        building_id:'',
        room_id:'',
        shebei_id:'',
        time:''

      }
    };
  },
  mounted() {
    this.getBxList();
    this.getCateList();
    this.getSchoolList()
  },
  watch: {
    async cate_id(newv, oldv) {
      this.from.eq_id = "";
      if (newv) {
        let res = await this.$API.shebei.reqEqList(newv);
        this.eqinfoList = res.data;
      } else {
        this.eqinfoList = [];
      }
    },
    async 'addfrom.school_id'(newv,oldv){
      if(newv){
       let res = await this.$API.shebei.reqBuildingList(newv)
       this.buildingList1 = res.data
      }
      
    },
    async 'addfrom.building_id'(newv,oldv){
      if(newv){
       let res = await this.$API.shebei.reqRoomList(newv)
       this.roomList1 = res.data
      }
      
    },
    async 'addfrom.room_id'(newv,oldv){
      if(newv){
       let res = await this.$API.weihu.reqRoomEq(newv)
       this.roomEqList = res.eqList
       
      }
    }
  },
  methods: {
    currentChange(cur) {
      console.log(cur);
    },
    sizeChange(size) {
      console.log(size);
    },
    handleSelectionChange(val) {
      this.deleteBx = val;
    },
    //获取报修信息列表
    async getBxList() {
      let res = await this.$API.weihu.reqBaoXiu(this.current, this.size);
      this.list = res.data.baoxiuList;
      this.total = res.data.total;
      console.log(res);
    },
    async deleteTableBtn(row) {
      let list =[row.id]
      let res = await this.$API.weihu.reqDeleteBx(list);
      await this.getBxList();
      this.$message({
        type:'success',
        message:'删除成功'
      })
    },
    cl_btn(row) {
      this.from.id = row.id
      this.from.bx_name = row.bx_name;
      this.from.shebei_id = row.shebei_id;
      this.from.room_id = row.room_id;
      this.from.bx_status = 1
      this.from.time = row.time
      this.from.bx_ren = row.bx_ren
      this.from.bx_phone = row.bx_phone
      this.from.bx_unitid = row.bx_unitid
      this.dialogFormVisible = true;
      console.log(this.from);
    },
    //获取设备分类列表
    async getCateList() {
      let res = await this.$API.shebei.reqCateList();
      this.eqcateList = res.data;
    },
    //弹窗关闭的回调
    dialogClose() {
      //防止信息残留，在弹窗关闭时清除数据
      this.cate_id=''
      for (const key in this.from) {
        this.from[key] = "";
      }
    },
    //保存按钮
    async save_btn() {
      
      let res = await this.$API.weihu.reqBxCL(this.from)
      this.$message({
        type:'success',
        message:'处理成功'
      })
      this.getBxList()
      this.dialogFormVisible = false;
    },
    //查询单位列表
    async getSchoolList() {
      let res = await this.$API.shebei.reqSchoolList();
      if (res.data) {
        this.schoolList = res.data;
      }
    },
    //添加弹窗关闭触发
    AdddialogClose(){
      for(const key in this.addfrom){
        this.addfrom[key]=''
      }
    },
    //添加弹窗保存按钮
    async addBxBtn(){
      let res = await this.$API.weihu.reqAddBx(this.addfrom)
      this.$message({
        type:'success',
        message:'添加成功'
      })
      this.getBxList()
      this.dialogTableVisible = false
    },
    deleteBtn(){
      let list = [];

      this.deleteBx.forEach((item) => {
        list.push(item.id);
      });
      console.log(list);
      if (list.length) {
        this.$confirm("此操作将永久删除所选信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            console.log('2');
            let res = await this.$API.weihu.reqDeleteBx(list);
            await this.getBxList();
            this.$message({
              type: res.type,
              message: res.msg,
            });
          })
          .catch(() => {
            console.log('1');
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    }
  },
};
</script>

<style scoped>
.dialog_body span {
  font-size: inherit;
}
.box_select {
  margin: 10px 10px;
  width: 150px;
}
</style>