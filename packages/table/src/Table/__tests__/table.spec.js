import IFunTable from "../table.vue";
import ElementUI, { Table, TableColumn } from "element-ui";

import { mount, createLocalVue } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

// Vue
const Vue = createLocalVue();
Vue.use(ElementUI);

//
describe("seamless-scroll", () => {
  let data = new Array(100).fill(0).map((key, index) => ({
    value: index,
    label: "测试数据" + index,
  }));
  // 1. 验证创建
  test("create", () => {
    let wrapper = mount(IFunTable, {
      propsData: {
        tableOptions: {
          data: [],
          columns: [],
        },
      },
      localVue: Vue,
    });
    expect(wrapper.is(IFunTable)).toBe(true);
    expect(wrapper.classes()).toContain("ifun-table");
    // 测试渲染滚动元素
    const elTable = wrapper.findComponent(Table);
    expect(elTable.exists()).toBe(true);
  });
});
