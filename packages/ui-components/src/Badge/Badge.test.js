"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const Badge_1 = __importDefault(require("./Badge"));
describe("Badge content", () => {
    test("can render using children", () => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(Badge_1.default, null, "child content"));
        expect(wrapper).toMatchSnapshot();
    });
    test("if empty shouldn't render", () => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(Badge_1.default, null));
        expect(wrapper.isEmptyRender()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });
});
describe("Badge Intent prop", () => {
    test("will be neutral by default", () => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(Badge_1.default, null, "intent test"));
        expect(wrapper.prop("className")).toContain("intent-neutral");
    });
    test("will change the display of a badge", () => {
        const wrapper = enzyme_1.shallow(react_1.default.createElement(Badge_1.default, null, "intent test"));
        // success
        wrapper.setProps({ intent: "success" });
        expect(wrapper.prop("className")).toContain("intent-success");
        // warning
        wrapper.setProps({ intent: "warning" });
        expect(wrapper.prop("className")).toContain("intent-warning");
        // danger
        wrapper.setProps({ intent: "danger" });
        expect(wrapper.prop("className")).toContain("intent-danger");
        // neutral
        wrapper.setProps({ intent: "neutral" });
        expect(wrapper.prop("className")).toContain("intent-neutral");
    });
});
test("A badge can render the text case provided by content via a prop", () => {
    const wrapper = enzyme_1.shallow(react_1.default.createElement(Badge_1.default, { transformCase: "none" }, "transformCase test"));
    expect(wrapper.prop("className")).toContain("transformCase-none");
});
//# sourceMappingURL=Badge.test.js.map