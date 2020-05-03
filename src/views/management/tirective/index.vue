<template>
  <div>
    <GenericList
      visibleButtons="NSR"
      :totalRecords="totalRows"
      @add="add"
      @export-file="exportToFile"
      @search="search"
      @refresh="getData"
      @pagesize-change="handlePageSizeChange"
      @pageindex-change="handlePageIndexChange"
    >
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        fit
        stripe
        highlight-current-row
        id="table-main"
        height="50"
        v-el-height-adaptive-table="{table: $refs.table}"
      >
        <el-table-column align="left" :label="$t('genericList.no')">
          <template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column align="left" :label="$t('tirective.wayName')" prop="WayName">
          <template slot-scope="scope">{{scope.row.WayName}}</template>
        </el-table-column>
        <el-table-column align="left" :label="$t('tirective.standardTime')" prop="StandardTime">
          <template slot-scope="scope">{{scope.row.StandardTime}}</template>
        </el-table-column>
        <el-table-column align="left" :label="$t('tirective.abnormalTime')" prop="AbnormalTime">
          <template slot-scope="scope">{{scope.row.AbnormalTime}}</template>
        </el-table-column>
        <el-table-column align="left" :label="$t('tirective.createTime')" prop="CreateTime" sortable>
          <template slot-scope="scope">{{ scope.row.CreateTime|dateformat('YYYY-MM-DD HH:mm:ss') }}</template>
        </el-table-column>
        <el-table-column fixed="right" align="center" :label="$t('tirective.operation')" width="auto">
          <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" circle @click="edit(scope.row)"></el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" circle @click="del(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </GenericList>
    <GenericEdit
      :visible="editDialogVisible"
      :title="$t('tirective.editTitle')"
      width="40%"
      @ok="edit_ok"
      @cancel="edit_cancel"
    >
      <el-form
        :model="form"
        ref="form"
        prop="form"
        :rules="rules"
        size="small"
        label-width="100px"
        label-position="right"
      >
       <el-form-item :label="$t('tirective.Id')" prop="Id" v-if="false">
        <el-input v-model="form.Id" ref="Id" name="Id" :placeholder="$t('tirective.Id')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('tirective.wayName')" prop="WayName">
        <el-input v-model="form.WayName" ref="WayName" name="WayName" :placeholder="$t('tirective.wayName')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('tirective.standardTime')" prop="StandardTime">
              <el-input v-model="form.StandardTime" ref="StandardTime" name="StandardTime":placeholder="$t('tirective.standardTime')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('tirective.abnormalTime')" prop="AbnormalTime">
          <el-input v-model="form.AbnormalTime" :placeholder="$t('tirective.abnormalTime')"></el-input>
        </el-form-item>
      </el-form>
    </GenericEdit>
  </div>
</template>
<script>
import { Message } from "element-ui";
import GenericList from "@/components/GenericList";
import GenericEdit from "@/components/GenericEdit";
import * as api from "@/api/tirective.js";
import { getDeviceTypes } from "@/api/device.js";
import { generateTitle } from "@/utils/i18n";
import { exportTableToFile } from "@/utils/exportUtil";
import { getToken } from "@/utils/auth";
import { downloadAttachment, downloadFile } from "@/api/file-downloader";
export default {
  components: { GenericList, GenericEdit },
  data() {
    return {
      form: {
        Id:"",
        WayName: "",
        StandardTime: "",
        AbnormalTime: "",
      },
      list: null,
      listLoading: false,
      totalRows: 0,
      pageSize: 50,
      pageIndex: 1,
      editDialogVisible: false,
      currentRow: null,
      editMode: false,
      rules: {
        Name: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("script.nameIsRequired")
          },
          {
            min: 0,
            max: 50,
            message: this.$t("script.nameLength")
          }
        ],
        DeviceType: [
          {
            required: true,
            trigger: "change",
            message: this.$t("script.deviceTypeIsRequired")
          }
        ],
        Attachment: [
          {
            required: false,
            trigger: "change",
            message: this.$t("script.scriptFileIsRequired")
          }
        ],
        Desc: [
          {
            min: 0,
            max: 1000,
            message: this.$t("script.descLength")
          }
        ]
      }
    };
  },
  computed: {
    headers() {
      return {
        token: getToken()
      };
    },
    deviceTypes() {
      return getDeviceTypes();
    }
  },
  created() {
    this.$nextTick(() => {
      this.getData({ pageSize: this.pageSize, pageIndex: this.pageIndex });
    });
  },
  watch: {
    totalRows: {
      handler: function(val) {
        let pageCount =
          val <= this.pageSize
            ? 1
            : val % this.pageSize === 0
            ? val / this.pageSize
            : Math.floor(val / this.pageSize) + 1;
        if (this.pageIndex > pageCount) {
          this.pageIndex = pageCount;
        }
      },
      deep: true
    }
  },
  methods: {
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.$nextTick(() => {
        this.getData({ pageSize: pageSize, pageIndex: this.pageIndex });
      });
    },
    handlePageIndexChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.$nextTick(() => {
        this.getData({ pageSize: this.pageSize, pageIndex: pageIndex });
      });
    },
    getData(params) {
      this.listLoading = true;
      const arg = params || {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      };
      api
        .search(arg)
        .then(resp => {
          this.totalRows = resp.Data.TotalRows;
          this.list = resp.Data.Items;
          this.listLoading = false;
        })
        .catch(err => (this.listLoading = false));
    },
    search(keyword) {
      this.getData({
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        keyword: keyword
      });
    },

    exportToFile(bookType) {
      var fileName = this.$route.meta.title + "." + bookType;
      exportTableToFile(
        fileName,
        document.querySelector("#table-main"),
        bookType
      );
    },
    add() {
      this.editMode = false;
      this.editDialogVisible = true;
      for (let k in this.form) {
        this.form[k] = "";
      }
      this.$nextTick(function() {
        this.$refs.form.clearValidate();
      });
    },
    edit(row) {
      this.currentRow = row;
      if (this.currentRow) {
        this.editMode = true;
        this.editDialogVisible = true;
        this.editMode = true;
        for (let k in this.form) {
          this.form[k] = this.currentRow[k];
        }
        this.$nextTick(function() {
          this.$refs.form.clearValidate();
        });
      }
    },

    del(data) {
      if (data) {
        this.$confirm(this.$t("genericList.deleteConfirm")).then(() =>
          api.del(data.Id).then(resp => {
            if (resp.Code === 200) {
              this.getData();
            }
          })
        );
      }
    },

    edit_cancel() {
      this.$refs.form.clearValidate();
      this.editDialogVisible = false;
      debugger;
    },
    edit_ok() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.editMode) {
            api.update(this.form).then(resp => {
              if (resp.Code === 200) {
                this.editDialogVisible = false;
                this.getData();
              }
            });
          } else {
            api.create(this.form).then(resp => {
              if (resp.Code === 200) {
                this.editDialogVisible = false;
                this.getData();
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
    downloadAttachment,
    downloadFile
  }
};
</script>

<style>
.upload .el-upload-dragger {
  width: 100%;
}
.upload .el-upload {
  display: block;
}
.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 100px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
