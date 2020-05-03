<template>
  <div>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading">
          <el-table-column align="left" width="50" :label="$t('genericList.no')">
            <template slot-scope="scope">{{ scope.$index+1 }}</template>
          </el-table-column>
          <el-table-column align="left" width="80" :label="$t('taskinfo.commandId')" prop="CommandId"  v-if="1==0">
          <template slot-scope="scope">{{ scope.row.CommandId }}</template>
          </el-table-column>
          <el-table-column align="center" :label="$t('tasktransfes.command')" prop="Command">
               <template slot-scope="scope">{{ scope.row.Command}}</template>
          </el-table-column>
          <el-table-column align="center" :label="$t('tasktransfes.barcode')" prop="barcode">
               <template slot-scope="scope">{{ scope.row.barcode}}</template>
          </el-table-column>
          <el-table-column align="center" :label="$t('tasktransfes.sourceDeviceName')" prop="SourceDeviceName">
               <template slot-scope="scope">{{ scope.row.SourceDeviceName}}</template>
          </el-table-column>
          <el-table-column align="center" :label="$t('tasktransfes.sourceModule')" prop="SourceModule">
               <template slot-scope="scope">{{ scope.row.SourceModule}}</template>
          </el-table-column>
          <el-table-column align="center" :label="$t('tasktransfes.sourceLocal')" prop="SourceLocal">
               <template slot-scope="scope">{{ scope.row.SourceLocal}}</template>
          </el-table-column>
        <el-table-column align="center" :label="$t('tasktransfes.targetDeviceName')" prop="TargetDeviceName">
               <template slot-scope="scope">{{ scope.row.TargetDeviceName}}</template>
          </el-table-column>
          <el-table-column align="center" :label="$t('tasktransfes.targetModule')" prop="TargetModule">
               <template slot-scope="scope">{{ scope.row.TargetModule}}</template>
          </el-table-column>
         <el-table-column align="center" :label="$t('tasktransfes.targetPosttion')" prop="TargetPosttion">
               <template slot-scope="scope">{{ scope.row.TargetPosttion}}</template>
          </el-table-column>
        <el-table-column align="center" :label="$t('tasktransfes.idx')" prop="Idx">
               <template slot-scope="scope">{{ scope.row.Idx}}</template>
          </el-table-column>
          <el-table-column align="center" :label="$t('tasktransfes.sealing')" prop="Sealing">
            <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.Sealing">{{$t('tasktransfes.yes')}}</el-tag>
                <el-tag type="success" v-if="!scope.row.Sealing">{{$t('tasktransfes.no')}}</el-tag>
            </template>
          </el-table-column>

         <el-table-column align="center" :label="$t('tasktransfes.tearing')" prop="Tearing">
            <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.Tearing">{{$t('tasktransfes.yes')}}</el-tag>
                <el-tag type="success" v-if="!scope.row.Tearing">{{$t('tasktransfes.no')}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column align="center" :label="$t('tasktransfes.centrifuge')" prop="Centrifuge">
            <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.Centrifuge">{{$t('tasktransfes.yes')}}</el-tag>
                <el-tag type="success" v-if="!scope.row.Centrifuge">{{$t('tasktransfes.no')}}</el-tag>
            </template>
          </el-table-column>
        <!-- <el-table-column align="center" :label="$t('tasktransfes.transfeGroup')" prop="TransfeGroup">
        <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.TransfeGroup===0">{{$t('tasktransfes.load')}}</el-tag>
            <el-tag type="success" v-if="scope.row.TransfeGroup===1">{{$t('tasktransfes.move')}}</el-tag>
            <el-tag type="success" v-if="scope.row.TransfeGroup===2">{{$t('tasktransfes.blank')}}</el-tag>
        </template>
        </el-table-column> -->
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

        <el-table-column align="left"  :label="$t('taskinfo.operation')" prop="CompleteState">
        <template slot-scope="scope">
            <router-link :to="{path:'/step/index',query:{id:scope.row.barcode},}">{{$t('taskinfo.details')}}</router-link>
        </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
import('@/views/task/tasktransfes/index')
import * as deviceapi from "@/api/device.js";
import * as api from "@/api/apltask.js";
import { generateTitle } from "@/utils/i18n";
export default {
  data() {
    return {
        list: [],
        listLoading: false,
    };
  },
  created:function()
  {
    this.listLoading = true;
    var id = this.$route.query.id
    this.listLoading = true;
    var params = {CommandId:id};
    api.searchDetails(params).then((response) => 
    {
        this.list = response.Data;
        this.listLoading = false;
    }).catch(err => (this.listLoading = false));
  },
  methods:{
  }
};
</script>

