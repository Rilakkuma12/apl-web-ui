<template>
  <div>
    <el-tabs tab-position="left" style="margin-left:10px">

        <table class="apl-table">
          <tr>
            <td>
              {{$t("createtask.Test")}}：
            </td>
            <td>
              <el-input v-model="input" placeholder="请选择脚本"></el-input>
            </td>
            <td>
              <el-upload
                action="/api/attachment/uploadfile/script"
                :headers="headers"
                :on-success="handleUploadSuccess"
                :on-remove="handleUploadRemove"
                :on-exceed="handleUploadExceed"
                class="upload"
                accept=".py,.json"
                :limit="1"
                ref="uploader">
                <el-button size="small" type="primary">{{$t("createtask.select")}}</el-button>
              </el-upload>
              <el-input v-model="path" v-if="1!= 1"></el-input>
            </td>
            <td>
              <el-button type="primary" @click="TestRun()">{{$t("createtask.testrun")}}</el-button>
              <el-button type="primary" @click="TestPause()">{{$t("createtask.testPause")}}</el-button>
              <el-button type="primary" @click="TestStop()">{{$t("createtask.testStop")}}</el-button>
              <el-button type="primary" @click="TestTemplate()">{{$t("createtask.testTemplate")}}</el-button>
            </td>
          </tr>
        </table>

        <el-divider></el-divider>

        <table class="log">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </table>
    </el-tabs>
  </div>
</template>
<script>
  import { Message } from "element-ui";
  import ToolBar from "@/components/ToolBar";
  import * as deviceapi from "@/api/device.js";
  import * as hotelapi from "@/api/hotel.js";
  import * as taskapi from "@/api/apltask.js";
  import * as mesaapi from "@/api/mesadevice.js";
  import * as scriptapi from "@/api/script.js";
  import { getToken } from "@/utils/auth";
  import { downloadAttachment, downloadFile } from "@/api/file-downloader";
  export default {
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        ata: generateData(),
        value: [1, 4],

      }
    },
    computed: {
      headers() {
        return {
          token: getToken()
        };
      }
    },
    created:function(){
      this.racks=[];
      for(var i=0;i<15;i++)
      {
        var value = new Object();
        if(i==0)
        {
          value.value = 'ALL';
          value.label='ALL';
        }else
        {
          value.key = i+'';
          value.label=i+'';
        }
        this.racks.push(value);
      };
      this.getExDevice();
    },
    methods:
      {

        handleUploadSuccess(response, file, fileList)
        {
          this.path= response.Data;
        },
        handleUploadRemove(file, fileList)
        {
          this.path = null;
        },
        handleUploadExceed(file, fileList) {
          Message({
            message: this.$t("script.onlyOnFileAllowed"),
            type: "error",
            duration: 5 * 1000
          });
        },
        TestRun()
        {
          this.listLoading=true;
          var params = {Name:this.path};
          taskapi.testRun(params).then((response) =>
          {
            this.listLoading=false;
            this.$message(this.$t('createtask.TaskMsgRun'));
          }).catch(err => (this.listLoading = false));

        },
        TestPause()
        {

        },
        TestStop()
        {
          this.listLoading=true;
          var params = {Name:this.path};
          taskapi.testStop(params).then((response) =>
          {
            this.listLoading = false;
            this.$message(this.$t('createtask.TaskMsgStop'));
          }).catch(err => (this.listLoading = false));
        },
        TestTemplate(){

        },

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
  .apl-table,.aplquit-table,.aplnorm-table
  {
    margin-top: 30px;
    margin-left: 10%;
    margin-bottom: 30px;
  }
  .loading {
    width: 50px;
    height: 60px;
    text-align: center;
    font-size: 10px;
    position:fixed;
    left:50%;
    top:50%;
    margin-top:-30px;
    margin-left:-25px;
  }
  .select_script{
    width: 50%;
    float: left;
  }
  .log{
    /*width: 50%;*/
    /*float: right;*/
    margin: auto;
  }
</style>
