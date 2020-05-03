<template>
  <div >
    <!-- <div class="dashboard-text">{{$t("home.versionNo")}}: {{ versionNo }}</div>
    <div class="dashboard-text">{{$t("home.versionName")}}: {{ versionName }}</div>
    <div class="dashboard-text">{{$t("home.fileBuildPart")}}: {{ fileBuildPart }}</div>
    <div class="dashboard-text">{{$t("home.fileMajorPart")}}: {{ fileMajorPart }}</div>
    <div class="dashboard-text">{{$t("home.fileMinorPart")}}: {{ fileMinorPart }}</div>
    <div class="dashboard-text">{{$t("home.filePrivatePart")}}: {{ filePrivatePart }}</div> -->
     <table class="apl-table">
           <tr>
             <td>
                 {{$t("home.versionNo")}}：
             </td>
              <td>
                    {{ versionNo }}
              </td>
           </tr>
           <tr>
             <td>
                 {{$t("home.versionName")}}：
             </td>
              <td>
                    {{ versionName }}
              </td>
           </tr>

        </table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as api from "@/api/home.js";
export default {
  data() {
    return {
        versionModel:'',
        fileBuildPart:'',
        fileMajorPart:'',
        fileMinorPart:'',
        filePrivatePart:'',
        versionName:'',
        versionNo:''
    };
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created()
  {
    var params = {VersionName:'WEB'};
    api.version(params).then((response) =>
    {
        this.versionModel = response.Data;
        this.fileBuildPart=this.versionModel.FileBuildPart;
        this.fileMajorPart=this.versionModel.FileMajorPart;
        this.fileMinorPart=this.versionModel.FileMinorPart;
        this.filePrivatePart=this.versionModel.FilePrivatePart;
        this.versionName=this.versionModel.VersionName;
        this.versionNo=this.versionModel.VersionNo;

    }).catch(err => (this.listLoading = false));
  },
  methods:
  {

  }
}
</script>
<style>
 .apl-table,.aplquit-table,.aplnorm-table
  {
      margin-top: 80px;
      margin-left: 30%;
  }
  .loading
  {
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
  .foot{height: 5%;position: fixed;bottom: 0px;width: 100%;text-align: center;box-shadow:black 0px 0px 5px 0px;}
 .apl-table{position:absolute;top:50%;left:50%;margin:-150px 0 0 -200px;border:1px}
</style>
