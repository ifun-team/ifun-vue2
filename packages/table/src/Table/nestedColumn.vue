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
          <span v-else>{{ scope.row[info.prop] || "-" }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>
<script>
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
  components: {
    RenderColumn,
  },
};
</script>

<style></style>
