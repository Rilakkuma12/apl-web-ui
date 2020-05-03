<template>
  <div>
    <div class="loading">
        <section v-loading="listLoading" ></section>
    </div>
    <el-tabs tab-position="left" style="margin-left:10px">
      <!-- 扫码 -->
      <el-tab-pane :label="$t('createtask.scan')">
        <table class="apl-table">
           <tr>
             <td>
                 {{$t("createtask.area")}}：
             </td>
              <td>
                    <el-select v-model="selectScanArea" :placeholder="$t('createtask.selectArea')" @change="currentScanArea">
                        <el-option v-for="area in scanareas" :key="area.value" :label="area.label" :value="area.value">
                        </el-option>
                    </el-select>
              </td>
            </tr>
            <tr>
              <td>
                 {{$t("createtask.deviceInfo")}}：
              </td>
              <td>
                    <el-select v-model="selectScanDevice" :placeholder="$t('createtask.selectDevice')" @change="currentScanDevice">
                        <el-option  v-for="device in scandevices" :key="device.key" :label="device.label" :value="device.key"></el-option>
                    </el-select>
              </td>
            <tr>
               <td>
                 {{$t("createtask.selectRack")}}：
              </td>
              <td>
                    <el-select v-model="selectRack" :placeholder="$t('createtask.selectRack')" @change="currentRack">
                        <el-option  v-for="rackInfo in racks" :key="rackInfo.key" :label="rackInfo.label" :value="rackInfo.key"></el-option>
                    </el-select>
              </td>
           </tr>

           <tr>
              <td></td>
              <td>
                  <el-button type="primary" @click="ScanHotel()">{{$t("createtask.run")}}</el-button>
                   <el-button type="primary" @click="RollHotel()">{{$t("createtask.roll")}}</el-button>
                  <el-button type="primary" @click="ScanCancle()">{{$t("createtask.cancle")}}</el-button>
              </td>
           </tr>
        </table>
      </el-tab-pane>
      <!-- 上料 -->
      <el-tab-pane :label="$t('createtask.load')">
        <table class="apl-table">
           <tr>
             <td>
                 {{$t("createtask.area")}}：
             </td>
              <td>
                    <el-select v-model="selectArea" :placeholder="$t('createtask.selectArea')" @change="currentArea">
                        <el-option v-for="area in areas" :key="area.value" :label="area.label" :value="area.value">
                        </el-option>
                    </el-select>
              </td>
           </tr>
            <tr>
              <td>
                 {{$t("createtask.deviceInfo")}}：
              </td>
              <td>
                    <el-select v-model="selectDevice" :placeholder="$t('createtask.selectDevice')" @change="currentloadDevice">
                        <el-option  v-for="device in devices" :key="device.key" :label="device.label" :value="device.key"></el-option>
                    </el-select>
              </td>
           </tr>
          <tr>
              <td>
                 {{$t("createtask.barcode")}}：
              </td>
              <td>
                <el-input style="width:165px" v-model="loadcode">
                </el-input>
                <el-button @click="GetHotelData()" v-show="showBrowse" >{{$t("createtask.browse")}}</el-button>
              </td>
           </tr>
           <tr>
              <td>{{$t("createtask.sourceRack")}}：</td>
              <td>
                <el-input style="width:165px" v-model="loadRcakNo" :readonly="readonlyRack">
                </el-input>
              </td>
           </tr>
           <tr>
              <td>{{$t("createtask.sourceLevel")}}： </td>
              <td>
                <el-input style="width:165px" v-model="loadLevelNo" :readonly="readonlyLevel">
                </el-input>
              </td>
           </tr>
           <tr>
              <td> {{$t("createtask.targetarea")}}：</td>
              <td>
                    <el-select v-model="selectTargetArea" :placeholder="$t('createtask.selectTargetArea')" @change="currentTargetArea">
                        <el-option v-for="area in targetAreas" :key="area.value" :label="area.label" :value="area.value">
                        </el-option>
                    </el-select>
              </td>
           </tr>
            <tr>
               <td> {{$t("createtask.targetdevice")}}：</td>
              <td>
                <el-select v-model="selectTargetDevice" :placeholder="$t('createtask.selectTargetDevice')" @change="currentTargetDevice">
                    <el-option  v-for="device in targetDevices" :key="device.key" :label="device.label" :value="device.key"></el-option>
                </el-select>
              </td>
           </tr>

            <tr>
               <td> {{$t("createtask.targetPos")}}：</td>
              <td>
                  <el-input style="width:150px" v-model="loadTargetPos">
                  </el-input>
              </td>
           </tr>
           <tr>
               <td></td>
              <td>
                  <div>
                    <el-checkbox v-model="xpeel">{{$t("createtask.xpeel")}}</el-checkbox>
                  </div>
                  <div>
                    <el-checkbox v-model="plateloc">{{$t("createtask.plateloc")}}</el-checkbox>
                  </div>
                  <div>
                    <el-checkbox v-model="centrifuge">{{$t("createtask.centrifuge")}}</el-checkbox>
                  </div>
              </td>
           </tr>
            <tr>
              <td></td>
              <td>
                  <el-button type="primary" @click="LoadConsumable()">{{$t("createtask.run")}}</el-button>
                  <el-button type="primary" @click="LoadCancle()">{{$t("createtask.cancle")}}</el-button>
              </td>
           </tr>
        </table>

        <el-dialog :title="$t('createtask.hoteltips')" :visible.sync="loadhotelEnable" width="40%"  center>
            <el-table :data="loadhotelData" style="width: 100%" @row-click="selectLoadRow">
              <el-table-column prop="r" label="R" width="180"></el-table-column>
              <el-table-column prop="l" label="L" width="180"></el-table-column>
              <el-table-column prop="pn" label="PN" width="180"></el-table-column>
              <el-table-column prop="code" label="CODE" width="180"></el-table-column>
            </el-table>
          </el-dialog>
      </el-tab-pane>
      <!-- 下料 -->
      <el-tab-pane :label="$t('createtask.quit')">
          <table class="aplquit-table">
           <tr>
             <td>
                {{$t("createtask.area")}}：
             </td>
              <td>
                  <el-select v-model="selectQuitArea" :placeholder="$t('createtask.selectArea')" @change="currentQuitArea">
                      <el-option v-for="area in quitareas" :key="area.value" :label="area.label" :value="area.value">
                      </el-option>
                  </el-select>
              </td>
           </tr>
            <tr>
              <td>
                  {{$t("createtask.deviceInfo")}}：
              </td>
              <td>
                    <el-select v-model="selectQuitDevice" :placeholder="$t('createtask.selectDevice')" @change="currentQuitDevice">
                        <el-option  v-for="device in quitdevices" :key="device.key" :label="device.label" :value="device.key"></el-option>
                    </el-select>
              </td>
            <tr>
            <tr>
              <td>
                  {{$t("createtask.barcode")}}：
              </td>
              <td>
                <el-input style="width:165px" v-model="quitcode">
                </el-input>
                <el-button @click="GetDevicePOS()">{{$t("createtask.browse")}}</el-button>
              </td>
           </tr>
            <tr>
               <td> {{$t("createtask.targetPos")}}：</td>
              <td>
                  <el-input style="width:150px" v-model="quitSourcePos" :readonly="readonlySourcePos">
                  </el-input>
              </td>
           </tr>
            <tr>
             <td>
                {{$t("createtask.targetarea")}}：
             </td>
              <td>
                  <el-select v-model="selectQuitTargetArea" :placeholder="$t('createtask.selectTargetArea')" @change="currentQuitTargetArea">
                      <el-option v-for="area in quitareas" :key="area.value" :label="area.label" :value="area.value">
                      </el-option>
                  </el-select>
              </td>
           </tr>
           <tr>
              <td>
                 {{$t("createtask.targetdevice")}}：
              </td>
              <td>
                    <el-select v-model="selectQuitTargetDevice" :placeholder="$t('createtask.selectTargetDevice')" @change="currentTargetQuitDevice">
                        <el-option  v-for="device in quitTargetdevices" :key="device.key" :label="device.label" :value="device.key"></el-option>
                    </el-select>
              </td>
            </tr>
            <tr>
              <td>{{$t("createtask.targetRack")}}：</td>
              <td>
                <el-input style="width:165px" v-model="quitRcakNo">
                </el-input>
              </td>
            </tr>
            <tr>
              <td>{{$t("createtask.targetLevel")}}： </td>
              <td>
                <el-input style="width:165px" v-model="quitLevelNo">
                </el-input>
              </td>
           </tr>
           <tr>
               <td></td>
              <td>
                  <div>
                    <el-checkbox v-model="quitxpeel">{{$t("createtask.xpeel")}}</el-checkbox>
                  </div>
                  <div>
                    <el-checkbox v-model="quitplateloc">{{$t("createtask.plateloc")}}</el-checkbox>
                  </div>
                  <div>
                    <el-checkbox v-model="quitcentrifuge">{{$t("createtask.centrifuge")}}</el-checkbox>
                  </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                  <el-button type="primary" @click="QuitConsumable()">{{$t("createtask.run")}}</el-button>
                  <el-button type="primary" @click="QuitCancle()">{{$t("createtask.cancle")}}</el-button>
              </td>
           </tr>
          </table>
          <el-dialog :title="$t('createtask.mesatips')" :visible.sync="quitMesaEnable" width="40%"  center>
            <el-table :data="quitMesaData" style="width: 100%" @row-click="selectquitMesaRow">
              <el-table-column prop="pos" label="POS" width="180"></el-table-column>
              <el-table-column prop="lidcode" label="LidBarCode" width="180"></el-table-column>
              <el-table-column prop="code" label="CODE" width="180"></el-table-column>
            </el-table>
          </el-dialog>
      </el-tab-pane>
      <!-- 转移 -->
      <el-tab-pane :label="$t('createtask.move')">
         <table class="apl-table">
           <tr>
             <td>
                 {{$t("createtask.area")}}：
             </td>
              <td>
                    <el-select v-model="moveSourceArea" :placeholder="$t('createtask.selectArea')" @change="currentMoveArea">
                        <el-option v-for="area in moveareas" :key="area.value" :label="area.label" :value="area.value">
                        </el-option>
                    </el-select>
              </td>
           </tr>
            <tr>
              <td>
                  {{$t("createtask.deviceInfo")}}：
              </td>
              <td>
                    <el-select v-model="moveSourceDevice" :placeholder="$t('createtask.selectDevice')" @change="currentMoveSourceDevice">
                        <el-option v-for="device in moveSourceDevices" :key="device.key" :label="device.label" :value="device.key"></el-option>
                    </el-select>
              </td>
            </tr>
            <tr>
              <td>
                 {{$t("createtask.movecode")}}：
              </td>
              <td>
                <el-input style="width:165px" v-model="movecode">
                </el-input>
                <el-button @click="GetMoveSourcePOS()">{{$t("createtask.browse")}}</el-button>
              </td>
            </tr>
            <tr>
               <td> {{$t("createtask.sourcePos")}}：</td>
              <td>
                  <el-input style="width:150px" v-model="moveSourcePos" :readonly="readonlymoveSourcePos">
                  </el-input>
              </td>
           </tr>
            <tr>
             <td>
                 {{$t("createtask.targetarea")}}：
             </td>
              <td>
                    <el-select v-model="moveTargetArea" :placeholder="$t('createtask.selectTargetArea')" @change="currentMoveTargetArea">
                        <el-option v-for="area in moveTargetareas" :key="area.value" :label="area.label" :value="area.value">
                        </el-option>
                    </el-select>
              </td>
           </tr>
            <tr>
              <td>
                  {{$t("createtask.targetdevice")}}：
              </td>
              <td>
                    <el-select v-model="moveTargetDevice" :placeholder="$t('createtask.selectTargetDevice')" @change="currentMoveTargetDevice">
                        <el-option v-for="device in moveTargetDevices" :key="device.key" :label="device.label" :value="device.key"></el-option>
                    </el-select>
              </td>
            </tr>
            <tr>
               <td> {{$t("createtask.targetPos")}}：</td>
              <td>
                  <el-input style="width:150px" v-model="moveTargetPos">
                  </el-input>
              </td>
           </tr>
           <tr>
              <td></td>
              <td>
                  <div>
                    <el-checkbox v-model="movexpeel">{{$t("createtask.xpeel")}}</el-checkbox>
                  </div>
                  <div>
                    <el-checkbox v-model="moveplateloc">{{$t("createtask.plateloc")}}</el-checkbox>
                  </div>
                  <div>
                    <el-checkbox v-model="movecentrifuge">{{$t("createtask.centrifuge")}}</el-checkbox>
                  </div>
              </td>
           </tr>
            <tr>
              <td></td>
              <td>
                  <el-button type="primary" @click="MoveConsumable()">{{$t("createtask.run")}}</el-button>
                  <el-button type="primary" @click="MoveCancle()">{{$t("createtask.cancle")}}</el-button>
              </td>
           </tr>
          </table>
          <el-dialog :title="$t('createtask.mesatips')" :visible.sync="moveMesaEnable" width="40%"  center>
            <el-table :data="moveMesaData" style="width: 100%" @row-click="selectMoveMesaRow">
              <el-table-column prop="pos" label="POS" width="180"></el-table-column>
              <el-table-column prop="lidcode" label="LidBarCode" width="180"></el-table-column>
              <el-table-column prop="code" label="CODE" width="180"></el-table-column>
            </el-table>
          </el-dialog>
      </el-tab-pane>
      <!-- 定量 -->
     <!-- <el-tab-pane :label="$t('createtask.quant')">
           <table class="aplnorm-table">
           <tr>
             <td>
                {{$t("createtask.targetarea")}}：
             </td>
              <td>
                  <el-select v-model="quantArea" :placeholder="$t('createtask.selectTargetArea')" @change="selectQuantArea">
                      <el-option v-for="area in quantareas" :key="area.value" :label="area.label" :value="area.value">
                      </el-option>
                  </el-select>
              </td>
           </tr>
            <tr>
              <td>
                  {{$t("createtask.targetStdevice")}}：
              </td>
              <td>
                  <el-select v-model="quantstDevice" :placeholder="$t('createtask.selectTargetDevice')">
                      <el-option v-for="device in quantdevices" :key="device.key" :label="device.label" :value="device.key"></el-option>
                  </el-select>
              </td>
            </tr>
            <tr>
              <td>
                  {{$t("createtask.quantStartletFile")}}：
              </td>
              <td>
                <el-button @click="GetStartletFile()">{{$t("createtask.browse")}}</el-button>
                <el-input v-model="startletFile" v-if="false">
                </el-input>
              </td>
           </tr>
           <tr>
              <td>
                  {{$t("createtask.targetBmgdevice")}}：
              </td>
              <td>
                  <el-select v-model="quanttargetBmg" :placeholder="$t('createtask.selectTargetBmg')">
                      <el-option v-for="device in quantBmgs" :key="device.key" :label="device.label" :value="device.key"></el-option>
                  </el-select>
              </td>
            </tr>
            <tr>
              <td>
                  {{$t("createtask.quantBmgFile")}}：
              </td>
              <td>
                <el-button @click="GetBmgFile()">{{$t("createtask.browse")}}</el-button>
                <el-input v-model="bmgFile" v-if="false">
                </el-input>
              </td>
           </tr>

             <tr>
               <td> {{$t("createtask.quantbarcode")}}：</td>
              <td>
                  <el-input style="width:150px" v-model="quantcode">
                  </el-input>
              </td>
           </tr>
            <tr>
               <td> {{$t("createtask.targetPos")}}：</td>
              <td>
                  <el-input style="width:150px" v-model="quantPos">
                  </el-input>
              </td>
           </tr>
            <tr>
               <td> {{$t("createtask.targetColumn")}}：</td>
              <td>
                  <el-input style="width:150px" v-model="quantColumn">
                  </el-input>
              </td>
           </tr>
            <tr>
               <td> {{$t("createtask.quantRfus")}}：</td>
              <td>
                  <el-input style="width:150px" v-model="quantRfu">
                  </el-input>
              </td>
            </tr>
            <tr>
            <td></td>
            <td>
                <el-button type="primary" @click="Quant()">{{$t("createtask.run")}}</el-button>
                <el-button type="primary" @click="QuantCancle()">{{$t("createtask.cancle")}}</el-button>
            </td>
            </tr>
            </table>
            <el-dialog :title="$t('createtask.filetips')" :visible.sync="stFileEnable" width="30%" center>
            <el-table :data="stFileData" style="width: 100%" @row-click="selectStFileRow">
              <el-table-column prop="fileName" label="fileName" width="180"></el-table-column>
              <el-table-column prop="fileRoute" label="fileRoute" width="180"></el-table-column>
              <el-table-column prop="fileDesc" label="fileDesc" width="180"></el-table-column>
            </el-table>
            </el-dialog>
            <el-dialog :title="$t('createtask.filetips')" :visible.sync="bmgFileEnable" width="30%" center>
            <el-table :data="bmgFileData" style="width: 100%" @row-click="selectBmgFileRow">
              <el-table-column prop="fileName" label="fileName" width="180"></el-table-column>
              <el-table-column prop="fileRoute" label="fileRoute" width="180"></el-table-column>
              <el-table-column prop="fileDesc" label="fileDesc" width="180"></el-table-column>
            </el-table>
          </el-dialog>

      </el-tab-pane>-->
      <!-- 均一化 -->
     <!-- <el-tab-pane :label="$t('createtask.normalized')">
         <table class="aplnorm-table">
           <tr>
             <td>
                {{$t("createtask.targetarea")}}：
             </td>
              <td>
                  <el-select v-model="selectNormArea" :placeholder="$t('createtask.selectTargetArea')" @change="selectNormaArea">
                      <el-option v-for="area in normareas" :key="area.value" :label="area.label" :value="area.value">
                      </el-option>
                  </el-select>
              </td>
           </tr>
            <tr>
              <td>
                  {{$t("createtask.targetdevice")}}：
              </td>
              <td>
                  <el-select v-model="selectNormDevice" :placeholder="$t('createtask.selectTargetDevice')">
                      <el-option v-for="device in normdevices" :key="device.key" :label="device.label" :value="device.key"></el-option>
                  </el-select>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                  <el-button type="primary" >{{$t("createtask.run")}}</el-button>
                  <el-button type="primary" >{{$t("createtask.cancle")}}</el-button>
              </td>
            </tr>
          </table>
      </el-tab-pane>-->
      <!-- 实验 -->
      <el-tab-pane :label="$t('createtask.experiment')">
         <table class="apl-table">
           <tr>
             <td>
                 {{$t("createtask.targetarea")}}：
             </td>
              <td>
                    <el-select v-model="testSourceArea" :placeholder="$t('createtask.selectTargetArea')" @change="currentTestArea">
                        <el-option v-for="area in testareas" :key="area.value" :label="area.label" :value="area.value">
                        </el-option>
                    </el-select>
              </td>
           </tr>
            <tr>
              <td>
                  {{$t("createtask.targetdevice")}}：
              </td>
              <td>
                    <el-select v-model="testSourceDevice" :placeholder="$t('createtask.selectTargetDevice')"  @change="cexperimentTargetDevice">
                        <el-option v-for="device in testSourceDevices" :key="device.key" :label="device.label" :value="device.key"></el-option>
                    </el-select>
              </td>
            </tr>
            <tr>
              <td>
                  {{$t("createtask.testSourceFile")}}：
              </td>
              <td>
                <el-button @click="GetDeviceFile()">{{$t("createtask.browse")}}</el-button>
                <el-input v-model="fileRoute" v-if="false">
                </el-input>
              </td>
           </tr>
            <tr>
              <td></td>
              <td>
                  <el-button type="primary" @click="Experiment()">{{$t("createtask.run")}}</el-button>
                  <el-button type="primary" @click="ExperimentCancle()">{{$t("createtask.cancle")}}</el-button>
              </td>
           </tr>
         </table>
          <el-dialog :title="$t('createtask.filetips')" :visible.sync="testFileEnable" width="30%" center>
            <el-table :data="testFileData" style="width: 100%" @row-click="selecttestFileRow">
              <el-table-column prop="fileName" label="fileName" width="180"></el-table-column>
              <el-table-column prop="fileRoute" label="fileRoute" width="180"></el-table-column>
              <el-table-column prop="fileDesc" label="fileDesc" width="180"></el-table-column>
            </el-table>
          </el-dialog>

      </el-tab-pane>
      <!-- 运行脚本 -->
      <el-tab-pane :label="$t('createtask.Test')">
         <table class="apl-table">
            <tr>
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
              </tr>
              <tr>
              <td>
                  <el-button type="primary" @click="TestRun()">{{$t("createtask.testrun")}}</el-button>
                  <el-button type="primary" @click="TestStop()">{{$t("createtask.testStop")}}</el-button>
              </td>
           </tr>

         </table>
      </el-tab-pane>

      <!-- 任务异常操作-->
      <el-tab-pane :label="$t('createtask.operationTask')">
        <table class="apl-table">
           <tr>
             <td>
                 {{$t("createtask.operateArea")}}：
             </td>
              <td>
                    <el-select v-model="selectOperateArea" :placeholder="$t('createtask.selectoperateArea')" @change="seoperateArea">
                        <el-option v-for="area in scanareas" :key="area.value" :label="area.label" :value="area.value">
                        </el-option>
                    </el-select>
              </td>
           </tr>
           <tr>
              <td></td>
              <td>
                   <el-button type="primary" @click="ContinueAreaTask()">{{$t("createtask.continueTask")}}</el-button>
                   <el-button type="primary" @click="ClearAreaTask()">{{$t("createtask.clearTask")}}</el-button>
                   <el-button type="primary" @click="ClearAllAreaTask()">{{$t("createtask.clearAll")}}</el-button>
                   <el-button type="primary" @click="DeviceOnline()">{{$t("createtask.deviceOnline")}}</el-button>
                   <el-button type="primary" @click="ClearCache()">{{$t("createtask.clearCache")}}</el-button>
              </td>
           </tr>
           <tr>
                <td>
                    {{$t("createtask.deviceInfo")}}：
                 </td>
                 <td>
                    <el-select v-model="exceptDevice" :placeholder="$t('createtask.selectDevice')" @change="currentExDevice">
                        <el-option  v-for="device in exDevices" :key="device.key" :label="device.label" :value="device.key"></el-option>
                    </el-select>
              </td>
              </tr>
              <tr>
                  <td></td>
                <td>
                     <el-button type="primary" @click="ClearOnlyTimeOut()">{{$t("createtask.clearOnleyTimeOut")}}</el-button>
                     <el-button type="primary" @click="ClearTimeOut()">{{$t("createtask.clearTimeOut")}}</el-button>
               </td>
           </tr>

        </table>
      </el-tab-pane>
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
          return {//扫码
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
      margin-top: 80px;
      margin-left: 30%;
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
</style>
