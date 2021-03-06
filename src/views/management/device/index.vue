<template>
  <div>
    <GenericListView
      ref="listView"
      visibleButtons="SRE"
      :totalRecords="totalRows"
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
        ref="table"
        height="50"
        v-el-height-adaptive-table="{table: $refs.table}"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item :label="$t('device.sn')">
                <span>{{ props.row.Sn }}</span>
              </el-form-item>
              <el-form-item :label="$t('device.name')">
                <span>{{ props.row.Name }}</span>
              </el-form-item>
              <el-form-item :label="$t('device.type')">
                <span>{{ props.row.Type |formatType}}</span>
              </el-form-item>
              <el-form-item :label="$t('device.robotPath')">
                <span>{{ props.row.RobotPath }}</span>
              </el-form-item>
              <el-form-item :label="$t('device.softVersion')">
                <span>{{ props.row.SoftVersion }}</span>
              </el-form-item>
              <el-form-item :label="$t('device.firmVersion')">
                <span>{{ props.row.FirmVersion }}</span>
              </el-form-item>
              <el-form-item :label="$t('device.lastOnlineTime')">
                <span>{{ props.row.LastOnlineTime|dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
              </el-form-item>
              <el-form-item :label="$t('device.modifyTime')">
                <span>{{ props.row.ModifyTime|dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
              </el-form-item>
              <el-form-item :label="$t('device.desc')">
                <span>{{ props.row.Desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="left" width="60" :label="$t('genericList.no')">
          <template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          width="80"
          :label="$t('device.status')"
          prop="Status"
          sortable
        >
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.Status===1">{{$t('device.running')}}</el-tag>
            <el-tag type="success" v-if="scope.row.Status===2">{{$t('device.idle')}}</el-tag>
            <el-tag type="info" v-if="scope.row.Status===3">{{$t('device.offline')}}</el-tag>
            <el-tag type="danger" v-if="scope.row.Status===5">{{$t('device.error')}}</el-tag>
            <el-tag type="danger" v-if="scope.row.Status===6">{{$t('device.locked')}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" width="80" :label="$t('device.area')" prop="Area" sortable>
          <template slot-scope="scope">{{ formatArea(scope.row.Area) }}</template>
        </el-table-column>
        <el-table-column align="left" width="300" :label="$t('device.sn')" prop="Sn" sortable>
          <template slot-scope="scope">{{scope.row.Sn}}</template>
        </el-table-column>
        <el-table-column align="left" width="200" :label="$t('device.name')" prop="Name" sortable>
          <template slot-scope="scope">{{scope.row.Name}}</template>
        </el-table-column>
        <el-table-column align="left" width="120" :label="$t('device.type')" prop="Type" sortable>
          <template slot-scope="scope">{{scope.row.Type|formatType}}</template>
        </el-table-column>
        <el-table-column
          align="left"
          width="160"
          :label="$t('device.robotPath')"
          prop="RobotPath"
          sortable
        >
          <template slot-scope="scope">{{ scope.row.RobotPath}}</template>
        </el-table-column>
        <el-table-column align="left" width="160" :label="$t('device.desc')">
          <template slot-scope="scope">{{ scope.row.Desc}}</template>
        </el-table-column>
        <el-table-column
          align="left"
          width="160"
          :label="$t('device.lastOnlineTime')"
          prop="LastOnlineTime"
          sortable
        >
          <template
            slot-scope="scope"
          >{{ scope.row.LastOnlineTime|dateformat('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
        <!-- <el-table-column align="left" width="160" :label="$t('device.softVersion')">
          <template slot-scope="scope">{{ scope.row.SoftVersion}}</template>
        </el-table-column>
        <el-table-column align="left" width="160" :label="$t('device.firmVersion')">
          <template slot-scope="scope">{{ scope.row.FirmVersion}}</template>
        </el-table-column>-->
        <el-table-column
          align="left"
          width="160"
          :label="$t('device.modifyTime')"
          prop="modifyTime"
          sortable
        >
          <template slot-scope="scope">{{ scope.row.ModifyTime|dateformat('YYYY-MM-DD HH:mm:ss') }}</template>
        </el-table-column>
        <el-table-column fixed="right" align="center" :label="$t('device.operation')" width="auto">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              circle
              @click="edit(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </GenericListView>
    <GenericEdit
      :visible="editDialogVisible"
      :title="$t('device.editTitle')"
      width="45%"
      @ok="edit_ok"
      @cancel="edit_cancel"
    >
      <el-form :model="form" ref="form" prop="form" :rules="rules">
        <el-form-item :label="$t('device.name')" prop="Name">
          <el-input
            v-model="form.Name"
            ref="name"
            name="name"
            :placeholder="$t('device.namePlaceHolder')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('device.robotPath')">
          <el-select v-model="form.RobotPath" style="width:100%">
            <el-option
              v-for="item in robotPaths"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('device.desc')" prop="Desc">
          <el-input v-model="form.Desc" :placeholder="$t('device.descPlaceHolder')"></el-input>
        </el-form-item>
      </el-form>
    </GenericEdit>
  </div>
</template>
<script>
import GenericListView from "@/components/GenericListView";
import GenericEdit from "@/components/GenericEdit";
import * as api from "@/api/device.js";
import { generateTitle } from "@/utils/i18n";
// import { exportTableToFile } from "@/utils/exportUtil";
import { downloadFile } from "@/api/file-downloader";
export default {
  components: { GenericListView, GenericEdit },
  data() {
    return {
      form: {
        Id: "",
        Sn: "",
        Name: "",
        Module: "",
        Desc: "",
        Type: "",
        LastOnlineTime: null,
        ModifyTime: null,
        RobotPath: null,
        SoftVersion: null,
        FirmVersion: null,
        Status: 0
      },
      list: null,
      listLoading: false,
      totalRows: 0,
      editDialogVisible: false,
      currentRow: null,
      editMode: false,
      robotPaths: null,
      rules: {
        Name: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("device.nameIsRequired")
          },
          {
            min: 0,
            max: 50,
            message: this.$t("device.nameLength")
          }
        ],
        Desc: [
          {
            min: 0,
            max: 1000,
            message: this.$t("device.remarkLength")
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

    edit(row) {
      this.currentRow = row;
      if (this.currentRow) {
        this.robotPaths = api.getRobotPaths(this.formatArea(row.Area));
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
    formatArea(area) {
      if (area === 1) return "A";
      else return "B";
    },
    generateTitle
  },
  filters: {
    formatType: function(type) {
      let name = "";
      let items = api.getDeviceTypes().filter(x => x.id == type);
      if (items && items.length > 0) {
        name = items[0].name;
      }
      return name;
    }
  }
};
</script>

<style>
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
