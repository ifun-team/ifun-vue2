<template>
  <div class="app">
    <h2>IFun-lazy-select</h2>
    <IFunLazySelect v-model="value" :checked="value" :data="data" />
    <br />
    <IFunLazySelect
      v-model="valArr"
      :multiple="true"
      :checked="valArr"
      :data="data"
    />
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
    };
  },
  mounted() {
    this.data = new Array(100).fill(0).map((item, index) => ({
      value: index + "",
      label: "数据" + index,
    }));
  },
};
</script>
