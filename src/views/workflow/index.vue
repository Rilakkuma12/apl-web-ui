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
        <form action="select_script" class="select_script">
          <el-transfer v-model="value" :data="data"></el-transfer>
        </form>
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
        //扫码
        form: {
          Name: "",
          Attachment: null
        },
        readonlyRack:false,
        readonlyLevel:false,
        readonlySourcePos:false,
        readonlymoveSourcePos:false,
        showBrowse:true,
        TestPath:false,
        path:'',
        selectRack:'ALL',
        racks:[],
        selectScanArea:'',
        scanareas:[{
          value: '1',
          prop:'',
          label: 'A'
        },
          {
            value: '2',
            prop:'',
            label: 'B'
          }],
        scandevices:[],
        selectScanDevice:'',
        //上料
        selectArea:'',
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
        selectDevice:'',
        devices:[],
        input: '',
        selectTargetArea:'',
        targetAreas:[
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
        selectTargetDevice:'',
        deviceType:'',
        targetDevices:[],
        xpeel: '',
        plateloc:'',
        centrifuge:'',
        loadhotelEnable:false,
        loadhotelData:[],
        listLoading:false,
        loadcode:'',
        loadRcakNo:'',
        loadLevelNo:'',
        loadTargetPos:'',
        selectQuitArea:'',
        quitareas:[
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
        selectQuitDevice:'',
        quitdevices:[],
        quitTargetdevices:[],
        selectQuitTargetDevice:'',
        quitcode:'',
        quitSourcePos:'',
        selectQuitTargetArea:'',
        quitRcakNo:'',
        quitLevelNo:'',
        quitxpeel: '',
        quitplateloc:'',
        quitcentrifuge:'',
        quitMesaEnable:false,
        quitMesaData:[],
        moveSourceArea:"",
        moveareas:[{
          value: '1',
          prop:'',
          label: 'A'
        },
          {
            value: '2',
            prop:'',
            label: 'B'
          }],
        moveSourceDevices:[],
        moveSourceDevice:'',



        moveTargetArea:'',
        moveSourceDevices:[],
        moveSourceDevice:'',
        moveSourcePos:'',
        movecode:'',
        moveTargetareas:[{
          value: '1',
          prop:'',
          label: 'A'
        },
          {
            value: '2',
            prop:'',
            label: 'B'
          }],
        moveTargetDevices:[],
        moveTargetDevice:'',
        moveTargetPos:'',
        moveMesaEnable:false,
        moveMesaData:[],
        movexpeel:'',
        moveplateloc:'',
        movecentrifuge:'',
        //均一化
        normareas:
          [
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
        selectNormArea:'',
        normdevices:[],
        selectNormDevice:'',

        //实验
        testSourceArea:'',
        testareas:[{
          value: '1',
          prop:'',
          label: 'A'
        },
          {
            value: '2',
            prop:'',
            label: 'B'
          }],
        testSourceDevices:'',
        testSourceDevice:'',
        testFileEnable:false,
        testFileData:[],
        fileRoute:'',
        quantareas:[{
          value: '1',
          prop:'',
          label: 'A'
        },
          {
            value: '2',
            prop:'',
            label: 'B'
          }],
        quantArea:'',
        quantstDevice:'',
        quantdevices:[],
        quanttargetBmg:'',
        quantBmgs:[],
        quantcode:'',
        quantPos:'',
        quantColumn:'',
        quantRfu:'',
        stFileEnable:false,
        bmgFileEnable:false,
        stFileData:[],
        bmgFileData:[],
        selectOperateArea:'',
        exceptDevice:'',
        exDevices:[],
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
        getExDevice()
        {
          var params = {area:""};
          deviceapi.deviceByProduct(params).then((response) =>
          {
            var query = response.Data;
            this.exDevices = [];
            for (let info of query) {
              var value = new Object();
              value.name = info.Name;
              value.key = info.Id;
              value.label=info.Name;
              value.prop=info.Index;
              value.state=info.State;
              this.exDevices.push(value);
            };
            this.exceptDevice=this.exDevices[0].key;
          }).catch(err => (
            this.exDevices=[],
              this.exceptDevice=''
          ));
        },
        currentExDevice(deviceid)
        {
          this.exceptDevice=deviceid
        },
        //扫码模块start
        currentScanArea(area) {
          //根据区域 获取设备填写入设备控件
          var params = {area:this.selectScanArea};
          deviceapi.getHotelByArea(params).then((response) =>
          {
            var query = response.Data;
            this.devices = [];
            for (let info of query) {
              var value = new Object();
              value.name = info.Name;
              value.key = info.Id;
              value.label=info.Name;
              value.prop=info.Index;
              value.state=info.State;
              this.scandevices.push(value);
            };
            this.selectScanDevice=this.scandevices[0].key;
          }).catch(err => (
            this.scandevices=[],
              this.selectScanDevice=''
          ));
        },
        currentScanDevice(deviceid)
        {
          this.selectScanDevice=deviceid
        },
        currentRack(rackno)
        {
          this.selectRack=rackno;
        },
        //扫码指令
        ScanHotel()
        {
          this.listLoading = true;
          var rackno='';
          if(this.selectRack!='ALL')
          {
            rackno=this.selectRack;
          }
          var params = {HotelId:this.selectScanDevice,PN:rackno}
          hotelapi.scanRack(params).then((response) =>
          {
            this.listLoading = false;
            this.$message(this.$t('createtask.scanHotelMsg'));

          }).catch(err => (this.listLoading = false));
        },
        ScanCancle()
        {
          this.selectScanArea='';
          this.selectScanDevice='';
          this.selectRack='ALL';
        },
        RollHotel()
        {
          this.listLoading = true;
          var rackno='';
          if(this.selectRack!='ALL')
          {
            rackno=this.selectRack;
          }
          var params = {HotelId:this.selectScanDevice,RackIndex:rackno}
          hotelapi.rollRack(params).then((response) =>
          {   this.listLoading = false;
            this.$message(this.$t('createtask.scanHotelMsg'));
          }).catch(err => (this.listLoading = false));
        },
        //扫码模块end
        //上料模块start
        currentArea(area)
        {
          //根据区域 获取设备填写入设备控件
          var params = {area:this.selectArea};
          deviceapi.getSourceByArea(params).then((response) =>
          {
            var query = response.Data;
            this.devices = [];
            for (let info of query) {
              var value = new Object();
              value.name = info.Name;
              value.key = info.Id;
              value.label=info.Name;
              value.prop=info.Index;
              value.state=info.State;
              value.type=info.Type;
              this.devices.push(value);
            };
            this.selectDevice = this.devices[0].key;
            if(this.devices[0].type=='13')  // 交互区
            {
              this.showBrowse=false;
              this.readonlyRack=false,
                this.readonlyLevel=false
            }else
            {
              this.showBrowse=true;
              this.readonlyRack=true,
                this.readonlyLevel=true
            }
          }).catch(err => (
            this.devices=[],
              this.selectDevice=''
          ));
        },
        currentloadDevice(deviceid)
        {
          this.selectDevice=deviceid;

          for (var i = 0; i <  this.devices.length; i++)
          {
            if (this.devices[i].key == deviceid)
            {
              this.stateValue= this.devices[i].state;
              this.deviceType=this.devices[i].type;
            }
          }
          if(this.deviceType=='13')  // 交互区
          {
            this.showBrowse=false;
            this.readonlyRack=false,
              this.readonlyLevel=false

          }else
          {
            this.showBrowse=true;
            this.readonlyRack=true,
              this.readonlyLevel=true
          }
        },
        //获取当前hotel信息
        GetHotelData()
        {
          this.loadhotelEnable=true;
          var _this = this;
          var params = {sn:this.selectDevice}
          hotelapi.searchHotelData(params).then((response) =>
          {
            _this.loadhotelData=[];
            var query = response.Data;
            for (let info of query)
            {
              var value = new Object();
              value.r=info.RackIndex;
              value.l=info.Index;
              value.pn=info.PN;
              value.code=info.Code;
              _this.loadhotelData.push(value);
            }
          }).catch(err => (this.listLoading = false));
        },
        selectLoadRow(row,event,column)
        {
          this.loadhotelEnable=false;
          this.loadcode=row.code;
          this.loadRcakNo=row.r;
          this.loadLevelNo=row.l;
          this.readonlyRack=true,
            this.readonlyLevel=true
        },
        currentTargetArea(area)
        {
          //根据区域 获取设备填写入设备控件
          var params = {area:this.selectTargetArea};
          deviceapi.getDeviceByArea(params).then((response) =>
          {
            var query = response.Data;
            this.targetDevices = [];
            for (let info of query) {
              var value = new Object();
              value.name = info.Name;
              value.key = info.Id;
              value.label=info.Name;
              value.prop=info.Index;
              value.state=info.State;
              value.type=info.Type;
              this.targetDevices.push(value);
            };
            this.selectTargetDevice=this.targetDevices[0].key;
          }).catch(err => (
            this.targetDevices=[],
              this.selectTargetDevice=''
          ));
        },
        currentTargetDevice(deviceid)
        {
          this.selectTargetDevice=deviceid;
        },
        LoadConsumable()
        {
          this.listLoading = true;
          var isXpeel=false;
          if(this.xpeel!="")
          {
            isXpeel=true;
          }
          var isPlateloc=false;
          if(this.plateloc!="")
          {
            isPlateloc=true;
          }
          var isCentrifuge=false;
          if(this.centrifuge!="")
          {
            isCentrifuge=true;
          }
          var params = {
            BarCode:this.loadcode,
            SourceRackIndex:this.loadRcakNo,
            SourceIndex:this.loadLevelNo,
            SourceDeviceId:this.selectDevice,
            TargetDeviceId:this.selectTargetDevice,
            TargetPosition:this.loadTargetPos,
            IsPeel:isXpeel,
            IsPlateLoc:isPlateloc,
            IsCentrifugal:isCentrifuge,
            CommandId:this.selectTargetArea
          };
          taskapi.loadConsumable(params).then((response) =>
          {
            this.listLoading = false;
            this.$message(this.$t('createtask.loadConsumableMsg'));
          }).catch(err => (this.listLoading = false));
        },
        LoadCancle()
        {
          this.selectArea="";
          this.selectDevice="";
          this.loadcode="";
          this.loadRcakNo="";
          this.loadLevelNo="";
          this.selectTargetDevice="";
          this.selectTargetArea="";
          this.loadTargetPos="";
          this.xpeel="";
          this.plateloc="";
          this.centrifuge="";
        },
        //上料模块end
        //下料start
        currentQuitArea(area)
        {
          //根据区域 获取设备填写入设备控件
          var params = {area:this.selectQuitArea};
          deviceapi.getDeviceByArea(params).then((response) =>
          {
            var query = response.Data;
            this.quitdevices = [];
            for (let info of query) {
              var value = new Object();
              value.name = info.Name;
              value.key = info.Id;
              value.label=info.Name;
              value.prop=info.Index;
              value.state=info.State;
              this.quitdevices.push(value);
            };
            this.selectQuitDevice=this.quitdevices[0].key;
          }).catch(err => (
            this.quitdevices=[],
              this.selectQuitDevice=''
          ));
        },
        currentQuitDevice(deviceid)
        {
          this.selectQuitDevice=deviceid;
        },
        //查询当前设备板位信息
        GetDevicePOS()
        {
          this.quitMesaEnable=true;
          var params = {sn:this.selectQuitDevice}
          this.quitMesaData=[];
          mesaapi.search(params).then((response) =>
          {
            var query = response.Data;
            for (let info of query)
            {
              var value = new Object();
              value.pos=info.Position;
              value.code=info.BarCode;
              value.lidcode=info.LidBarCode;
              this.quitMesaData.push(value);
            }
          }).catch(err => (this.listLoading = false));
        },
        selectquitMesaRow(row,event,column)
        {
          this.quitMesaEnable=false;
          this.quitcode=row.code;
          this.quitSourcePos=row.pos;
          this.readonlySourcePos=true
        },
        currentQuitTargetArea(area)
        {
          //根据区域 获取设备填写入设备控件
          var params = {area:this.selectQuitTargetArea};
          this.quitTargetdevices = [];
          deviceapi.getSourceByArea(params).then((response) =>
          {
            var query = response.Data;
            for (let info of query) {
              var value = new Object();
              value.name = info.Name;
              value.key = info.Id;
              value.label=info.Name;
              value.prop=info.Index;
              value.state=info.State;
              value.type=info.Type;
              this.quitTargetdevices.push(value);
            };
            this.selectQuitTargetDevice=this.quitTargetdevices[0].key;
          }).catch(err => (
            this.quitTargetdevices=[],
              this.selectQuitTargetDevice=''
          ));
        },
        currentTargetQuitDevice(deviceid)
        {
          this.selectQuitTargetDevice=deviceid;
        },
        QuitConsumable()
        {
          this.listLoading = true;
          var isXpeel=false;
          if(this.quitxpeel!="")
          {
            isXpeel=true;
          }
          var isPlateloc=false;
          if(this.quitplateloc!="")
          {
            isPlateloc=true;
          }
          var isCentrifuge=false;
          if(this.quitcentrifuge!="")
          {
            isCentrifuge=true;
          }
          var params = {

            BarCode:this.quitcode,
            SourceDeviceId:this.selectQuitDevice,
            SourcePosition:this.quitSourcePos,
            TargetDeviceId:this.selectQuitTargetDevice,
            TargetRackIndex:this.quitRcakNo,
            TargetIndex:this.quitLevelNo,
            IsPeel:isXpeel,
            IsPlateLoc:isPlateloc,
            IsCentrifugal:isCentrifuge,
            CommandId:this.selectQuitTargetArea
          };
          taskapi.quitConsumable(params).then((response) =>
          {
            this.listLoading = false;
            this.$message(this.$t('createtask.quitConsumableMsg'));
          }).catch(err => (this.listLoading = false));
        },
        QuitCancle()
        {
          this.quitcode="";
          this.selectQuitDevice="";
          this.selectQuitArea="";
          this.quitSourcePos="";
          this.selectQuitTargetDevice="";
          this.selectQuitTargetArea="";
          this.quitRcakNo="";
          this.quitLevelNo="";
          this.quitxpeel="";
          this.quitplateloc="";
          this.quitcentrifuge="";
        },
        //下料结束
        //转移start
        currentMoveArea(area)
        {
          //根据区域 获取设备填写入设备控件
          var params = {area:this.moveSourceArea};
          this.moveSourceDevices=[];
          deviceapi.getDeviceByArea(params).then((response) =>
          {
            var query = response.Data;
            for (let info of query) {
              var value = new Object();
              value.name = info.Name;
              value.key = info.Id;
              value.label=info.Name;
              value.prop=info.Index;
              value.state=info.State;
              value.type=info.Type;
              this.moveSourceDevices.push(value);
            };
            this.moveSourceDevice=this.moveSourceDevices[0].key;
          }).catch(err => (
            this.moveSourceDevices=[],
              this.moveSourceDevice=''
          ));
        },
        currentMoveSourceDevice(deviceid)
        {
          this.moveSourceDevice=deviceid;
        },
        GetMoveSourcePOS()
        {
          this.moveMesaEnable=true;
          var params = {sn:this.moveSourceDevice}
          this.moveMesaData=[];
          mesaapi.search(params).then((response) =>
          {
            var query = response.Data;
            for (let info of query)
            {
              var value = new Object();
              value.pos=info.Position;
              value.code=info.BarCode;
              value.lidcode=info.LidBarCode;
              this.moveMesaData.push(value);
            }
          }).catch(err => (this.listLoading = false));
        },
        selectMoveMesaRow(row,event,column)
        {
          this.moveMesaEnable=false;
          this.moveSourcePos=row.pos;
          this.movecode=row.code;
          this.readonlymoveSourcePos=true;
        },
        currentMoveTargetArea(area)
        {
          var params = {area:this.moveTargetArea};
          this.moveTargetDevices=[];
          deviceapi.getDeviceByArea(params).then((response) =>
          {
            var query = response.Data;
            for (let info of query) {
              var value = new Object();
              value.name = info.Name;
              value.key = info.Id;
              value.label=info.Name;
              value.prop=info.Index;
              value.state=info.State;
              value.type=info.Type;
              this.moveTargetDevices.push(value);
            };
            this.moveTargetDevice=this.moveTargetDevices[0].key;
          }).catch(err => (
            this.moveTargetDevices=[],
              this.moveTargetDevice=''
          ));
        },
        currentMoveTargetDevice(deviceid)
        {
          this.moveTargetDevice=deviceid;
        },
        MoveConsumable()
        {
          this.listLoading = true;
          var isXpeel=false;
          if(this.movexpeel!="")
          {
            isXpeel=true;
          }
          var isPlateloc=false;
          if(this.moveplateloc!="")
          {
            isPlateloc=true;
          }
          var isCentrifuge=false;
          if(this.movecentrifuge!="")
          {
            isCentrifuge=true;
          }
          var params = {
            BarCode:this.movecode,
            SourceDeviceId:this.moveSourceDevice,
            SourcePosition:this.moveSourcePos,
            TargetDeviceId:this.moveTargetDevice,
            TargetPosition:this.moveTargetPos,
            IsPeel:isXpeel,
            IsPlateLoc:isPlateloc,
            IsCentrifugal:isCentrifuge,
            CommandId:this.selectTargetArea
          };
          taskapi.moveConsumable(params).then((response) =>
          {
            this.listLoading = false;
            this.$message(this.$t('createtask.moveConsumableMsg'));
          }).catch(err => (this.listLoading = false));
        },
        MoveCancle()
        {
          this.movecode="";
          this.moveSourceArea="";
          this.moveSourceDevice="";
          this.moveSourcePos="";
          this.selectQuitTargetDevice="";
          this.moveTargetDevice="";
          this.moveTargetArea="";
          this.moveTargetPos="";
          this.movexpeel="";
          this.moveplateloc="";
          this.movecentrifuge="";
        },
        //转移end
        currentTestArea(area)
        {
          var params = {area:this.testSourceArea};
          this.testSourceDevices=[];
          deviceapi.getDeviceByArea(params).then((response) =>
          {
            var query = response.Data;
            for (let info of query) {
              var value = new Object();
              value.name = info.Name;
              value.key = info.Id;
              value.label=info.Name;
              value.prop=info.Index;
              value.state=info.State;
              value.type=info.Type;
              this.testSourceDevices.push(value);
            };
            this.testSourceDevice=this.testSourceDevices[0].key;
          }).catch(err => (
            this.testSourceDevice=[],
              this.testSourceDevice=""
          ));
        },
        cexperimentTargetDevice(deviceid)
        {
          this.testSourceDevice=deviceid;
        },
        //定量
        selectNormaArea(area)
        {
          var params = {area:this.selectNormArea};
          this.normdevices=[];
          deviceapi.getDeviceByArea(params).then((response) =>
          {
            var query = response.Data;
            for (let info of query) {
              var value = new Object();
              value.name = info.Name;
              value.key = info.Id;
              value.label=info.Name;
              value.prop=info.Index;
              value.state=info.State;
              value.type=info.Type;
              this.normdevices.push(value);
            };
            this.selectNormDevice=this.normdevices[0].key;
          }).catch(err => (
            this.normdevices=[],
              this.selectNormDevice=""
          ));
        },
        selectQuantArea(area)
        {
          var params = {area:this.quantArea};
          this.quantdevices=[];
          deviceapi.getStarletByArea(params).then((response) =>
          {
            var query = response.Data;
            for (let info of query) {
              var value = new Object();
              value.name = info.Name;
              value.key = info.Id;
              value.label=info.Name;
              value.prop=info.Index;
              value.state=info.State;
              value.type=info.Type;
              this.quantdevices.push(value);
            };
            this.quantstDevice=this.quantdevices[0].key;
          }).catch(err => (
            this.quantdevices=[],
              this.quantstDevice=''
          ));

          this.quantBmgs=[];
          deviceapi.getBmgByArea(params).then((response) =>
          {
            var query = response.Data;
            this.quantBmgs = [];
            for (let info of query) {
              var value = new Object();
              value.name = info.Name;
              value.key = info.Id;
              value.label=info.Name;
              value.prop=info.Index;
              value.state=info.State;
              this.quantBmgs.push(value);
            };
          }).catch(err => (
            this.quantBmgs=[]
          ));

        },
        GetStartletFile()
        {
          this.stFileEnable=true;
          var params = {Sn:this.quantstDevice};
          scriptapi.file(params).then((response) =>
          {
            var query = response.Data;
            this.stFileData=[];
            for (let info of query) {
              var value = new Object();
              value.fileName = info.Name;
              value.fileDesc = info.Description;
              value.fileRoute = info.Attachment.OrginalFileName;
              this.stFileData.push(value);
            };
          }).catch(err => (
            this.stFileData=[]
          ));
        },
        GetBmgFile()
        {
          this.bmgFileEnable=true;
          var params = {Sn:this.quanttargetBmg};
          scriptapi.file(params).then((response) =>
          {
            var query = response.Data;
            this.bmgFileData=[];
            for (let info of query) {
              var value = new Object();
              value.fileName = info.Name;
              value.fileDesc = info.Description;
              value.fileRoute = info.Attachment.OrginalFileName;;
              this.bmgFileData.push(value);
            };
          }).catch(err => (
            this.bmgFileData=[]
          ));
        },
        selectStFileRow(row,event,column)
        {
          this.stFileEnable=false;
          this.startletFile=row.fileRoute;
        },
        selectBmgFileRow(row,event,column)
        {
          this.bmgFileEnable=false;
          this.bmgFile=row.fileRoute;
        },
        Quant()
        {
          var params = {
            StartletDeviceId:this.quantstDevice,
            StarletScriptName:this.startletFile,
            BmgDeviceId:this.quanttargetBmg,
            BmgScriptName:this.bmgFile,
            BarCode:this.quantcode,
            Position:this.quantPos,
            Column:this.quantColumn,
            RFUs:this.quantRfu
          };
          taskapi.quant(params).then((response) =>
          {
            this.$message(this.$t('createtask.quantMsg'));
          }).catch(err => (this.listLoading = false));
        },
        QuantCancle()
        {
          this.quantstDevice="";
          this.startletFile="";
          this.quanttargetBmg="";
          this.bmgFile="";
          this.quantcode="";
          this.quantPos="";
          this.quantColumn="";
          this.quantRfu="";
        },
        //实验
        GetDeviceFile()
        {
          this.testFileEnable=true;
          var params = {Sn:this.testSourceDevice};
          scriptapi.file(params).then((response) =>
          {
            var query = response.Data;
            this.testFileData=[];
            for (let info of query) {
              var value = new Object();
              value.fileName = info.Name;
              value.fileDesc = info.Description;
              value.fileRoute = info.Attachment.FileName;
              this.testFileData.push(value);
            };
          }).catch(err => (
            this.testFileData=[]
          ));
        },
        selecttestFileRow(row,event,column)
        {
          this.testFileEnable=false;
          this.fileRoute=row.fileRoute;//在服务端拼接具体路径
        },
        Experiment()
        {
          this.listLoading=true;
          var params = {Sn:this.testSourceDevice,Name:this.fileRoute};
          taskapi.experiment(params).then((response) =>
          {
            this.listLoading = false
            this.$message(this.$t('createtask.experimentMsg'));
          }).catch(err => (this.listLoading = false));
        },
        ExperimentCancle()
        {
          this.testSourceArea="";
          this.testSourceDevice="";
          this.fileRoute="";
        },
        seoperateArea(area)
        {
          this.selectOperateArea=area;
        },
        ContinueAreaTask()
        {
          var params = {Module:this.selectOperateArea};
          taskapi.continueTask(params).then((response) =>
          {
            this.$message(this.$t('createtask.continueTaskMsg'));
          }).catch(err => (this.listLoading = false));
        },
        ClearAreaTask()
        {
          var params = {Module:this.selectOperateArea};
          taskapi.clearTask(params).then((response) =>
          {
            this.$message(this.$t('createtask.clearTaskMsg'));
          }).catch(err => (this.listLoading = false));
        },
        ClearAllAreaTask()
        {
          var params = {Module:this.selectOperateArea};
          taskapi.clearAllTask(params).then((response) =>
          {
            this.$message(this.$t('createtask.clearAllTaskMsg'));
          }).catch(err => (this.listLoading = false));
        },
        ClearTimeOut()
        {
          var params = {Module:this.selectOperateArea};
          taskapi.clearTimeOut(params).then((response) =>
          {
            this.$message(this.$t('createtask.clearTimeOutMsg'));
          }).catch(err => (this.listLoading = false));
        },
        ClearOnlyTimeOut()
        {
          var params = {Sn:this.exceptDevice};
          taskapi.clearTimeoutById(params).then((response) =>
          {
            this.$message(this.$t('createtask.clearTimeDeviceOutMsg'));
          }).catch(err => (this.listLoading = false));
        },
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
        DeviceOnline()
        {
          this.listLoading=true;
          var params = {Name:this.path};
          taskapi.synchronize(params).then((response) =>
          {
            this.listLoading = false;
            this.$message(this.$t('createtask.TaskMsgSynce'));
          }).catch(err => (this.listLoading = false));
        },
        ClearCache()
        {
          this.listLoading=true;
          var params = {Name:''};
          taskapi.clearCache(params).then((response) =>
          {
            this.listLoading = false;
            this.$message(this.$t('createtask.clearCacheMsg'));
          }).catch(err => (this.listLoading = false));
        }
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
    width: 50%;
    float: right;
  }
</style>
