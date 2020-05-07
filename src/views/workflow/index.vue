<template>
  <div>
    <el-tabs tab-position="left" style="margin-left:10px">
      <div class="upload">
        <el-upload
          class="script_upload"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <br>
      <table class="apl-table">
        <tr>
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
    <div class="fileDiv">
      <el-button @click="downloadFile">下载</el-button>
      <div id="fileUpload">
        <el-input
          style="margin-top: 16px"
          type="file"
          action="https://jsonplaceholder.typicode.com/posts/"
        ></el-input>
<!--        <el-upload></el-upload>-->
      </div>
    </div>
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
      // const generateData = _ => {
      //   const data = [];
      //   for (let i = 1; i <= 15; i++) {
      //     data.push({
      //       key: i,
      //       label: `备选项 ${ i }`,
      //       disabled: i % 4 === 0
      //     });
      //   }
      //   return data;
      // };
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
        // ata: generateData(),
        // value: [1, 4],
        script_path: '',
      }
    },
    // computed: {
    //   headers() {
    //     return {
    //       token: getToken()
    //     };
    //   }
    // },
    // created:function(){
    //   this.racks=[];
    //   for(var i=0;i<15;i++)
    //   {
    //     var value = new Object();
    //     if(i==0)
    //     {
    //       value.value = 'ALL';
    //       value.label='ALL';
    //     }else
    //     {
    //       value.key = i+'';
    //       value.label=i+'';
    //     }
    //     this.racks.push(value);
    //   };
    //   this.getExDevice();
    // },
    mounted() {
      this.$nextTick(function() {
        this.readFile()
      })
    },
    methods:
      {

        handleUploadSuccess(response, file, fileList)
        {
          this.script_path= response.Data;
        },
        handleUploadRemove(file, fileList)
        {
          this.script_path = null;
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
          var params = {Name:this.script_path};
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
          var params = {Name:this.script_path};
          taskapi.testStop(params).then((response) =>
          {
            this.listLoading = false;
            this.$message(this.$t('createtask.TaskMsgStop'));
          }).catch(err => (this.listLoading = false));
        },
        TestTemplate(){

        },
        downloadFile(){
          var content = [
            { 'firstName': 'John', 'lastName': 'Doe' },
            { 'firstName': 'Anna', 'lastName': 'Smith' },
            { 'firstName': 'Peter', 'lastName': 'Jones' }
          ]
          var filecontent = JSON.stringify(content)
          if ('download' in document.createElement('a')) {
            this.download(filecontent, 'testfile.json')
          } else {
            alert('浏览器不支持')
          }
        },
        download: function(content, filename){
          let link = document.createElement('a')
          link.download = filename
          link.style.display = 'none'
          let blob = new Blob([content])
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        },
        readFile(){
          console.log('读取文件')
          let fileUpload = document.querySelector('#fileUpload')
          console.log(fileUpload)
          fileUpload.addEventListener('change', function(e) {
            console.log(1111)
            console.log(e)
            let file = e.target.files
            console.log('文件类型')
            console.log(file)
            if (file.length === 0){
              return
            }
            let reader = new FileReader()
            if (typeof FileReader === 'undefined'){
              this.$message({
                type: 'info',
                message: '你的浏览器不支持FileReader接口'
              })
              return
            }
            reader.readAsText(file[0])
            reader.onload = function(e) {
              console.log('文件内容')
              console.log(e.target.result)
            }
          }.bind(this))
        }
      },

  }
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
    /*margin-top: 30px;*/
    /*margin-left: 10%;*/
    /*margin-bottom: 30px;*/
    margin: auto;
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
  .upload{
    width: 30%;
    /*float: contour;*/
    margin: auto;
  }
  .log{
    /*width: 50%;*/
    /*float: right;*/
    margin: auto;
  }
  .fileDiv {
    width: 400px;
    margin: 20px;
  }
</style>
