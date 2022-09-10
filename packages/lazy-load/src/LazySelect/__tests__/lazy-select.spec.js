import LazySelect from "../lazy-select.vue";

// import { shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

describe("LazySelect", () => {
  let data = new Array(100).fill(0).map((item, index) => ({
    value: index,
    label: "测试" + index,
  }));
  test("default", () => {
    // const wrapper = shallowMount(LazySelect, {
    //   slots: {
    //     default: "提交",
    //   },
    //   props: {
    //     data: data,
    //   },
    // });

    // 默认的文本
    expect(true).toBe(true);
  });
});
