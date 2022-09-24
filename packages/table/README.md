<br />

<h1 align="center">IFunTable</h1>
<p align='center'>
    <a href="https://github.com/ifun-team/ifun-vue2/tree/main/packages/table">
        <img src="https://img.shields.io/npm/v/@ifun-vue2/table" />
    </a>
    <a href="https://github.com/ifun-team/ifun-vue2/tree/main/packages/table#license">
        <img src="https://img.shields.io/npm/l/@ifun-vue2/table" />
    </a>
</p>
<br />
<p>自定义封装el-table、el-pagination，实现json方式配置表格。包括自定义列项内容、表头嵌套。支持所有el-table、el-pagination各自的属性配置</p>

## 安装

```sh
npm i @ifun-vue2/table
```

使用

```js
import IFunTable from "@ifun-vue2/table";
// 样式
import "@ifun-vue2/table/dist/style.css";
// 使用
Vue.use(IFunTable);
```

## 基本使用，数据展示

通过传入`data`, 数据类型为数组。

```vue
<template>
  <div class="table-list">
    <IFunTable :tableOptions="tableOptions" :pageOptions="pageOptions" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableOptions: {
        data: [],
        columns: [],
      },
      pageOptions: {
        total: 0,
        pageSize: 10,
        pageNum: 1,
        background: true,
        layout: "total,sizes, prev, pager, next, jumper",
      },
    };
  },
  mounted() {
    this.tableOptions.columns = [
      {
        prop: "id",
        label: "id",
      },
      {
        prop: "name",
        label: "名称",
      },
      {
        prop: "address",
        label: "地址",
      },
    ];
    this.tableOptions.data = new Array(20).fill(0).map((item, index) => ({
      id: index,
      name: "数据" + index,
      address: "北京朝阳大妈跳舞广场",
    }));
    this.pageOptions.total = 100;
  },
};
</script>
```

## 不需要分页`showPagination:false`

使用`showPagination` 来定义列表不需要分页；默认是分页的；

```vue
<template>
  <div class="table-list">
    <IFunTable :tableOptions="tableOptions" :showPagination="false" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableOptions: {
        data: [],
        columns: [],
      },
    };
  },
  mounted() {
    this.tableOptions.columns = [
      {
        prop: "id",
        label: "id",
      },
      {
        prop: "name",
        label: "名称",
      },
      {
        prop: "address",
        label: "地址",
      },
    ];
    this.tableOptions.data = new Array(20).fill(0).map((item, index) => ({
      id: index,
      name: "数据" + index,
      address: "北京朝阳大妈跳舞广场",
    }));
  },
};
</script>
```

## 自定义渲染列项内容

通过定义`tableOptions.columns`中每一项的 render 来自定义渲染内容。

```vue
<template>
  <div class="table-list">
    <IFunTable :tableOptions="tableOptions" :showPagination="false" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableOptions: {
        data: [],
        columns: [],
      },
    };
  },
  mounted() {
    this.tableOptions.columns = [
      {
        prop: "id",
        label: "id",
      },
      {
        prop: "name",
        label: "名称",
        render(h, row, column, index) {
          return <div>I'm {row.name}</div>;
        },
      },
      {
        prop: "address",
        label: "地址",
      },
    ];
    this.tableOptions.data = new Array(20).fill(0).map((item, index) => ({
      id: index,
      name: "数据" + index,
      address: "北京朝阳大妈跳舞广场",
    }));
  },
};
</script>
```

## 监听分页事件，只需监听一个事件，即可完成所有分页事件功能

通过监听属性`change`,来处理分页的逻辑。

```vue
<template>
  <div class="table-list">
    <IFunTable
      :tableOptions="tableOptions"
      :pageOptions="pageOptions"
      @change="handleChangePagination"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableOptions: {
        data: [],
        columns: [],
      },
      pageOptions: {
        total: 0,
        pageSize: 10,
        pageNum: 1,
        background: true,
        layout: "total,sizes, prev, pager, next, jumper",
      },
    };
  },
  mounted() {
    this.tableOptions.columns = [
      {
        prop: "id",
        label: "id",
      },
      {
        prop: "name",
        label: "名称",
      },
      {
        prop: "address",
        label: "地址",
      },
    ];
    this.tableOptions.data = new Array(20).fill(0).map((item, index) => ({
      id: index,
      name: "数据" + index,
      address: "北京朝阳大妈跳舞广场",
    }));
    this.pageOptions.total = 100;
  },
  methods: {
    /**
     * info 中的更改属性和pageOptions 一致
     * pageSize
     * pageNum
     **/
    handleChangePagination(info) {
      this.pageOptions = {
        ...this.pageOptions,
        ...info,
      };
      // 调用数据请求的方法即可
    },
  },
};
</script>
```

