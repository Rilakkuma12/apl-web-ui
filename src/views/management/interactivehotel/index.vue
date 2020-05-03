<template>
 <div>
    <GenericList
      visibleButtons="SRE"
      :totalRecords="totalRows"
      @export-file="exportToFile"
      @search="search"
      @delete="del"
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
        ref="table"
        :height="tableHeight"
      >
        <el-table-column align="left" width="60"  :label="$t('hotelpcrlist.no')">
          <template slot-scope="scope">{{ scope.row.Id }}</template>
        </el-table-column>

        <el-table-column align="center" :label="$t('hotelpcrlist.area')" prop="area" sortable>
          <template slot-scope="scope">{{ scope.row.Area }}</template>
        </el-table-column>

        <el-table-column align="left" :label="$t('hotelpcrlist.rack')" prop="rack" sortable>
        <template slot-scope="scope">{{scope.row.Rack}}</template>
        </el-table-column>

        <el-table-column align="left" :label="$t('hotelpcrlist.level')" prop="level" sortable>
          <template slot-scope="scope">{{scope.row.Level}}</template>
        </el-table-column>

        <el-table-column align="left" :label="$t('hotelpcrlist.barCode')" prop="barCode" sortable>
          <template slot-scope="scope">{{scope.row.BarCode}}</template>
        </el-table-column>

         <el-table-column  align="left" :label="$t('hotelpcrlist.userCount')" prop="userCount" sortable>
          <template slot-scope="scope">{{scope.row.UserCount}}</template>
        </el-table-column>
        
        <el-table-column align="left" :label="$t('hotelpcrlist.updateTime')" prop="updateTime" sortable>
          <template slot-scope="scope">{{ scope.row.Createtime|dateformat('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
      </el-table>
    </GenericList>
  </div>
</template>
<script>
import GenericList from "@/components/GenericList";
import GenericEdit from "@/components/GenericEdit";
import * as api from "@/api/interactivehotel.js";
import { generateTitle } from "@/utils/i18n";
import { downloadFile } from "@/api/file-downloader";
export default {
  components: { GenericList, GenericEdit },
  data() {
    return {
      form: {
        Id: "",
        Area: "",
        Rack: "",
        Level: "",
        BarCode:"",
        UserCount:"",
        UpdateTime:""
      },
      list: null,
      listLoading: false,
      totalRows: 0,
      pageSize: 50,
      pageIndex: 1,
      editDialogVisible: false,
      currentRow: null,
      editMode: false,
      tableHeight: 50
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 50;
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 50;
      };
    });
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度 //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
  },
  created() {
    this.$nextTick(() => {
      this.getData({ pageSize: this.pageSize, pageIndex: this.pageIndex });
    });
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
    del() {
      if (this.currentRow) {
        this.$confirm(this.$t("genericList.deleteConfirm")).then(() =>
          api.del(this.currentRow.Id).then(resp => {
            if (resp.Code === 200) {
              this.getData();
            }
          })
        );
      }
    },
    exportToFile(type, keyword) {
      var params = {};
      if (type === "page") {
        params = {
          pageSize: this.pageSize,
          pageIndex: this.pageIndex,
          keyword: keyword
        };
      } else {
        params = {
          pagination: false
        };
      }
      api
        .exportXls(params)
        .then(resp => {
          downloadFile(resp.Data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    generateTitle
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
