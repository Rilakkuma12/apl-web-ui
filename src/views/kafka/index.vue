<template>
    <div>
      <el-tabs tab-position="left" style="margin-left:10px">
            <table class="apl-table">
            <tr>
                <td>
                    {{$t("kafka.info")}}： 
                </td>
                <td>
                    <el-input type="textarea" class="text-area" :rows="4" :placeholder="$t('kafka.content')" v-model="contenttext"></el-input>
                </td>
            </tr>
            <tr>
                <td>
                    {{$t("kafka.topic")}}： 
                </td>
                <td>  
                    <el-select v-model="selecttopic" :placeholder="$t('kafka.selectTopic')"  @change="currentTopic">
                        <el-option  v-for="topic in topics" :key="topic.key" :label="topic.label" :value="topic.key"></el-option>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td>
                    {{$t("kafka.serviceIp")}}： 
                </td>
                <td>  
                <el-input type="text" v-model="serviceIp" disabled></el-input>
                </td>
            </tr>

            <tr>
                <td></td>
                <td> 
                    <el-button type="primary" @click="sendTask()">{{$t("kafka.sendTask")}}</el-button>
                    <el-button type="primary" @click="sendCancle()">{{$t("kafka.sendCancle")}}</el-button>
                </td>
            </tr>
        </table>
    </el-tabs>
   </div>
</template>
<script>
import ToolBar from "@/components/ToolBar";
import * as aplKafka from "@/api/aplKafka.js";
export default {
  data() {
        return{
                topics:[],
                selecttopic : "",
                serviceIp:'',
                contenttext:'',
            }
        },
        created:function()
        {
            var params = {};
            aplKafka.loadTopics(params).then((response) => 
            {
                var query = response.Data;
                this.topics=[];
                for (let info of query) {
                    var value = new Object();
                    value.name = info.TopicName;
                    value.key = info.TopicId;
                    value.label=info.TopicName;
                    value.serviceIp=info.IP;
                    this.topics.push(value);
                };
                this.selecttopic=this.topics[0].label;
                this.serviceIp=this.topics[0].serviceIp;
            }).catch(err => (
                this.topics=[],
                this.selecttopic='',
                this.serviceIp=''
            ));
        },
        methods:
        {
            sendTask()
            {
                var params = {JsonContent:this.contenttext,Topic:this.selecttopic};
                aplKafka.sendMessage(params).then((response) => 
                {
                    this.$message(this.$t('kafka.sendSuccess'));
                }).catch(err => (err => (this.listLoading = false))); 
            },
            sendCancle()
            {
                this.topics=[];
                this.selecttopic='';
                this.contenttext='';
            },
            currentTopic(id)
            {
                 this.topics.forEach(topic => {
                // 也可能在数组中找不到
                  if (topic.key==id) 
                  {
                     this.selecttopic=topic.label;
                  }  
            });

            }
        }
};
</script>
<style>
  .apl-table
  {
      margin-top: 80px;
      margin-left: 30%;
  }
  .text-area
  {
     /* width: 300px; */
  }
</style>