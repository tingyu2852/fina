<template>
  <div class="content-wrap">
    <el-card style="margin: 0 auto">
        <div class="custom-btn-wrap">
          <div class="add-custom-btn" @click="dialogTableVisible = true,dialogTitle='添加公司信息'"><i class="el-icon-plus"></i>新增项目</div>
          <div  class="delete-custom-btn"  @click="deleteBtn" ><i class="el-icon-delete"></i>删除</div>
        </div>
        <el-table
          style="margin-top: 12px;"
          row-class-name="active-contnet" 
          header-cell-class-name='active-header'  
          :stripe="true"   
          :data="corpList"
          @selection-change="handleSelectionChange"
          v-loading="loading" 
          border
        >
          <el-table-column  type="selection" width="55" align="center"> </el-table-column>
          <el-table-column  label="序号" type="index" width="50"  align="center">
            <template slot-scope="scope">
               {{ calculateIndex(scope.$index) }}
            </template>
          </el-table-column>
          <el-table-column  label="单位名称" prop="corp_name" align="center"></el-table-column>
          <!-- <el-table-column header-align="center" label="单位分类" prop="corp_cate" align="left"></el-table-column> -->
          
          <el-table-column header-align="center" label="操作" width="200px">
            <template slot-scope="{ row }">
              <div class="custom-table-btn-wrap">
                <div class="edit-custom-table-btn"  @click="bj_btn(row)"><i class="el-icon-edit"></i>编辑</div>
                <div  class="delete-custom-table-btn"  @click="deleteTableBtn(row)" ><i class="el-icon-delete"></i>删除</div>
              </div>
              <!-- <el-button
                style="margin-right: 10px"
                type="text"
                plain
                icon="el-icon-plus"
                class="btn_1"
               
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
              </el-popconfirm> -->
            </template>
          </el-table-column>
        </el-table>
        
    
      <div style="text-align: right; margin-top: 10px">
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
    </el-card>
    <el-dialog
      :title="dialogTitle"
      width="500px"
      :visible.sync="dialogTableVisible"
      @close="AdddialogClose"
      :close-on-click-modal="false"
    >
        <!-- 自定义分割线 -->
        <div class="custom-horizontal-line"></div>
        <div  class="dialog_body custom-dialog-body">
          <el-form
            :model="addfrom"
            ref="ruleForm"
            label-width="80px"
            label-position="left"
            :rules="rules"
          >
          
            <el-form-item label="单位名称" prop="corp_name">
              <el-input v-model="addfrom.corp_name" placeholder="请输入单位名称"></el-input>
            </el-form-item>
            <!-- <el-form-item label="分类" prop="corp_cate">
            <el-select v-model="addfrom.corp_cate" placeholder="请选择分类">
              <el-option v-for="(item,index) in ['融资主体','担保主体','借款主体']" :label="item" :value="item" :key="index"></el-option>
            </el-select>
            </el-form-item> -->
          
          </el-form>
        </div>
        <!-- 自定义分割线 -->
        <div class="custom-horizontal-line"></div>
        <div slot="footer"  class="dialog-footer custom-dialog-btn-wrap">
          <div  class="cancel-custom-dialog-btn"  @click="dialogTableVisible = false" >取消</div>
          <div class="save-custom-dialog-btn"  @click="addBxBtn">保存</div>
        </div>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="addBxBtn">确 定</el-button>
        </div> -->
      </el-dialog
    >
  </div>
</template>

<script>
export default {
  name: "Corp",
  data() {
    return {
      dialogTitle: '添加公司信息',
      dialogTableVisible: false,
      corpList: [
      ],
      current: 1,
      size: 10,
      sizes: [10, 50, 100, 200, 500],
      total: 1000,
      addfrom: {
          corp_name:'',
          corp_cate:null
      },
      rules: [],
      delCorp: [],
      rules: {
        corp_name: [{ required: true, message: "不能为空", trigger: "blur" }],
        corp_cate: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getCorp();
  },
  methods: {
    // 计算序号
    calculateIndex(index) {
      return (this.current - 1) * this.size + index + 1;
    },
    async getCorp() {
      let res = await this.$API.caiwu.getCorp(this.current, this.size);
      this.total = res.data.total;
      this.corpList = res.data.corpList;
    },
    //多选回调
    handleSelectionChange(row) {
      this.delCorp = row;
    },
    async deleteBtn() {
        if(this.delCorp.length == 0){
          this.$message({
            // type: 'success',
            message: '请选择要删除的数据!'
          });
          return;
        }
        
        this.$confirm("此操作将永久删除所选信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          if (this.delCorp.length) {
             let delList = [];
             this.delCorp.forEach((item) => {
                 delList.push(item.corp_id);
             });
            await this.$API.caiwu.delCorp(delList);
              this.getCorp();
              this.$message({
                type: "success",
                message: "删除成功",
              });
            }
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      
    },
    async deleteTableBtn(row) {
      this.$confirm("此操作将永久删除所选信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          let delList = [row.corp_id];
          await this.$API.caiwu.delCorp(delList);
          this.$message({
            type: "success",
            message: "删除成功",
          });
      this.getCorp();
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //导出按钮
    dc_btn() {},
    currentChange(cur) {
      this.current = cur
      this.getCorp()
    },
    //每页显示条数修改
    sizeChange(size) {
      this.size = size
      this.getCorp()
      
    },
    //弹窗保存按钮
    addBxBtn() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          await this.$API.caiwu.addCorp(this.addfrom);
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.getCorp();
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
      this.dialogTitle = '编辑公司信息';
      this.addfrom = { ...row };
      this.dialogTableVisible = true;
    },
  },
};
</script>

<style>
</style>