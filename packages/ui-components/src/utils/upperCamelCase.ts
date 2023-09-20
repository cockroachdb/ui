import camelCase from "lodash/camelCase";

export default function upperCamelCase(s: string) {
  return s.charAt(0).toUpperCase() + camelCase(s.slice(1));
}
