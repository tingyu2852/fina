<template>
  <div>
    <div v-show="show" style="margin: 20px 20px">
      <el-button type="primary" @click="addWeixiu">添加</el-button>
      <el-table :data="weixiuList" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="教室号">
                <span>{{ props.row.classroom }}</span>
              </el-form-item>
              <el-form-item label="设备问题">
                <span>{{ props.row.wxdesc }}</span>
              </el-form-item>
              <el-form-item label="配件使用">
                <span>{{
                  props.row.accessories ? props.row.accessories : "无"
                }}</span>
              </el-form-item>
              <el-form-item label="维修人">
                <span>{{ props.row.wxname }}</span>
              </el-form-item>
              <el-form-item label="维修时间">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.remark ? props.row.remark : "无" }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" align="center" width="100">
        </el-table-column>
        <el-table-column
          label="教室号"
          prop="classroom"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="设备问题"
          prop="wxdesc"
          align="center"
          width="width"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="日期" prop="date" align="center" width="width">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row, $index }">
            <el-button type="primary" size="small" @click="updateWX(row)" style="margin-right: 10px;"
              >编辑</el-button
            >
            <el-popconfirm :title="`确认删除${row.classroom}的这条记录吗？`" @onConfirm="wxdelete(row.id)">
              <el-button type="danger" slot="reference" size="small"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center; margin: 20px 0">
        <el-pagination
          background
          layout="prev, pager, next,sizes, jumper, ->, total"
          :total="total"
          :page-sizes="[5, 10, 20, 50, 100]"
          :current-page="page"
          :page-size="size"
          @current-change="change"
          @size-change="sizechange"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="添加信息"
      :visible.sync="dialogShow"
      :destroy-on-close="true"
    >
      <div style="width: 90%; margin: auto">
        <el-form
          ref="wxform"
          :model="form"
          label-width="110px"
          label-position="left"
          :rules="rules"
          :validate-on-rule-change="false"
        >
          <el-form-item label="教室号:" prop="classroom">
            <el-input
              v-model="form.classroom"
              placeholder="请输入教室号"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备问题:" prop="wxdesc">
            <el-input
              v-model="form.wxdesc"
              placeholder="请描述设备问题"
            ></el-input>
          </el-form-item>
          <el-form-item label="配件使用情况:">
            <el-input
              v-model="form.accessories"
              placeholder="请输入配件使用情况（没有可不填）"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input
              v-model="form.remark"
              placeholder="请输入备注（没有可不填）"
            ></el-input>
          </el-form-item>
          <el-form-item label="维修人:" prop="wxname">
            <el-input
              v-model="form.wxname"
              placeholder="请输入维修人员名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="时间:" prop="date">
            <el-date-picker
              v-model="form.date"
              align="right"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              :editable="false"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="reqAddWeixiu">提交</el-button>
        <el-button @click="qxbtn">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "weixiu",
  data() {
    return {
      weixiuList: [],
      tableData: [
        {
          id: "12987122",
          name: "致远201",
          remark: "",
          desc: "电脑不通电无法开机",
          accessories: "主机电源1个",
          processor: "张三",
          time: "2022-02-02",
        },
        {
          id: "12987122",
          name: "致远201",
          remark: "暂无配件",
          desc: "电脑不通电无法开机",
          accessories: "主机电源1个",
          processor: "张三",
          time: "2022-02-02",
        },
        {
          id: "12987122",
          name: "致远201",
          remark: "",
          desc: "电脑不通电无法开机",
          accessories: "主机电源1个",
          processor: "张三",
          time: "2022-02-02",
        },
        {
          id: "12987122",
          name: "致远201",
          remark: "",
          desc: "电脑不通电无法开机",
          accessories: "主机电源1个",
          processor: "张三",
          time: "2022-02-02",
        },
      ],
      total: 0,
      limit: "",
      size: 5,
      show: true,
      dialogShow: false,
      page: 1,
      form: {
        wxname: "",
        remark: "",
        wxdesc: "",
        accessories: "",
        classroom: "",
        date: "",
      },
      rules: {
        classroom: [
          { required: true, message: "请输入教室号", trigger: "blur" },
        ],
        wxdesc: [
          { required: true, message: "请输入设备问题", trigger: "blur" },
        ],
        date: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        wxname: [
          { required: true, message: "请输入维修人名称", trigger: "blur" },
        ],
      },
    };
  },

  mounted() {
    this.getWeixiuList(this.page, this.size);
  },
  methods: {
    addWeixiu() {
      //console.log(this.$API)
      for (const key in this.form) {
        this.form[key] = "";
      }
      this.dialogShow = true;
    },
    async getWeixiuList(page, size) {
      // let {page,size}=this
      console.log(page, size);
      //let res = await Axios.get("http://localhost:3000/master?limit=4&size=5")
      let res = await this.$API.shebei.reqweixiuList(page, size);
      //console.log(res)
      this.weixiuList = res.weixiuList;
      this.total = res.total;
      //  console.log(res.data.weixiuList)
    },
    change(c) {
      console.log(c);
      this.page = c;
      this.getWeixiuList(c, this.size);
    },
    sizechange(size) {
      console.log(size);
      this.size = size;
      this.getWeixiuList(this.page, this.size);
    },
    //添加保存按钮
    reqAddWeixiu() {
      this.$refs["wxform"].validate(async (valid) => {
        console.log(valid);
        if (valid) {
          console.log(this.form.id == "");
          if (!this.form.id) {
            console.log("ok");
            let res = await this.$API.shebei.reqAddweixiu(this.form);
            if (res.code == 20000) {
              await this.getWeixiuList(this.page, this.size);
              this.$refs["wxform"].resetFields();
              this.dialogShow = false;
              return this.$message({
                message: "添加成功",
                type: "success",
              });
            }
            this.dialogShow = false;
            return this.$message({
              message: "添加失败",
              type: "error",
            });
          } else {
            let res = await this.$API.shebei.reqUpdateWeixiu(this.form);
            if (res.code == 20000) {
              await this.getWeixiuList(this.page, this.size);
              this.$refs["wxform"].resetFields();
              this.dialogShow = false;
              return this.$message({
                message: "修改成功",
                type: "success",
              });
            }
            this.dialogShow = false;
            return this.$message({
              message: "修改失败",
              type: "error",
            });
            console.log(res);
          }
          return;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //取消按钮回调
    qxbtn() {
      this.dialogShow = false;
      this.$refs["wxform"].resetFields();
      for (const key in this.form) {
        this.form[key] = "";
      }
    },
    //编辑按钮回调
    updateWX(row) {
      //console.log(row);
      this.dialogShow = true;
      this.form = { ...row };
      //console.log(this.form === row)
    },
    //删除按钮回调
    async wxdelete(id){
      console.log(id)
      let res = await this.$API.shebei.reqDeleteWeixiu(id)
      if(res.code==20000){
        await this.getWeixiuList(this.page,this.size)
        return this.$message({
          type:'success',
          message:'删除成功'
        })
      }
      return this.$message({
          type:"error",
          message:'删除失败'
        })
    }
  },
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>