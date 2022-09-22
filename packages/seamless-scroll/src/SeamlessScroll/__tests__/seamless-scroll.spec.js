import SeamlessScroll from "../seamless-scroll.vue";

import { mount, createLocalVue } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

// Vue
const Vue = createLocalVue();

//
describe("seamless-scroll", () => {
  let data = new Array(100).fill(0).map((key, index) => ({
    value: index,
    label: "测试数据" + index,
  }));
  // 1. 验证创建
  test("create", () => {
    let wrapper = mount(SeamlessScroll, {
      propsData: {
        data: [],
      },
      localVue: Vue,
    });
    expect(wrapper.is(SeamlessScroll)).toBe(true);
    expect(wrapper.classes()).toContain("ifun-seamless-scroll");
    // 测试渲染滚动元素
    const scroll = wrapper.findComponent(".scroll-box");
    expect(scroll.exists()).toBe(true);
  });
  // 2. 验证数据渲染
  test("scroll-item", async () => {
    let wrapper = mount(SeamlessScroll, {
      propsData: {
        data: data,
      },
      localVue: Vue,
    });

    const preUl = wrapper.find(".pre-data");

    let options = preUl.findAll("li");
    // 渲染的元素
    expect(options.length).toBe(100);
    //
    expect(options.at(0).text()).toBe("测试数据0");
  });
  // // 3. 验证默认值
  test("virtual-scroll", async () => {
    let wrapper = mount(SeamlessScroll, {
      propsData: {
        data: data,
        virtual: true,
        options: {
          pageSize: 20,
        },
      },
      localVue: Vue,
    });
    expect(wrapper.props("virtual")).toBe(true);
    expect(wrapper.props("options").pageSize).toBe(20);
    // await nextTick();
    const preUl = wrapper.find(".pre-data");

    let options = preUl.findAll("li");
    // 渲染的元素
    expect(options.length).toBe(20);
  });
  // 4. 验证自定义渲染元素
  test("virtual-scroll", async () => {
    let wrapper = mount(SeamlessScroll, {
      propsData: {
        data: data,
        virtual: true,
        options: {
          pageSize: 20,
        },
      },
      scopedSlots: {
        default:
          '<p slot-scope="{params}">{{params.value}}-{{params.label}}</p>',
      },
      localVue: Vue,
    });
    // await nextTick();
    const preUl = wrapper.find(".pre-data");

    let options = preUl.findAll("li");
    // 渲染的元素
    expect(options.at(0).find("p").text()).toBe("0-测试数据0");
  });
});
