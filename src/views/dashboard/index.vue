<template>
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
</template>

<script>
import { mapGetters } from 'vuex'
import * as api from "@/api/home.js";
export default {
  data() {
    return {
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
  .apl-table{position:absolute;top:50%;left:50%;margin:-150px 0 0 -200px;border:1px}
</style>
