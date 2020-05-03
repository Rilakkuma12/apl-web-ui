<!--物料-->
<template>
  <div>
    <GenericListView
    ref="listView"
      visibleButtons="RES"
      :totalRecords="totalRows"
      @export-file="exportToFile"
      @search="getData"
      @refresh="getData"
      @pagesize-change="getData"
      @pageindex-change="getData"
    >
      <el-dropdown-item
        slot="exportDropdown"
        @click.native="exportToFile('offLine',null)"
      >{{$t('material.materialList.exportOfflineVersion')}}</el-dropdown-item>
      <el-tabs tab-position="top" style="margin-left: 10px" v-model="currentCategoryCode">
        <el-tab-pane
          v-for="item in categories"
          :name="item.Code"
          :label="item.Code+'/'+item.Name"
          :key="item.Id"
        ></el-tab-pane>
      </el-tabs>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        stripe
        highlight-current-row
        id="table-main"
        height="50"
        v-el-height-adaptive-table="{table: $refs.table}"
      >
        <el-table-column align="center" :label="$t('genericList.no')" width="80px">
          <template slot-scope="scope">{{ scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column align="center" :label="$t('material.materialList.name')">
          <template slot-scope="scope">{{ scope.row.Name }}</template>
        </el-table-column>
        <el-table-column align="center" :label="$t('material.materialList.brand')">
          <template slot-scope="scope">{{ scope.row.BrandName }}</template>
        </el-table-column>
        <el-table-column align="center" :label="$t('material.materialList.category')">
          <template slot-scope="scope">{{ scope.row.CategoryName }}</template>
        </el-table-column>
        <el-table-column align="center" :label="$t('material.materialList.type')">
          <template slot-scope="scope">{{ scope.row.TypeName }}</template>
        </el-table-column>
        <el-table-column align="center" :label="$t('material.materialList.partNumber')">
          <template slot-scope="scope">{{ scope.row.PartNumber }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('material.materialList.containerPartNumber')"
          v-if="currentCategory&&(currentCategory.Code==='Reagent'||currentCategory.Code.indexOf('Sample')!=-1)"
        >
          <template slot-scope="scope">{{ scope.row.ContainerPartNumber }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('material.materialList.rack')"
          v-if="currentCategory&&currentCategory.RequireRack"
        >
          <template slot-scope="scope">{{ scope.row.RackPn }}</template>
        </el-table-column>
        <template v-if="currentCategory">
          <el-table-column :label="$t('material.materialList.paramters')" align="center">
            <el-table-column
              align="center"
              v-for="item in currentCategory.Configs"
              :key="item.ConfigKey"
              :label="item.ConfigKeyDesc"
            >
              <template slot-scope="scope">{{ scope.row[item.ConfigKey] }}</template>
            </el-table-column>
          </el-table-column>
        </template>
        <el-table-column align="center" :label="$t('material.materialList.desc')">
          <template slot-scope="scope">{{ scope.row.Desc }}</template>
        </el-table-column>
        <el-table-column align="center" :label="$t('material.materialList.modifyTime')">
          <template slot-scope="scope">{{ scope.row.ModifyTime|dateformat('YYYY-MM-DD HH:mm:ss') }}</template>
        </el-table-column>
      </el-table>
    </GenericListView>
  </div>
</template>


<script>
import GenericListView from "@/components/GenericListView";
import ToolBar from "@/components/ToolBar";
import * as api from "@/api/material.js";
import { search as searchBrand } from "@/api/materialBrand.js";
import * as categoryApi from "@/api/materialCategory.js";
import { generateTitle } from "@/utils/i18n";
import { exportTableToFile } from "@/utils/exportUtil";
import { downloadFile } from "@/api/file-downloader";

export default {
  components: { GenericListView, ToolBar },
  data() {
    return {
      categories: [],
      materialTypes: [],
      brands: [],
      containerMaterials: [],
      list: null,
      totalRows: 0,
      listLoading: false,
      containerMaterialLoading: false,
      editDialogVisible: false,
      currentRow: null,
      currentCategory: null,
      currentCategoryCode: "",
      pnEnable: false,
      containerEnable: false,
      editMode: false
    };
  },
  created() {
    this.$nextTick(() => {
      //this.getData();
      this.searchBrand({}).then(resp => (this.brands = resp.Data.Items));
      categoryApi.search({}).then(resp => {
        this.categories = resp.Data.Items;
        if (this.categories && this.categories.length > 0) {
          this.currentCategoryCode = this.categories[0].Code;
        }
      });
    });
  },
  watch: {
    currentCategoryCode: {
      handler: function(val) {
        this.currentCategory = this.categories.filter(x => x.Code == val)[0];
        if (this.currentCategory) {
          this.getData({
            pageSize: this.pageSize,
            pageIndex: this.pageIndex,
            model: { categoryId: this.currentCategory.Id }
          });
        }
      },
      deep: true
    }
  },
  methods: {
   getData(params) {
      if (this.currentCategory) {
        this.listLoading = true;
        let model = { categoryId: this.currentCategory.Id };
        params.model = model;
        api
          .search(params)
          .then(resp => {
            this.list = resp.Data.Items;
            this.totalRows = resp.Data.TotalRows;
            this.listLoading = false;
          })
          .catch(err => (this.listLoading = false));
      }
    },
        exportToFile(params) {
      let model = { categoryId: this.currentCategory.Id };
      params.model = model;
      api
        .exportXls(params)
        .then(resp => {
          downloadFile(resp.Data);
        })
        .catch(err => {
          console.log(err);
        });
    },

    generateTitle,
    searchBrand
  },
  filters: {
    formatValueType: function(value) {
      if (!value) return "";
      return value === "10" ? "Text" : "Number";
    }
  }
};
</script>
<style scoped>
.sideTitle {
  width: 100%;
  padding: 8px;
  background-color: #ffffff;
  overflow: hidden;
  line-height: 32px;
  font-size: large;
  border-bottom: 1px solid #e6ebf5;
  /*border: 1px solid #e6ebf5;*/
}
</style>


