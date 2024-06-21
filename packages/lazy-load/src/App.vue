<template>
  <div class="app">
    <h2>IFun-lazy-select</h2>
    <h3>基本使用</h3>
    <IFunLazySelect v-model="value" :checked="value" :data="data" />
    <h3>多选,<code>multiple</code></h3>
    <IFunLazySelect
      v-model="valArr"
      :multiple="true"
      :checked="valArr"
      :data="data"
    />
    <h3>
      过滤,<code>filterable</code>
      懒加载过滤时，重新定义数据源，过滤后再进行懒加载{{ visible }}
    </h3>
    <IFunLazySelect
      v-model="valFilter"
      filterable
      :data="data"
      @visible-change="(bool) => (visible = bool)"
    />
    <h3>
      分页远程加载,<code>lazy</code>
      分页加载时通过绑定加载函数<code>load</code>处理加载
    </h3>
    <IFunLazySelect
      v-model="valFilter"
      filterable
      :data="data"
      lazy
      :load="handleLoadData"
      @visible-change="(bool) => (visible = bool)"
    />
    <h2>IFun-lazy-list</h2>
    <IFunLazyList style="height: 150px" :data="data" />

    <h2>IFun-lazy-list</h2>
    <IFunLazyList style="height: 150px" :data="data" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      value: "23",
      valArr: ["24", "56"],
      valFilter: "",
      visible: false,
    };
  },
  mounted() {
    this.data = new Array(100).fill(0).map((item, index) => ({
      value: index + "",
      label: "数据" + index,
    }));
  },
  methods: {
    handleLoadData() {
      // 继续加载数据
      this.data.push(
        ...[
          {
            value: 101 + "",
            label: "数据" + 101,
          },
          {
            value: 102 + "",
            label: "数据" + 102,
          },
          {
            value: 103 + "",
            label: "数据" + 103,
          },
        ]
      );
    },
  },
};
</script>
