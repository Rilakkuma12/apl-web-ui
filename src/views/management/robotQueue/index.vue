<template>
  <div>
       <div style="margin-left:50px;margin-top: 20px;">
            <div class="demo-input-suffix">
                {{$t("mesadevice.area")}}：
                <el-select v-model="selectArea" :placeholder="$t('mesadevice.selectArea')" @change="currentArea">
                    <el-option v-for="area in areas" :key="area.value" :label="area.label" :value="area.value">
                    </el-option>
                </el-select>
                <el-button type="primary" @click="GetRobotQueue()">{{$t("createtask.selectAreaTask")}}</el-button>
                <el-button type="primary" @click="ContinueAreaTask()">{{$t("createtask.continueTask")}}</el-button>
                <el-button type="primary" @click="ClearAreaTask()">{{$t("createtask.clearTask")}}</el-button>
                <el-button type="primary" @click="ClearAllAreaTask()">{{$t("createtask.clearAll")}}</el-button>
                <el-button type="primary" @click="ClearTimeOut()">{{$t("createtask.clearTimeOut")}}</el-button>
            </div>
       </div>
        <el-table
            v-loading="listLoading" :data="list"
            element-loading-text="Loading">
            <el-table-column align="center" :label="$t('robotQueue.taskId')" prop="TaskId">
            </el-table-column>
            <el-table-column align="center" :label="$t('robotQueue.Platebarcode')" prop="Platebarcode">
            </el-table-column>
            <el-table-column align="center" :label="$t('robotQueue.sourceName')" prop="SourceDeviceName">
            </el-table-column>
            <el-table-column align="center" :label="$t('robotQueue.sourcePos')" prop="SourcePos">
            </el-table-column>
            <el-table-column align="center" :label="$t('robotQueue.targetName')" prop="TargetDeviceName">
            </el-table-column>
            <el-table-column align="center" :label="$t('robotQueue.targetPos')" prop="TargetPos">
            </el-table-column>
            <el-table-column align="center" :label="$t('robotQueue.idx')" prop="Idx">
            </el-table-column>
        </el-table>
  </div>
</template>
<script>
import * as api from "@/api/robotqueue.js";
import * as taskapi from "@/api/apltask.js";
import { generateTitle } from "@/utils/i18n";
export default {
  data() {
    return {
        areas:[
                {
                    value: '1',
                    prop:'',
                    label: 'A'
                }, 
                {
                    value: '2',
                    prop:'',
                    label: 'B'
                }  
            ],
        selectArea:'1',
        list: [],
        listLoading: false,
    };
  },
  created:function()
  {
        this.listLoading = true;
        var params = {Area:this.selectArea};
        api.search(params).then((response) => 
        {
            this.list = response.Data;
            this.listLoading = false;
        }).catch(err => (this.listLoading = false));
  },
  methods:{
        currentArea(area)
        {
             this.listLoading = true;
            var params = {Area:area};
            api.search(params).then((resp) => 
            {
                this.list = resp.Data;
                this.listLoading = false;
            }).catch(err => (this.listLoading = false));
        },
        GetRobotQueue()
        {  
            this.listLoading = true;
            var params = {Area:this.selectArea};
            api.search(params).then((resp) => 
            {
                this.list = resp.Data;
                this.listLoading = false;
            }).catch(err => (this.listLoading = false));
        },
        ContinueAreaTask()
        {
            var params = {Module:this.selectArea};
            taskapi.continueTask(params).then((response) => 
            {
                this.$message(this.$t('createtask.continueTaskMsg'));
            }).catch(err => (this.listLoading = false));
        },
        ClearAreaTask()
        {
            var params = {Module:this.selectArea};
            taskapi.clearTask(params).then((response) => 
            {
                this.$message(this.$t('createtask.clearTaskMsg'));
            }).catch(err => (this.listLoading = false));
        },
        ClearAllAreaTask()
        {
            var params = {Module:this.selectArea};
            taskapi.clearAllTask(params).then((response) => 
            {
                this.$message(this.$t('createtask.clearAllTaskMsg'));
            }).catch(err => (this.listLoading = false));
        },
        ClearTimeOut()
        {
            var params = {Module:this.selectArea};
            taskapi.clearTimeOut(params).then((response) => 
            {
                this.$message(this.$t('createtask.clearTimeOutMsg'));
            }).catch(err => (this.listLoading = false));
        }
  }
};
</script>

