"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const bind_1 = __importDefault(require("classnames/bind"));
const objectToClassnames_1 = __importDefault(require("../utils/objectToClassnames"));
const Badge_module_scss_1 = __importDefault(require("./Badge.module.scss"));
const cx = bind_1.default.bind(Badge_module_scss_1.default);
const Badge = (_a) => {
    var { intent = "neutral", transformCase = "uppercase", children } = _a, props = __rest(_a, ["intent", "transformCase", "children"]);
    const classnames = cx("badge", objectToClassnames_1.default({ intent, transformCase }));
    if (children !== undefined) {
        return (react_1.default.createElement("div", Object.assign({ className: classnames }, props), children));
    }
    return null;
};
exports.default = Badge;
//# sourceMappingURL=Badge.js.map