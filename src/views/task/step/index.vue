<template>
  <div>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading">
          <el-table-column align="left" width="50" :label="$t('genericList.no')">
            <template slot-scope="scope">{{ scope.$index+1 }}</template>
          </el-table-column>
          <!-- <el-table-column align="center" :label="$t('tasktransfes.barcode')" prop="Barcode">
               <template slot-scope="scope">{{scope.row.Barcode}}</template>
          </el-table-column> -->
          <el-table-column align="center" :label="$t('step.Begining')" prop="Begining">
               <template slot-scope="scope" v-if="scope.row.Begining!=null">{{ scope.row.Begining|dateformat('YYYY-MM-DD HH:mm:ss') }}</template>
          </el-table-column>
          <el-table-column align="center" :label="$t('step.End')" prop="End">
               <template slot-scope="scope" v-if="scope.row.End!=null">{{ scope.row.End|dateformat('YYYY-MM-DD HH:mm:ss') }}</template>
          </el-table-column>

          <el-table-column align="center" :label="$t('step.Dispatcher')" prop="DispatcherId">
               <template slot-scope="scope">
                <el-tag type="info" v-if="scope.row.DispatcherId=='1'">{{$t('step.discharge')}}</el-tag>
                <el-tag type="info" v-if="scope.row.DispatcherId=='2'">{{$t('step.centrifugal')}}</el-tag>
                <el-tag type="info" v-if="scope.row.DispatcherId=='3'">{{$t('step.centrifugalgrab')}}</el-tag>
                <el-tag type="info" v-if="scope.row.DispatcherId=='4'">{{$t('step.transfermachine')}}</el-tag>
                <el-tag type="info" v-if="scope.row.DispatcherId=='5'">{{$t('step.xpeelgrab')}}</el-tag>
                <el-tag type="info" v-if="scope.row.DispatcherId=='6'">{{$t('step.productgrab')}}</el-tag>
                </template>
          </el-table-column>

        <el-table-column align="center" :label="$t('tasktransfes.completion')" prop="Completion">
        <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.Completion">{{$t('tasktransfes.yes')}}</el-tag>
            <el-tag type="success" v-if="!scope.row.Completion">{{$t('tasktransfes.no')}}</el-tag>
        </template>
        </el-table-column>

        <el-table-column align="center" :label="$t('tasktransfes.result')" prop="Result">
        <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.Result">{{$t('tasktransfes.yes')}}</el-tag>
            <el-tag type="danger" v-if="!scope.row.Result">{{$t('tasktransfes.no')}}</el-tag>
        </template>
        </el-table-column>
        <el-table-column align="left" :label="$t('taskinfo.operation')" prop="CompleteState">
            <template slot-scope="scope">
              <el-button type="primary" v-if="!scope.row.Result" @click="ContinueAreaTask(scope.row.Barcode)">{{$t("step.continue")}}</el-button>
              <el-button type="primary" v-if="!scope.row.Result" @click="searchCommand(scope.row.Barcode)">{{$t("step.search")}}</el-button>
              <el-tag type="success" v-if="scope.row.Result">----</el-tag>
            </template>
        </el-table-column>
      </el-table>
        <el-dialog :title="$t('step.searchCommand')" :visible.sync="stepEnable" width="70%" center>
            <el-table :data="searchData" style="width: 100%"> 
              <el-table-column prop="CommandName" :label="$t('step.commandName')">
                 <template slot-scope="scope">{{ scope.row.CommandName}}</template>
              </el-table-column>
              <el-table-column prop="RequestId" :label="$t('step.deviceid')"  v-if="false">
                 <template slot-scope="scope">{{ scope.row.RequestId}}</template>
              </el-table-column>
              <el-table-column prop="DeviceName" :label="$t('step.deviceName')">
                 <template slot-scope="scope">{{ scope.row.DeviceName}}</template>
              </el-table-column>
              <el-table-column prop="State" :label="$t('step.status')">
                 <template slot-scope="scope">
                   <el-tag type="success" v-if="scope.row.State">{{$t('step.yes')}}</el-tag>
                   <el-tag type="success" v-if="!scope.row.State">{{$t('step.no')}}</el-tag>
                  </template>
              </el-table-column>
              <el-table-column prop="Appointtimes" :label="$t('step.appointtimes')">
                 <template slot-scope="scope">{{ scope.row.Appointtimes}}</template>
              </el-table-column>
              <el-table-column :label="$t('step.operate')">
                 <template slot-scope="scope">
                   <el-button type="primary" @click="Ignore(scope.row.RequestId)">{{$t("step.ignore")}}</el-button>
                   <el-button type="primary" @click="Stop(scope.row.RequestId)">{{$t("step.stop")}}</el-button>
                 </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" @click="refresh()">{{$t("step.refresh")}}</el-button>
            <el-button type="primary" @click="close()">{{$t("step.close")}}</el-button>
        </el-dialog>
  </div>
</template>
<script>
import('@/views/task/details/index')
import * as api from "@/api/apltask.js";
import { generateTitle } from "@/utils/i18n";
export default {
  data() {
    return {
        list: [],
        listLoading: false,
        barcode:'',
        stepEnable:false,
        searchData:[]
    };
  },
  created:function()
  {
    this.listLoading = true;
    var Barcode = this.$route.query.id
    this.listLoading = true;
    var params = {Barcode:Barcode};
    api.searchStep(params).then((response) => 
    {
        this.list = response.Data;
        this.listLoading = false;
    }).catch(err => (this.listLoading = false));
  },
  methods:{
    ContinueAreaTask(barcode)
    {
        var params = {Barcode:barcode};
        api.ContinueTaskbyCode(params).then((response) => 
        {
            this.$message(this.$t('createtask.continueTaskMsg'));
        }).catch(err => (this.listLoading = false));
    },
    searchCommand(barcode)
    {
        this.stepEnable=true;
        this.barcode=barcode;
        var params = {Barcode:barcode};
        api.SearchCommand(params).then((response) => 
        {
            var query = response.Data;
            this.searchData=[];
            for (let info of query) {
                var value = new Object();
                value.CommandName = info.CommandName;
                value.DeviceId = info.DeviceId;
                value.DeviceName = info.DeviceName;
                value.State = info.State;
                value.Appointtimes = info.Appointtimes;
                value.RequestId=info.RequestId;
                value.Begin=info.Begin;
                this.searchData.push(value);
            };
        }).catch(this.searchData=[]);
    },
    Ignore(requestId)
    {
        var params = {RequestId:requestId};
        api.Ignorecmd(params).then((response) => 
        {
            this.$message(this.$t('createtask.IgnoreTaskMsg'));
        }).catch(err => (this.listLoading = false));
    },
    Stop(requestId)
    {
      var params = {RequestId:requestId};
        api.Abortcmd(params).then((response) => 
        {
            this.$message(this.$t('createtask.abortTaskMsg'));
        }).catch(err => (this.listLoading = false));
    },
    refresh()
    {
        this.searchCommand(this.barcode);
    },
    close()
    {
        this.stepEnable=false;
    }
  }
};
</script>

