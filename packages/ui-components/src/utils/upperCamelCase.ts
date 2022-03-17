import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

const upperCamelCase = (s: string) => upperFirst(camelCase(s));

export default upperCamelCase;
