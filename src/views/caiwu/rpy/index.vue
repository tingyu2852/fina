<template>
  <div>
  
  </div>
</template>

<script>
export default {
  name: "RpyPlan",
  data() {
    return {
      boxshow: 2,
      dialogTableVisible: false,
      rpyList: [],
      current: 1,
      size: 50,
      sizes: [50, 100, 200, 500],
      total: 1000,
      addfrom: {
        corp_id: "",
        bank_id: "",
        rpy_date: "",
        accr_rec: "",
        proj_id: "",
        prin_rec: "",
      },
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        rpyPlan:[
          {
            name:'',
            time:''
          }
        ]
      },

      rules: [],
      corpList: [],
      bankList: [],
      projList: [],
      corpList: [],
      delRpy: [],
      rules: {
        corp_id: [{ required: true, message: "不能为空", trigger: "blur" }],
        bank_id: [{ required: true, message: "不能为空", trigger: "blur" }],
        rpy_date: [{ required: true, message: "不能为空", trigger: "blur" }],
        accr_rec: [{ required: true, message: "不能为空", trigger: "blur" }],
        proj_id: [{ required: true, message: "不能为空", trigger: "blur" }],
        prin_rec: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getRpy();
    this.getSelect();
  },
  methods: {
    async getRpy() {
      let res = await this.$API.caiwu.getrpy(this.current, this.size);
      this.total = res.data.total;
      this.rpyList = res.data.rpyList;
    },
    async getSelect() {
      let res = await this.$API.caiwu.getSelect(1);
      this.bankList = res.data.bankList;
      this.corpList = res.data.corpList;
      this.projList = res.data.projList;
    },
    //多选回调
    handleSelectionChange(row) {
      this.delRpy = row;
    },
    async deleteBtn() {
      this.$confirm("此操作将永久删除所选信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (this.delRpy.length) {
            let delList = [];
            this.delRpy.forEach((item) => {
              delList.push(item.rpy_rec_id);
            });
            await this.$API.caiwu.delRpy(delList);
            this.getRpy();
            this.$message({
              type: "success",
              message: "删除成功",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async deleteTableBtn(row) {
      let delList = [row.rpy_rec_id];

      await this.$API.caiwu.delRpy(delList);
      this.$message({
        type: "success",
        message: "删除成功",
      });
      this.getRpy();
    },
    //导出按钮
    dc_btn() {},
    currentChange(cur) {
      this.current = cur;
      this.getRpy();
    },
    //每页显示条数修改
    sizeChange(size) {
      this.size = size;
      this.getRpy();
    },
    //弹窗保存按钮
    addBxBtn() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          await this.$API.caiwu.addRpy(this.addfrom);
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.getRpy();
          this.dialogTableVisible = false;
        } else {
          return false;
        }
      });
    },
    //弹窗关闭前的回调
    AdddialogClose() {
      for (let key in this.addfrom) {
        this.addfrom[key] = "";
      }
    },
    bj_btn(row) {
      this.addfrom = { ...row };
      this.dialogTableVisible = true;
    },
    formatNumber(v, len, split) {
      (split = split || ","), (len = Math.abs(+len % 20 || 2));
      v = parseFloat((v + "").replace(/[^\d\.-]/g, "")).toFixed(len) + "";
      return v.replace(/\d+/, function (v) {
        let lit = v.length % 3 == 0;
        let index = lit ? v.length - 3 : -1;
        return v
          .split("")
          .reverse()
          .join("")
          .replace(/\d{3}/g, function (k, l) {
            return k + (l == index && lit ? "" : split);
          })
          .split("")
          .reverse()
          .join("");
      });
    },
    addPlan(){
      this.form.rpyPlan.push({name:'',time:''})
    },
    del_btn(index){
      console.log(index);
      this.form.rpyPlan.splice(index,1)
    }
  },
};
</script>

<style>
</style>