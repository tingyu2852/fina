<template>
  <div>
    <el-card style="margin: 10px">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="title">
            <span>基础信息</span>
          </div>
          <div class="custom-horizontal-line"></div>
          <div class="detail-content">
            <el-col :span="12">
              <div class="content-info">项目名称：流动资金补充</div>
            </el-col>
            <el-col :span="12">
              <div class="content-info">融资主体：经开建投</div>
            </el-col>
            <el-col :span="12">
              <div class="content-info">融资类型：流贷</div>
            </el-col>
            <el-col :span="12">
              <div class="content-info">项目编号：2023002</div>
            </el-col>
            <el-col :span="12">
              <div class="content-info">是否隐债：是</div>
            </el-col>
            <el-col :span="12">
              <div class="content-info">项目说明：无</div>
            </el-col>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="title">
            <span>批复信息</span>
          </div>
          <div class="custom-horizontal-line"></div>
          <div class="detail-content">
            <el-col :span="12">
              <div class="content-info">是否银团：否</div>
            </el-col>
            <el-col :span="12">
              <div class="content-info">金融机构：中信银行乌当支行</div>
            </el-col>
            <el-col :span="12">
              <div class="content-info">批复金额：￥100,000,000</div>
            </el-col>
            <el-col :span="12">
              <div class="content-info">批复时间：2018-01-25</div>
            </el-col>
            <el-col :span="12">
              <div class="content-info">还款来源：其他来源</div>
            </el-col>
            <el-col :span="12">
              <div class="content-info">期限：12个月</div>
            </el-col>
            <el-col :span="12">
              <div class="content-info">是否创建子项目：无</div>
            </el-col>
            <el-col :span="12">
              <div class="content-info">备注说明：无</div>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <el-col :span="24">
          <div class="title">
            <span>资金情况</span>
          </div>
          <div class="custom-horizontal-line"></div>
          <div class="detail-content">
            <el-table border 
              style="margin-top: 12px;"
              row-class-name="active-contnet" 
              header-cell-class-name='active-header'  
              :stripe="true"   
              v-loading="loading" 
              :data="projList" 
              @selection-change="selectChange">
              <el-table-column header-align="center" type="selection"  width="55" align="center"></el-table-column>
              <el-table-column header-align="center" label="序号" type="index" width="50" align="center">
                <template slot-scope="scope">
                  {{ calculateIndex(scope.$index) }}
                </template>
              </el-table-column>
              <el-table-column header-align="center"  :show-overflow-tooltip="true"  label="批复">
                <template slot-scope="{ row }" >
                  <span @click="edit_btn(row)"   style="cursor: pointer;color: #409eff;">{{ row.proj_name }}</span>
                    <!-- <el-button
                    type="text"
                    icon="el-icon-edit-outline"
                  ></el-button> -->
                </template>
              </el-table-column>
              <el-table-column align="center"  label="借款统计" prop="proj_id"></el-table-column>
              <el-table-column align="center" label="下载统计" prop="fina_name"></el-table-column>
              <el-table-column align="center" label="走款统计" prop="proj_status">
                <template slot-scope="{ row }">
                  <span>{{ row.proj_status ? "进行中" : "已完成" }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="费用合计" prop="corp_name"></el-table-column>
              <el-table-column align="center" label="已还本金" prop="proj_date">
                <template slot-scope="{ row }">
                  <span>{{ row.rep_date ? row.rep_date : "无" }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="已付息"  prop="pf_ed">
                <template slot-scope="{ row }">
                  <div class="table-content-right">{{ $format.money(row.rep_total) }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        <el-col :span="24">
          <div class="list-head-title-wrap">
            <div class="title">
              <span>借款列表</span>
            </div>
            <div class="more">
              <span>更多>></span>
            </div>
          </div>
          <div class="custom-horizontal-line"></div>
          <div class="detail-content">
            <el-table border 
              style="margin-top: 12px;"
              row-class-name="active-contnet" 
              header-cell-class-name='active-header'  
              :stripe="true"   
              v-loading="loading" 
              :data="projList" 
              @selection-change="selectChange">
              <el-table-column header-align="center" type="selection"  width="55" align="center"></el-table-column>
              <el-table-column header-align="center" label="序号" type="index" width="50" align="center">
                <template slot-scope="scope">
                  {{ calculateIndex(scope.$index) }}
                </template>
              </el-table-column>
              <el-table-column header-align="center"  :show-overflow-tooltip="true"  label="项目名称">
                <template slot-scope="{ row }" >
                  <span @click="edit_btn(row)"   style="cursor: pointer;color: #409eff;">{{ row.proj_name }}</span>
                    <!-- <el-button
                    type="text"
                    icon="el-icon-edit-outline"
                  ></el-button> -->
                </template>
              </el-table-column>
              <el-table-column align="center"  label="项目编号" prop="proj_id"></el-table-column>
              <el-table-column align="center" label="融资类型" prop="fina_name"></el-table-column>
              <el-table-column align="center" label="项目状态" prop="proj_status">
                <template slot-scope="{ row }">
                  <span>{{ row.proj_status ? "进行中" : "已完成" }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="融资主体" prop="corp_name"></el-table-column>
              <el-table-column align="center" label="批准日期" prop="proj_date">
                <template slot-scope="{ row }">
                  <span>{{ row.rep_date ? row.rep_date : "无" }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="批复额度"  prop="pf_ed">
                <template slot-scope="{ row }">
                  <div class="table-content-right">{{ $format.money(row.rep_total) }}</div>
                </template>
              </el-table-column>
              <el-table-column  label="下款合计" prop="xk_num" align="center" :formatter="asdd">
                <template  slot-scope="{ row }">
                  <div class="table-content-right">{{ $format.money(row.mt_total) }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="list-head-title-wrap">
            <div class="title">
              <span>下款列表</span>
            </div>
            <div class="more">
              <span>更多>></span>
            </div>
          </div>
          <div class="custom-horizontal-line"></div>
          <div class="detail-content">
            <el-table border 
              style="margin-top: 12px;"
              row-class-name="active-contnet" 
              header-cell-class-name='active-header'  
              :stripe="true"   
              v-loading="loading" 
              :data="projList" 
              @selection-change="selectChange">
              <el-table-column header-align="center" type="selection"  width="55" align="center"></el-table-column>
              <el-table-column header-align="center" label="序号" type="index" width="50" align="center">
                <template slot-scope="scope">
                  {{ calculateIndex(scope.$index) }}
                </template>
              </el-table-column>
              <el-table-column header-align="center"  :show-overflow-tooltip="true"  label="项目名称">
                <template slot-scope="{ row }" >
                  <span @click="edit_btn(row)"   style="cursor: pointer;color: #409eff;">{{ row.proj_name }}</span>
                    <!-- <el-button
                    type="text"
                    icon="el-icon-edit-outline"
                  ></el-button> -->
                </template>
              </el-table-column>
              <el-table-column align="center"  label="项目编号" prop="proj_id"></el-table-column>
              <el-table-column align="center" label="融资类型" prop="fina_name"></el-table-column>
              <el-table-column align="center" label="项目状态" prop="proj_status">
                <template slot-scope="{ row }">
                  <span>{{ row.proj_status ? "进行中" : "已完成" }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="融资主体" prop="corp_name"></el-table-column>
              <el-table-column align="center" label="批准日期" prop="proj_date">
                <template slot-scope="{ row }">
                  <span>{{ row.rep_date ? row.rep_date : "无" }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="批复额度"  prop="pf_ed">
                <template slot-scope="{ row }">
                  <div class="table-content-right">{{ $format.money(row.rep_total) }}</div>
                </template>
              </el-table-column>
              <el-table-column  label="下款合计" prop="xk_num" align="center" :formatter="asdd">
                <template  slot-scope="{ row }">
                  <div class="table-content-right">{{ $format.money(row.mt_total) }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="list-head-title-wrap">
            <div class="title">
              <span>走款列表</span>
            </div>
            <div class="more">
              <span>更多>></span>
            </div>
          </div>
          <div class="custom-horizontal-line"></div>
          <div class="detail-content">
            <el-table border 
              style="margin-top: 12px;"
              row-class-name="active-contnet" 
              header-cell-class-name='active-header'  
              :stripe="true"   
              v-loading="loading" 
              :data="projList" 
              @selection-change="selectChange">
              <el-table-column header-align="center" type="selection"  width="55" align="center"></el-table-column>
              <el-table-column header-align="center" label="序号" type="index" width="50" align="center">
                <template slot-scope="scope">
                  {{ calculateIndex(scope.$index) }}
                </template>
              </el-table-column>
              <el-table-column header-align="center"  :show-overflow-tooltip="true"  label="项目名称">
                <template slot-scope="{ row }" >
                  <span @click="edit_btn(row)"   style="cursor: pointer;color: #409eff;">{{ row.proj_name }}</span>
                    <!-- <el-button
                    type="text"
                    icon="el-icon-edit-outline"
                  ></el-button> -->
                </template>
              </el-table-column>
              <el-table-column align="center"  label="项目编号" prop="proj_id"></el-table-column>
              <el-table-column align="center" label="融资类型" prop="fina_name"></el-table-column>
              <el-table-column align="center" label="项目状态" prop="proj_status">
                <template slot-scope="{ row }">
                  <span>{{ row.proj_status ? "进行中" : "已完成" }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="融资主体" prop="corp_name"></el-table-column>
              <el-table-column align="center" label="批准日期" prop="proj_date">
                <template slot-scope="{ row }">
                  <span>{{ row.rep_date ? row.rep_date : "无" }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="批复额度"  prop="pf_ed">
                <template slot-scope="{ row }">
                  <div class="table-content-right">{{ $format.money(row.rep_total) }}</div>
                </template>
              </el-table-column>
              <el-table-column  label="下款合计" prop="xk_num" align="center" :formatter="asdd">
                <template  slot-scope="{ row }">
                  <div class="table-content-right">{{ $format.money(row.mt_total) }}</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-col>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
    };
  },
  watch: {
   
  },
  async mounted() {
    
  },
  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
.title{
  margin-bottom: 12px;
  font-size: 18px;
  color: #000;
  font-weight: 600;
  margin-top: 12px;
}
.detail-content{
  margin-top: 12px;
}
.content-info{
  line-height: 30px;
}
.list-head-title-wrap{
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  .more{
    margin-bottom: 12px;
    font-size: 16px;
    color: #333;
    font-weight: 600;
    margin-top: 12px;
    cursor: pointer;
    padding-right: 12px;
  }
}
</style>