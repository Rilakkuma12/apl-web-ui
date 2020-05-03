<template>
  <div>
    <tool-bar v-if="visibleButtons&&visibleButtons.length>0">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="$emit('add')"
        v-if="visibleButtons.indexOf('N')!==-1"
      >{{$t('genericList.add')}}</el-button>
      <el-button
        type="success"
        icon="el-icon-edit"
        size="small"
        @click="$emit('edit')"
        v-if="visibleButtons.indexOf('M')!==-1"
      >{{$t('genericList.edit')}}</el-button>
      <el-button
        type="primary"
        icon="el-icon-delete"
        size="small"
        @click="$emit('delete')"
        v-if="visibleButtons.indexOf('D')!==-1"
      >{{$t('genericList.delete')}}</el-button>
      <el-button
        type="primary"
        icon="el-icon-refresh"
        size="small"
        @click="handleRefresh"
        v-if="visibleButtons.indexOf('R')!==-1"
      >{{$t('genericList.refresh')}}</el-button>
      <el-dropdown trigger="click" v-if="visibleButtons.indexOf('E')!==-1&&pagination">
        <el-button style="margin-left:10px" type="primary" size="small">
          {{$t('genericList.export')}}
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            @click.native="handleExport('page')"
          >{{$t('genericList.exportThisPage')}}</el-dropdown-item>
          <el-dropdown-item @click.native="handleExport('all')">{{$t('genericList.exportAll')}}</el-dropdown-item>
          <slot name="exportDropdown"></slot>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-download"
        v-if="visibleButtons.indexOf('E')!==-1&&!pagination"
      >{{$t('genericList.export')}}</el-button>
      <slot name="toolbar"></slot>
      <div style="float: right" v-if="visibleButtons.indexOf('S')!==-1">
        <el-input
          :placeholder="$t('genericList.keyword')"
          size="small"
          style="width: 140px"
          v-model="toolbar.keyword"
          clearable
          @keyup.enter.native="handleSearch"
        ></el-input>
        <el-button @click="handleSearch" type="primary" icon="el-icon-search" size="small"></el-button>
      </div>
    </tool-bar>
    <slot></slot>
    <div v-if="pagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handlePageIndexChange"
        :current-page.sync="currentPage"
        :page-sizes="[50, 100, 500]"
        :page-size="pageSize"
        :total="totalRecords"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import ToolBar from "@/components/ToolBar";
import Pagination from "@/components/Pagination";
export default {
  name: "GenericListView",
  props: {
    visibleButtons: {
      type: String,
      required: true
    },
    totalRecords: {
      type: Number,
      required: true
    },
    pagination: {
      type: Boolean,
      required: false,
      default: true
    },
    defaultPageSize: {
      type: Number,
      required: false,
      default: 50
    }
  },
  components: { ToolBar, Pagination },
  data() {
    return {
      toolbar: {
        keyword: ""
      },
      keyword: "",
      pageSize: this.defaultPageSize,
      currentPage: 1
    };
  },
  watch: {
    totalRecords: {
      handler: function(val) {
        let pageCount =
          val <= this.pageSize
            ? 1
            : val % this.pageSize === 0
            ? val / this.pageSize
            : Math.floor(val / this.pageSize) + 1;
        debugger;
        if (this.currentPage > pageCount) {
          this.currentPage = pageCount;
          this.handlePageIndexChange(this.currentPage);
        }
      },
      deep: true
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.$emit("pagesize-change", {
        pagination: this.pagination,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.keyword
      });
    },
    handlePageIndexChange(pageIndex) {
      this.currentPage = pageIndex;
      this.$emit("pageindex-change", {
        pagination: this.pagination,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.keyword
      });
    },
    handleSearch() {
      this.currentPage = 1;
      this.keyword = this.toolbar.keyword;
      this.$emit("search", {
        pagination: this.pagination,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.keyword
      });
    },
    handleRefresh() {
      this.toolbar.keyword = "";
      this.keyword = "";
      this.$emit("refresh", {
        pagination: this.pagination,
        pageIndex: this.currentPage,
        pageSize: this.pageSize
      });
    },
    handleExport(type) {
      if (type === "all") {
        this.$emit("export-file", {
          pagination: false
        });
      } else {
        this.$emit("export-file", {
          pagination: true,
          pageIndex: this.currentPage,
          pageSize: this.pageSize,
          keyword: this.keyword
        });
      }
    }
  }
};
</script>


