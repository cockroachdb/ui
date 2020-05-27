"use strict";
// const classnames = classnames("component", propsToClassNames({ prop1, prop2, prop3 }));
// "[prop1 name]--[prop1 value] [prop2 name]--[prop2 value] [prop3 name]--[prop3 value]";
Object.defineProperty(exports, "__esModule", { value: true });
const objectToClassNames = (obj, delimiter = "-") => Object.keys(obj).reduce((acc, key) => [`${key}${delimiter}${obj[key]}`, ...acc], []);
exports.default = objectToClassNames;
//# sourceMappingURL=objectToClassnames.js.map