import LazySelect from "../lazy-select.vue";
import VLazyLoad from "../../vLazyLoad.js";
import ElementUI, { Select, Option } from "element-ui";

import { mount, createLocalVue } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

// Vue
const Vue = createLocalVue();
Vue.use(ElementUI);
Vue.directive("lazy-load", VLazyLoad);

describe("LazySelect", () => {
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
    expect(wrapper.classes()).toContain("ifun-lazy-select");
    // 测试渲染的el-select
    const select = wrapper.findComponent(Select);
    expect(select.exists()).toBe(true);
    await select.vm.toggleMenu();
    expect(select.vm.visible).toBe(true);
    // el-options
    expect(wrapper.findComponent(Option).exists()).toBe(true);
  });
  // 2. 验证数据渲染
  test("el-optioin", async () => {
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

    const options = wrapper.findAllComponents(Option);
    // 渲染的元素
    expect(options).toHaveLength(2);
  });
  // // 3. 验证默认值
  test("default value", async () => {
    let wrapper = mount(LazySelect, {
      propsData: {
        value: "001",
        checked: "001",
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
    // await nextTick();
    const select = wrapper.findComponent(Select);
    expect(select.props().value).toBe("001");
  });
});
