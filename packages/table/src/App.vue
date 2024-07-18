<template>
  <div>
    <h2>基本使用</h2>
    <h3>基本使用、多级表头、分页、自定义表头</h3>
    <IFunTable :tableOptions="tableOptions" :pageOptions="pageOptions" />
  </div>
</template>
<script lang="jsx">
export default {
  data() {
    return {
      checkedAll: false,
      tableOptions: {
        data: [],
        columns: [],
      },
      pageOptions: {
        total: 100,
        pageSize: 10,
        pageNum: 1,
        background: true,
        layout: "total,sizes, prev, pager, next, jumper",
      },
    };
  },
  mounted() {
    const $this = this;
    this.tableOptions.columns = [
      {
        prop: "id",
        label: "id",
        fixed: "left",
      },
      {
        prop: "name",
        label: "名称",
        nested: true,
        fixed: "left",
        width: 200,
        columns: [
          {
            prop: "firstName",
            label: "姓氏",
            fixed: "left",
            width: 100,
          },
          {
            prop: "lastName",
            label: "名",
            fixed: "left",
            width: 100,
            headerRender(h, row, column, index) {
              return (
                <div>
                  <span>{column.label}</span>
                  <el-tag>hot</el-tag>
                </div>
              );
            },
          },
        ],
      },
      {
        prop: "age",
        label: "年龄",
      },
      {
        prop: "address",
        label: "地址",
        minWidth: 200,
      },
      ...Array(20)
        .fill()
        .map((_, index) => ({
          prop: `attriute-${index}`,
          label: `属性${index}`,
          width: 100,
        })),
      {
        prop: "operate",
        label: "操作",
        width: 120,
        fixed: "right",
        render(h, row) {
          return <el-checkbox vModel={row.checked} />;
        },
        headerRender(h, row, column, index) {
          return (
            <el-checkbox
              vModel={$this.checkedAll}
              onChange={() => $this.checkedAllData()}
            />
          );
        },
      },
    ];
    this.tableOptions.data = new Array(20).fill(0).map((item, index) => ({
      id: index,
      age: null,
      checked: false,
      firstName: "数据" + index,
      address: "北京朝阳大妈跳舞广场",
    }));
  },
  methods: {
    checkedAllData() {
      this.tableOptions.data.forEach((item) => {
        item.checked = this.checkedAll;
      });
    },
  },
};
</script>
