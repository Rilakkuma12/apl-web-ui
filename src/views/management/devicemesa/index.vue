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
      <el-button v-on:click="getBoardsByDeviceID()" v-text="$t('mesadevice.searchMesa')"></el-button>
      <!-- <el-button v-on:click="clearMesaById()" v-text="$t('mesadevice.clearMesa')"></el-button> -->
       <el-button v-on:click="synMesaById()" v-text="$t('mesadevice.synMesa')"></el-button>
      </div>
     </div>
      <div v-if="display">
         <div style="display: flex;margin-top:40px;margin-left:50px;">
            <transition>
            <div class="transition-box">
                  <el-form>
                  <el-form-item label="POS1"/>
                  <el-form-item>{{pos1}}</el-form-item>
                  <el-form-item>{{lidpos1}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS6"/>
                  <el-form-item>{{pos6}}</el-form-item>
                  <el-form-item>{{lidpos6}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition v-if="display">
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS11"/>
                  <el-form-item>{{pos11}}</el-form-item>
                  <el-form-item>{{lidpos11}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS16"/>
                  <el-form-item>{{pos16}}</el-form-item>
                  <el-form-item>{{lidpos16}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS21"/>
                  <el-form-item>{{pos21}}</el-form-item>
                  <el-form-item>{{lidpos21}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS26"/>
                  <el-form-item>{{pos26}}</el-form-item>
                  <el-form-item>{{lidpos26}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form >
                  <el-form-item label="POS31"/>
                  <el-form-item>{{pos31}}</el-form-item>
                  <el-form-item>{{lidpos31}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS36"/>
                  <el-form-item>{{pos36}}</el-form-item>
                  <el-form-item>{{lidpos36}}</el-form-item>
               </el-form>
            </div>
            </transition>
         </div>
         <div style="display: flex;margin-top:5px;margin-left:50px;">
            <transition>
            <div class="transition-box">
                  <el-form>
                  <el-form-item label="POS2"/>
                  <el-form-item>{{pos2}}</el-form-item>
                  <el-form-item>{{lidpos2}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS7"/>
                  <el-form-item>{{pos7}}</el-form-item>
                  <el-form-item>{{lidpos7}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS12"/>
                  <el-form-item>{{pos12}}</el-form-item>
                  <el-form-item>{{lidpos12}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS17"/>
                  <el-form-item>{{pos17}}</el-form-item>
                  <el-form-item>{{lidpos17}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS22"/>
                  <el-form-item>{{pos22}}</el-form-item>
                  <el-form-item>{{lidpos22}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS27"/>
                  <el-form-item>{{pos27}}</el-form-item>
                  <el-form-item>{{lidpos27}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form >
                  <el-form-item label="POS32"/>
                  <el-form-item>{{pos32}}</el-form-item>
                  <el-form-item>{{lidpos32}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS37"/>
                  <el-form-item>{{pos37}}</el-form-item>
                  <el-form-item>{{lidpos37}}</el-form-item>
               </el-form>
            </div>
            </transition>
         </div>
         
         <div style="display: flex;margin-top:5px;margin-left:50px;">
            <transition>
            <div class="transition-box">
                  <el-form>
                  <el-form-item label="POS3"/>
                     <el-form-item>{{pos3}}</el-form-item>
                  <el-form-item>{{lidpos3}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS8"/>
                  <el-form-item>{{pos8}}</el-form-item>
                  <el-form-item>{{lidpos8}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS13"/>
                     <el-form-item>{{pos13}}</el-form-item>
                  <el-form-item>{{lidpos13}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS18"/>
                  <el-form-item>{{pos18}}</el-form-item>
                  <el-form-item>{{lidpos18}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS23"/>
                     <el-form-item>{{pos23}}</el-form-item>
                  <el-form-item>{{lidpos23}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS28"/>
                  <el-form-item>{{pos28}}</el-form-item>
                  <el-form-item>{{lidpos28}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form >
                  <el-form-item label="POS33"/>
                  <el-form-item>{{pos33}}</el-form-item>
                  <el-form-item>{{lidpos33}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS38"/>
                  <el-form-item>{{pos38}}</el-form-item>
                  <el-form-item>{{lidpos38}}</el-form-item>
               </el-form>
            </div>
            </transition>
         </div>

         <div style="display: flex;margin-top:5px;margin-left:50px;">
            <transition>
            <div class="transition-box">
                  <el-form>
                  <el-form-item label="POS4"/>
                  <el-form-item>{{pos4}}</el-form-item>
                  <el-form-item>{{lidpos4}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS9"/>
                  <el-form-item>{{pos9}}</el-form-item>
                  <el-form-item>{{lidpos9}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS14"/>
                  <el-form-item>{{pos14}}</el-form-item>
                  <el-form-item>{{lidpos14}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS19"/>
                  <el-form-item>{{pos19}}</el-form-item>
                  <el-form-item>{{lidpos19}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS24"/>
                  <el-form-item>{{pos24}}</el-form-item>
                  <el-form-item>{{lidpos24}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS29"/>
                  <el-form-item>{{pos29}}</el-form-item>
                  <el-form-item>{{lidpos29}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form >
                  <el-form-item label="POS34"/>
                  <el-form-item>{{pos34}}</el-form-item>
                  <el-form-item>{{lidpos34}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS39"/>
                  <el-form-item>{{pos39}}</el-form-item>
                  <el-form-item>{{lidpos39}}</el-form-item>
               </el-form>
            </div>
            </transition>
         </div>
         <div style="display: flex;margin-top:5px;margin-left:50px;">
            <transition>
            <div class="transition-box">
                  <el-form>
                  <el-form-item label="POS5"/>
                  <el-form-item>{{pos5}}</el-form-item>
                  <el-form-item>{{lidpos5}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS10"/>
                  <el-form-item>{{pos10}}</el-form-item>
                  <el-form-item>{{lidpos10}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS15"/>
                  <el-form-item>{{pos15}}</el-form-item>
                  <el-form-item>{{lidpos15}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS20"/>
                  <el-form-item>{{pos20}}</el-form-item>
                  <el-form-item>{{lidpos20}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS25"/>
                  <el-form-item>{{pos25}}</el-form-item>
                  <el-form-item>{{lidpos25}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS30"/>
                     <el-form-item>{{pos30}}</el-form-item>
                  <el-form-item>{{lidpos30}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition>
            <div class="transition-box">
               <el-form >
                  <el-form-item label="POS35"/>
                  <el-form-item>{{pos35}}</el-form-item>
                  <el-form-item>{{lidpos35}}</el-form-item>
               </el-form>
            </div>
            </transition>
            <transition >
            <div class="transition-box">
               <el-form>
                  <el-form-item label="POS40"/>
                     <el-form-item>{{pos40}}</el-form-item>
                  <el-form-item>{{lidpos40}}</el-form-item>
               </el-form>
            </div>
            </transition>
         </div>
      </div>
      <div v-if="spdisplay">
         <table class="item">
            <tr>
               <td>
                    <transition>
                     <div class="transition-box">
                           <el-form>
                           <el-form-item label="POS1"/>
                           <el-form-item>{{pos1}}</el-form-item>
                           <el-form-item>{{lidpos1}}</el-form-item>
                        </el-form>
                     </div>
                     </transition>
               </td>
               <td>
                  <transition>
                     <div class="transition-box">
                           <el-form>
                           <el-form-item label="POS2"/>
                           <el-form-item>{{pos2}}</el-form-item>
                           <el-form-item>{{lidpos2}}</el-form-item>
                        </el-form>
                     </div>
                     </transition>
               </td>
               <td>
                  <transition>
                     
                  </transition>
               </td>
               <td>
                    <transition>
                     <div class="transition-box">
                           <el-form>
                           <el-form-item label="POS9"/>
                           <el-form-item>{{pos9}}</el-form-item>
                           <el-form-item>{{lidpos9}}</el-form-item>
                        </el-form>
                     </div>
                     </transition>
               </td>
            </tr>
             <tr>
                <td>
                    <transition>
                    </transition>
               </td>
               <td>
                  <transition>
                     <div class="transition-box">
                           <el-form>
                           <el-form-item label="POS3"/>
                           <el-form-item>{{pos3}}</el-form-item>
                           <el-form-item>{{lidpos3}}</el-form-item>
                        </el-form>
                     </div>
                     </transition>
               </td>
               <td>
                  <transition>
                      <div class="transition-box">
                           <el-form>
                           <el-form-item label="POS6"/>
                           <el-form-item>{{pos6}}</el-form-item>
                           <el-form-item>{{lidpos6}}</el-form-item>
                        </el-form>
                     </div>
                  </transition>
               </td>
               <td>
                    <transition>
                     <div class="transition-box">
                           <el-form>
                           <el-form-item label="POS10"/>
                           <el-form-item>{{pos10}}</el-form-item>
                           <el-form-item>{{lidpos10}}</el-form-item>
                        </el-form>
                     </div>
                     </transition>
               </td>
            </tr>
             <tr>
                <td>
                    <transition>
                    </transition>
               </td>
               <td>
                  <transition>
                     <div class="transition-box">
                           <el-form>
                           <el-form-item label="POS4"/>
                           <el-form-item>{{pos4}}</el-form-item>
                           <el-form-item>{{lidpos4}}</el-form-item>
                        </el-form>
                     </div>
                     </transition>
               </td>
               <td>
                  <transition>
                      <div class="transition-box">
                           <el-form>
                           <el-form-item label="POS7"/>
                           <el-form-item>{{pos7}}</el-form-item>
                           <el-form-item>{{lidpos7}}</el-form-item>
                        </el-form>
                     </div>
                  </transition>
               </td>
               <td>
                    <transition>
                     <div class="transition-box">
                           <el-form>
                           <el-form-item label="POS11"/>
                           <el-form-item>{{pos11}}</el-form-item>
                           <el-form-item>{{lidpos11}}</el-form-item>
                        </el-form>
                     </div>
                     </transition>
               </td>
            </tr>
             <tr>
                <td>
                    <transition>
                    </transition>
               </td>
               <td>
                  <transition>
                     <div class="transition-box">
                           <el-form>
                           <el-form-item label="POS5"/>
                           <el-form-item>{{pos5}}</el-form-item>
                           <el-form-item>{{lidpos5}}</el-form-item>
                        </el-form>
                     </div>
                     </transition>
               </td>
               <td>
                  <transition>
                      <div class="transition-box">
                           <el-form>
                           <el-form-item label="POS8"/>
                           <el-form-item>{{pos8}}</el-form-item>
                           <el-form-item>{{lidpos8}}</el-form-item>
                        </el-form>
                     </div>
                  </transition>
               </td>
               <td>
                    <transition>
                     <div class="transition-box">
                           <el-form>
                           <el-form-item label="POS12"/>
                           <el-form-item>{{pos12}}</el-form-item>
                           <el-form-item>{{lidpos12}}</el-form-item>
                        </el-form>
                     </div>
                     </transition>
               </td>
            </tr>
         </table>
      </div>
  </div>
</template>

<script>
    import * as api from "@/api/mesadevice.js";
    export default {
  data() {
    return {
        display:false,
        spdisplay:false,
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
        value: '',
        pos1: "", pos2: "", pos3: "", pos4: "", pos5: "", pos6: "", pos7: "", pos8: "", pos9: "", pos10: "",
                pos11: "", pos12: "", pos13: "", pos14: "", pos15: "", pos16: "", pos17: "", pos18: "", pos19: "", pos20: "",
                pos21: "", pos22: "", pos23: "", pos24: "", pos25: "", pos26: "", pos27: "", pos28: "", pos29: "", pos30: "",
                pos31: "", pos32: "", pos33: "", pos34: "", pos35: "", pos36: "", pos37: "", pos38: "", pos39: "", pos40: "",
         lidpos1: "", lidpos2: "", lidpos3: "", lidpos4: "", lidpos5: "", lidpos6: "", lidpos7: "", lidpos8: "", lidpos9: "", lidpos10: "",
                lidpos11: "", lidpos12: "", lidpos13: "", lidpos14: "",lidpos15: "", lidpos16: "", lidpos17: "", lidpos18: "", lidpos19: "", lidpos20: "",
                lidpos21: "", lidpos22: "", lidpos23: "", lidpos24: "",lidpos25: "", lidpos26: "", lidpos27: "", lidpos28: "", lidpos29: "", lidpos30: "",
                lidpos31: "", lidpos32: "", lidpos33: "", lidpos34: "",lidpos35: "",lidpos36: "", lidpos37: "", lidpos38: "", lidpos39: "", lidpos40: "",   
        }
      },
      created: function () {
                //根据区域 获取设备填写入设备控件
                    var params = {area:this.selectArea};
                    api.getDeviceByArea(params).then((response) => 
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
                        if(this.devices[0].type==2)
                        {
                           this.display=false;
                           this.spdisplay=true;
                           
                        }else
                        {
                           this.display=true;
                           this.spdisplay=false;
                        }
                        this.getBoardsByDeviceID();
                    }).catch(err => (
                        this.devices=[],
                        this.selectDevice='',
                        this.listLoading = false,
                        this.showRunning=false,
                        this.showIdle=false,
                        this.showError=true
                        ));
            },
      methods:
      {
         currentArea(area)
                {
                    this.clear();
                    //根据区域 获取设备填写入设备控件
                    var params = {area:this.selectArea};
                    api.getDeviceByArea(params).then((response) => 
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
                        if(this.devices[0].type==2)
                        {
                           this.display=false;
                           this.spdisplay=true;
                           
                        }else
                        {
                           this.display=true;
                           this.spdisplay=false;
                        }
                    }).catch(err => (
                        this.devices=[],
                        this.selectDevice='',
                        this.listLoading = false,
                        this.showRunning=false,
                        this.showIdle=false,
                        this.showError=true
                        ));
                },
         currentDevice(selectDevice)
         {
            this.clear();
            this.selectDevice=selectDevice;
            this.devices.forEach(device => {
                  if (device.key==selectDevice) 
                  {
                     if(device.type==2)
                     {
                        this.display=false;
                        this.spdisplay=true;
                     }else
                     {
                        this.display=true;
                        this.spdisplay=false;
                     }
                  }  
            });
           
         },
         clearMesaById()
         { 
            if(confirm(this.$t("mesadevice.clearMsg"))==true){
               var params = {sn:this.selectDevice};
               api.clear(params).then((res)=>
               {
                this.listLoading =true;
               }).catch(err => (this.listLoading = false));
            }
         },
         synMesaById()
         {
            var params = {sn:this.selectDevice};
            api.synMesa(params).then((res)=>
            {
               this.listLoading =true;
            }).catch(err => (this.listLoading = false));
         },
         getBoardsByDeviceID(){
            this.clear();
            var params = {sn:this.selectDevice};
            api.search(params).then((response) => 
                  {
                     var query = response.Data; 
                      for (let info of query) {
                                switch (info.Position) {
                                    case 1:
                                        this.pos1 = info.BarCode;
                                        this.lidpos1=info.LidBarCode;
                                        break;
                                    case 2:
                                        this.pos2 = info.BarCode;
                                        this.lidpos2=info.LidBarCode;
                                        break;
                                    case 3:
                                        this.pos3 = info.BarCode;
                                        this.lidpos3=info.LidBarCode;
                                        break;
                                    case 4:
                                        this.pos4 = info.BarCode;
                                        this.lidpos4=info.LidBarCode;
                                        break;
                                    case 5:
                                        this.pos5 = info.BarCode;
                                        this.lidpos5=info.LidBarCode;
                                        break;
                                    case 6:
                                        this.pos6 = info.BarCode;
                                        this.lidpos6=info.LidBarCode;
                                        break;
                                    case 7:
                                        this.pos7 = info.BarCode;
                                        this.lidpos7=info.LidBarCode;
                                        break;
                                    case 8:
                                        this.pos8 = info.BarCode;
                                        this.lidpos8=info.LidBarCode;
                                        break;
                                    case 9:
                                        this.pos9 = info.BarCode;
                                        this.lidpos9=info.LidBarCode;
                                        break;
                                    case 10:
                                        this.pos10 = info.BarCode;
                                        this.lidpos10=info.LidBarCode;
                                        break;
                                    case 11:
                                        this.pos11 = info.BarCode;
                                        this.lidpos11=info.LidBarCode;
                                        break;
                                    case 12:
                                        this.pos12 = info.BarCode;
                                        this.lidpos12=info.LidBarCode;
                                        break;
                                    case 13:
                                        this.pos13 = info.BarCode;
                                        this.lidpos13=info.LidBarCode;
                                        break;
                                    case 14:
                                        this.pos14 = info.BarCode;
                                        this.lidpos14=info.LidBarCode;
                                        break;
                                    case 15:
                                        this.pos15 = info.BarCode;
                                         this.lidpos15=info.LidBarCode;
                                        break;
                                    case 16:
                                        this.pos16 = info.BarCode;
                                         this.lidpos16=info.LidBarCode;
                                      break;
                                    case 17:
                                        this.pos17 = info.BarCode;
                                        this.lidpos17=info.LidBarCode;
                                        break;
                                    case 18:
                                        this.pos18 = info.BarCode;
                                        this.lidpos18=info.LidBarCode;
                                        break;
                                    case 19:
                                        this.pos19 = info.BarCode;
                                        this.lidpos19=info.LidBarCode;
                                        break;
                                    case 20:
                                        this.pos20 = info.BarCode;
                                        this.lidpos20=info.LidBarCode;
                                        break;
                                    case 21:
                                        this.pos21 = info.BarCode;
                                         this.lidpos21=info.LidBarCode;
                                        break;
                                    case 22:
                                        this.pos22 = info.BarCode;
                                         this.lidpos22=info.LidBarCode;
                                        break;
                                    case 23:
                                        this.pos23 = info.BarCode;
                                         this.lidpos23=info.LidBarCode;
                                        break;
                                    case 24:
                                        this.pos24 = info.BarCode;
                                         this.lidpos24=info.LidBarCode;
                                        break;
                                    case 25:
                                        this.pos25 = info.BarCode;
                                         this.lidpos25=info.LidBarCode;
                                        break;
                                    case 26:
                                        this.pos26 = info.BarCode;
                                         this.lidpos26=info.LidBarCode;
                                        break;
                                    case 27:
                                        this.pos27 = info.BarCode;
                                         this.lidpos27=info.LidBarCode;
                                        break;
                                    case 28:
                                        this.pos28 = info.BarCode;
                                         this.lidpos27=info.LidBarCode;
                                        break;
                                    case 29:
                                        this.pos29 = info.BarCode;
                                         this.lidpos29=info.LidBarCode;
                                        break;
                                    case 30:
                                        this.pos30 = info.BarCode;
                                         this.lidpos30=info.LidBarCode;
                                        break;
                                    case 31:
                                        this.pos31 = info.BarCode;
                                         this.lidpos31=info.LidBarCode;
                                        break;
                                    case 32:
                                        this.pos32 = info.BarCode;
                                         this.lidpos32=info.LidBarCode;
                                        break;
                                    case 33:
                                        this.pos33 = info.BarCode;
                                         this.lidpos33=info.LidBarCode;
                                        break;
                                    case 34:
                                        this.pos34 = info.BarCode;
                                         this.lidpos34=info.LidBarCode;
                                        break;
                                    case 35:
                                        this.pos35 = info.BarCode;
                                         this.lidpos36=info.LidBarCode;
                                        break;
                                    case 36:
                                        this.pos36 = info.BarCode;
                                         this.lidpos36=info.LidBarCode;
                                        break;
                                    case 37:
                                        this.pos37 = info.BarCode;
                                         this.lidpos37=info.LidBarCode;
                                        break;
                                    case 38:
                                        this.pos38 = info.BarCode;
                                         this.lidpos38=info.LidBarCode;
                                        break;
                                    case 39:
                                        this.pos39 = info.BarCode;
                                         this.lidpos39=info.LidBarCode;
                                        break;
                                    case 40:
                                        this.pos40 = info.BarCode;
                                         this.lidpos40=info.LidBarCode;
                                        break;
                                }
                            }
                  }).catch(err => (this.listLoading = false));
          },
          clear()
          {
               this.pos1= "";this.pos2="";this.pos3=""; this.pos4="";this.pos5="";this.pos6="";this.pos7="";this.pos8="";this.pos9="";this.pos10="";
               this.pos11="";this.pos12="";this.pos13="";this.pos14="";this.pos15="";this.pos16="";this.pos17="";this.pos18="";this.pos19="";this.pos20="";
               this.pos21="";this.pos22="";this.pos23="";this.pos24="";this.pos25="";this.pos26="";this.pos27="";this.pos28="";this.pos29="";this.pos30="";
               this.pos31="";this.pos32="";this.pos33="";this.pos34="";this.pos35="";this.pos36="";this.pos37="";this.pos38="";this.pos39="";this.pos40="";
               this.lidpos1="";this.lidpos2=""; this.lidpos3=""; this.lidpos4=""; this.lidpos5="";this.lidpos6=""; this.lidpos7=""; this.lidpos8=""; this.lidpos9=""; this.lidpos10="";
               this.lidpos11=""; this.lidpos12=""; this.lidpos13=""; this.lidpos14="";this.lidpos15="";this.lidpos16="";this.lidpos17=""; this.lidpos18=""; this.lidpos19="";this.lidpos20="";
               this.lidpos21=""; this.lidpos22=""; this.lidpos23=""; this.lidpos24="";this.lidpos25=""; this.lidpos26=""; this.lidpos27=""; this.lidpos28=""; this.lidpos29=""; this.lidpos30="";
               this.lidpos31=""; this.lidpos32=""; this.lidpos33=""; this.lidpos34="";this.lidpos35="";this.lidpos36=""; this.lidpos37=""; this.lidpos38="";this.lidpos39=""; this.lidpos40="";  
          }
      },
      watch:
      {
           //选择区域
           selectArea(area){
               //根据区域 获取设备填写入设备控件
               var  params = {area:this.selectArea};
               api.getDeviceByArea(params).then((response) => 
                  {
                     var query = response.Data;
                     this.devices = [];
                     for (let info of query) {
                        var value = new Object();
                        value.name = info.Name;
                        value.key = info.Id;
                        value.label=info.Name;
                        value.type=info.Type;
                        this.devices.unshift(value);
                     };
                  }).catch(err => (this.listLoading = false));
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
 .item{
    text-align: center;
    margin-left: 20%;
    margin-top: 120px;
}
</style>