<template>
  <div>
    <GenericList
      visibleButtons="SRE"
      :totalRecords="totalRows"
      @export-file="exportToFile"
      @search="search"
      @refresh="getData"
      @pagesize-change="handlePageSizeChange"
      @pageindex-change="handlePageIndexChange"
    >
      <el-table
        v-loading="listLoading" :data="list"
        element-loading-text="Loading"
        fit
        stripe
        highlight-current-row
        id="table-main"
        ref="table"
        height="50"
        v-el-height-adaptive-table="{table: $refs.table}">
        <el-table-column align="left" width="100" :label="$t('genericList.no')">
          <template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column align="center" width="250" :label="$t('Kafka.SendTopic')" prop="SendTopic">
            <template slot-scope="scope">{{ scope.row.SendTopic }}</template>
        </el-table-column>
        <el-table-column align="left" width="900" :label="$t('Kafka.SendContent')" prop="SendContent">
          <template slot-scope="scope">{{ scope.row.SendContent }}</template>
        </el-table-column>
        <el-table-column align="left" width="250" :label="$t('Kafka.Description')" prop="Description">
          <template slot-scope="scope">{{ scope.row.Description }}</template>
        </el-table-column>
        <el-table-column align="left" width="200" :label="$t('Kafka.CreateDate')" prop="CreateDate" sortable>
          <template slot-scope="scope">{{ scope.row.CreateDate|dateformat('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
        <!-- <el-table-column align="left" width="150" :label="$t('Kafka.Operation')">
        <template slot-scope="scope">
            <router-link :to="{path:'/details/index',query:{id:scope.row.Id},}">{{$t('Kafka.Details')}}</router-link>
        </template>
        </el-table-column> -->
      </el-table>
    </GenericList>
  </div>
</template>
<script>
import GenericList from "@/components/GenericList";
import * as api from "@/api/aplKafka.js";
import { generateTitle } from "@/utils/i18n";
import { downloadFile } from "@/api/file-downloader";
export default {
  components: { GenericList},
  data() {
    return {
      list: null,
      listLoading: false,
      totalRows: 0,
      pageSize: 50,
      pageIndex: 1,
      currentRow: null,
      editMode: false,
      rules: {
        filters:{
          formatDate(time){
            if(time)
            {
               let date = new Date(time)
               return formatDate(date, 'YYYY-MM-DD HH:mm:ss');
            }else
            {
              return '';
            }
          }
        }
      }
    };
  },
  created() {
    this.$nextTick(() => {
      this.getData({ pageSize: this.pageSize, pageIndex: this.pageIndex });
    });
  },
  methods: {
    handleSelectionChange(row) {
      api.detail(row.Id).then(resp => {
        this.currentRow = resp.Data;
      });
    },
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
        .searchReceive(arg)
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
    exportToFile(type, keyword) {
      //后台导出
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
  },
  filters: {
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
