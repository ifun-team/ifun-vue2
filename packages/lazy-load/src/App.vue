<template>
  <div class="app">
    <IFunLazySelect v-model="value" :checked="value" :data="data" />
    <br />
    <IFunLazySelect
      v-model="valArr"
      :multiple="true"
      :checked="valArr"
      :data="data"
    />
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
