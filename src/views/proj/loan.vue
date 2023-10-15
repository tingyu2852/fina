<template>
  <div class="custom-table-btn-wrap">
    <div style="width: 100%; margin-top: 12px">
      <el-row :gutter="20">
        <el-col :span="24">
          <div style="display: flex; align-items: center">
            <div>
              <span style="font-weight: 700;">1、基础信息</span>
            </div>
          </div>
          <div class="custom-horizontal-line" style="margin-top:12px;margin-bottom:12px;"></div>
        </el-col>
        <el-col :span="24">
          <el-form :model="form" label-width="100px" label-position="left">
            <el-col :span="8">
              <el-form-item label="借款金额">
                <div v-if="!info_status">
                  {{ str_contet($format.money(form.loan_sum)) }}
                </div>
                <el-input
                  v-else
                  v-model="form.loan_sum"
                  :disabled="form.is_actual === 1"
                  placeholder=""
                  @input="form.loan_sum = $format.formatInput(form.loan_sum)"
                ></el-input>
                <el-switch
                  v-model="form.is_actual"
                  active-text="实际为准"
                  inactive-text="固定金额"
                  :active-value="1"
                  :inactive-value="0"
                  @change="is_actual_change"
                  :disabled="!info_status"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提交时间">
                <div v-if="!info_status">{{ str_contet(form.loan_date) }}</div>
                <el-date-picker
                  v-else
                  v-model="form.loan_date"
                  type="date"
                  placeholder="请选择日期"
                  format="yyyy年M月d日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属子项目" v-if="form.sub_project === 1">
                <div v-if="!info_status">
                  <el-tag
                    type="primary"
                    v-for="item in form.sub_project_list"
                    :key="item"
                    effect="dark"
                    >{{ item }}</el-tag
                  >
                </div>

                <div v-else>
                  <el-checkbox
                    :indeterminate="loan_isIndeterminate"
                    v-model="loan_checkAll"
                    @change="loan_handleCheckAllChange"
                    >全选</el-checkbox
                  >
                  <el-checkbox-group
                    v-model="form.sub_project_list"
                    @change="loan_handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="item in form.rep_project_list"
                      :label="item"
                      :key="item"
                      >{{ item }}</el-checkbox
                    >
                  </el-checkbox-group>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="付息">
                <div v-if="!info_status">
                  {{ str_contet(form.inter_plan) }}
                </div>
                <el-input
                  v-model="form.inter_plan"
                  placeholder="请填写"
                  v-else
                ></el-input>
                <!-- <el-button
                  type="primary"
                  size="mini"
                  @click="interInfo('insert')"
                  v-else
                  >录入</el-button
                > -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="利率类型">
                <el-switch
                  v-model="form.is_float_rate"
                  active-text="浮动利率"
                  inactive-text="固定利率"
                  :active-value="1"
                  :inactive-value="0"
                  :disabled="!info_status"
                >
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="利率(%)">
                <div v-if="!info_status">
                  {{ str_contet(form.rate) + "%" }}
                </div>
                <el-input
                  v-else
                  v-model="form.rate"
                  placeholder="请输入基准利率(%)"
                  type="number"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备注说明">
                <div v-if="!info_status">{{ str_contet(form.loan_remark) }}</div>
                <el-input
                  v-else
                  v-model="form.loan_remark"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </el-col>
            
            <!-- 结息详情 -->
            <!-- <el-form-item label="结息详情">
              <el-button type="primary" size="mini" @click="interInfo('view')"
                >查看</el-button
              >
            </el-form-item> -->
            <!-- 结息计划 -->
            <!-- <el-form-item label="结息计划">
              <el-button type="primary" size="mini" @click="planInfo"
                >查看</el-button
              > 
            </el-form-item> -->
            <!-- 还本计划 -->
            <!--<el-form-item label="还本计划">
              <el-button type="primary" size="mini" @click="repayInfo('view')"
                >查看</el-button
              >
            </el-form-item> -->
            
          </el-form>
        </el-col>
        <el-col :span="24">
          <div style="display: flex; align-items: center">
            <div>
              <span style="font-weight: 700;">2、统计信息</span>
            </div>
          </div>
          <div class="custom-horizontal-line" style="margin-top:12px;margin-bottom:12px;"></div>
        </el-col>
        <el-col :span="24">
          <el-form label-position="top">
            <el-row>
              <el-col :span="8"> <el-form-item label="到款总金额">
              <div>
              {{$format.money(form.mt_total)}}
              </div>
            
            </el-form-item>
            </el-col>
              <el-col :span="8"> <el-form-item label="已还本金额">
              <div>
              {{$format.money(form.repay_total)}}
              </div>
            </el-form-item>
            </el-col>
            <el-col :span="8">   
              <el-form-item label="融资余额">
                <div>
                  {{$format.money(parseInt(form.mt_total)-parseInt(form.repay_total))}}
                </div>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <div style="display: flex; align-items: center;margin-bottom:12px;">
                <div style="padding-right: 6px;font-weight: 700;">
                  <span>3、下款信息</span>
                </div>
                <div  v-show="info_status" class="custom-btn-wrap">
                  <div class="add-custom-btn" @click="mtADD"><i class="el-icon-plus"></i>新增</div>
                </div>
              </div>
              <div class="custom-horizontal-line" style="margin-top:12px;"></div>
            </el-col>
            <el-col :span="24">
            <el-form-item label=""> <!-- 下款信息 -->
              <!-- <template #label>
                <div style="display: flex; align-items: center">
                  <div>
                    <span style="font-weight: 700;font-size: 15px;">下款信息：</span>
                  </div>
                  <div>
                    <i
                      class="el-icon-plus"
                      style="color: #409eff; cursor: pointer"
                      @click="mtADD"
                      v-show="info_status"
                    ></i>
                  </div>
                </div>
              </template> -->
              <el-table 
                style="margin-top: 16px;"
                row-class-name="active-contnet" 
                header-cell-class-name='active-header'  
                :stripe="true"   
                :data="mtList" 
                border
              >
                <el-table-column label="下款时间" >
                  <template slot-scope="{ row }">
                    <span>{{ str_contet(row.mt_date) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="下款金额" >
                  <template slot-scope="{ row }">
                    <span>{{ str_contet($format.money(row.mt_sum)) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="下款项目" v-if="form.sub_project === 1">
                  <template slot-scope="{ row }">
                    <el-tag
                      style="margin-left: 5px; margin-bottom: 5px"
                      type="primary"
                      v-for="item in row.sub_project_list"
                      :key="item"
                      effect="dark"
                      >{{ item }}</el-tag
                    >
                  </template>
                </el-table-column>
                <el-table-column label="截止日期" >
                  <template slot-scope="{ row }">
                    <span>{{ str_contet(row.start_end_date) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="匹配资本金">
                  <template slot-scope="{ row }">
                    <div class="custom-table-btn-wrap">
                      <div class="edit-custom-table-btn"  @click="showMaching(row)"><i style="padding-right: 3px" class="el-icon-view"></i>查看</div>
                    </div>
                    <!-- <el-button
                      type="primary"
                      size="mini"
                      @click="showMaching(row)"
                      >查看</el-button
                    > -->
                  </template>
                </el-table-column>
                <el-table-column label="备注">
                  <template slot-scope="{ row }">
                    <div style="white-space: pre-line">{{ row.remark }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="操作" min-width="200">
                  <template slot-scope="{ row }">
                    <div class="custom-table-btn-wrap">
                      <div class="edit-custom-table-btn"  @click="spInfo(row)"><i style="padding-right: 3px" class="el-icon-more"></i>走款信息</div>
                      <div v-show="info_status" class="edit-custom-table-btn"  @click="mtEdit(row)"><i class="el-icon-edit"></i>编辑</div>
                      <div v-show="info_status" class="delete-custom-table-btn"  @click="delmt(row)" ><i class="el-icon-delete"></i>删除</div>
                    </div>
                    <!-- <el-button
                      type="primary"
                      size="mini"
                      icon="el-icon-more"
                      @click="spInfo(row)"
                    >更多</el-button>
                    <el-button
                      v-show="info_status"
                      type="primary"
                      size="mini"
                      icon="el-icon-edit-outline"
                      @click="mtEdit(row)"
                    ></el-button>

                    <el-popconfirm
                      v-show="info_status"
                      title="删除该信息会导致子信息也被删除，确定删除吗？"
                      @onConfirm="delmt(row)"
                    >
                      <el-button
                        type="danger"
                        size="mini"
                        icon="el-icon-delete"
                        slot="reference"
                        style="margin-left: 10px"
                      ></el-button>
                    </el-popconfirm> -->
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item></el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col :span="24">
          <div style="display: flex; align-items: center">
            <div>
              <span style="font-weight: 700;">4、信息查询</span>
            </div>
          </div>
          <div class="custom-horizontal-line" style="margin-top:12px;margin-bottom:12px;"></div>
        </el-col>
        <el-col :span="24">
          <div class="custom-btn-wrap">
            <div class="add-custom-btn"  @click="interInfo('view')" >杳看结息详情</div>
            <div class="add-custom-btn"  @click="planInfo" >杳看结息计划</div>
            <div class="add-custom-btn"  @click="repayInfo('view')" >查看还本计划</div>
          </div>
        </el-col>
      </el-row>
      <!-- 自定义分割线 -->
      <div style="margin-top:12px" class="custom-horizontal-line"></div>
      <div slot="footer"  class="dialog-footer custom-page-btn-wrap">
        <div v-show="!info_status" class="save-custom-dialog-btn"  @click="btn_edit" >编辑</div>
        <div v-show="info_status" class="cancel-custom-dialog-btn"  @click="btn_cancle" >取消</div>
        <div v-show="info_status" class="save-custom-dialog-btn"  @click="loan_save">保存</div>
      </div>
      <!-- <div style="margin-top: 50px">
          <el-button type="primary" v-show="!info_status" @click="btn_edit"
            >编辑</el-button
          >
          <el-button type="primary" v-show="info_status" @click="loan_save"
            >保存</el-button
          >
          <el-button type="primary" v-show="info_status" @click="btn_cancle"
            >取消</el-button
          >
        </div> -->
    </div>

    <!-- 下款信息编辑 -->
    <el-dialog
      title="编辑下款信息"
      :visible.sync="dialogVisible"
      width="700px"
      @close="handlerClose"
    >
      <!-- 自定义分割线 -->
      <div class="custom-horizontal-line"></div>
      <div  class="dialog_body custom-dialog-table-body">
        <el-form 
          :model="mt_form" 
          label-width="100px" 
          label-position="right"
        >
          <el-form-item label="下款时间">
            <el-date-picker
              v-model="mt_form.mt_date"
              value-format="yyyy-MM-dd"
              placeholder="请选择下款时间"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="下款金额">
            <el-input
              style="width: 200px"
              v-model="mt_form.mt_sum"
              placeholder="请填写下款金额"
              @input="mt_form.mt_sum = $format.formatInput(mt_form.mt_sum)"
            ></el-input>
          </el-form-item>
          <el-form-item label="下款项目" v-if="form.sub_project === 1">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
            <div style="margin: 15px 0"></div>
            <el-checkbox-group
              v-model="mt_form.sub_project_list"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="item in form.sub_project_list"
                :label="item"
                :key="item"
                >{{ item }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="截止日期">
            <!-- <el-date-picker
              v-model="mt_form.start_end_date"
              value-format="yyyy-MM-dd"
              size="mini"
              format="yyyy-MM-dd"
            >
          
            </el-date-picker> -->
            <el-date-picker
              v-model="mt_form.start_end_date"
              value-format="yyyy-MM-dd"
              placeholder="请选择下款时间"
            ></el-date-picker>
          </el-form-item>
          <div style="display: flex; align-items: center">
            <div style="padding-right: 6px;font-weight: 700;font-size: 15px;">
              <span>匹配资本金</span>
            </div>
            <div  v-show="info_status" class="custom-btn-wrap">
              <div class="add-custom-btn" @click="addMatch"><i class="el-icon-plus"></i>新增</div>
            </div>
          </div>
          <!-- <el-form-item label="匹配资本金" label-position="top">
            <el-input
              v-model="mt_form.matching_capital"
              placeholder=""
              type="textarea"
            ></el-input> 
            <el-button type="primary" size="mini" @click="addMatch"
              >新增</el-button
            >
          </el-form-item> -->

          <el-table
            style="margin-bottom: 10px;margin-top: 12px"
            row-class-name="active-contnet" 
            header-cell-class-name='active-header'  
            :stripe="true"   
            :data="mt_form.matching_capital"
            border
          >
            <el-table-column label="日期" min-width="100px">
              <template slot-scope="{ row }">
                <el-date-picker
                  size="mini"
                  v-model="row.date"
                  placeholder="请选择"
                  type="date"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="名称">
              <template slot-scope="{ row }"
                ><el-input
                  size="mini"
                  v-model="row.name"
                  placeholder=""
                ></el-input
              ></template>
            </el-table-column>
            <el-table-column label="金额">
              <template slot-scope="{ row }"
                ><el-input
                  size="mini"
                  v-model="row.num"
                  @input="row.num = $format.formatInput(row.num)"
                  placeholder=""
                ></el-input
              ></template>
            </el-table-column>
            <el-table-column label="收款人">
              <template slot-scope="{ row }">
                <el-select v-model="row.corp" placeholder="" size="mini">
                  <el-option
                    v-for="item in corpList"
                    :label="item.corp_name"
                    :value="item.corp_name"
                    :key="item.corp_id"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="备注" min-width="100px">
              <template slot-scope="{ row }"
                ><el-input
                  v-model="row.remark"
                  placeholder=""
                  type="textarea"
                ></el-input
              ></template>
            </el-table-column>
          </el-table>
          <el-form-item label="备注">
            <el-input
              v-model="mt_form.remark"
              placeholder=""
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="custom-horizontal-line"></div>
      <div slot="footer"  class="dialog-footer custom-dialog-btn-wrap">
        <div  class="cancel-custom-dialog-btn"  @click="dialogVisible = false" >取消</div>
        <div class="save-custom-dialog-btn"   @click="mtSave">保存</div>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="mtSave">确 定</el-button>
      </span> -->
    </el-dialog>

    <!-- 走款信息 -->
    <el-dialog title="走款信息" :visible.sync="spDialog" width="900px">
      <div class="custom-dialog-table-body">
        <div class="custom-btn-wrap">
          <div class="add-custom-btn" @click="addSp"><i class="el-icon-plus"></i>新增</div>
        </div>
        <!-- <el-button type="primary" size="mini" @click="addSp" plain
          >新增</el-button
        > -->
        <el-table
          style="margin-top: 12px;"
          row-class-name="active-contnet" 
          header-cell-class-name='active-header'  
          :stripe="true"   
          v-loading="loading"  
          :data="spList"
          border="true"
        >
          <el-table-column label="收款单位" prop="corp_name"></el-table-column>
          <el-table-column label="走款时间" prop="sp_date"></el-table-column>
          <el-table-column label="走款金额" prop="sp_num">
            <template slot-scope="{ row }">
              <div>
                {{ $format.money(row.sp_num) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="回款金额" prop="refund">
            <template slot-scope="{ row }">
              <div>
                {{ $format.money(row.refund) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="实际支付金额"
            prop="actul_num"
            min-width="100px"
          >
            <template slot-scope="{ row }">
              <div>
                {{ $format.money(row.actul_num) }}
              </div>
            </template></el-table-column
          >
          <el-table-column label="用途" prop="sp_use"></el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
          <el-table-column label="操作" prop="remark" min-width="140px">
            <template slot-scope="{ row }">
              <div class="custom-table-btn-wrap">
                <div class="edit-custom-table-btn"  @click="spEdit(row)"><i class="el-icon-edit"></i>编辑</div>
                <div  class="delete-custom-table-btn"  @click="delsp(row)" ><i class="el-icon-delete"></i>删除</div>
              </div>
              <!-- <div style="">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit-outline"
                  @click="spEdit(row)"
                  plain
                ></el-button>

                <el-popconfirm
                  title="确定删除该走款信息吗？"
                  @onConfirm="delsp(row)"
                >
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    slot="reference"
                    style="margin-left: 10px"
                  ></el-button>
                </el-popconfirm>
              </div> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        width="500px"
        :title="dialogTitle"
        :visible.sync="innerVisible"
        append-to-body
        @close="spDialogClose"
      >
        <!-- 自定义分割线 -->
        <div class="custom-horizontal-line"></div>
        <div  class="dialog_body custom-dialog-body">
          <el-form 
            label-width="100px"
            label-position="right"
            :model="sp_form"
          >
            <el-form-item label="收款单位">
              <el-select
                v-model="sp_form.corp_name"
                placeholder="请选择收款单位"
                filterable
              >
                <el-option
                  v-for="item in corpList"
                  :label="item.corp_name"
                  :value="item.corp_name"
                  :key="item.agmt_index_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="走款时间">
              <el-date-picker
                v-model="sp_form.sp_date"
                placeholder="请选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="sp_pickerOptions"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="走款金额">
              <el-input
                style="width: 200px"
                v-model="sp_form.sp_num"
                @input="sp_form.sp_num = $format.formatInput(sp_form.sp_num)"
                placeholder="请输入走款金额"
              ></el-input>
            </el-form-item>
            <el-form-item label="回款金额"
              ><el-input
                style="width: 200px"
                v-model="sp_form.refund"
                @input="sp_form.refund = $format.formatInput(sp_form.refund)"
                placeholder="请输入回款金额"
              ></el-input
            ></el-form-item>
            <el-form-item label="实际支付金额"
              ><el-input
                style="width: 200px"
                v-model="sp_form.actul_num"
                @input="
                  sp_form.actul_num = $format.formatInput(sp_form.actul_num)
                "
                placeholder="请输入实际支付金额"
              ></el-input
            ></el-form-item>
            <el-form-item label="用途"
              ><el-input
                style="width: 200px"
                v-model="sp_form.sp_use"
                placeholder="请输入用途"
              ></el-input
            ></el-form-item>
            <el-form-item label="备注"
              ><el-input
                style="width: 200px"
                type="textarea"
                v-model="sp_form.remark"
                placeholder=""
              ></el-input
            ></el-form-item>
          </el-form>
        </div>
        <div class="custom-horizontal-line"></div>
        <div slot="footer"  class="dialog-footer custom-dialog-btn-wrap">
          <div  class="cancel-custom-dialog-btn"  @click="innerVisible = false" >取消</div>
          <div class="save-custom-dialog-btn"  @click="spSave">保存</div>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="spSave">确 定</el-button>
        </span> -->
      </el-dialog>
    </el-dialog>

    <!-- 结息（每日）详情 -->
    <el-dialog title="结息（每日）详情" :visible.sync="interestDialog" width="900px">
      <el-form :model="interest_form" v-if="false">
        <el-form-item label="结息方式">
          <el-radio-group v-model="interest_form.radio">
            <el-radio :label="1">按年</el-radio>
            <el-radio :label="2">按季度</el-radio>
            <el-radio :label="3">按月</el-radio>
            <el-radio :label="4">不规则</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="时间"
          v-if="interest_form.radio != 4 && interest_form.radio"
        >
          <el-date-picker
            v-if="interest_form.radio == 1"
            v-model="interest_form.Interest_settlement"
            type="date"
            placeholder="每年*月*日"
            format="每年M月d日"
            value-format="MM-dd"
          >
          </el-date-picker>
          <el-date-picker
            v-if="interest_form.radio == 2"
            v-model="interest_form.Interest_settlement"
            type="date"
            placeholder="每季度末*日"
            format="每季度末d日"
            value-format="dd"
          >
          </el-date-picker>
          <el-date-picker
            v-if="interest_form.radio == 3"
            v-model="interest_form.Interest_settlement"
            type="date"
            placeholder="每月*日"
            format="每月d日"
            value-format="dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="开始日期"
          v-if="interest_form.Interest_settlement || interest_form.radio == 4"
        >
          <el-date-picker
            v-model="interest_form.bgn_end_date"
            type="date"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <interest ref="inter" v-else />
      <!-- <span slot="footer" class="dialog-footer" v-if="!this.form.inter_total">
        <el-button type="primary" @click="jisuandate(interest_form.radio)"
          >确 定</el-button
        >
      </span> -->
    </el-dialog>

    <!-- 还本计划 -->
    <el-dialog title="还本计划" :visible.sync="repayDialog" width="900px">
      <Repay ref="repay"  :loanInfo="{
          date: form.loan_date,
          limit: form.rep_limit,
          inter_plan: form.inter_plan,
        }" @getinfo="getInfo"/>
    </el-dialog>

    <!-- 结息计划  -->
    <el-dialog title="结息计划" :visible.sync="interPlanDialog" width="900px">
      <InterPlan
        ref="interPlan"
        :loanInfo="{
          date: form.loan_date,
          limit: form.rep_limit,
          inter_plan: form.inter_plan,
        }"
      />
    </el-dialog>

    <!-- 匹配资本金  -->
    <el-dialog  title="匹配资本金" :visible.sync="dialogMatching" width="900px">
      <div class="custom-dialog-table-body" style="margin-top:12px">
        <div class="custom-btn-wrap">
          <div class="add-custom-btn" @click="addMatching"><i class="el-icon-plus"></i>新增</div>
        </div>
        <!-- <el-button  type="primary" size="mini" @click="addMatching">新增</el-button> -->
        <el-table 
          style="margin-top: 12px;"
          row-class-name="active-contnet" 
          header-cell-class-name='active-header'  
          :stripe="true"   
          :data="curMatching"
          border
        >
          <el-table-column label="日期" prop="date" min-width="100px">
            <template slot-scope="{ row }">
              <div v-if="!row.isEdit">{{ row.date }}</div>
              <el-date-picker
                v-else
                size="mini"
                v-model="row.date"
                placeholder="请选择"
                type="date"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="name">
            <template slot-scope="{ row }">
              <div v-if="!row.isEdit">{{ row.name }}</div>
              <el-input
                v-else
                size="mini"
                v-model="row.name"
                placeholder=""
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="金额" prop="num"
            ><template slot-scope="{ row }">
              <div v-if="!row.isEdit">{{ $format.money(row.num) }}</div>
              <el-input
                v-else
                size="mini"
                v-model="row.num"
                type="number"
                placeholder=""
              ></el-input> </template
          ></el-table-column>
          <el-table-column label="收款人" prop="corp">
            <template slot-scope="{ row }">
              <div v-if="!row.isEdit">{{ row.corp }}</div>
              <el-select v-else v-model="row.corp" placeholder="" size="mini">
                <el-option
                  v-for="item in corpList"
                  :label="item.corp_name"
                  :value="item.corp_name"
                  :key="item.corp_id"
                ></el-option>
              </el-select> </template
          ></el-table-column>
          <el-table-column label="备注" prop="remark">
            <template slot-scope="{ row }">
              <div v-if="!row.isEdit">{{ row.remark }}</div>
              <el-input
                v-else
                v-model="row.remark"
                placeholder=""
                type="textarea"
              ></el-input
            ></template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="{ row, $index }">
              <div class="custom-table-btn-wrap">
                <div v-show="row.isEdit" class="save-custom-table-btn"  @click="mactingSave(row)"><i class="el-icon-document-checked"></i>保存</div>
                <div v-show="!row.isEdit" class="edit-custom-table-btn"   @click="$set(row, 'isEdit', true)"><i class="el-icon-edit"></i>编辑</div>
                <div v-show="!row.isEdit" class="delete-custom-table-btn"  @click="delMatch($index)" ><i class="el-icon-delete"></i>删除</div>
              </div>
              <!-- <el-button
                v-show="!row.isEdit"
                type="primary"
                size="mini"
                icon="el-icon-edit-outline"
                @click="$set(row, 'isEdit', true)"
              ></el-button>
              <el-button
                v-show="row.isEdit"
                type="primary"
                size="mini"
                icon="el-icon-check"
                @click="mactingSave(row)"
              ></el-button>

              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="delMatch($index)"
              >
                <el-button
                  v-show="!row.isEdit"
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  slot="reference"
                  style="margin-left: 10px"
                ></el-button>
              </el-popconfirm> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      
     
    </el-dialog>
  </div>
</template>

<script>
import Interest from "./interest.vue";
import Repay from "./repay.vue";
import InterPlan from "./interPlan.vue";
import dayjs from "dayjs";
const isBetween = require("dayjs/plugin/isBetween");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
export default {
  components: {
    Interest,
    Repay,
    InterPlan,
  },
  name: "Loan",
  props: { loanInfo: Object, required: true },
  mounted() {},
  data() {
    return {
      dialogTitle: '添加走款信息',
      currentMt: null,
      curMatching: [],
      dialogMatching: false,
      interPlanDialog: false,
      interPlan: false,
      repayDialog: false,
      interest_form: {
        radio: 0,
        Interest_settlement: "",
        bgn_end_date: "",
      },
      repay_form: {
        radio: 0,
        Interest_settlement: "",
        bgn_end_date: "",
      },
      interestDialog: false,
      innerVisible: false,
      spList: [],
      spDialog: false,
      dialogVisible: false,
      activeName: "mt1",
      form: {
        loan_con: "",
        loan_sum: 0,
        loan_data: "",
        loan_remark: "",
        inter_plan: "",
        sub_project_list: [],
      },
      mtList: [],
      agmtList: [],
      corpList: [],
      proj_id: "",
      info_status: false,
      loan_id: 0,
      mt_form: {
        mt_sum: 0,
        mt_date: "",
        matching_capital: [],
        remark: "",
        start_end_date: "",
        sub_project_list: [],
      },
      sp_form: {
        sp_date: "",
        corp_name: "",
        sp_num: null,
        refund: null,
        actul_num: null,
        invoice: null,
        sp_use: "",
        remark: "",
        con_id: "",
      },
      curMtId: 0,
      curmt_id: null,
      form_copy: {},
      checkAll: false,
      //cities: cityOptions,
      isIndeterminate: false,
      loan_checkAll: false,
      //cities: cityOptions,
      loan_isIndeterminate: false,
      pickerOptions: {
        disabledDate: (time) => {
          return dayjs(time).isBefore(dayjs(this.form.loan_date));
        },
      },
      sp_pickerOptions: {
        disabledDate: (time) => {
          return dayjs(time).isBefore(dayjs(this.cur_sp_date));
        },
      },
      cur_sp_date: null,
    };
  },
  async mounted() {
    //console.log(this);

    this.agmtList = { ...this.$store.state.select.agmtList };
    this.corpList = { ...this.$store.state.select.corpList };
  },
  watch: {
    "interest_form.radio"(newv, oldv) {
      this.interest_form.Interest_settlement = "";
      // if (newv == 4) {
      //   this.interest_form.Interest_settlement = "不规则";
      // }
    },
  },
  methods: {
    shuaxin() {},
    str_contet(str) {
      if (str) {
        return str;
      } else {
        return "无";
      }
    },
    //获取借款信息
    async getInfo(loan_id) {
      console.log(loan_id);
      this.loan_id = loan_id;
      let res = await this.$API.fina.getLoan(loan_id);
      this.form = { ...res.data.loanInfo };
      this.form.rate = parseFloat((this.form.rate * 100).toFixed(3));
      if (this.form.is_actual === 1) {
        this.form.loan_sum = this.form.mt_total;
      }
      this.form.loan_sum = this.$format.money(this.form.loan_sum);
      this.mtList = res.data.mtList;
      //is_repay 为0时表示结息详情为生成，向后端发送请求生成结息详情
      if (res.data.loanInfo.is_repay === 0) {
        //let { loan_date, loan_id, rep_limit ,rate,} = res.data.loanInfo;
        let res1 = this.$API.fina.addRepayment(res.data.loanInfo);
      } else {
        let { loan_id } = res.data.loanInfo;
        //is_repay为1但是is_inter为0向后端发送请求重新更新结息详情的利率
        if (res.data.loanInfo.is_inter === 0) {
          this.$API.fina.updateInter(loan_id);
        }
      }
      
    },
    //该函数用来给每条列表添加一个布尔值用来表示是否处于编辑状态
    listIsEdit(arr) {
      if (Array.isArray(arr)) {
        arr.forEach((item) => {
          this.$set(item, "isEdit", false);
        });
      } else {
        throw new Error("传入的参数不是数组");
      }
    },
    //添加下款信息按钮，打开弹窗
    mtADD() {
      this.dialogVisible = true;
    },
    //获取走款信息
    async spInfo(row) {
      //console.log(row);
      console.log(row, "-----");
      this.curMtId = row.mt_id;
      this.cur_sp_date = row.mt_date;
      let res = await this.$API.fina.getSp(row.mt_id);
      this.spList = res.data.spList;
      this.spDialog = true;
    },
    //保存借款信息
    async loan_save() {
      let loanInfo = { ...this.form };
      loanInfo.rate = parseFloat((loanInfo.rate / 100).toFixed(5));
      loanInfo.loan_sum = parseFloat(
        loanInfo.loan_sum.substring(1).replace(/,/g, "")
      );
      let res = await this.$API.fina.addLoan(loanInfo);
      if (res.code == 20000) {
        this.$message({ type: "success", message: "保存成功" });
      }
      this.getInfo(this.form.loan_id);
      this.info_status = false;
    },
    //下款信息编辑弹窗被关闭时的回调，清空表单
    handlerClose() {
      let obj = {
        mt_sum: 0,
        mt_con_id: "",
        mt_date: "",
        matching_capital: [],
        remark: "",
        start_end_date: "",
        sub_project_list: [],
      };
      this.mt_form = obj;
      
    },
    //保存下款信息
    async mtSave() {
      if (!this.mt_form.loan_id) {
        this.mt_form.loan_id = this.form.loan_id;
      }
      for (let key in this.mt_form) {
        if (key !== "remark" && key !== "matching_capital") {
          if (!this.mt_form[key]) {
            return this.$message({
              type: "error",
              message: "除备注与匹配资本金以外不能为空",
            });
          }
        }
      }
      let mt_info = { ...this.mt_form };
      mt_info.mt_sum = parseFloat(
        mt_info.mt_sum.substring(1).replace(/,/g, "")
      );
      console.log();
      let res = await this.$API.fina.addMt(mt_info);
      if (res.code == 20000) {
        this.$message({ type: "success", message: "保存成功" });
      }
      this.getInfo(this.form.loan_id);
      this.dialogVisible = false;
    },
    //编辑下款信息按钮
    mtEdit(row) {
     // console.log(row);
      if ( Array.isArray(row.sub_project_list) && row.sub_project_list.length > 0 ) {
        //console.log(row);
        if (row.sub_project_list.length === this.form.sub_project_list.length) {
          //console.log(1);
          this.checkAll = true;
          this.isIndeterminate = false;
        } else {
          this.checkAll = true;
          this.isIndeterminate = true;
        }
      } else {
        this.checkAll = false;
        this.isIndeterminate = false;
      }
      this.mt_form = { ...row };
      console.log(this.mt_form);
      this.mt_form.mt_sum = this.$format.money(this.mt_form.mt_sum);
      this.dialogVisible = true;
    },
    //编辑走款信息按钮
    spEdit(row) {
      this.dialogTitle = '编辑走款信息';
      this.sp_form = { ...row };
      this.sp_form.sp_num = this.$format.money(this.sp_form.sp_num);
      this.sp_form.refund = this.$format.money(this.sp_form.refund);
      this.sp_form.actul_num = this.$format.money(this.sp_form.actul_num);
      this.innerVisible = true;
    },
    //走款信息编辑弹窗被关闭时触发，清空表单
    spDialogClose() {
      this.sp_form = {
        sp_date: "",
        corp_name: "",
        sp_num: null,
        refund: null,
        actul_num: null,
        invoice: null,
        sp_use: "",
        remark: "",
        con_id: "",
      };
    },
    //走款信息保存
    async spSave() {
      this.sp_form.mt_id = this.curMtId;
      let sp_info = { ...this.sp_form };
      sp_info.sp_num = parseFloat(
        sp_info.sp_num.substring(1).replace(/,/g, "")
      );
      sp_info.refund = parseFloat(
        sp_info.refund.substring(1).replace(/,/g, "")
      );
      sp_info.actul_num = parseFloat(
        sp_info.actul_num.substring(1).replace(/,/g, "")
      );
      let res = await this.$API.fina.addSp(sp_info);
      if (res.code == 20000) {
        this.$message({ type: "success", message: "保存成功" });
      }
      let res1 = await this.$API.fina.getSp(this.curMtId);
      this.spList = res1.data.spList;
      this.innerVisible = false;
    },
    //走款信息添加
    addSp() {
      this.dialogTitle = '添加走款信息';
      this.curMtId;
      this.innerVisible = true;
    },
    //结息详情页查看按钮
    interInfo(name) {
      if (name == "view") {
        setTimeout(() => {
          //console.log(this.$refs.inter);
          this.$refs.inter.getInterList(this.form.loan_id);
        }, 100);
      }
      this.interestDialog = true;
    },
    //查看还本计划
    repayInfo(name) {
      if (name == "view") {
        setTimeout(() => {
          //console.log(this.$refs.inter);
          this.$refs.repay.getRepayList(this.form.loan_id);
        }, 100);
      }
      this.repayDialog = true;
    }, 
    //获取结息计划   
    planInfo() {
      this.interPlanDialog = true;
      //console.log( this.$refs);
      //this.$refs.interPlan.getPlanList(this.form.loan_id);
      setTimeout(() => {
        //console.log(this.$refs.inter);
        this.$refs.interPlan.getPlanList(this.form.loan_id);
      }, 100);
    },
    //下款信息删除回调
    async delmt(row) {
      let obj = {
        loan_id: this.form.loan_id,
        date: row.mt_date,
        mt_id: row.mt_id,
      };
      await this.$API.fina.delMt(obj);
      this.getInfo(this.form.loan_id);
    },
    //删除走款信息按钮
    async delsp(row) {
      let obj = {
        sp_id: row.sp_id,
      };
      await this.$API.fina.delSp(obj);
      // this.spInfo(this.curMtId);
      let res = await this.$API.fina.getSp(this.curMtId);
      this.spList = res.data.spList;
    },
    //下款信息编辑窗口内添加匹配资本金按钮触发
    addMatch() {
      this.mt_form.matching_capital.unshift({
        name: null,
        num: null,
        date: null,
        remark: null,
        corp: null,
      });
    },
    //查看匹配资本金触发
    async showMaching(row) {
      let res = await this.$API.fina.getMatch(row.mt_id);
      this.currentMt = row.mt_id;
      this.curMatching = res.data.matching;
      if (!this.curMatching) {
        this.curMatching = [];
      }
      this.curMatching.forEach((item) => {
        this.$set(item, "isEdit", false);
      });
      this.dialogMatching = true;
    },
    //保存匹配资本金
    async mactingSave(row) {
      await this.$API.fina.addMatch({
        mt_id: this.currentMt,
        matching_capital: this.curMatching,
      });
      let res = await this.$API.fina.getMatch(this.currentMt);
      this.curMatching = res.data.matching;
      if (!this.curMatching) {
        this.curMatching = [];
      }
      this.curMatching.forEach((item) => {
        this.$set(item, "isEdit", false);
      });
    },
    //删除匹配资本金
    async delMatch(index) {
      this.curMatching.splice(index, 1);
      await this.$API.fina.delMatch({
        mt_id: this.currentMt,
        matching_capital: this.curMatching,
      });
    },
    //匹配资本金窗口内新增按钮触发
    addMatching() {
      this.curMatching.unshift({
        name: null,
        num: null,
        date: null,
        remark: null,
        corp: null,
        isEdit: true,
      });
    },
    //
    is_actual_change() {
      this.form.loan_sum = 0;
    },
    //取消编辑借款信息
    btn_cancle() {
      this.info_status = false;
      this.form = { ...this.form_copy };
    },
    //借款信息编辑按钮
    btn_edit() {
      if (this.form.sub_project === 1) {
        if (Array.isArray(this.form.sub_project_list)&&this.form.sub_project_list.length > 0) {
          if (
            this.form.sub_project_list.length ===
            this.form.rep_project_list.length
          ) {
            //console.log(1);
            this.loan_checkAll = true;
            this.loan_isIndeterminate = false;
          } else {
            this.loan_checkAll = true;
            this.loan_isIndeterminate = true;
          }
        } else {
          this.loan_checkAll = false;
          this.loan_isIndeterminate = false;
        }
      }
      //将原借款信息保存一份，用作取消编辑时还原数据
      this.form_copy = { ...this.form };
      this.info_status = true;
    },
    //下款子项目全选按钮触发
    handleCheckAllChange(val) {
      //console.log(val);
      // return
      this.mt_form.sub_project_list = val ? this.form.sub_project_list : [];
      this.isIndeterminate = false;
    },
    //下款子项目被选择时触发
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.form.sub_project_list.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.form.sub_project_list.length;
    },
    //借款信息内子项目全选按钮触发
    loan_handleCheckAllChange(val) {
      //console.log(val);
      // return
      this.form.sub_project_list = val ? this.form.rep_project_list : [];
      this.loan_isIndeterminate = false;
    },
    //借款信息内子项目被选择是触发
    loan_handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.loan_checkAll = checkedCount === this.form.rep_project_list.length;
      this.loan_isIndeterminate =
        checkedCount > 0 && checkedCount < this.form.rep_project_list.length;
    },

  },
};
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>