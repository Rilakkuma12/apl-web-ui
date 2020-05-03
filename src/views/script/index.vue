<template>
  <div>
    <GenericListView
      ref="listView"
      visibleButtons="NSR"
      :totalRecords="totalRows"
      @add="add"
      @export-file="exportToFile"
      @search="getData"
      @refresh="getData"
      @pagesize-change="getData"
      @pageindex-change="getData"
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
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item :label="$t('script.name')">
                <span>{{ props.row.Name }}</span>
              </el-form-item>
              <el-form-item :label="$t('script.deviceType')">
                <span>{{ props.row.DeviceType|formatType }}</span>
              </el-form-item>
              <el-form-item :label="$t('script.fileName')">
                <span>{{ props.row.Attachment.OrginalFileName}}</span>
              </el-form-item>
              <el-form-item :label="$t('script.size')">
                <span>{{ props.row.Attachment.Size}}</span>
              </el-form-item>
              <el-form-item :label="$t('script.md5')">
                <span>{{ props.row.Attachment.MD5}}</span>
              </el-form-item>
              <el-form-item :label="$t('script.downloadTimes')">
                <span>{{ props.row.Attachment.DownloadTimes}}</span>
              </el-form-item>
              <el-form-item :label="$t('script.createUserName')">
                <span>{{ props.row.CreateUserName }}</span>
              </el-form-item>
              <el-form-item :label="$t('script.createTime')">
                <span>{{ props.row.CreateTime|dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
              </el-form-item>
              <el-form-item :label="$t('script.modifyUserName')">
                <span>{{ props.row.ModifyUserName }}</span>
              </el-form-item>
              <el-form-item :label="$t('script.modifyTime')">
                <span>{{ props.row.ModifyTime|dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
              </el-form-item>
              <el-form-item :label="$t('script.desc')">
                <span>{{ props.row.Desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="left" width="60" :label="$t('genericList.no')">
          <template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column
          align="left"
          width="200"
          :label="$t('script.deviceType')"
          prop="Type"
          sortable
        >
          <template slot-scope="scope">{{scope.row.DeviceType|formatType}}</template>
        </el-table-column>
        <el-table-column align="left" width="200" :label="$t('script.name')" prop="Name" sortable>
          <template slot-scope="scope">{{scope.row.Name}}</template>
        </el-table-column>
        <el-table-column
          align="left"
          width="200"
          :label="$t('script.fileName')"
          prop="OrginalFileName"
          sortable
        >
          <template slot-scope="scope">{{scope.row.Attachment.OrginalFileName}}</template>
        </el-table-column>
        <el-table-column align="left" width="200" :label="$t('script.size')" prop="Size" sortable>
          <template slot-scope="scope">{{scope.row.Attachment.Size}}</template>
        </el-table-column>
        <el-table-column align="left" width="200" :label="$t('script.md5')" prop="MD5">
          <template slot-scope="scope">{{scope.row.Attachment.MD5}}</template>
        </el-table-column>
        <el-table-column align="left" width="160" :label="$t('script.desc')">
          <template slot-scope="scope">{{ scope.row.Description}}</template>
        </el-table-column>
        <el-table-column
          align="left"
          width="160"
          :label="$t('script.createTime')"
          prop="CreateTime"
          sortable
        >
          <template slot-scope="scope">{{ scope.row.CreateTime|dateformat('YYYY-MM-DD HH:mm:ss') }}</template>
        </el-table-column>
        <el-table-column fixed="right" align="center" :label="$t('script.operation')" width="auto">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              circle
              @click="edit(scope.row)"
            ></el-button>
            <!-- <a :href="'/api/attachment/'+scope.row.Attachment.Id"> -->
            <el-button
              type="success"
              size="small"
              icon="el-icon-download"
              circle
              @click="downloadAttachment(scope.row.Attachment.FileGuid)"
            ></el-button>
            <!-- </a> -->
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              circle
              @click="del(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </GenericListView>
    <GenericEdit
      :visible="editDialogVisible"
      :title="$t('script.editTitle')"
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
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('script.name')" prop="Name">
              <el-input
                v-model="form.Name"
                ref="name"
                name="name"
                :placeholder="$t('script.namePlaceHolder')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :label="$t('script.deviceType')"
              prop="DeviceType"
              :rules="rules.DeviceType"
            >
              <el-select v-model="form.DeviceType" style="width:100%">
                <el-option
                  v-for="item in deviceTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item :label="$t('script.desc')" prop="Desc">
          <el-input v-model="form.Description" :placeholder="$t('script.descPlaceHolder')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('script.scriptFile')" v-if="!editMode" prop="Attachment">
          <el-upload
            drag
            action="/api/attachment/upload/script"
            :headers="headers"
            :on-success="handleUploadSuccess"
            :on-remove="handleUploadRemove"
            :on-exceed="handleUploadExceed"
            class="upload"
            accept=".py, .json"
            :limit="1"
            ref="uploader"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              {{$t('script.dragFileHere')}}
              <em>{{$t('script.clickToUpload')}}</em>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </GenericEdit>
  </div>
</template>
<script>
import { Message } from "element-ui";
import GenericListView from "@/components/GenericListView";
import GenericEdit from "@/components/GenericEdit";
import * as api from "@/api/script.js";
import { getDeviceTypes } from "@/api/device.js";
import { generateTitle } from "@/utils/i18n";
import { exportTableToFile } from "@/utils/exportUtil";
import { getToken } from "@/utils/auth";
import { downloadAttachment, downloadFile } from "@/api/file-downloader";
export default {
  components: { GenericListView, GenericEdit },
  data() {
    return {
      form: {
        Id: "",
        Name: "",
        Description: "",
        DeviceType: "",
        ModifyTime: null,
        Status: 0,
        Attachment: null
      },
      list: null,
      listLoading: false,
      totalRows: 0,
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
      this.$refs.listView.handleRefresh();
    });
  },
  methods: {
    handleUploadSuccess(response, file, fileList) {
      fileList = [];
      fileList.push(file);
      this.form.Attachment = { Id: response.Data };
      if (!this.form.Name) {
        this.form.Name = file.name;
      }
    },
    handleUploadRemove(file, fileList) {
      this.form.Attachment = null;
    },
    handleUploadExceed(file, fileList) {
      Message({
        message: this.$t("script.onlyOnFileAllowed"),
        type: "error",
        duration: 5 * 1000
      });
    },
    handleSelectionChange(row) {
      api.detail(row.Id).then(resp => {
        this.currentRow = resp.Data;
      });
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
        this.$refs.name.focus();
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
              this.$refs.listView.handleRefresh();
            }
          })
        );
      }
    },

    edit_cancel() {
      this.$refs.form.clearValidate();
      this.editDialogVisible = false;
      debugger;
      this.$refs.uploader.clearFiles();
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
    downloadAttachment,
    downloadFile
  },
  filters: {
    formatType: function(type) {
      let name = "";
      let items = getDeviceTypes().filter(x => x.id == type);
      if (items && items.length > 0) {
        name = items[0].name;
      }
      return name;
    }
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
