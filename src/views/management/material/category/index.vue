<!--物料类型-->
<template>
  <div>
    <GenericListView
      ref="listView"
      visibleButtons="NMSRDE"
      :totalRecords="totalRows"
      @add="add"
      @edit="edit"
      @delete="del"
      @export-file="exportToFile"
      @refresh="getData"
    >
      <el-table
        v-loading="listLoading"
        :data="list"
        @row-dblclick="edit"
        @current-change="handleCurrentChange"
        element-loading-text="Loading"
        border
        fit
        stripe
        highlight-current-row
        id="table-main"
        ref="table"
        height="50"
        v-el-height-adaptive-table="{table: $refs.table}"
      >
        <el-table-column align="center" :label="$t('genericList.no')">
          <template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column align="center" :label="$t('material.category.code')">
          <template slot-scope="scope">{{ scope.row.Code }}</template>
        </el-table-column>
        <el-table-column align="center" :label="$t('material.category.name')">
          <template slot-scope="scope">{{ scope.row.Name }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('material.category.requireContainer')"
          width="100px"
        >
          <!-- <template slot-scope="scope">{{scope.row.RequireContainer|formatBoolean}}</template> -->
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.RequireContainer" onclick="return false"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('material.category.manualPartNumber')"
          width="100px"
        >
          <!-- <template slot-scope="scope">{{scope.row.ManualPartNumber|formatBoolean}}</template> -->
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.ManualPartNumber" onclick="return false"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('material.category.requireRack')" width="100px">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.RequireRack" onclick="return false"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('material.category.desc')">
          <template slot-scope="scope">{{ scope.row.Desc }}</template>
        </el-table-column>
        <el-table-column align="center" :label="$t('material.category.modifyTime')">
          <template slot-scope="scope">{{ scope.row.ModifyTime|dateformat('YYYY-MM-DD HH:mm:ss') }}</template>
        </el-table-column>
      </el-table>
    </GenericListView>
    <GenericEdit
      :visible="editDialogVisible"
      :title="$t('material.category.editTitle')"
      width="45%"
      @ok="edit_ok"
      @cancel="edit_cancel"
    >
      <el-form :model="form" ref="form" :rules="rules" label-position="right" label-width="80px">
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('material.category.name')" prop="Name">
              <el-input v-model="form.Name" ref="name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('material.category.code')" prop="Code">
              <el-input v-model="form.Code" ref="code" :disabled="this.editMode===true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item :label="$t('material.category.code')" prop="Code">
              <el-input
                v-model="form.Code"
                ref="code"
                :disabled="this.editMode===true"
                :placeholder="$t('material.category.codePlaceHolder')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('material.category.name')" prop="Name">
              <el-input
                v-model="form.Name"
                ref="name"
                :placeholder="$t('material.category.namePlaceHolder')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="RequireContainer">
              <el-checkbox
                :label="$t('material.category.requireContainer')"
                v-model="form.RequireContainer"
              ></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="ManualPartNumber">
              <el-checkbox
                :label="$t('material.category.manualPartNumber')"
                v-model="form.ManualPartNumber"
              ></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="RequireRack">
              <el-checkbox :label="$t('material.category.requireRack')" v-model="form.RequireRack"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item :label="$t('material.category.desc')" prop="Desc">
              <el-input
                v-model="form.Desc"
                ref="desc"
                :placeholder="$t('material.category.descPlaceHolder')"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>{{$t('material.category.config.title')}}</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="addConfig"
          >{{$t('material.category.config.add')}}</el-button>
        </div>
        <el-form ref="configForm" :rules="config.rules" :model="form">
          <el-table
            :data="form.Configs"
            element-loading-text="Loading"
            border
            fit
            :height="320"
            highlight-current-row
            id="table-main"
            size="small"
            ref="table"
          >
            <el-table-column align="center" :label="$t('genericList.no')" type="index" width="50px"></el-table-column>
            <el-table-column align="center" :label="$t('material.category.config.key')">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'Configs.'+scope.$index+'.ConfigKey'"
                  :rules="config.rules.configKey"
                  size="small"
                >
                  <el-input size="small" v-model="scope.row.ConfigKey"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('material.category.config.desc')">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'Configs.'+scope.$index+'.ConfigKeyDesc'"
                  :rules="config.rules.configDesc"
                  size="small"
                >
                  <el-input size="small" v-model="scope.row.ConfigKeyDesc"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('material.category.config.type')">
              <template slot-scope="scope">
                <el-form-item :prop="'type'" size="small">
                  <el-select
                    size="small"
                    v-model="scope.row.ConfigValueType"
                    value-key="code"
                    :disabled="form.HasChildren&&scope.row.Id"
                  >
                    <el-option
                      v-for="item in valueTypes"
                      :key="item.Code"
                      :label="item.Name"
                      :value="item.Code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" :label="$t('material.category.config.defaultValue')">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'Configs.'+scope.$index+'.ConfigDefaultValue'"
                  :rules="config.rules.notEmpty"
                >
                  <el-input size="small" v-model="scope.row.ConfigDefaultValue"></el-input>
                </el-form-item>
              </template>
            </el-table-column>-->
            <!-- <el-table-column align="center" :label="$t('material.category.config.required')">
              <template slot-scope="scope">
                <el-checkbox size="small" v-model="scope.row.required"></el-checkbox>
              </template>
            </el-table-column>-->
            <el-table-column align="center" :label="$t('material.category.desc')">
              <template slot-scope="scope">
                <el-form-item
                  size="small"
                  :prop="'Configs.'+scope.$index+'.Remark'"
                  :rules="config.rules.configRemark"
                >
                  <el-input size="small" v-model="scope.row.Remark"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('material.category.config.operation')">
              <template slot-scope="scope">
                <!-- <el-button type="primary" icon="el-icon-edit" size="small" circle></el-button> -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                  circle
                  @click="delConfig(scope.$index)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-card>
    </GenericEdit>
  </div>
</template>

<script>
import GenericListView from "@/components/GenericListView";
import GenericEdit from "@/components/GenericEdit";
import * as api from "@/api/materialCategory.js";
import { generateTitle } from "@/utils/i18n";
import { findLookup } from "@/api/lookup.js";
// import { exportTableToFile } from "@/utils/exportUtil";
import { downloadFile } from "@/api/file-downloader";
export default {
  components: { GenericListView, GenericEdit },
  data() {
    return {
      form: {
        Id: "",
        Name: "",
        Code: "",
        Desc: "",
        RequireContainer: false,
        ManualPartNumber: false,
        RequireRack: false,
        Configs: [],
        HasChildren: false
      },
      list: null,
      totalRows: 0,
      valueTypes: [],
      listLoading: true,
      editDialogVisible: false,
      currentRow: null,
      editMode: false,
      rules: {
        Name: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("material.category.nameIsRequired")
          },
          {
            min: 1,
            max: 50,
            trigger: "blur",
            message: this.$t("material.category.nameLength")
          }
        ],
        Code: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("material.category.codeIsRequired")
          },
          {
            min: 1,
            max: 50,
            trigger: "blur",
            message: this.$t("material.category.codeLength")
          }
        ],
        Desc: [
          {
            min: 0,
            max: 1000,
            trigger: "blur",
            message: this.$t("material.category.descLength")
          }
        ]
      },
      config: {
        rules: {
          // notEmpty: [
          //   {
          //     required: true,
          //     message: this.$t("genericEdit.fieldRequired"),
          //     trigger: "blur"
          //   },

          // ]
          configKey: [
            {
              required: true,
              message: this.$t("genericEdit.fieldRequired"),
              trigger: "blur"
            },
            {
              min: 0,
              max: 50,
              trigger: "blur",
              message: this.$t("material.category.config.keyLength")
            }
          ],
          configDesc: [
            {
              required: true,
              message: this.$t("genericEdit.fieldRequired"),
              trigger: "blur"
            },
            {
              min: 0,
              max: 50,
              trigger: "blur",
              message: this.$t("material.category.config.descLength")
            }
          ],
          configRemark: [
            {
              min: 0,
              max: 1000,
              trigger: "blur",
              message: this.$t("material.category.config.remarkLength")
            }
          ]
        }
      }
    };
  },

  created() {
    this.$nextTick(() => {
      this.findLookup("config_value_type").then(resp => {
        this.valueTypes = resp.Data;
        if (this.valueTypes && this.valueTypes.length > 0) {
          this.configValueType = this.valueTypes[0];
        }
      });
      this.$refs.listView.handleRefresh();
    });
  },

  methods: {
    handleCurrentChange(current, old) {
      this.currentRow = current;
    },

    addConfig() {
      if (!this.form.Configs) {
        this.form.Configs = [];
      }
      this.form.Configs.push({
        ConfigKey: "",
        ConfigKeyDesc: "",
        ConfigValueType: "20",
        Required: true
      });
      this.$nextTick(() => {
        this.$refs.table.bodyWrapper.scrollTop = this.$refs.table.bodyWrapper.scrollHeight;
      });
    },
    delConfig(index) {
      this.$confirm(this.$t("material.category.deleteConfigConfirm")).then(
        () => {
          this.form.Configs.splice(index, 1);
        }
      );
    },
    getData(params) {
      this.listLoading = true;
      api
        .search(params)
        .then(resp => {
          this.list = resp.Data.Items;
          this.totalRows = resp.Data.TotalRows;
          this.listLoading = false;
        })
        .catch(err => (this.listLoading = false));
    },
    add() {
      this.editMode = false;
      this.editDialogVisible = true;
      this.form.Configs = [];
      for (let k in this.form) {
        this.form[k] = null;
      }
      this.$nextTick(function() {
        this.$refs.form.clearValidate();
        this.$refs.configForm.clearValidate();
        this.$refs.code.focus();
      });
    },
    edit() {
      if (this.currentRow) {
        this.editMode = true;
        this.editDialogVisible = true;
        for (let k in this.form) {
          this.form[k] = this.currentRow[k];
        }
        this.$nextTick(function() {
          this.$refs.form.clearValidate();
          this.$refs.configForm.clearValidate();
          api.detail(this.currentRow.Id).then(resp => {
            this.currentRow = resp.Data;
          });
        });
      }
    },
    del() {
      if (this.currentRow) {
        this.$confirm(this.$t("genericList.deleteConfirm")).then(() =>
          api.del(this.currentRow.Id).then(resp => {
            if (resp.Code === 200) {
              this.$refs.listView.handleRefresh();
            }
          })
        );
      }
    },
    exportToFile(params) {
      api
        .exportXls(params)
        .then(resp => {
          downloadFile(resp.Data);
        })
        .catch(err => {
          console.log(err);
        });
    },

    edit_cancel() {
      this.$refs.form.clearValidate();
      this.editDialogVisible = false;
    },
    edit_ok() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        this.$refs.configForm.validate(v => {
          if (!v) {
            console.log("error submit!!");
            return false;
          }
          if (this.editMode) {
            api.update(this.form).then(resp => {
              if (resp.Code === 200) {
                this.editDialogVisible = false;
                this.$refs.listView.handleRefresh();
              }
            });
          } else {
            api.create(this.form).then(resp => {
              if (resp.Code === 200) {
                this.editDialogVisible = false;
                this.$refs.listView.handleRefresh();
              }
            });
          }
        });
      });
    },
    generateTitle,
    findLookup
  }
};
</script>

<style scoped>
.tb-edit .el-input {
  display: none;
}
.tb-edit .current-row .el-input {
  display: block;
}
.tb-edit .current-row .el-input + span {
  display: none;
}
</style>
