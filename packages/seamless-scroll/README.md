<br />

<h1 align="center">IFunSeamlessScroll</h1>
<p align='center'>
    <a href="https://github.com/ifun-team/ifun-vue2/tree/main/packages/seamless-scroll">
        <img src="https://img.shields.io/npm/v/@ifun-vue2/seamless-scroll" />
    </a>
    <a href="https://github.com/ifun-team/ifun-vue2/tree/main/packages/seamless-scroll#license">
        <img src="https://img.shields.io/npm/l/@ifun-vue2/seamless-scroll" />
    </a>
</p>
<a href="https://github.com/ifun-team/ifun-vue2/actions/workflows/main.yml">
        <img src="https://github.com/ifun-team/ifun-vue2/actions/workflows/main.yml/badge.svg" />
    </a>
<br />
<p>数据无缝滚动，数据量大时，开启虚拟滚动，提升页面性能.</p>

## 安装

```sh
npm i @ifun-vue2/seamless-scroll
```

使用

```js
import IFunSeamlessScroll from "@ifun-vue2/seamless-scroll";
// 样式
import "@ifun-vue2/seamless-scroll/dist/style.css";
// 使用
Vue.use(IFunSeamlessScroll);
```

## 基本使用，数据滚动

通过传入`data`, 数据类型为数组。

```vue
<template>
  <div style="margin-bottom:20px;height:300px;">
    <IFunSeamlessScroll :data="data" />
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

## 自定义数据渲染 key

使用`options` 来定义数据下拉渲染定义的 value、label 值。还有`pageSize`、`itemWidth`等

```vue
<template>
  <div style="margin-bottom:20px;">
    <IFunSeamlessScroll :data="data" :options="options" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      options: {
        value: "id",
        label: "title",
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

## 开启虚拟滚动列表

通过传入`virtual:true`, 标识开启虚拟列表。还需要确认传入参数`options.pageSize` 默认**100**,也就是低于 100 会全部渲染。数据量不大开启虚拟滚动也没啥作用。性能比不上全部渲染滚动。

```vue
<template>
  <div style="margin-bottom:20px;height:300px;">
    <IFunSeamlessScroll :data="data" :virtual="true" :options="options" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      options: {
        // 定义size
        pageSize: 20,
      },
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

## 定义滚动速度

通过属性`speed` 定义滚动速度。数值越大就越快。默认`1`

```vue
<template>
  <div style="margin-bottom:20px;height:300px;">
    <IFunSeamlessScroll :data="data" :speed="2" />
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

## slot

- 提供两个 slot 定义内容区域。没有数据时，为空时，可通过`empty` slot 定义数据空展示状态。

- 自定义元素渲染 slot 具名`item`。即可进行自定义数据渲染。

## 重要

为了最佳的滚动效果查看，请定义`options.itemWidth` ; 动态计算滚动高度，这样可以无差别切换渲染。默认`itemWidth:30`

如果各个元素高度不一，则滚动效果不好。

## API 属性一览

| props   |       说明       |           默认值 |
| ------- | :--------------: | ---------------: |
| virtual | 是否开启虚拟滚动 |       默认 false |
| data    |      数据源      |      必传，Array |
| speed   |     滚动速度     |           默认 1 |
| options |     滚动配置     | 详见下表 Options |

## ScrollOptions

| props     |        说明        |                                                      默认值 |
| --------- | :----------------: | ----------------------------------------------------------: |
| value     |    数据 key 值     |                                                  默认 value |
| label     |   数据展示的名称   |                                                  默认 label |
| pageSize  |  列表渲染的数据量  |                                                    默认 100 |
| itemWidth | 渲染的数据元素高度 | 竖向滚动为高度，横向滚动为宽度（暂时没有横向滚动），默认 30 |
