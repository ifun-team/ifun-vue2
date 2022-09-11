# LazyLoad

数据懒加载，包含了自定指令`v-lazy-load`,通过指令结合`el-select`实现下拉数据的懒加载。

## 安装

```sh
npm i @ifun-vue2/lazy-load
```

组件包包含了一个指令`v-lazy-load` 以及一个`lazy-select` 下拉兰加载组件

```js
import IFunLazyLoad from "@ifun-vue2/lazy-load";

// 使用
Vue.use(IFunLazyLoad);
```

## `lazy-load` 基本使用

通过传入`data`, 数据类型为数组。

:::demo 使用`data`定义下拉加载的数据。

```vue
<template>
  <div style="margin-bottom:20px;">
    <IFunLazySelect :data="data" v-model="value" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      value: "",
    };
  },
  mounted() {
    this.data = new Array(100).fill(0).map((item, index) => ({
      value: index,
      label: "数据" + index,
    }));
  },
};
</script>
```

:::

## 自定义下拉渲染`props`

:::demo 使用`selectProps` 来定义下拉渲染定义的 value、label 值

```vue
<template>
  <div style="margin-bottom:20px;">
    <IFunLazySelect :data="data" :selectProps="selectProps" v-model="value" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      selectProps: {
        value: "id",
        label: "title",
      },
      value: "",
    };
  },
  mounted() {
    this.data = new Array(100).fill(0).map((item, index) => ({
      id: index,
      title: "数据" + index,
    }));
  },
};
</script>
```

:::

## 结合`el-form`实现组件校验。

组件内已对接 el-form，可结合 el-form 做表单数据校验。

:::demo `v-model`数据绑定。通过 el-form `rules`进行数据校验。

```vue
<template>
  <div style="margin-bottom:20px;">
    <el-form :model="form" :rules="rules">
      <el-form-item prop="userId">
        <IFunLazySelect
          :data="data"
          :selectProps="selectProps"
          v-model="form.userId"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      selectProps: {
        value: "id",
        label: "title",
      },
      form: {
        userId: "",
      },
      rules: {
        userId: [{ required: true, message: "请选择" }],
      },
    };
  },
  mounted() {
    this.data = new Array(100).fill(0).map((item, index) => ({
      id: index,
      title: "数据" + index,
    }));
  },
};
</script>
```

## 实现默认值选中

由于是懒加载数据，默认初始值可能由于没有被渲染，而导致不能展示出名称。通过定义属性处理默认值。

:::demo 使用`checked` 来传入默认选中的 value 值。

```vue
<template>
  <div style="margin-bottom:20px;">
    <IFunLazySelect
      :data="data"
      :checked="23"
      :selectProps="selectProps"
      v-model="value"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      selectProps: {
        value: "id",
        label: "title",
      },
      value: "",
    };
  },
  mounted() {
    this.data = new Array(100).fill(0).map((item, index) => ({
      id: index,
      title: "数据" + index,
    }));
  },
};
</script>
```

:::

## API 属性一览

| props       |          说明          |                              默认值 |
| ----------- | :--------------------: | ----------------------------------: |
| checked     |  初始值，默认选中回显  |                      非必须，string |
| data        |       下拉数据源       |                         必传，Array |
| selectProps | 下拉列表渲染的属性 key | 默认`{value:"value",label:"label"}` |
