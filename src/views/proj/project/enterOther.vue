<template>
  <div>
    其他信息
   <div style="height: 80%; overflow: hidden;overflow: auto;"> <el-form label-position="top">
      <div style="display: flex; align-items: center">
        <div>
          <span>1、融资费用：</span>
        </div>
        <div class="custom-btn-wrap">
          <!-- <i
                    class="el-icon-plus"
                    style="color: #409eff; cursor: pointer"
                    @click="bondADD"
                  ></i> -->
          <div class="add-custom-btn" @click="finADD">
            <i class="el-icon-plus"></i>新增
          </div>
        </div>
      </div>
      <el-form-item label="">
        <!-- <template #label>
                  <div style="display: flex; align-items: center">
                    <div>
                      <span></span>
                    </div>
                    <div>
                      <i
                        class="el-icon-plus"
                        style="color: #409eff; cursor: pointer"
                        @click="finADD"
                      ></i>
                    </div>
                  </div>
                </template> -->

        <el-table
          style="margin-top: 12px"
          row-class-name="active-contnet"
          header-cell-class-name="active-header"
          :stripe="true"
          :data="finaList"
          border
        >
          <el-table-column label="名称" prop="cost_name">
            <template slot-scope="{ row }">
              <span v-if="!row.isEdit">{{ str_contet(row.cost_name) }}</span>
              <el-input
                v-model="row.cost_name"
                placeholder="请输入"
                v-else
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="金额" prop="cost_sum">
            <template slot-scope="{ row }">
              <span v-if="!row.isEdit">{{
                str_contet($format.money(row.cost_sum))
              }}</span>
              <el-input
                v-model="row.cost_sum"
                placeholder="请输入"
                @input="row.cost_sum = $format.formatInput(row.cost_sum)"
                v-else
              ></el-input> </template
          ></el-table-column>
          <el-table-column label="时间" prop="cost_date">
            <template slot-scope="{ row }">
              <span v-if="!row.isEdit">{{ str_contet(row.cost_date) }}</span>

              <el-date-picker
                v-model="row.cost_date"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
                v-else
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="收款单位" prop="corp_name">
            <template slot-scope="{ row }">
              <span v-if="!row.isEdit">{{ str_contet(row.corp_name) }}</span>

              <el-select v-model="row.corp_name" placeholder="请选择" v-else>
                <el-option
                  v-for="item in corpList"
                  :label="item.corp_name"
                  :value="item.corp_name"
                  :key="item.corp_id"
                ></el-option>
              </el-select> </template
          ></el-table-column>
          <el-table-column label="备注" prop="cost_remark">
            <template slot-scope="{ row }">
              <span v-if="!row.isEdit">{{ str_contet(row.cost_remark) }}</span>
              <el-input
                v-model="row.cost_remark"
                placeholder="请输入"
                v-else
              ></el-input> </template
          ></el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="{ row }">
              <div class="custom-table-btn-wrap">
                <div
                  v-show="row.isEdit"
                  class="save-custom-table-btn"
                  @click="finaSave(row)"
                >
                  <i class="el-icon-document-checked"></i>保存
                </div>
                <div
                  v-show="!row.isEdit"
                  class="edit-custom-table-btn"
                  @click="finaEdit(row)"
                >
                  <i class="el-icon-edit"></i>编辑
                </div>
                <div
                  v-show="!row.isEdit"
                  class="delete-custom-table-btn"
                  @click="delFina(row)"
                >
                  <i class="el-icon-delete"></i>删除
                </div>
              </div>
              <!-- <el-button
                        v-show="!row.isEdit"
                        type="primary"
                        size="mini"
                        icon="el-icon-edit-outline"
                        @click="finaEdit(row)"
                      ></el-button>
                      <el-button
                        v-show="row.isEdit"
                        type="primary"
                        size="mini"
                        icon="el-icon-check"
                        @click="finaSave(row)"
                      ></el-button>

                      <el-popconfirm
                        title="这是一段内容确定删除吗？"
                        @onConfirm="delFina(row)"
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
      </el-form-item>

      <div
        class="custom-horizontal-line"
        style="margin-top: 12px; margin-bottom: 12px"
      ></div>

      <div style="display: flex; align-items: center">
        <div>
          <span>2、保证担保：</span>
        </div>
        <div class="custom-btn-wrap">
          <!-- <i
                    class="el-icon-plus"
                    style="color: #409eff; cursor: pointer"
                    @click="bondADD"
                  ></i> -->
          <div class="add-custom-btn" @click="bondADD">
            <i class="el-icon-plus"></i>新增
          </div>
        </div>
      </div>

      <el-form-item label="">
        <!-- <template #label>
                  <div style="display: flex; align-items: center">
                    <div>
                      <span>保证担保</span>
                    </div>
                    <div class="custom-btn-wrap">
                      <i
                        class="el-icon-plus"
                        style="color: #409eff; cursor: pointer"
                        @click="bondADD"
                      ></i>
                    </div>
                  </div>
                </template> -->
        <el-table
          style="margin-top: 12px"
          row-class-name="active-contnet"
          header-cell-class-name="active-header"
          :stripe="true"
          :data="bondList"
          border
        >
          <el-table-column label="担保人" prop="bond_name">
            <template slot-scope="{ row }">
              <span v-if="!row.isEdit">{{ str_contet(row.bond_name) }}</span>
              <el-select
                v-else
                v-model="row.bond_name"
                placeholder="请选择担保"
              >
                <el-option
                  v-for="item in corpList"
                  :label="item.corp_name"
                  :value="item.corp_name"
                  :key="item.corp_id"
                ></el-option>
              </el-select> </template
          ></el-table-column>
          <el-table-column label="备注" prop="bond_remark">
            <template slot-scope="{ row }">
              <span v-if="!row.isEdit">{{ str_contet(row.bond_remark) }}</span>
              <el-input
                v-model="row.bond_remark"
                placeholder="请输入"
                v-else
              ></el-input> </template
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <div class="custom-table-btn-wrap">
                <div
                  v-show="row.isEdit"
                  class="save-custom-table-btn"
                  @click="bondSave(row)"
                >
                  <i class="el-icon-document-checked"></i>保存
                </div>
                <div
                  v-show="!row.isEdit"
                  class="edit-custom-table-btn"
                  @click="$set(row, 'isEdit', true)"
                >
                  <i class="el-icon-edit"></i>编辑
                </div>
                <div
                  v-show="!row.isEdit"
                  class="delete-custom-table-btn"
                  @click="delBond(row)"
                >
                  <i class="el-icon-delete"></i>删除
                </div>
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
                        @click="bondSave(row)"
                      ></el-button>

                      <el-popconfirm
                        title="这是一段内容确定删除吗？"
                        @onConfirm="delBond(row)"
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
      </el-form-item>

      <div
        class="custom-horizontal-line"
        style="margin-top: 12px; margin-bottom: 12px"
      ></div>

      <div style="display: flex; align-items: center">
        <div>
          <span>3、抵押担保：</span>
        </div>
        <div class="custom-btn-wrap">
          <!-- <i
                    class="el-icon-plus"
                    style="color: #409eff; cursor: pointer"
                    @click="bondADD"
                  ></i> -->
          <div class="add-custom-btn" @click="pawnADD">
            <i class="el-icon-plus"></i>新增
          </div>
        </div>
      </div>
      <el-form-item label="">
        <!-- <template #label>
                  <div style="display: flex; align-items: center">
                    <div>
                      <span>抵押担保</span>
                    </div>
                    <div>
                      <i
                        class="el-icon-plus"
                        style="color: #409eff; cursor: pointer"
                        @click="pawnADD"
                      ></i>
                    </div>
                  </div>
                </template> -->
        <el-table
          style="margin-top: 12px"
          row-class-name="active-contnet"
          header-cell-class-name="active-header"
          :stripe="true"
          :data="pawnList"
          border
        >
          <!-- <el-table-column label="金额" prop="pawn_sum">
                          <template slot-scope="{ row }">
                            <span v-if="!row.isEdit">{{
                              str_contet(row.pawn_sum)
                            }}</span>
                            <el-input
                              v-model="row.pawn_sum"
                              placeholder="请输入"
                              type="number"
                              v-else
                            ></el-input> </template
                        ></el-table-column> -->
          <el-table-column label="押品" prop="pawn_name">
            <template slot-scope="{ row }">
              <span v-if="!row.isEdit">{{ str_contet(row.pawn_name) }}</span>
              <el-input
                v-model="row.pawn_name"
                placeholder="请输入"
                v-else
              ></el-input> </template
          ></el-table-column>
          <el-table-column label="所有权人" prop="pawn_bond">
            <template slot-scope="{ row }">
              <span v-if="!row.isEdit">{{ str_contet(row.pawn_bond) }}</span>
              <el-select
                v-else
                v-model="row.pawn_bond"
                placeholder="请选择担保"
              >
                <el-option
                  v-for="item in corpList"
                  :label="item.corp_name"
                  :value="item.corp_name"
                  :key="item.corp_id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="pawn_remark">
            <template slot-scope="{ row }">
              <span v-if="!row.isEdit">{{ str_contet(row.pawn_remark) }}</span>
              <el-input
                v-model="row.pawn_remark"
                placeholder="请输入"
                v-else
              ></el-input> </template
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <div class="custom-table-btn-wrap">
                <div
                  v-show="row.isEdit"
                  class="save-custom-table-btn"
                  @click="pawnSave(row)"
                >
                  <i class="el-icon-document-checked"></i>保存
                </div>
                <div
                  v-show="!row.isEdit"
                  class="edit-custom-table-btn"
                  @click="$set(row, 'isEdit', true)"
                >
                  <i class="el-icon-edit"></i>编辑
                </div>
                <div
                  v-show="!row.isEdit"
                  class="delete-custom-table-btn"
                  @click="delPawn(row)"
                >
                  <i class="el-icon-delete"></i>删除
                </div>
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
                        @click="pawnSave(row)"
                      ></el-button>

                      <el-popconfirm
                        title="这是一段内容确定删除吗？"
                        @onConfirm="delPawn(row)"
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
      </el-form-item>
    </el-form></div>
    <el-button type="primary" @click="$emit('stepNext',3)"
          >下一步</el-button
        >
  </div>
