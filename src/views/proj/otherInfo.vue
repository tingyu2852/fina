<template>
  <div>
    <el-form label-position="top">
                    <el-form-item label="asd">
                      <template #label>
                        <div style="display: flex; align-items: center">
                          <div>
                            <span>融资费用</span>
                          </div>
                          <div>
                            <i
                              class="el-icon-plus"
                              style="color: #409eff; cursor: pointer"
                              @click="finADD"
                              v-show="rep_status"
                            ></i>
                          </div>
                        </div>
                      </template>

                      <el-table :data="rep_form.finaList" border>
                        <el-table-column label="名称" prop="cost_name">
                          <template slot-scope="{ row }">
                            <span v-if="!row.isEdit">{{
                              str_contet(row.cost_name)
                            }}</span>
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
                              type="number"
                              placeholder="请输入"
                              v-else
                            ></el-input> </template
                        ></el-table-column>
                        <el-table-column label="时间" prop="cost_date">
                          <template slot-scope="{ row }">
                            <span v-if="!row.isEdit">{{
                              str_contet(row.cost_date)
                            }}</span>

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
                            <span v-if="!row.isEdit">{{
                              str_contet(row.corp_name)
                            }}</span>

                            <el-select
                              v-model="row.corp_name"
                              placeholder="请选择"
                              v-else
                            >
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
                            <span v-if="!row.isEdit">{{
                              str_contet(row.cost_remark)
                            }}</span>
                            <el-input
                              v-model="row.cost_remark"
                              placeholder="请输入"
                              v-else
                            ></el-input> </template
                        ></el-table-column>
                        <el-table-column
                          label="操作"
                          width="150px"
                          v-if="rep_status"
                        >
                          <template slot-scope="{ row }">
                            <el-button
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
                            </el-popconfirm>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-form-item>
                    <el-form-item label="保证担保">
                      <template #label>
                        <div style="display: flex; align-items: center">
                          <div>
                            <span>保证担保</span>
                          </div>
                          <div>
                            <i
                              class="el-icon-plus"
                              style="color: #409eff; cursor: pointer"
                              @click="bondADD"
                              v-show="rep_status"
                            ></i>
                          </div>
                        </div>
                      </template>
                      <el-table :data="rep_form.bondList" border>
                        <!-- <el-table-column label="金额" prop="bond_sum">
                          <template slot-scope="{ row }">
                            <span v-if="!row.isEdit">{{
                              str_contet(row.bond_sum)
                            }}</span>
                            <el-input
                              v-model="row.bond_sum"
                              placeholder="请输入"
                              type="number"
                              v-else
                            ></el-input>
                          </template>
                        </el-table-column> -->
                        <el-table-column label="担保人" prop="bond_name">
                          <template slot-scope="{ row }">
                            <span v-if="!row.isEdit">{{
                              str_contet(row.bond_name)
                            }}</span>
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
                            <span v-if="!row.isEdit">{{
                              str_contet(row.bond_remark)
                            }}</span>
                            <el-input
                              v-model="row.bond_remark"
                              placeholder="请输入"
                              v-else
                            ></el-input> </template
                        ></el-table-column>
                        <el-table-column label="操作" v-if="rep_status">
                          <template slot-scope="{ row }">
                            <el-button
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
                            </el-popconfirm>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-form-item>
                    <el-form-item label="抵押担保">
                      <template #label>
                        <div style="display: flex; align-items: center">
                          <div>
                            <span>抵押担保</span>
                          </div>
                          <div>
                            <i
                              class="el-icon-plus"
                              style="color: #409eff; cursor: pointer"
                              @click="pawnADD"
                              v-show="rep_status"
                            ></i>
                          </div>
                        </div>
                      </template>
                      <el-table :data="rep_form.pawnList" border>
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
                            <span v-if="!row.isEdit">{{
                              str_contet(row.pawn_name)
                            }}</span>
                            <el-input
                              v-model="row.pawn_name"
                              placeholder="请输入"
                              v-else
                            ></el-input> </template
                        ></el-table-column>
                        <el-table-column label="所有权人" prop="pawn_bond">
                          <template slot-scope="{ row }">
                            <span v-if="!row.isEdit">{{
                              str_contet(row.pawn_bond)
                            }}</span>
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
                            <span v-if="!row.isEdit">{{
                              str_contet(row.bond_sum)
                            }}</span>
                            <el-input
                              v-model="row.bond_sum"
                              placeholder="请输入"
                              type="number"
                              v-else
                            ></el-input> </template
                        ></el-table-column>
                        <el-table-column label="操作" v-if="rep_status">
                          <template slot-scope="{ row }">
                            <el-button
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
                            </el-popconfirm>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-form-item>
                  </el-form>
  </div>
</template>

<script>
export default {
    name:'otherInfo'
}
</script>

<style>

</style>