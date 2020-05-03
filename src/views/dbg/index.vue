<template>
  <div>
    <el-tabs tab-position="left" style="margin-left:10px">
      <el-tab-pane v-for="item in devices" :label="item.Name" :key="item.Id"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ToolBar from "@/components/ToolBar";
import { search as searchDevice } from "@/api/device";
export default {
  components: { ToolBar },
  data() {
    return {
      devices: []
    };
  },
  created() {
    this.$nextTick(() => {
      searchDevice({}).then(res => {
        this.devices = res.Data.Items;
      });
    });
  }
};
</script>