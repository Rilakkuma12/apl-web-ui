<template>
    <div>
        <div style="margin-left:50px;margin-top: 20px;">
            <div class="demo-input-suffix">
                {{$t("mesadevice.area")}}：
                <el-select v-model="selectArea" :placeholder="$t('mesadevice.selectArea')" @change="currentArea">
                    <el-option v-for="area in areas" :key="area.value" :label="area.label" :value="area.value">
                    </el-option>
                </el-select>
                {{$t("mesadevice.deviceInfo")}}：
                <el-select v-model="selectDevice" :placeholder="$t('mesadevice.selectDevice')"  @change="currentSel">
                    <el-option  v-for="device in devices" :key="device.key" :label="device.label" :value="device.key"></el-option>
                </el-select>
                
                {{$t("hotelconsumable.rackInfo")}}：
                <el-select v-model="rackNumber" :placeholder="$t('hotelconsumable.rackInfo')"  @change="SelRack">
                    <el-option  v-for="rack in racks" :key="rack.value" :label="rack.value" :value="rack.value"></el-option>
                </el-select>
                <!-- <el-input style="width:150px" :placeholder="$t('hotelconsumable.rackInfo')" v-model="rackNumber"/> -->
                <template>
                    <el-button v-on:click="search()" type="primary" icon="el-icon-search">{{$t("hotelconsumable.searchConsumable")}}</el-button>
                    <el-button v-on:click="openDoor()" type="primary" icon="el-icon-check" v-show="showOperate">{{$t("hotelconsumable.openDoor")}}</el-button>
                    <el-button v-on:click="closeDoor()" type="primary" icon="el-icon-close" v-show="showOperate">{{$t("hotelconsumable.closeDoor")}}</el-button>
                    <el-button v-on:click="scanHotel()" type="primary" icon="el-icon-view">{{$t("hotelconsumable.scanHotel")}}</el-button>
                    <el-button v-on:click="release()" type="primary" icon="el-icon-rank" v-show="showOperate">{{$t("hotelconsumable.release")}}</el-button>
                    <el-button v-on:click="roll()" type="primary" icon="el-icon-refresh" v-show="showOperate">{{$t("hotelconsumable.roll")}}</el-button>
                    <el-button v-on:click="synchronous()" type="primary" icon="el-icon-upload" >{{$t("hotelconsumable.synchronous")}}</el-button>
                </template>
                <div style="float:right">
                   <el-input :value="stateValue" v-show="showState"></el-input>

                    <el-tooltip v-show="showRunning" class="item" effect="dark" :content="$t('hotelconsumable.showRunning')" placement="top-start">
                        <el-button type="warning" icon="el-icon-loading" circle></el-button>
                    </el-tooltip>
                    <el-tooltip v-show="showIdle" class="item" effect="dark" :content="$t('hotelconsumable.showIdle')" placement="top-start">
                        <el-button type="success" icon="el-icon-minus" circle></el-button>
                    </el-tooltip>
                    <el-tooltip v-show="showError" class="item" effect="dark" :content="$t('hotelconsumable.showError')" placement="top-start">
                        <el-button type="danger" icon="el-icon-close" circle></el-button>
                    </el-tooltip>
                    <el-tooltip v-show="showHand" class="item" effect="dark" :content="$t('hotelconsumable.showHand')" placement="top-start">
                        <el-button type="info" icon="el-icon-time" circle></el-button>
                    </el-tooltip>
                     <el-tooltip v-show="showOff" class="item" effect="dark" :content="$t('hotelconsumable.showOff')" placement="top-start">
                        <el-button type="Background B" icon="el-icon-time" circle></el-button>
                    </el-tooltip>
                </div>
           </div>
        </div>
        <div style="margin-left:50px;margin-top: 20px;">
            <el-scrollbar style="width: 100%">
                <el-table :data="tableData" border>
                    <el-table-column v-for="(col,index) in cols" 
                            :key="index"
                            :prop="col.prop" 
                            :label="col.label"
                            :width="col.width"
                            :class="{active:active==col.label}">
                    </el-table-column>
                </el-table>
            </el-scrollbar>
        </div>
        <el-dialog
            :title="$t('hotelconsumable.tips')"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <span>{{message}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ConfirmCancle()">{{$t('hotelconsumable.cancle')}}</el-button>
                <el-button type="primary" @click="ConfirmOk()">{{$t('hotelconsumable.confirm')}}</el-button>
            </span>
    </el-dialog>
    </div>
</template>
<script>
    import * as api from "@/api/hotel.js";
    const signalR = require("@aspnet/signalr");
    export default {
    data() {
        return {
                active:'',
                rackInfo:'',
                centerDialogVisible: false,
                message:'',
                showState:false,
                showOperate:true,
                stateValue:'',
                showRunning: false,
                showIdle:false,
                showError:false,
                showHand:false,
                showOff:false,
                listLoading:'',
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
                devices: [],
                selectDevice:'',
                cols:[],
                tableData:[],
                deviceType:'',
                racks:[
                    {value: 'ALL'},{value: '1'},{value: '2'},{value: '3'},{value: '4'},{value: '5'},{value: '6'},{value: '7'},{value: '8'}, 
                    {value: '9'},{value: '10'},{value: '11'},{value: '12'},{value: '13'},{value: '14'} 
                ],
                rackNumber:'ALL',
                }
            }, 
            created:function(){
                    this.$nextTick(() => {
                    let connection = new signalR.HubConnectionBuilder()
                        .withUrl("/monitor")
                        .build();
                    connection.on("DeviceConnection", data => {
                        this.onDeviceStateChanged(data.Id, data.State);
                    });
                    connection.on("RefreshDeviceState", data => {
                        this.onDeviceStateChanged(data.Id, data.State);
                    });
                    connection.start();
                    });

                    //根据区域 获取设备填写入设备控件
                    var params = {area:this.selectArea};
                    api.getHotelByArea(params).then((response) => 
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
                        this.selectDevice=this.devices[0].key;
                        this.search();
                        this.currentSel(this.selectDevice)
                    }).catch(err => (
                        this.devices=[],
                        this.selectDevice='',
                        this.listLoading = false,
                        this.showRunning=false,
                        this.showIdle=false,
                        this.showError=false,
                        this.showOff=true
                        ));
            },
            methods:
            { 
                onDeviceStateChanged(sn, state) {
                    if (this.selectDevice==sn) 
                    {
                            if(state=='2')
                            {
                                this.showRunning=false;
                                this.showIdle=true;
                                this.showError=false;
                                this.showHand=false;
                                 this.showOff=false;
                            }
                            else if(state=='1')
                            {
                                this.showRunning=true;
                                this.showIdle=false;
                                this.showError=false;
                                this.showHand=false;
                                this.showOff=false;
                            }
                            else if(state=='6')
                            {
                                this.showRunning=false;
                                this.showIdle=false;
                                this.showError=false;
                                this.showHand=true;
                                this.showOff=false;
                            }
                            else if(state=='3')
                            {
                                this.showRunning=false;
                                this.showIdle=false;
                                this.showError=false;
                                this.showHand=false;
                                this.showOff=true;
                            }
                            else
                            {
                                this.showRunning=false;
                                this.showIdle=false;
                                this.showError=true;
                                this.showHand=false;
                                this.showOff=false;
                            }
                    }
                },
                currentArea(area)
                {
                    //根据区域 获取设备填写入设备控件
                    var params = {area:this.selectArea};
                    api.getHotelByArea(params).then((response) => 
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
                        this.selectDevice=this.devices[0].key;
                        this.deviceType=this.devices[0].type;
                    }).catch(err => (
                        this.devices=[],
                        this.selectDevice='',
                        this.deviceType='',
                        this.listLoading = false,
                        this.showRunning=false,
                        this.showIdle=false,
                        this.showError=true
                        ));
                },
                currentSel(id)
                {
                    for (var i = 0; i <  this.devices.length; i++)
                    {
                        if (this.devices[i].key == id)
                        {
                            this.stateValue= this.devices[i].state;
                            this.deviceType=this.devices[i].type;
                        } 
                    }  
                    if(this.stateValue=='2')
                    {
                        this.showRunning=false;
                        this.showIdle=true;
                        this.showError=false;
                        this.showHand=false;
                        this.showOff=false;
                    }
                    else if(this.stateValue=='1')
                    {
                        this.showRunning=true;
                        this.showIdle=false;
                        this.showError=false;
                        this.showHand=false;
                        this.showOff=false;
                    }
                    else if(this.stateValue=='6')
                    {
                        this.showRunning=false;
                        this.showIdle=false;
                        this.showError=false;
                        this.showHand=true;
                        this.showOff=false;
                    } 
                    else if(state=='4')
                    {
                        this.showRunning=false;
                        this.showIdle=false;
                        this.showError=false;
                        this.showHand=false;
                        this.showOff=true;
                    }
                    else
                    {
                        this.showRunning=false;
                        this.showIdle=false;
                        this.showError=true;
                        this.showHand=false;
                        this.showOff=false;
                    }

                    if(this.deviceType=='4')
                    {
                        this.showOperate=false;
                        this.racks=[{value: 'ALL'},{value: '1'},{value: '2'}];
                    }else
                    {
                        this.showOperate=true;
                        this.racks=[
                                {value: 'ALL'},{value: '1'},{value: '2'},{value: '3'},{value: '4'},{value: '5'},{value: '6'},{value: '7'},{value: '8'}, 
                                {value: '9'},{value: '10'},{value: '11'},{value: '12'},{value: '13'},{value: '14'} 
                            ];
                    }
                },
                search()
                { 
                    var params = {sn:this.selectDevice}
                    //查表头
                    api.searchRack(params).then((response) => 
                    {
                        var query = response.Data;
                        this.cols=[];
                        for(let info of query)
                        {
                            var value = new Object();
                            value.label = info.RackId;
                            value.prop= info.Index+'';
                            value.Width=140;
                            this.cols.unshift(value);
                        }
                        var value = new Object();
                        value.label =this.$t('hotelconsumable.level');
                        value.prop= 'level';
                        value.Width=120;
                        this.cols.unshift(value);
                        this.searhContext();
                    }).catch(err => (this.listLoading = false));
                },
                searhContext()
                {
                    var params = {sn:this.selectDevice}
                    if(this.showOperate)
                    {
                        api.searchHotelData(params).then((response) => 
                        {
                            var query = response.Data;
                            this.tableData = [];
                            var letters = "0ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice('');
                            for(var i=1;i<19;i++)
                            {
                                var value = new Object();
                                value.level=letters[i];
                                for (let info of query)
                                {
                                    if(i==info.Index)
                                    {
                                        switch(info.RackIndex)
                                        {
                                            case 1:
                                                value[1]=info.Code;
                                                break
                                            case 2:
                                                value[2]=info.Code;
                                                break
                                            case 3:
                                                value[3]=info.Code;
                                                break
                                            case 4:
                                                value[4]=info.Code;
                                                break
                                            case 5:
                                                value[5]=info.Code;
                                                break
                                            case 6:
                                                value[6]=info.Code;
                                                break
                                            case 7:
                                                value[7]=info.Code;
                                                break
                                            case 8:
                                                value[8]=info.Code;
                                                break
                                            case 9:
                                                value[9]=info.Code;
                                                break
                                            case 10:
                                                value[10]=info.Code;
                                                break
                                            case 11:
                                                value[11]=info.Code;
                                                break
                                            case 12:
                                                value[12]=info.Code;
                                                break
                                            case 13:
                                                value[13]=info.Code;
                                                break
                                            case 14:
                                                value[14]=info.Code;
                                                break
                                            case 15:
                                                value[15]=info.Code;
                                                break
                                            case 16:
                                                value[16]=info.Code;
                                                break
                                            case 17:
                                                value[17]=info.Code;
                                                break
                                            case 18:
                                                value[18]=info.Code;
                                                break
                                        }
                                    }
                                }
                                this.tableData.unshift(value);
                            }
                            var value = new Object();
                            value[1]="1";value[2]="2";value[3]="3";
                            value[4]="4";value[5]="5";value[6]="6";
                            value[7]="7";value[8]="8";value[9]="9";
                            value[10]="10";value[11]="11";value[12]="12";
                            value[13]="13";value[14]="14";
                            this.tableData.push(value);
                        }).catch(err => (this.listLoading = false));
                    }
                    else
                    {
                       api.searchHotelData(params).then((response) => 
                        {
                            var query = response.Data;
                            this.tableData = [];
                            var letters = "0ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice('');
                            for(var i=1;i<22;i++)
                            {
                                var value = new Object();
                                value.level=letters[i];
                                for (let info of query)
                                {
                                    if(i==info.Index)
                                    {
                                        switch(info.RackIndex)
                                        {
                                            case 1:
                                                value[1]=info.Code;
                                                break
                                            case 2:
                                                value[2]=info.Code;
                                                break
                                        }
                                    }
                                }
                                this.tableData.unshift(value);
                            }
                            var value = new Object();
                            value[1]="1";value[2]="2";
                            this.tableData.push(value);
                        }).catch(err => (this.listLoading = false));
                    }
                },
                openDoor()
                {
                    var params = {HotelId:this.selectDevice}
                    //查表头
                    api.openDoor(params).then((response) => 
                    {
                        this.$message(this.$t('hotelconsumable.openDoorMsg'));
                    }).catch(err => (this.listLoading = false));
                },
                closeDoor()
                {
                    var params = {HotelId:this.selectDevice}
                    //查表头
                    api.closeDoor(params).then((response) => 
                    {
                        this.$message(this.$t('hotelconsumable.closeDoorMsg'));
                    }).catch(err => (this.listLoading = false));
                },
                scanHotel()
                {
                    this.centerDialogVisible=true;
                    if(this.rackNumber=='ALL')
                    { 
                        this.message=this.$t('hotelconsumable.confirmScanAll');
                    }
                    else
                    {
                        this.message=this.$t('hotelconsumable.confirmScanRack')+'(Rack:'+this.rackNumber+')';
                    } 
                },
                release()
                {
                    var params = {HotelId:this.selectDevice}
                    //查表头
                    api.release(params).then((response) => 
                    {
                        this.$message(this.$t('hotelconsumable.releaseMsg'));
                    }).catch(err => (this.listLoading = false));
                },
                roll()
                {
                    if(this.rackNumber!='ALL')
                    {
                        var params = {HotelId:this.selectDevice,RackIndex:this.rackNumber}
                        //查表头
                        api.rollRack(params).then((response) => 
                        {
                            this.$message(this.$t('hotelconsumable.rollMsg'));
                        }).catch(err => (this.listLoading = false));
                    }else
                    {
                         this.$message(this.$t('hotelconsumable.selectRackMsg'));
                    }
                },
                synchronous()
                {
                    //同步库存信息
                    var params = {HotelId:this.selectDevice}
                    //查表头
                    api.store(params).then((response) => 
                    {
                        this.$message(this.$t('hotelconsumable.storeMsg'));
                    }).catch(err => (this.listLoading = false));
                },
                ConfirmCancle()
                {
                    this.centerDialogVisible=false;
                },
                ConfirmOk()
                {
                    this.centerDialogVisible=false;
                    if(this.rackNumber=='ALL')
                    { 
                        //rack全扫和单扫
                        var params = {HotelId:this.selectDevice,PN:''}
                        //查表头
                        api.scanRack(params).then((response) => 
                        {
                            this.$message(this.$t('hotelconsumable.scanHotelMsg'));
                        }).catch(err => (this.listLoading = false));
                    }
                    else
                    {
                        //rack全扫和单扫
                        var params = {HotelId:this.selectDevice,PN:this.rackNumber}
                        //查表头
                        api.scanRack(params).then((response) => 
                        {
                            this.$message(this.$t('hotelconsumable.scanHotelMsg'));
                        }).catch(err => (this.listLoading = false)); 
                    } 
                },
                SelRack(value)
                {
                    if(value!='ALL')
                    {
                        this.rackNumber=value;
                    }
                    else
                    {
                        this.rackNumber='ALL';
                    }
                }
        }
    }   
    
</script>

<style>
  .transition-box {
    margin-bottom: 0px;
    width: 200px;
    height: 150px;
    border-radius: 4px;
    background-color: rgb(248, 250, 252);
    text-align: center;
    color: rgb(79, 100, 168);
    box-sizing: border-box;
    margin-right: 10px;
    align-items: center;
  }
  .el-table_1_column_1     is-leaf 
  {
      background: #fd7522;
  }
</style>