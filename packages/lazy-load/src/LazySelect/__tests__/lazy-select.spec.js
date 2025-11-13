import LazySelect from "../lazy-select.vue";
import VLazyLoad from "../../vLazyLoad.js";
import { mount, createLocalVue } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

// Vue
const Vue = createLocalVue();

describe("LazySelect", () => {
  let data = new Array(100).fill(0).map((item, index) => ({
    value: index + "",
    label: "数据" + index,
  }));
  // 1. 验证创建
  test("create", async () => {
    let wrapper = mount(LazySelect, {
      propsData: {
        value: "",
        data: [
          {
            value: "001",
            label: "测试数据1",
          },
          {
            value: "002",
            label: "测试数据2",
          },
        ],
      },
      localVue: Vue,
    });
    expect(wrapper.is(LazySelect)).toBe(true);
    // 测试渲染的el-select
    const select = wrapper.find("el-select");
    expect(select.exists()).toBe(true);

    // el-options
    expect(wrapper.find("el-option").exists()).toBe(true);
  });
});
