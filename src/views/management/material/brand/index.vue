<!--物料品牌-->
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
      @search="getData"
      @refresh="getData"
      @pagesize-change="getData"
      @pageindex-change="getData"
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
        <el-table-column align="center" :label="$t('material.brand.code')">
          <template slot-scope="scope">{{ scope.row.Code }}</template>
        </el-table-column>
        <el-table-column align="center" :label="$t('material.brand.name')">
          <template slot-scope="scope">{{ scope.row.Name }}</template>
        </el-table-column>
        <el-table-column align="center" :label="$t('material.brand.desc')">
          <template slot-scope="scope">{{ scope.row.Desc }}</template>
        </el-table-column>
        <el-table-column align="center" :label="$t('material.brand.modifyTime')">
          <template slot-scope="scope">{{ scope.row.ModifyTime|dateformat('YYYY-MM-DD HH:mm:ss') }}</template>
        </el-table-column>
      </el-table>
    </GenericListView>
    <GenericEdit
      :visible="editDialogVisible"
      :title="$t('material.brand.editTitle')"
      width="45%"
      @ok="edit_ok"
      @cancel="edit_cancel"
    >
      <el-form :model="form" ref="form" :rules="rules" prop="form">
        <el-form-item :label="$t('material.brand.code')" prop="Code">
          <el-input
            v-model="form.Code"
            ref="code"
            name="code"
            :disabled="this.editMode===true"
            :placeholder="$t('material.brand.codePlaceHolder')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('material.brand.name')" prop="Name">
          <el-input
            v-model="form.Name"
            ref="name"
            name="name"
            :placeholder="$t('material.brand.namePlaceHolder')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('material.brand.desc')" prop="Desc">
          <el-input
            v-model="form.Desc"
            ref="desc"
            name="desc"
            :placeholder="$t('material.brand.descPlaceHolder')"
          ></el-input>
        </el-form-item>
      </el-form>
    </GenericEdit>
  </div>
</template>

<script>
import GenericListView from "@/components/GenericListView";
import GenericEdit from "@/components/GenericEdit";
import * as api from "@/api/materialBrand.js";
import { generateTitle } from "@/utils/i18n";
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
        Desc: ""
      },
      list: null,
      totalRows: 0,
      listLoading: true,
      editDialogVisible: false,
      currentRow: null,
      editMode: false,
      rules: {
        Name: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("material.brand.nameIsRequired")
          },
          {
            min: 1,
            max: 50,
            trigger: "blur",
            message: this.$t("material.brand.nameLength")
          }
        ],
        Code: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("material.brand.codeIsRequired")
          },
          {
            pattern: /^[A-Z0-9]{2,2}$/,
            message: this.$t("material.brand.codeRule")
          }
        ],
        Desc: [
          {
            min: 0,
            max: 1000,
            trigger: "blur",
            message: this.$t("material.brand.descLength")
          }
        ]
      }
    };
  },

  created() {
    this.$nextTick(() => {
      this.$refs.listView.handleRefresh();
    });
  },
  methods: {
    handleCurrentChange(current, old) {
      this.currentRow = current;
    },
    getData(params) {
      this.listLoading = true;
      api
        .search(params)
        .then(resp => {
          this.totalRows = resp.Data.TotalRows;
          this.list = resp.Data.Items;
          this.listLoading = false;
        })
        .catch(err => (this.listLoading = false));
    },
    add() {
      this.editMode = false;
      this.editDialogVisible = true;
      for (let k in this.form) {
        this.form[k] = "";
      }
      this.$nextTick(function() {
        this.$refs.form.clearValidate();
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
        if (valid) {
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    generateTitle,
    downloadFile
  }
};
</script>

