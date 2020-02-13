// const classnames = classnames("component", propsToClassNames({ prop1, prop2, prop3 }));
// "[prop1 name]--[prop1 value] [prop2 name]--[prop2 value] [prop3 name]--[prop3 value]";

const objectToClassNames = (
  obj: { [key: string]: string },
  delimiter = "--",
): string =>
  Object.keys(obj)
    .reduce((acc, key) => [`${key}${delimiter}${obj[key]}`, ...acc], [])
    .join(" ");

export default objectToClassNames;
