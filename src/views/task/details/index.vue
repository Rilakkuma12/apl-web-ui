<template>
  <div>
      <div style="margin-left:50px;margin-top: 20px;">
        <div class="demo-input-suffix">
        {{$t("mesadevice.area")}}：
        <el-select v-model="selectArea" :placeholder="$t('mesadevice.selectArea')" @change="currentArea">
          <el-option
            v-for="area in areas"
            :key="area.value"
            :label="area.label"
            :value="area.value">
          </el-option>
        </el-select>
        {{$t("mesadevice.deviceInfo")}}：
        <el-select v-model="selectDevice" :placeholder="$t('mesadevice.selectDevice')" @change="currentDevice">
          <el-option 
            v-for="device in devices"
            :key="device.key"
            :label="device.label"
            :value="device.key">
            </el-option>
        </el-select>
        <el-button v-on:click="GetTaskByDevice()" v-text="$t('mesadevice.searchMesa')"></el-button>
        </div>
     </div>
      <el-table v-loading="listLoading" :data="list" element-loading-text="Loading">
          <el-table-column align="left" width="100" :label="$t('genericList.no')">
            <template slot-scope="scope">{{ scope.$index+1 }}</template>
          </el-table-column>
          <el-table-column align="center" :label="$t('details.MessageId')" prop="MessageId">
          </el-table-column>
          <el-table-column align="center" :label="$t('details.taskId')" prop="TaskId">
          </el-table-column>
          <el-table-column align="center" :label="$t('details.Command')" prop="Command">
          </el-table-column>
          <el-table-column align="center" :label="$t('details.TaskType')" prop="TaskType">
          </el-table-column>
          <el-table-column align="center" :label="$t('details.DeviceArea')" prop="DeviceArea">
          </el-table-column>
          <el-table-column align="center" :label="$t('details.IsBeginning')" prop="IsBeginning">
            <template slot-scope="scope">
                <el-tag type="info" v-if="!scope.IsBeginning">{{$t('taskinfo.noStart')}}</el-tag>
                <el-tag type="success" v-if="scope.IsBeginning">{{$t('taskinfo.run')}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('details.BeginDate')" prop="BeginDate">
             <template slot-scope="scope">{{ scope.BeginDate|dateformat('YYYY-MM-DD HH:mm:ss') }}</template>
          </el-table-column>
          <el-table-column align="center" :label="$t('details.IsCompletion')" prop="IsCompletion">
            <template slot-scope="scope">
            <el-tag type="info" v-if="!scope.IsCompletion">{{$t('taskinfo.run')}}</el-tag>
            <el-tag type="success" v-if="scope.IsCompletion">{{$t('taskinfo.end')}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('details.CompletionDate')" prop="CompletionDate">
              <template slot-scope="scope">{{ scope.CompletionDate|dateformat('YYYY-MM-DD HH:mm:ss') }}</template>
          </el-table-column>
      </el-table>
  </div>
</template>
<script>
import('@/views/task/details/index')
import * as deviceapi from "@/api/device.js";
import * as api from "@/api/apltask.js";
import { generateTitle } from "@/utils/i18n";
export default {
  data() {
    return {
      areas:[
            {
            value: '1',
            label: 'A'
            }, 
            {
               value: '2',
               label: 'B'
            }  
        ],
        selectArea:'1',
        devices: [],
        selectDevice:'',
        list: [],
        listLoading: false,
    };
  },
  created:function()
  {
    this.currentArea();
    this.listLoading = true;
    var id = this.$route.query.id
    this.listLoading = true;
    var params = {TaskId:id};
    api.searchDetails(params).then((response) => 
    {
        this.list = response.Data;
        this.listLoading = false;
    }).catch(err => (this.listLoading = false));
  },
  methods:{
    currentArea()
    {
        //根据区域 获取设备填写入设备控件
        var params = {area:this.selectArea};
        deviceapi.getDeviceByArea(params).then((response) => 
        {
            var query = response.Data;
            this.devices = [];
            for (let info of query) {
                var value = new Object();
                value.key = info.Id;
                value.label=info.Name;
                this.devices.push(value);
            };
        }).catch(err => (
            this.devices=[],
            this.selectDevice='',
            this.listLoading = false
            ));
    },
      currentDevice(selectDevice)
      {
        this.listLoading = true;
        var params = {DeviceId:selectDevice};
        api.searchDetailsById(params).then((response) => 
        {
            this.list = response.Data;
            this.listLoading = false;
        }).catch(err => (this.listLoading = false));
      },
      GetTaskByDevice()
      {
        if(selectDevice=='')
        {
            this.$message(this.$t('details.SelectDeiveMsg'));
        }else
        {
          this.listLoading = true;
          var params = {DeviceId:selectDevice};
          api.searchDetailsById(params).then((response) => 
          {
              this.list = response.Data;
              this.listLoading = false;
          }).catch(err => (this.listLoading = false));
        }
      }
  }
};
</script>

