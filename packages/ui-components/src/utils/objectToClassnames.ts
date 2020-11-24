
import flow from "lodash/fp/flow";
import filter from "lodash/fp/filter";
import split from "lodash/fp/split";
import join from "lodash/fp/join";
import map from "lodash/fp/map";
import uniq from "lodash/fp/uniq";
import isEmpty from "lodash/isEmpty";
import negate from "lodash/negate";

const appendSuffix = (suffix: string) => (string: string) =>
  `${string}${suffix}`;

const containerSuffix = appendSuffix("__container");

export const generateContainerClassnames = (className = ""): string =>
  flow([
    split(" "),
    filter(negate(isEmpty)),
    map(containerSuffix),
    uniq,
    join(" "),
  ])(className);

// const classnames = classnames("component", propsToClassNames({ prop1, prop2, prop3 }));
// "[prop1 name]--[prop1 value] [prop2 name]--[prop2 value] [prop3 name]--[prop3 value]";

const objectToClassNames = (
  obj: { [key: string]: string },
  delimiter = "-",
): string[] =>
  Object.keys(obj).reduce(
    (acc, key) => [`${key}${delimiter}${obj[key]}`, ...acc],
    [],
  );

export default objectToClassNames;