</template>

<script>
export default {
  name: "enterOther",
  data() {
    return {
      finaList: [],
      bondList: [],
      pawnList: [],
    };
  },
  methods:{
    //融资费用行内添加按钮
    finADD() {
      let obj = {
        corp_name: "",
        cost_date: "",
        cost_id: "",
        cost_name: "",
        cost_remark: "",
        cost_sum: 0,
        isEdit: true,
      };
      this.finaList.unshift(obj);
     
    },
    //融资费用行内编辑按钮
    finaEdit(row){
      row.isEdit = true
      row.cost_sum = this.$format.money(row.cost_sum)
    },
    //融资费用行内保存按钮
    async finaSave(row) {
      row.rep_id = this.rep_id;
      let info = {...row}
      info.cost_sum = parseFloat(info.cost_sum.substring(1).replace(/,/g, ""))
      let res = await this.$API.fina.addCost(info);
      row.isEdit = false;
      this.$message({ type: "success", message: "保存成功" });
      this.getBasics();
    },
    //融资费用行内删除按钮
    async delFina(row) {
      let res = await this.$API.fina.delCost({ cost_id: row.cost_id });
      this.$message({ type: "success", message: "删除成功" });
      this.getBasics();
    },
    //保证担保行内添加按钮
    bondADD() {
      let obj = {
        bond_sum: 0,
        bond_name: "",
        bond_remark: "",
        isEdit: true,
      };
      this.bondList.unshift(obj);
    },
     //保证担保行内编辑按钮
    async bondSave(row) {
      row.rep_id = this.rep_id;
      let res = await this.$API.fina.addBond(row);
      row.isEdit = false;
      this.$message({ type: "success", message: "保存成功" });
      this.getBasics();
    },
     //保证担保行内删除按钮
    async delBond(row) {
      let res = await this.$API.fina.delBond({ bond_id: row.bond_id });
      this.$message({ type: "success", message: "删除成功" });
      this.getBasics();
    },
    //抵押担保行内添加按钮
    pawnADD() {
      let obj = {
        pawn_sum: 0,
        pawn_name: "",
        pawn_remark: "",
        pawn_bond: "",
        isEdit: true,
      };
      this.pawnList.unshift(obj);
    },
    //抵押担保行保存按钮
    async pawnSave(row) {
      row.rep_id = this.rep_id;
      let res = await this.$API.fina.addPawn(row);
      row.isEdit = false;
      this.$message({ type: "success", message: "保存成功" });
      this.getBasics();
    },
    //抵押担保行内删除按钮
    async delPawn(row) {
      let res = await this.$API.fina.delPawn({ pawn_id: row.pawn_id });
      this.$message({ type: "success", message: "删除成功" });
      this.getBasics();
    },
  }
};
</script>

<style>
</style>