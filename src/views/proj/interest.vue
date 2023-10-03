<template>
  <div>
    <!-- <div><el-button type="primary" plain size="mini" style="margin-bottom: 10px;" @click="addInterest">新增</el-button> -->
      <el-table :data="currentInter" border v-loading="lodaing">
        <el-table-column label="日期">
          <template slot-scope="{ row }">
            <div >
              {{ row.date }}
            </div>
            
          </template>
        </el-table-column>
        <el-table-column label="本金">
          <template slot-scope="{ row }">
            <div >
              {{  $format.money(row.princaipal) }}
            </div>
            
          </template>
        </el-table-column>
        <el-table-column label="利率">
          <template slot-scope="{ row }">
            <div >
              {{ row.rate ? `${((row.rate-0)*100).toFixed(2)}%` : "无" }}
            </div>
            
          </template>
        </el-table-column>
        <el-table-column label="结息">
          <template slot-scope="{ row }">
          <div>{{  $format.money(row.inter_plan)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="还本">
          <template slot-scope="{ row }">
          <div>{{  $format.money(row.repay_plan)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="当日下款">
          <template slot-scope="{ row }">
          <div>{{  $format.money(row.mt_num)}}</div>
          </template>
        </el-table-column>
        
       
      </el-table>
      <el-pagination :total="total" :current-page="current" :page-size="size" @current-change="curchange" :layout="'prev, pager, next, jumper, ->, total'"></el-pagination>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "Interest",
  data() {
    return {
        lodaing:true,
      interestList: [],
      currentInter:[],
      limiList:[],
      loan_id: 0,
      current:1,
      total:0,
      size:12
    };
  },
  methods: {
    async getInterList(loan_id) {
      this.loan_id = loan_id;
      this.lodaing=true
      //return
      let res = await this.$API.fina.getInter(loan_id,this.current,this.size);
      this.interestList = res.data.interestList;
      this.total =  this.interestList.length
      this.limitInter()
      
      this.interestList.forEach((item) => {
        this.$set(item, "isEdit", false);
      });
      this.lodaing=false
    },
    async interSave(row){
        row.isEdit=false
        let res = await this.$API.fina.addInter('one',row)
        this.limitInter()
    },
    delInter(row){
        
    },
    limitInter(){
      this.currentInter = this.interestList.slice((this.current-1)*this.size,this.current*this.size)
    },
    curchange(cur){
      this.current=cur

      // this.limiList = this.interestList.slice(curs,cur*this.size)
      // console.log(this.limiList);
        
      this.limitInter()
    },
    addInterest(){
        let obj = {
            plan_date:null,
            interest_num:null,
            interest_rate:null,
            remark:null,
            loan_id:this.loan_id,
            isEdit:true
        }
        this.interestList.unshift(obj)
      }
  },
};
</script>

<style>
</style>