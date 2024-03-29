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

## 特点

- 实现数据的无缝滚动（纵向）
- 实现大数据量的虚拟无缝 滚动（大数据量优化）
- 滚动内容自定义渲染
- 滚动区域内，滚动可由鼠标控制滚动

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

## `scroll`关闭滚动

通过传入`scroll:false`, 标识不需要滚动。这种场景在于数据量少于滚动区域时，滚动反而没有任何意义。

此时可以通过定义 `:scroll="data.length>5"` 展示所有的数据。这完全取决于你的主观判断；

> 当然你也可以在数据量多是关闭自动滚动，此时你可以设置跟元素`overflow:auto` 手动滚动。

```vue
<template>
  <div style="margin-bottom:20px;height:300px;">
    <IFunSeamlessScroll
      :data="data"
      :scroll="data.length > 5"
      :options="options"
    />
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

## slot

- 提供两个 slot 定义内容区域。没有数据时，为空时，可通过`empty` slot 定义数据空展示状态。

- 自定义元素渲染 slot 具名`item`。即可进行自定义数据渲染。

```vue
<template>
  <div style="margin-bottom:20px;height:300px;">
    <IFunSeamlessScroll
      :data="data"
      :scroll="data.length > 5"
      :options="options"
    >
      <template v-slot="{ params }">
        <div class="info">
          <span>{{ params.label }}</span>
          <span>{{ params.value }}</span>
        </div>
      </template>
    </IFunSeamlessScroll>
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

## 重要 为了最佳的滚动效果查看，请定义`options.itemWidth` ;

动态计算滚动高度，这样可以无差别切换渲染。默认`itemWidth:30`
如果各个元素高度不一，则滚动效果不好。

## 鼠标滚动控制内容滚动

滚动内容区放开了鼠标滚动；可对当前内容实现鼠标的滚轮滚动；

不开启虚拟滚动时，没有任何问题；

开启虚拟滚动，当向上滚动时，分批次数据仅滚动到内容区顶部，不会在进行循环渲染；向下滚动则没有问题；

## API 属性一览

| props       | 说明                 | 默认值           |
| ----------- | -------------------- | ---------------- |
| virtual     | 是否开启虚拟滚动     | 默认 false       |
| data        | 数据源               | 必传，Array      |
| speed       | 滚动速度             | 默认 1           |
| options     | 滚动配置             | 详见下表 Options |
| scroll      | 控制是否需要自动滚动 | 默认 true        |
| whellScroll | 鼠标滚轮支持滚动     | 默认 true        |

## ScrollOptions

| props     |        说明        | 默认值                                                      |
| --------- | :----------------: | ----------------------------------------------------------- |
| value     |    数据 key 值     | 默认 value                                                  |
| label     |   数据展示的名称   | 默认 label                                                  |
| pageSize  |  列表渲染的数据量  | 默认 100                                                    |
| itemWidth | 渲染的数据元素高度 | 竖向滚动为高度，横向滚动为宽度（暂时没有横向滚动），默认 30 |
