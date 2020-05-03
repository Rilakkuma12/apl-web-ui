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
        v-el-height-adaptive-table="{table: $refs.table}"
      >
        <el-table-column align="left" width="50" :label="$t('genericList.no')">
          <template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column align="center" width="120" :label="$t('taskinfo.TaskState')" prop="TaskStatus">
        <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.TaskStatus==0">{{$t('taskinfo.noStart')}}</el-tag>
            <el-tag type="success" v-if="scope.row.TaskStatus==1">{{$t('taskinfo.run')}}</el-tag>
            <el-tag type="success" v-if="scope.row.TaskStatus==2">{{$t('taskinfo.successEnd')}}</el-tag>
            <el-tag type="danger" v-if="scope.row.TaskStatus==3">{{$t('taskinfo.failEnd')}}</el-tag>
            <el-tag type="danger" v-if="scope.row.TaskStatus==4">{{$t('taskinfo.refuse')}}</el-tag>
        </template>
        </el-table-column>
        <el-table-column align="left"  :label="$t('taskinfo.taskId')" prop="TaskId">
          <template slot-scope="scope">{{ scope.row.TaskId }}</template>
        </el-table-column>
        <el-table-column align="left" :label="$t('taskinfo.commandId')" prop="CommandId"  v-if="false">
          <template slot-scope="scope">{{ scope.row.CommandId }}</template>
        </el-table-column>
         <el-table-column align="center" :label="$t('taskinfo.command')" prop="Command">
          <template slot-scope="scope">{{scope.row.Command}}</template>
        </el-table-column>
        <el-table-column align="center" :label="$t('taskinfo.conditioner')" prop="Conditioner">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.Conditioner">{{$t('taskinfo.yesconditioner')}}</el-tag>
            <el-tag type="info" v-if="!scope.row.Conditioner">{{$t('taskinfo.noconditioner')}}</el-tag>
         </template>

        </el-table-column>
        <el-table-column align="center" :label="$t('taskinfo.moduleId')" prop="Command">
          <template slot-scope="scope">{{ scope.row.Module}}</template>
        </el-table-column>
        <el-table-column align="left" :label="$t('taskinfo.deviceName')" prop="DeviceName">
          <template slot-scope="scope">{{scope.row.DeviceName}}</template>
        </el-table-column>
        <el-table-column align="left" :label="$t('taskinfo.beginTime')" prop="BeginDate" sortable>
          <template slot-scope="scope">{{ scope.row.BeginDate|dateformat('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>
        <el-table-column align="left" :label="$t('taskinfo.endTime')" prop="EndDate" sortable>
          <template slot-scope="scope" >{{dateFormatType(scope.row.EndDate)}}</template>
        </el-table-column>
        <el-table-column align="left"  :label="$t('taskinfo.operation')" prop="CompleteState">
        <template slot-scope="scope">
            <router-link v-if="scope.row.CommandGroup" :to="{path:'/tasktransfes/index',query:{id:scope.row.CommandId},}">{{$t('taskinfo.details')}}</router-link>
            <el-link v-if="scope.row.ResRequest" @click="SearchRequest(scope.row.CommandId)">{{$t("taskinfo.searchRequest")}}</el-link>
        </template>
        </el-table-column>
      </el-table>
    </GenericList>

    <div>
       <el-dialog :title="$t('taskinfo.searchRequest')" :visible.sync="requestEnable" width="70%" center>
            <el-table :data="searchData" style="width: 100%"> 
              <el-table-column prop="RequestId" :label="$t('taskinfo.requestId')">
                 <template slot-scope="scope">{{ scope.row.RequestId}}</template>
              </el-table-column>
              <el-table-column prop="ReqestType" :label="$t('taskinfo.reqestType')"  v-if="false">
                 <template slot-scope="scope">{{ scope.row.ReqestType}}</template>
              </el-table-column>
              <el-table-column prop="Parameters" :label="$t('taskinfo.parameters')">
                 <template slot-scope="scope">{{ scope.row.Parameters}}</template>
              </el-table-column>
              <el-table-column prop="Responsed" :label="$t('taskinfo.responsed')">
                 <template slot-scope="scope">
                   <el-tag type="success" v-if="scope.row.Responsed">{{$t('taskinfo.yes')}}</el-tag>
                   <el-tag type="danger" v-if="!scope.row.Responsed">{{$t('taskinfo.no')}}</el-tag>
                  </template>
              </el-table-column>
              <el-table-column :label="$t('taskinfo.responseResult')" porp="ResponseResult">
                 <template slot-scope="scope">
                   <el-tag type="success" v-if="scope.row.ResponseResult">{{$t('taskinfo.yes')}}</el-tag>
                   <el-tag type="danger" v-if="!scope.row.ResponseResult">{{$t('taskinfo.no')}}</el-tag>
                 </template>
              </el-table-column>
              <el-table-column prop="ResponseAttribute" :label="$t('taskinfo.responseAttribute')">
                 <template slot-scope="scope">{{ scope.row.ResponseAttribute}}</template>
              </el-table-column>
            </el-table>
            <el-button type="primary" @click="refresh()">{{$t("taskinfo.refresh")}}</el-button>
            <el-button type="primary" @click="close()">{{$t("taskinfo.close")}}</el-button>
        </el-dialog>
    </div>
  </div>
</template>
<script>
import GenericList from "@/components/GenericList";
import * as api from "@/api/apltask.js";
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
      requestEnable:false,
      searchData:[],
      commandId:''
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
    SearchRequest(commandId)
    {
      this.requestEnable=true;
      this.commandId=commandId;
      var params = {CommandId:commandId};
      api.getAcquire(params).then((response) => 
      {
          var query = response.Data;
          this.searchData=[];
          if(query)
          {
              var value = new Object();
              value.RequestId = query.RequestId;
              value.ReqestType = query.ReqestType;
              value.Parameters = query.Parameters;
              value.Responsed = query.Responsed;
              value.ResponseResult = query.ResponseResult;
              value.ResponseAttribute=query.ResponseAttribute;
              this.searchData.push(value);
          }else
          {
             this.$message(this.$t('taskinfo.NoRequest'));
          }
      }).catch()
      {
        this.searchData=[];
      };
    },
    refresh()
    {
        this.SearchRequest(this.commandId);
    },
    close()
    {
        this.requestEnable=false;
    },
    dateFormatType:function(time) {
      var date=new Date(time);
      if(time=='0001-01-01T00:00:00')
      {
          return '';
      }
      var year=date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
      * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
      * */
      var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
      var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
      var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
      var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
      var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
	  	// 拼接
		  return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
	 },
   generateTitle
  },
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
