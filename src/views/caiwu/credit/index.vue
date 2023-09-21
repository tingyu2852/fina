<template>
  <div>
    <div v-show="boxShow == 1">
      <div style="width: 98%; margin: auto" class="table1">
        <el-button
          style="margin: 10px 0"
          type="primary"
          plain
          @click="diaasd =true"
          size="mini"
          >新增</el-button
        > 
        <!-- <el-button
        style="margin: 10px"
        type="primary"
        plain
        @click="dc_btn"
        size="mini"
        >导出</el-button
      > -->
        <el-button
          style="margin: 10px 0px"
          type="danger"
          plain
          size="mini"
          @click="deleteBtn"
          :disabled="!delCreditList.length"
          >删除</el-button
        >
        <el-table
          :data="creditList"
          @selection-change="handleSelectionChange"
          border
          @filter-change="filterChange"
          @expand-change="aaa"
          ref="tableExpand"
        >
          <el-table-column header-align="center" type="selection" width="55">
          </el-table-column>

          

          <el-table-column
            header-align="center"
            label="项目名称"
            prop="corp_name"
          > <template>
              <span>产业园一期A区工程</span>
            </template></el-table-column>
          <el-table-column
            header-align="center"
            label="融资主体"
            prop="corp_name1"
          >
            <template>
              <span>xx公司</span>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            label="金融机构"
            prop="corp_name2"
          >
            <template>
              <span>贵阳银行</span>
            </template></el-table-column
          >
          <el-table-column header-align="center" label="类型" prop="corp_name3">
            <template>
              <span>项目贷</span>
            </template></el-table-column
          >
          <el-table-column
            header-align="center"
            label="融资信息"
            prop="corp_name3"
            width="150px"
          >
            <template slot-scope="scoped">
              <el-button
                type="primary"
                size="mini "
                @click="table_btn(scoped, 'sx')"
                >查看</el-button
              >
              <el-button
                type="primary"
                size="mini "
                @click="add_table_btn(scoped, 'sx')"
                >编辑</el-button
              >
            </template></el-table-column
          >
          <!-- <el-table-column
            header-align="center"
            label="贷款类"
            prop="corp_name3"
          >
            <template>
              <el-button
                type="primary"
                size="mini "
                @click="table_btn(row, 'dk')"
                >查看</el-button
              >
              <el-button
                type="primary"
                size="mini "
                @click="add_table_btn(row,'dk')"
                >编辑</el-button
              >
            </template></el-table-column
          > -->
          <el-table-column
            header-align="center"
            label="走款信息"
            prop="corp_name3"
            width="150px"
          >
            <template slot-scope="scoped">
              <el-button
                type="primary"
                size="mini "
                @click="table_btn(scoped, 'hk')"
                >查看</el-button
              >
              <el-button
                type="primary"
                size="mini "
                @click="add_table_btn(scoped, 'hk')"
                >编辑</el-button
              >
            </template></el-table-column
          >
          <el-table-column
            header-align="center"
            label="还款计划"
            prop="corp_name3"
            width="150px"
          >
            <template slot-scope="scoped">
              <el-button
                type="primary"
                size="mini "
                @click="table_btn(scoped, 'jh')"
                >查看</el-button
              >
              <el-button
                type="primary"
                size="mini "
                @click="add_table_btn(scoped, 'jh')"
                >编辑</el-button
              >
            </template></el-table-column
          >
          <el-table-column
            header-align="center"
            label="实际还款"
            prop="corp_name3"
            width="150px"
          >
            <template slot-scope="scoped">
              <el-button
                type="primary"
                size="mini "
                @click="table_btn(scoped, 'sj')"
                >查看</el-button
              >
              <el-button
                type="primary"
                size="mini "
                @click="add_table_btn(scoped, 'sj')"
                
                >编辑</el-button
              >
            </template></el-table-column
          >
          <el-table-column
            header-align="center"
            label="审核状态"
            prop="corp_name3"
          >
            <template slot-scope="scoped">
              <el-tag type="warning">未提交</el-tag>
            </template></el-table-column
          >
          <el-table-column header-align="center" label="操作" min-width="120">
            <template slot-scope="{ row }">
              <el-button
                style="margin-right: 10px"
                type="text"
                plain
                icon="el-icon-plus"
                class="btn_1"
                
                >提交审核</el-button
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
    <div v-show="boxShow == 2">
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        style="width: 600px; margin: 20px"
        label-position="left"
      >
        <el-form-item label="项目名称">
          <el-input v-model="form.name1"></el-input>
        </el-form-item>
        <el-form-item label="单一品种授信">
          <el-radio-group
            v-model="form.resource"
            style="display: flex; align-items: center"
          >
            <el-radio label="1"></el-radio>
            <el-radio label="2"></el-radio>
            <el-radio label="其他"></el-radio>
            <el-input
              v-model="form.resources"
              :disabled="form.resource !== '其他'"
              placeholder=""
            ></el-input>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="批复金额">
          <el-input v-model="form.name2"></el-input>
        </el-form-item>
        <el-form-item label="批复文件">
          <el-button type="primary" size="mini">点击上传</el-button>
        </el-form-item>
        <el-form-item label="融资费用">
          <el-row :gutter="5" style="margin-left: 0px">
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="名称"
              >
                <el-input v-model="form.name3"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="金额"
              >
                <el-input v-model="form.name4"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="支付时间"
              >
                <el-input v-model="form.name5"></el-input> </el-form-item
            ></el-col>

            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="备注"
              >
                <el-input v-model="form.name6"></el-input> </el-form-item
            ></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="担保信息">
          <el-row :gutter="5" style="margin-left: 0px">
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="第一担保"
              >
                <el-input v-model="form.name7"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="费率"
              >
                <el-input v-model="form.name8"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="方式"
              >
                <el-input v-model="form.name9"></el-input> </el-form-item
            ></el-col>

            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="担保文件"
              >
                <el-button type="primary" size="mini"
                  >点击上传</el-button
                ></el-form-item
              ></el-col
            >
          </el-row>
        </el-form-item>
        <el-form-item label="还款来源">
          <el-input v-model="form.name11"></el-input>
        </el-form-item>
        <el-form-item label="期限(/月)">
          <el-input v-model="form.name12"></el-input>
        </el-form-item>
        <el-form-item label="借款合同">
          <el-row :gutter="5" style="margin-left: 0px">
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="金额"
              >
                <el-input v-model="form.name13"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="利率"
              >
                <el-input v-model="form.name14"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="用途"
              >
                <el-input v-model="form.name15"></el-input> </el-form-item
            ></el-col>

            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="借款合同"
              >
                <el-button type="primary" size="mini">上传</el-button>
              </el-form-item></el-col
            >
          </el-row>
        </el-form-item>
        <el-form-item label="下款及用款">
          <el-row :gutter="5" style="margin-left: 0px">
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="下款金额"
              >
                <el-input v-model="form.name16"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="时间"
              >
                <el-input v-model="form.name17"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="备注"
              >
                <el-input v-model="form.name18"></el-input> </el-form-item
            ></el-col>

            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="附件"
              >
                <el-button type="primary" size="mini">上传</el-button>
              </el-form-item></el-col
            >
          </el-row>
        </el-form-item>
        <el-form-item label="实际走款">
          <el-row :gutter="5" style="margin-left: 0px">
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="名义用款"
              >
                <el-input v-model="form.name19"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="时间"
              >
                <el-input v-model="form.name21"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="金额"
              >
                <el-input v-model="form.name22"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="用途"
              >
                <el-input v-model="form.name23"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="收款单位"
              >
                <el-input v-model="form.name24"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="支撑文件"
              >
                <el-button type="primary" size="mini">上传</el-button>
              </el-form-item></el-col
            >
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="备注"
              >
                <el-input v-model="form.name25"></el-input> </el-form-item
            ></el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="实际用款">
          <el-row :gutter="5" style="margin-left: 0px">
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="金额"
              >
                <el-input v-model="form.name26"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="时间"
              >
                <el-input v-model="form.name27"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="用途"
              >
                <el-input v-model="form.name28"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="收款单位"
              >
                <el-input v-model="form.name29"></el-input> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="备注"
              >
                <el-input v-model="form.name30"></el-input> </el-form-item
            ></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="还本计划"
          ><el-button type="primary" size="mini" @click="addPlan">
            新增</el-button
          ></el-form-item
        >
        <el-form-item
          v-for="(key, index) in form.rpyPlan"
          :key="index"
          :label="`计划` + (index + 1)"
        >
          <el-row
            :gutter="5"
            style="margin-left: 0px; display: flex; align-items: center"
          >
            <el-col :span="10"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="时间"
              >
                <el-input
                  v-model="form.rpyPlan[index].name"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="10"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="金额"
              >
                <el-input
                  v-model="form.rpyPlan[index].time"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="2" style="align-items: center">
              <el-button type="danger" size="mini" plain @click="del_btn(index)"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="付息要求">
          <el-row :gutter="5" style="margin-left: 0px; align-items: center">
            <el-col :span="24">
              <el-form-item label="规则付息" style="align-items: center">
                <el-radio-group v-model="form.resource">
                  <el-radio label="按年"></el-radio>
                  <el-radio label="按季度"></el-radio>
                  <el-radio label="按月"></el-radio>
                </el-radio-group> </el-form-item
            ></el-col>
            <el-col :span="12"
              ><el-form-item
                label-width="70px"
                style="margin: 10px 0px"
                label="具体日期"
              >
                <el-input v-model="form.name33"></el-input> </el-form-item
            ></el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="qx_btn">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="添加"
      width="900px"
      :visible.sync="dialogTableVisible"
      @close="AdddialogClose"
      :close-on-click-modal="false"
    >
      <div style="width: 95%; margin: auto" class="dialog_body">
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
          style="width: 600px; margin: 20px"
          label-position="left"
        >
          <!-- <el-form-item label="项目名称">
          <el-input v-model="form.name1"></el-input>
        </el-form-item> -->
          <div v-if="curAdd == 'sx'">
            <el-form-item label="授信">
              <el-radio-group
                v-model="form.resource"
                style="display: flex; align-items: center"
              >
                <el-radio label="1"></el-radio>
                <el-radio label="2"></el-radio>
                <el-radio label="其他"></el-radio>
                <el-input
                  v-model="form.resources"
                  :disabled="form.resource !== '其他'"
                  placeholder=""
                ></el-input>
              </el-radio-group>
            </el-form-item>
          </div>
          <div v-if="curAdd == 'sx'">
            <el-form-item label="批复金额">
              <el-input v-model="form.name2"></el-input>
            </el-form-item>
            <el-form-item label="批复文件">
              <el-upload class="upload-demo">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="融资费用">
              <el-row :gutter="5" style="margin-left: 0px">
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="名称"
                  >
                    <el-input v-model="form.name3"></el-input> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="金额"
                  >
                    <el-input v-model="form.name4"></el-input> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="支付时间"
                  >
                    <el-date-picker
                      v-model="form.name5"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker> </el-form-item
                ></el-col>

                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="备注"
                  >
                    <el-input v-model="form.name6"></el-input> </el-form-item
                ></el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="担保信息">
              <el-row :gutter="5" style="margin-left: 0px">
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="第一担保"
                  >
                    <el-input v-model="form.name7"></el-input> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="费率"
                  >
                    <el-input v-model="form.name8"></el-input> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="方式"
                  >
                    <el-input v-model="form.name9"></el-input> </el-form-item
                ></el-col>

                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="担保文件"
                  >
                    <el-upload class="upload-demo">
                      <el-button size="small" type="primary"
                        >点击上传</el-button
                      >
                    </el-upload></el-form-item
                  ></el-col
                >
              </el-row>
            </el-form-item>
          </div>
          <div v-if="curAdd == 'hk'">
            <el-form-item label="还款来源">
              <el-input v-model="form.name11"></el-input>
            </el-form-item>
            <el-form-item label="期限(/月)">
              <el-input v-model="form.name12"></el-input>
            </el-form-item>
            <el-form-item label="借款合同">
              <el-row :gutter="5" style="margin-left: 0px">
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="金额"
                  >
                    <el-input v-model="form.name13"></el-input> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="利率"
                  >
                    <el-input v-model="form.name14"></el-input> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="用途"
                  >
                    <el-input v-model="form.name15"></el-input> </el-form-item
                ></el-col>

                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="借款合同"
                  >
                    <el-upload class="upload-demo">
                      <el-button size="small" type="primary"
                        >点击上传</el-button
                      >
                    </el-upload>
                  </el-form-item></el-col
                >
              </el-row>
            </el-form-item>
            <el-form-item label="下款">
              <el-row :gutter="5" style="margin-left: 0px">
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="下款金额"
                  >
                    <el-input v-model="form.name16"></el-input> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="起止日"
                  >
                    <el-date-picker
                      v-model="form.name35"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    >
                    </el-date-picker> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="备注"
                  >
                    <el-input v-model="form.name18"></el-input> </el-form-item
                ></el-col>

                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="附件"
                  >
                    <el-upload class="upload-demo">
                      <el-button size="small" type="primary"
                        >点击上传</el-button
                      >
                    </el-upload>
                  </el-form-item></el-col
                >
              </el-row>
            </el-form-item>
            <el-form-item label="实际走款">
              <el-row :gutter="5" style="margin-left: 0px">
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="名义用款"
                  >
                    <el-input v-model="form.name19"></el-input> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="时间"
                  >
                    <el-date-picker
                      v-model="form.name21"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="金额"
                  >
                    <el-input v-model="form.name22"></el-input> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="用途"
                  >
                    <el-input v-model="form.name23"></el-input> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="收款单位"
                  >
                    <el-input v-model="form.name24"></el-input> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="支撑文件"
                  >
                    <el-upload class="upload-demo">
                      <el-button size="small" type="primary"
                        >点击上传</el-button
                      >
                    </el-upload>
                  </el-form-item></el-col
                >
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="备注"
                  >
                    <el-input v-model="form.name25"></el-input> </el-form-item
                ></el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="实际用款">
              <el-row :gutter="5" style="margin-left: 0px">
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="金额"
                  >
                    <el-input v-model="form.name26"></el-input> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="时间"
                  >
                    <el-date-picker
                      v-model="form.name27"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="用途"
                  >
                    <el-input v-model="form.name28"></el-input> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="收款单位"
                  >
                    <el-input v-model="form.name29"></el-input> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="备注"
                  >
                    <el-input v-model="form.name30"></el-input> </el-form-item
                ></el-col>
              </el-row>
            </el-form-item>
           
            <el-form-item label="付息要求">
              <el-row :gutter="5" style="margin-left: 0px; align-items: center">
                <el-col :span="24">
                  <el-form-item label="规则付息" style="align-items: center">
                    <el-radio-group v-model="form.resource">
                      <el-radio label="按年"></el-radio>
                      <el-radio label="按季度"></el-radio>
                      <el-radio label="按月"></el-radio>
                    </el-radio-group> </el-form-item
                ></el-col>
                <el-col :span="12"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="具体日期"
                  >
                    <el-input v-model="form.name33"></el-input> </el-form-item
                ></el-col>
              </el-row>
            </el-form-item>
          </div>
          <div v-if="curAdd == 'jh'">
            <el-form-item label="还本计划"
              ><el-button type="primary" size="mini" @click="addPlan">
                新增</el-button
              ></el-form-item
            >
            <el-form-item
              v-for="(key, index) in form.rpyPlan"
              :key="index"
              :label="`计划` + (index + 1)"
            >
              <el-row
                :gutter="5"
                style="margin-left: 0px; display: flex; align-items: center"
              >
                <el-col :span="24"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="时间"
                  >
                    <el-date-picker
                      v-model="form.rpyPlan[index].time"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker></el-form-item
                ></el-col>
                <el-col :span="24"
                  ><el-form-item
                    label-width="70px"
                    style="margin: 10px 0px"
                    label="金额"
                  >
                    <el-input
                      v-model="form.rpyPlan[index].time"
                    ></el-input> </el-form-item
                ></el-col>
                <el-col :span="2" style="align-items: center">
                  <el-button
                    type="danger"
                    size="mini"
                    plain
                    @click="del_btn(index)"
                    >删除</el-button
                  >
                </el-col>
              </el-row>
            </el-form-item>
           </div>
          <div v-if="curAdd == 'sj'" class="asd">
            <el-form-item label="还本">
              <el-row :gutter="2" style="margin-left: 0px">
                <el-col :span="24">
                  <el-form-item label="时间">
                    <el-date-picker
                      v-model="form.a"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker> </el-form-item
                ></el-col>
                <el-col :span="24">
                  <el-form-item label="金额">
                    <el-input
                      v-model="form.a1"
                      placeholder=""
                    ></el-input> </el-form-item
                ></el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="付息">
              <el-row :gutter="2" style="margin-left: 0px">
                <el-col :span="24">
                  <el-form-item label="时间">
                    <el-date-picker
                      v-model="form.a2"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker> </el-form-item
                ></el-col>
                <el-col :span="24">
                  <el-form-item label="金额">
                    <el-input
                      v-model="form.a3"
                      placeholder=""
                    ></el-input> </el-form-item
                ></el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="借款合同">
              <el-upload class="upload-demo">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBxBtn">确 定</el-button>
      </div></el-dialog
    >
    <el-dialog
      title="添加"
      width="500px"
      :visible.sync="diag"
      @close="AdddialogClose"
      :close-on-click-modal="false"
      ref="dialogs"
    >
      <el-form
        :model="addfrom"
        ref="ruleForm"
        label-width="100px"
        label-position="left"
        :rules="rules"
      >
        <el-form-item label="项目名称" prop="proj_name">
          <el-input v-model="addfrom.proj_name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="融资主体" prop="proj_name">
          <el-input v-model="addfrom.proj_name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="金融机构" prop="bank_id">
          <el-select
            clearable
            class="box_select"
            v-model="addfrom.bank_id"
            placeholder="请选择"
            filterable
          >
            <el-option
              v-for="item in bankList"
              :label="item.bank_name"
              :value="item.bank_id"
              :key="item.bank_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目类型" prop="bank_id">
          <el-select
            clearable
            class="box_select"
            v-model="addfrom.bank_id"
            placeholder="请选择"
            filterable
          >
            <el-option
              v-for="item in bankList"
              :label="item.bank_name"
              :value="item.bank_id"
              :key="item.bank_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目用途" prop="proj_intro">
          <el-input
            v-model="addfrom.proj_intro"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :title="titleInfo"
      width="800px"
      :visible.sync="diags"
      @close="AdddialogClose"
      :close-on-click-modal="false"
    >
      <div class="aaa">
        <el-form label-position="left"  class="demo-table-expand" id="asd" label-width="100px">
        <el-row :gutter="5">
          <div v-if="curck == 'sx'">
            <el-col :span="8">
              <el-form-item label="授信种类：">
                <span>？？？</span>
              </el-form-item></el-col
            >
            <el-col :span="8">
              <el-form-item label="批复金额">
                <span>27000</span>
              </el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item label="批复文件">
                <el-button type="primary" size="mini">下载</el-button>
              </el-form-item></el-col
            >
            <el-col :span="8">
              <el-form-item label="融资费用名称">
                <span>？？？</span>
              </el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item label="融资支付时间">
                <span>？？？</span>
              </el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item label="融资金额">
                <span>？？？</span>
              </el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item label="融资备注">
                <span>？？？</span>
              </el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item label="第一担保">
                <span>？？？</span>
              </el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item label="担保金额">
                <span>？？？</span>
              </el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item label="担保费率">
                <span>？？？</span>
              </el-form-item></el-col
            >
            <el-col :span="8">
              <el-form-item label="担保方式">
                <span>？？？</span>
              </el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item label="担保文件">
                <el-button type="primary" size="mini">下载</el-button>
              </el-form-item></el-col
            >
          </div>
          <div v-if="curck == 'hk'">
            <el-col :span="8"
              ><el-form-item label="还款来源">
                <span>？？？</span>
              </el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item label="还款期限">
                <span>？？？</span>
              </el-form-item></el-col
            >
            <el-col :span="8"
              ><el-form-item label="借款合同">
                <span>？？？</span>
              </el-form-item></el-col
            >
            <el-col :span="24"
              ><el-form-item label="下款">
                <el-table :data="[{name:10000,time:'2011-01-01',remark:'',},{name:10000,time:'2012-01-01'},{name:10000,time:'2013-01-01'}]" border>
                 <el-table-column type="index"></el-table-column>
                 <el-table-column label="时间" prop="time"></el-table-column>
                 <el-table-column label="金额" prop="name"></el-table-column>
                 <el-table-column label="备注" prop="remark"><template slot-scope="{row}">
                    <span>？？？</span>
                  </template></el-table-column>
                 <el-table-column label="附件" prop="name">
                  <template slot-scope="{row}">
                    <el-button type="primary" size="mini">下载</el-button>
                  </template>
                 </el-table-column>
               </el-table>
              </el-form-item></el-col
            >
            <el-col :span="24"
              ><el-form-item label="实际走款">
                <el-table :data="[{name:10000,time:'2011-01-01',remark:'',},{name:10000,time:'2012-01-01'},{name:10000,time:'2013-01-01'}]" border>
                 <el-table-column type="index"></el-table-column>
                 <el-table-column label="时间" prop="time"></el-table-column>
                 <el-table-column label="金额" prop="name"></el-table-column>
                 <el-table-column label="用途" prop="name"><template slot-scope="{row}">
                    <span>？？？</span>
                  </template></el-table-column>
                 <el-table-column label="收款单位" prop="name"><template slot-scope="{row}">
                    <span>？？？</span>
                  </template></el-table-column>
                 <el-table-column label="备注" prop="remark"><template slot-scope="{row}">
                    <span>？？？</span>
                  </template></el-table-column>
                 <el-table-column label="用款支撑文件" prop="name">
                  <template slot-scope="{row}">
                    <el-button type="primary" size="mini">下载</el-button>
                  </template>
                 </el-table-column>
               </el-table>
              </el-form-item></el-col
            >
            <el-col :span="24"
              ><el-form-item label="实际用款">
                <el-table :data="[{name:10000,time:'2011-01-01',remark:'',},{name:10000,time:'2012-01-01'},{name:10000,time:'2013-01-01'}]" border>
                 <el-table-column type="index"></el-table-column>
                 <el-table-column label="时间" prop="time"></el-table-column>
                 <el-table-column label="金额" prop="name"></el-table-column>
                 <el-table-column label="用途" prop="name"><template slot-scope="{row}">
                    <span>？？？</span>
                  </template></el-table-column>
                 <el-table-column label="收款单位" prop="name"><template slot-scope="{row}">
                    <span>？？？</span>
                  </template></el-table-column>
                 <el-table-column label="备注" prop="remark"><template slot-scope="{row}">
                    <span>？？？</span>
                  </template></el-table-column>
                 <!-- <el-table-column label="附件" prop="name">
                  <template slot-scope="{row}">
                    <el-button type="primary" size="mini">下载</el-button>
                  </template>
                 </el-table-column> -->
               </el-table>
              </el-form-item></el-col
            >
         
          </div>
          <div v-if="curck == 'jh'">
            <el-col :span="24">
              <el-form-item label="还本计划" >
               <el-table :data="[{name:10000,time:'2011-01-01'},{name:10000,time:'2012-01-01'},{name:10000,time:'2013-01-01'}]" border>
                 <el-table-column type="index"></el-table-column>
                 <el-table-column label="时间" prop="time"></el-table-column>
                 <el-table-column label="金额" prop="name"></el-table-column>
               </el-table>
              </el-form-item></el-col
            >
          </div>
          
        </el-row>
        <div v-if="curck == 'sj'">
            
            <!-- <el-form-item label="还款1">
              <el-form-item label="还本金额"><span>10000</span></el-form-item>
            <el-form-item label="时间"><span>2011-01-01</span></el-form-item>
            
            </el-form-item>
            <el-form-item label="还款2">
              <el-form-item label="还本金额"><span>10000</span></el-form-item>
            <el-form-item label="时间"><span>2011-01-01</span></el-form-item>
            
            </el-form-item>
          
          
            <el-form-item label="付息">
              <el-form-item label="金额"><span>1000</span></el-form-item>
            <el-form-item label="时间"><span>2011-01-01</span></el-form-item>
            </el-form-item> -->
           <el-form-item label="实际还款">
            <el-table :data="[{name:10000,time:'2011-01-01',acc:100},{name:10000,time:'2011-01-01',acc:100}]" show-summary border>
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column label="时间" prop="time"></el-table-column>
              <el-table-column label="还本" prop="name"></el-table-column>
              <el-table-column label="还息" prop="acc"></el-table-column>
            </el-table>
           </el-form-item>
          
            
          
        </div>
      </el-form>
      </div>
    </el-dialog>
    <el-dialog
      title="添加"
      width="500px"
      :visible.sync="diaasd"
      @close="AdddialogClose"
      :close-on-click-modal="false"
    >
      <div style="width: 80%; margin: auto" class="dialog_body">
        <el-form
          :model="addfrom"
          ref="ruleForm"
          label-width="100px"
          label-position="left"
          :rules="rules"
        >
        <el-form-item label="项目名称" prop="proj_name">
            <el-input
              v-model="addfrom.proj_name"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="融资主体" prop="proj_name">
            <el-input
              v-model="addfrom.proj_name"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="金融机构" prop="bank_id">
            <el-select
              clearable
              class="box_select"
              v-model="addfrom.bank_id"
              placeholder="请选择"
              filterable
            >
              <el-option
                v-for="item in bankList"
                :label="item.bank_name"
                :value="item.bank_id"
                :key="item.bank_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目类型" prop="bank_id">
            <el-select
              clearable
              class="box_select"
              v-model="addfrom.bank_id"
              placeholder="请选择"
              filterable
            >
              <el-option
                v-for="item in bankList"
                :label="item.bank_name"
                :value="item.bank_id"
                :key="item.bank_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目用途" prop="proj_intro">
            <el-input
              v-model="addfrom.proj_intro"
              placeholder="请输入"
            ></el-input>
          </el-form-item>

         
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="diaasd = false">取 消</el-button>
        <el-button type="primary" @click="addBxBtn">确 定</el-button>
      </div></el-dialog>
    
  </div>
