<template>
  <el-table-column
    :label="data.label"
    :align="data.align || 'center'"
    v-bind="data"
  >
    <template v-for="info in data.columns">
      <nested-column :key="info.prop" :data="info" v-if="info.nested" />
      <el-table-column
        v-else
        :key="info.prop"
        :prop="info.prop"
        :label="info.label"
        :width="info.width"
        :align="info.align || 'center'"
        v-bind="info"
      >
        <template slot-scope="scope">
          <render-column
            v-if="info.render"
            :render="info.render"
            :scope="scope"
          />
          <span v-else>{{
            isEmpty(scope.row[info.prop]) ? "-" : scope.row[info.prop]
          }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>
<script>
import { isEmpty } from "@/libs/isEmpty.js";
import RenderColumn from "./renderColumn.vue";
/**
 * 多层嵌套表格
 */
export default {
  name: "IFunNestedColumn",
  props: {
    // data: {
    //   type: Array,
    //   default: () => [],
    // },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    this.isEmpty = isEmpty;
    return {};
  },
  components: {
    RenderColumn,
  },
};
</script>

<style></style>
