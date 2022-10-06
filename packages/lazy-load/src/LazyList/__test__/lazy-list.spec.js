import LazyList from "../lazy-list.vue";
import VLazyLoad from "../../vLazyLoad.js";

import { mount, createLocalVue } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

// Vue
const Vue = createLocalVue();
Vue.directive("lazy-load", VLazyLoad);

describe("LazyList", () => {
  // 1. 验证创建
  test("create", async () => {
    let wrapper = mount(LazyList, {
      propsData: {
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
    expect(wrapper.is(LazyList)).toBe(true);
    expect(wrapper.classes()).toContain("ifun-lazy-list");
    // 测试渲染的
    const box = wrapper.findComponent(".list-box");
    expect(box.exists()).toBe(true);

    await Vue.nextTick();
    // 数据长度
    const items = wrapper.findAll(".list-item");
    expect(items).toHaveLength(2);
  });
  // 2. 验证数据滚动
  test("scroll list", async () => {
    let data = new Array(100).fill(0).map((key, index) => ({
      value: index,
      label: "测试数据" + index,
    }));
    let wrapper = mount(LazyList, {
      propsData: {
        data: data,
      },
      style: {
        height: "150px",
      },
      localVue: Vue,
    });
    // await nextTick();
    expect(wrapper.vm.viewData).toHaveLength(15);
    // await wrapper.vm.$refs.box.scrollBy(0, 180);
  });
});