</template>

<script>
export default {
  diaasd:true,
  name: "Credit",
  data() {
    return {
      titleInfo:'',
      diaasd:false,
      diags:false,
      curck: "",
      diag: false,
      curAdd: "",
      boxShow: 1,
      dialogTableVisible: false,
      creditList: [],
      current: 1,
      size: 50,
      sizes: [50, 100, 200, 500],
      total: 1000,
      addfrom: {
        corp_id: "",
        bank_id: "",
        bgn_date: "",
        end_date: "",
        proj_id: "",
        rec_loan: "",
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
        rpyPlan: [
          {
            name: "",
            time: "",
          },
        ],
      },
      rules: [],
      corpList: [],
      bankList: [],
      projList: [],
      corpList: [],
      delCreditList: [],
      rules: {
        corp_id: [{ required: true, message: "不能为空", trigger: "blur" }],
        bank_id: [{ required: true, message: "不能为空", trigger: "blur" }],
        bgn_date: [{ required: true, message: "不能为空", trigger: "blur" }],
        end_date: [{ required: true, message: "不能为空", trigger: "blur" }],
        proj_id: [{ required: true, message: "不能为空", trigger: "blur" }],
        rec_loan: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getCreditList();
    this.getSelect();
  },
  methods: {
    async getCreditList() {
      let res = await this.$API.caiwu.getcredit(this.current, this.size);
      this.total = res.data.total;
      this.creditList = res.data.creditList;
    },
    async getSelect() {
      let res = await this.$API.caiwu.getSelect(1);
      this.bankList = res.data.bankList;
      this.corpList = res.data.corpList;
      this.projList = res.data.projList;
      console.log(res.data);
    },
    //多选回调
    handleSelectionChange(row) {
      this.delCreditList = row;
    },
    async deleteBtn() {
      this.$confirm("此操作将永久删除所选信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (this.delCreditList.length) {
            let delList = [];
            this.delCreditList.forEach((item) => {
              delList.push(item.crd_rec_id);
            });
            await this.$API.caiwu.delCredit(delList);
            this.getCreditList();
            this.$message({
              type: "success",
              message: "删除成功",
            });
          }
        })
        .catch(() => {
          console.log("1");
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async deleteTableBtn(row) {
      let delList = [row.crd_rec_id];

      await this.$API.caiwu.delCredit(delList);
      this.$message({
        type: "success",
        message: "删除成功",
      });
      this.getCreditList();
    },
    //导出按钮
    dc_btn() {},
    currentChange(cur) {
      this.current = cur;
      this.getCreditList();
    },
    //每页显示条数修改
    sizeChange(size) {
      this.size = size;
      this.getCreditList();
    },
    //弹窗保存按钮
    addBxBtn() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          await this.$API.caiwu.addCredit(this.addfrom);
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.getCreditList();
          this.dialogTableVisible = false;
        } else {
          console.log("error submit!!");
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
    // formatNumber(num) {
    //   num = num - 0;
    //   return num.toLocaleString();
    // },
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
    check_btn() {},
    filterTag() {
      console.log(1);
      return false;
    },
    filterChange(obj) {
      console.log(obj.filterTag);
    },
    qx_btn() {
      this.boxShow = 1;
    },
    addPlan() {
      this.form.rpyPlan.push({ name: "", time: "" });
    },
    del_btn(index) {
      console.log(index);
      this.form.rpyPlan.splice(index, 1);
    },
    table_btn(row, name) {
      
  
      this.titleInfo = `${row.row.proj_name}-${row.column.label}`
      this.diags = true
      this.curck = name;
      // const table = this.$refs.tableExpand
      // const isExpanded = table.isRowExpanded(row)
      // console.log(isExpanded);
      // console.log(row.row)
      //console.log(this.$refs.tableExpand);
      //console.log(this.$refs.tableExpand.isRowExpanded(0));
      //this.$refs.tableExpand.toggleRowExpansion(row);

      // this.$refs.tableExpand.toggleRowExpansion(this.tableData[0], true)
      // this.$refs.tableExpand.toggleRowExpansion(this.tableData[0], true)
      // this.$nextTick(()=>{
      //     this.$refs.tableExpand.toggleRowExpansion(this.tableData[0], true);
      //   })
      //console.log(row);
      //row.expanded = true
      // this.curAdd = name;
      // this.dialogTableVisible = true;
    },
    add_table_btn(row, name) {
      this.curAdd = name;
      this.dialogTableVisible = true;
      return "aaa";
    },
    aaa(a, b) {
      return;
      console.log(a, b);
    },
    handleExpand(row) {
      // 处理展开事件
      // console.log('展开', row)
    },
    handleCustomButton(row) {
      //console.log(this.$refs.tableExpand);
      this.$refs.tableExpand.toggleRowExpansion(0);
      //this.$refs.tableExpand.toggleRowExpansion(this.tableData[0], true)
      // 处理自定义按钮点击事件
      //console.log('自定义按钮', row)
    },
  },
};
</script>

<style scoped>
.asd .el-col {
  margin: 10px;
}
/* .el-table__expand-column{
  width: 0px;
} */
>>>.aaa .el-form .el-form-item .el-form-item__content{
  font-size: 17px;
}
>>>.aaa .el-form .el-form-item .el-form-item__label{
  font-size: 17px;
}
</style>