<template>
  <div class="ifun-table" v-loading="loading">
    <el-row :gutter="8">
      <el-col :span="24" class="header-tools" v-if="$slots.header">
        <slot name="header"></slot>
      </el-col>
      <el-col :span="24">
        <el-table
          ref="table"
          :data="tableOptions.data"
          :row-key="
            tableOptions.rowKey || $attrs['row-key'] || $attrs['rowKey']
          "
          :border="border"
          v-on="$listeners"
          v-bind="$attrs"
        >
          <template v-if="tableOptions.expand">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <render-column
                  :render="tableOptions.renderExpandTable"
                  :scope="scope"
                />
              </template>
            </el-table-column>
          </template>
          <template v-for="item in tableOptions.columns">
            <el-table-column
              v-if="item.type === 'selection'"
              :key="item.prop || 'selection'"
              :align="item.align || 'center'"
              type="selection"
              v-bind="item"
            />
            <template v-else>
              <nested-column :key="item.prop" :data="item" v-if="item.nested" />
              <el-table-column
                v-if="!item.nested"
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :align="item.align || 'center'"
                v-bind="item"
              >
                <template slot="header" slot-scope="scope">
                  <render-column
                    v-if="item.headerRender"
                    :render="item.headerRender"
                    :scope="scope"
                  />
                  <span v-else>{{ item.label }}</span>
                </template>
                <template slot-scope="scope">
                  <render-column
                    v-if="item.render"
                    :render="item.render"
                    :scope="scope"
                  />
                  <span v-else>{{
                    isEmpty(scope.row[item.prop]) ? "-" : scope.row[item.prop]
                  }}</span>
                </template>
              </el-table-column>
            </template>
          </template>
        </el-table>
      </el-col>
      <el-col :span="24" v-if="showPagination" class="pagination-box">
        <el-pagination
          :total="pageOptions.total"
          :page-size="pageOptions.pageSize"
          @size-change="handlePageChange({ pageSize: $event })"
          @current-change="handlePageChange({ pageNum: $event })"
          :current-page="pageOptions.pageNum"
          v-bind="pageOptions"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { isEmpty } from "@/libs/isEmpty.js";
import RenderColumn from "./renderColumn.vue";
//
import nestedColumn from "./nestedColumn.vue";

//

export default {
  name: "IFunTable",
  props: {
    tableOptions: {
      type: Object,
      default: () => {},
    },
    loading: Boolean,
    showPagination: {
      type: Boolean,
      default: true,
    },
    pageOptions: {
      type: Object,
      default: () => ({
        total: 0,
        pageSize: 0,
      }),
    },
    border: {
      type: Boolean,
      default: () => true,
    },
  },
  components: {
    RenderColumn,
    nestedColumn,
  },
  data() {
    this.isEmpty = isEmpty;
    return {};
  },
  methods: {
    /**
     * 分页切换
     */
    handlePageChange(params) {
      this.$emit("change", params);
    },
  },
};
</script>
<style lang="less" scoped>
.ifun-table {
  position: relative;
  .header-tools {
    margin-bottom: 8px;
  }
  .pagination-box {
    margin-top: 20px;
  }
}
</style>