通过对象传递参数的方式，屏蔽了分页、size 的更改。只需监听一次事件就好了。

## 表头嵌套，可无限级进行嵌套渲染。

常见的表头嵌套，只需配置数据嵌套即可实现表单嵌套，定义`tableOptions.columns`项属性`nested:true`,然后在定义属性`columns`即可

```vue
<template>
  <div class="table-list">
    <IFunTable :tableOptions="tableOptions" :pageOptions="pageOptions" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableOptions: {
        data: [],
        columns: [],
      },
      pageOptions: {
        total: 0,
        pageSize: 10,
        pageNum: 1,
        background: true,
        layout: "total,sizes, prev, pager, next, jumper",
      },
    };
  },
  mounted() {
    this.tableOptions.columns = [
      {
        prop: "id",
        label: "id",
      },
      {
        prop: "name",
        label: "名称",
        nested: true,
        columns: [
          {
            prop: "first",
            label: "大姓",
          },
          {
            prop: "last",
            label: "小名",
          },
        ],
      },
      {
        prop: "address",
        label: "地址",
      },
    ];
    this.tableOptions.data = new Array(20).fill(0).map((item, index) => ({
      id: index,
      first: index + "01",
      last: index + "02",
      address: "北京朝阳大妈跳舞广场",
    }));
    this.pageOptions.total = 100;
  },
};
</script>
```

## 表格展开

通过`tableOptions.expand` 定义表格可展开，通过`tableOptions.renderExpandTable`定义渲染函数

```vue
<template>
  <div class="table-list">
    <IFunTable :tableOptions="tableOptions" :pageOptions="pageOptions" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableOptions: {
        data: [],
        columns: [],
        expand: true,
      },
      pageOptions: {
        total: 0,
        pageSize: 10,
        pageNum: 1,
        background: true,
        layout: "total,sizes, prev, pager, next, jumper",
      },
    };
  },
  mounted() {
    this.tableOptions.columns = [
      {
        prop: "id",
        label: "id",
      },
      {
        prop: "name",
        label: "名称",
      },
      {
        prop: "address",
        label: "地址",
      },
    ];
    this.tableOptions.data = new Array(20).fill(0).map((item, index) => ({
      id: index,
      first: index + "01",
      last: index + "02",
      address: "北京朝阳大妈跳舞广场",
    }));
    this.pageOptions.total = 100;

    //
    this.tableOptions.renderExpandTable = (h, row, column, index) => {
      return <p>这是展开视图</p>;
    };
  },
};
</script>
```

## API 属性一览

| props          |               说明               |                 默认值 |
| -------------- | :------------------------------: | ---------------------: |
| tableOptions   |            列表配置项            | 详情查看`tableOptions` |
| loading        | 数据加载中，其他列表禁止操作状态 |                        |
| showPagination |             是否分页             |        默认 true，分页 |
| pageOptions    |            分页配置项            |  详情查看`pageOptions` |

`el-table` 其他所有可设置的属性以及方法、事件。

## tableOptions

| props             |                            说明                             | 默认值 |
| ----------------- | :---------------------------------------------------------: | -----: |
| data              |                    列表数据 Array，必须                     |        |
| columns           |                     表格列项属性，必须                      |        |
| expand            |     表格是否可以展开，为 true 时 renderExpandTable 必须     |  fasle |
| renderExpandTable | 展开列项的渲染函数，Function 参数为 `(h,row,columns,index)` |        |

## pageOptions

所有`el-pagination` 可设置的属性，有几个是自定义

| props    |             说明              | 默认值 |
| -------- | :---------------------------: | -----: |
| total    |        数据总数，必须         |        |
| pageSize | 分页 size，一页可展示的数据量 |        |
| pageNum  |      页码，当前是第几页       |        |
