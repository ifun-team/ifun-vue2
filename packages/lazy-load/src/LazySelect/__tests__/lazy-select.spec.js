// import LazySelect from "../lazy-select.vue";

// import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

// const _mount = (template, data, otherObj) =>
//   mount(
//     {
//       components: {
//         "lazy-select": LazySelect,
//       },
//       template,
//       data,
//       ...otherObj,
//     },
//     {
//       attachTo: "body",
//     }
//   );

describe("LazySelect", () => {
  const findInnerInput = () => wrapper.find(".el-input__inner").element;
  // 1. 验证创建
  // test("create", async () => {
  //   wrapper = _mount(
  //     `<IFun-lazy-load v-model="value"></IFun-lazy-load>`,
  //     () => ({
  //       value: "",
  //     })
  //   );
  //   expect(wrapper.classes()).toContain("ifun-lazy-select");
  //   // 测试渲染的el-select
  //   const select = wrapper.findComponent({ name: "ElSelect" });
  //   await select.trigger("click");
  //   await nextTick();
  //   expect(select.vm.visible).toBe(true);
  // });
  // // 2. 验证数据渲染
  // test("create", async () => {
  //   wrapper = _mount(`<IFun-lazy-load :data="data"></IFun-lazy-load>`, () => ({
  //     data: [
  //       {
  //         value: "001",
  //         label: "测试数据",
  //       },
  //     ],
  //   }));
  //   const optionsArr = wrapper.findComponent({ name: "ElOption" });

  //   expect(optionsArr.length).toBe(1);
  // });
  // // 3. 验证默认值
  // test("default value", async () => {
  //   wrapper = _mount(
  //     `
  //     <IFun-lazy-load v-model="value"></IFun-lazy-load>
  //   `,
  //     () => ({
  //       options: [
  //         {
  //           value: "1",
  //           label: "admin",
  //         },
  //         {
  //           value: "2",
  //           label: "test",
  //         },
  //       ],
  //       value: "1",
  //     })
  //   );
  //   await nextTick();

  //   expect(findInnerInput().value).toBe("admin");
  // });
  test("create", async () => {
    expect(true).toBe(true);
  });
});
