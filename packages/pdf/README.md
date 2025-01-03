<br />

<h1 align="center">IFunPdf</h1>
<p align='center'>
    <a href="https://github.com/ifun-team/ifun-vue2/tree/main/packages/pdf">
        <img src="https://img.shields.io/npm/v/@ifun-vue2/pdf" />
    </a>
    <a href="https://github.com/ifun-team/ifun-vue2/tree/main/packages/pdf#license">
        <img src="https://img.shields.io/npm/l/@ifun-vue2/pdf" />
    </a>
</p>
<a href="https://github.com/ifun-team/ifun-vue2/actions/workflows/main.yml">
        <img src="https://github.com/ifun-team/ifun-vue2/actions/workflows/main.yml/badge.svg" />
    </a>
<br />
<p>pdf文件预览.</p>

## 特点

* 支持URL、Blob、Base64、ArrayBuffer等格式的PDF文件预览
* 支持设定缩放比例获得更高的清晰度
* 支持设置适配容器大小

## 安装

```sh
npm i @ifun-vue2/pdf
```

使用

```js
import IFunPdf from "@ifun-vue2/pdf";
// 样式
import "@ifun-vue2/pdf/dist/style.css";
// 使用
Vue.use(IFunPdf);
```

局部注册，导入组件使用：

```js
import { IFunPdf } from "@ifun-vue2/pdf";
// 样式
import "@ifun-vue2/pdf/dist/style.css";
```

## 预览数据类型

### 文件地址`url`

保证文件url可被访问。地址同源

```vue
<template>
  <div>
    <IFunPdf :options="options" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        url: pdfUrl,
      },
    };
  },
};
</script>
```

### 二进制数据`blob`\ `base64` \ `ArrayBuffer`

通过`data` 属性传入二进制数据

```vue
<script>
export default {
  data() {
    return {
      options: {
        data: "",
      },
    };
  },
  mounted() {
    
  },
  methods: {
    getPdf() {
      // 文件加载逻辑
      // ... 

      const fileReader = new FileReader();

      fileReader.onload = (event) => {
        let blobData = event.target.result;
        this.options.data = blobData;
      };
      fileReader.readAsArrayBuffer(res.data);
    }
};
</script>
````

## 设置页面缩放`scale`，提高分辨率

设置合适的缩放比例额，可以获得高分辨率的图像。

```vue
<template>
  <div>
    <IFunPdf :options="options" :viewportOptions="{ scale: 5 }" />
  </div>
</template>
````

## API 属性一览

| props   | 说明                                        | 默认值 |
| ------- | ------------------------------------------- | ------ |
| options | 初始化文档对象，同 API`getDocument`参数一致 |        |
|viewportOptions|pdf页面视口配置,同 API `getViewport`参数一致|默认`{scale: 1}`|
|fitView|设置渲染是否适配容器大小|默认`false`，默认为pdf原始大小 |

## `options`

| props   | 说明                                                         | 默认值 |
| ------- | ------------------------------------------------------------ | ------ |
| url     | `String`pdf 文档地址，需要同源                               |        |
| data    | `TypedArray\|ArrayBuffer`,二进制数据、base64（需要`atob()`） |        |
| ... | 其他可设置参数通pdfjs API参数  |        |

## `viewportOptions`

| props   | 说明                                                         | 默认值 |
| ------- | ------------------------------------------------------------ | ------ |
|scale|缩放比例|可调节获得高分辨率的图像,默认 `1`|
|rotation|页面旋转角度|默认 `0`|
|offsetX|页面水平偏移量|默认 `0`|
|offsetY|页面垂直偏移量|默认 `0`|
|...|||
