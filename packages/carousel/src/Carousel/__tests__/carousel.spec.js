import Carousel from "../carousel.vue";
import ElementUI from "element-ui";

import { mount, createLocalVue } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

// Vue
const Vue = createLocalVue();
Vue.use(ElementUI);

describe("Carousel", () => {
  // 1. 验证创建
  test("create", async () => {
    let wrapper = mount(Carousel, {
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
    expect(wrapper.is(Carousel)).toBe(true);
  });
});
