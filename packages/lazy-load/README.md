<br />

<h1 align="center">IFunLazyLoad</h1>
<p align='center'>
    <a href="https://github.com/ifun-team/ifun-vue2/tree/main/packages/lazy-load">
        <img src="https://img.shields.io/npm/v/@ifun-vue2/lazy-load" />
    </a>
    <a href="https://github.com/ifun-team/ifun-vue2/tree/main/packages/lazy-load#license">
        <img src="https://img.shields.io/npm/l/@ifun-vue2/lazy-load" />
    </a>
</p>
<a href="https://github.com/ifun-team/ifun-vue2/actions/workflows/main.yml">
        <img src="https://github.com/ifun-team/ifun-vue2/actions/workflows/main.yml/badge.svg" />
    </a>

<br />
<p>数据懒加载，包含了自定指令`v-lazy-load`,通过指令结合`el-select`实现下拉数据的懒加载。</p>

## 安装

```sh
npm i @ifun-vue2/lazy-load
```

组件包包含

- 一个指令`v-lazy-load`
- 一个`lazy-select` 下拉懒加载组件，可结合`el-form`表单校验
- 一个`lazy-list` 下来滚动列表组件。

```js
import IFunLazyLoad from "@ifun-vue2/lazy-load";
// 样式加载
import "@ifun-vue2/lazy-load/dist/style.css";

// 使用
Vue.use(IFunLazyLoad);
```

**组件完全支持所有的`el-select` 属性。比如`clearable`, 但是懒加载可能会对其他使用场景有一些限制，测试不能完全**

## `lazy-select` 基本使用

通过传入`data`, 数据类型为数组。

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

## 自定义下拉渲染`props`

使用`selectProps` 来定义下拉渲染定义的 value、label 值

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

## 结合`el-form`实现组件校验。

`v-model`数据绑定。通过 el-form `rules`进行数据校验。

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

使用`checked` 来传入默认选中的 value 值。

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

`checked` 支持 select 的多选操作。字符串或者数组；选中默认值

## `lazy-list` 基本使用

通过传入`data`, 数据类型为数组。

```vue
<template>
  <div style="margin-bottom:20px;height:150px;">
    <IFunLazyList :data="data" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
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

## API 属性一览

| props       |          说明          |                              默认值 |
| ----------- | :--------------------: | ----------------------------------: |
| checked     |  初始值，默认选中回显  |                      非必须，string |
| data        |       下拉数据源       |                         必传，Array |
| selectProps | 下拉列表渲染的属性 key | 默认`{value:"value",label:"label"}` |

其他`el-select` 支持的属性，事件。
