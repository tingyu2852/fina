<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>供应商</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click=" dialogTableVisible = true"
          >添加</el-button
        >
      </div>
      <el-table :data="list" border >
        <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
        <el-table-column label="供应商名称" prop="supplier_name" align="center"></el-table-column>
        <el-table-column label="操作"  align="center" width="160">
          <template slot-scope="{row}">
            <el-button type="primary" style="margin: 0 10px;" size="mini" @click="supplier_btn(row)">修改</el-button>
            <el-popconfirm
            :title="`确认删除这条内容吗？`"
            @onConfirm="supplier_del(row)"
          >
            <el-button
              slot="reference"
              type="danger"
              size="mini"
              
              class="btn_1"
              >删除</el-button
            >
          </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加" width="500px" :visible.sync="dialogTableVisible" :close-on-click-modal="false" @close="AdddialogClose">
      <div style="width: 90%; margin: auto" class="dialog_body">
      <el-form :model="supplierForm" label-width="100px">
        <el-form-item label="供应商名称">
          <el-input v-model="supplierForm.supplier_name" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSupplier">确 定</el-button>
      </div></el-dialog>
    <el-card style="margin:20px auto ;">
      <div slot="header" class="clearfix">
        <span>出厂商</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="dialogVendorVisible = true"
          >添加</el-button
        >
      </div>
      <el-table :data="list2" border >
        <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
        <el-table-column label="出厂商名称" prop="vendor_name" align="center"></el-table-column>
        <el-table-column label="操作"  align="center" width="160">
          <template slot-scope="{row}">
            <el-button type="primary" style="margin: 0 10px;" size="mini" @click="vendor_btn(row)">修改</el-button>
            <el-popconfirm
            :title="`确认删除这条内容吗？`"
            @onConfirm="vendor_del(row)"
          >
            <el-button
              slot="reference"
              type="danger"
              size="mini"
              
              class="btn_1"
              >删除</el-button
            >
          </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="出厂添加" width="500px" :visible.sync="dialogVendorVisible" :close-on-click-modal="false" @close="VendordialogClose">
      <div style="width: 90%; margin: auto" class="dialog_body">
      <el-form :model="vendorForm" label-width="100px">
        <el-form-item label="出厂商名称">
          <el-input v-model="vendorForm.vendor_name" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVendorVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVendor">确 定</el-button>
      </div></el-dialog>
  </div>
</template>

<script>
import { log } from 'console'
export default {
  name:'supplier',
  data() {
    return {
      dialogTableVisible:false,
      dialogVendorVisible:false,
      list:[
        {
          name:'希沃'
        },
        {
          name:'希沃'
        },
        {
          name:'希沃'
        },
        {
          name:'希沃'
        },
        {
          name:'希沃'
        }
      ],
      list2:[
        {
          name:'思锐通'
        },
        {
          name:'思锐通'
        },
        {
          name:'思锐通'
        },
        {
          name:'思锐通'
        },
        {
          name:'思锐通'
        },
      ],
      supplierForm:{
        supplier_name:''
      },
      vendorForm:{
        vendor_name:''
      }
    }
  },
  mounted(){
    this.getSupplier()
    this.getVendor()
  },
  methods:{
    //获取供应商列表
    async getSupplier(){
      let res = await this.$API.shebei.reqsupplier()
      this.list=res.data
      console.log(res.data);
    },
    //供应商修改按钮
    supplier_btn(row){
      this.supplierForm = {...row}
      this.dialogTableVisible = true
    },
    //供应商删除按钮
    async supplier_del(row){
      console.log(row)
      let res = await this.$API.shebei.reqDeleteSupplier(row.supplier_id)
      console.log(res);
      this.getSupplier()
    },
    //供应商添加保存按钮
    async addSupplier(){
      let data = await this.$API.shebei.reqADDsupplier(this.supplierForm)
      this.$message({
        type:'success',
        message:data.msg
      })
      this.getSupplier()
      this.dialogTableVisible = false
    },
    //添加供应商弹窗关闭的回调
    AdddialogClose(){
      for(let key in this.supplierForm){
        this.supplierForm[key]=''
      }
    },
    //获取厂商列表
    async getVendor(){
      let res = await this.$API.shebei.reqVendor()
      this.list2=res.data
      console.log(res.data);
    },
    //供应商修改按钮
    vendor_btn(row){
      this.vendorForm = {...row}
      this.dialogVendorVisible = true
    },
    //供应商删除按钮
    async vendor_del(row){
      console.log(row)
      let res = await this.$API.shebei.reqDeleteVendor(row.vendor_id)
      console.log(res);
      this.getVendor()
    },
    //供应商添加保存按钮
    async addVendor(){
      let data = await this.$API.shebei.reqAddVendor(this.vendorForm)
      this.$message({
        type:'success',
        message:data.msg
      })
      this.getVendor()
      this.dialogVendorVisible = false
    },
    //添加供应商弹窗关闭的回调
    VendordialogClose(){
      for(let key in this.vendorForm){
        this.vendorForm[key]=''
      }
    }
  }
}
</script>

<style>

</style>