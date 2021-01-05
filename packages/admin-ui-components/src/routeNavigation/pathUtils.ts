import { LocationDescriptor } from "history";

export const removeTrailingSlash = (path: string) =>
  path.charAt(path.length - 1) === "/" ? path.slice(0, -1) : path;

export const removeLeadingSlash = (path: string) =>
  path.charAt(0) === "/" ? path.slice(1) : path;

export const extendWithBasePath = (
  path: LocationDescriptor,
  basePath: string,
): LocationDescriptor => {
  if (typeof path === "string") {
    if (path.startsWith(basePath)) {
      return path;
    }
    return `${removeTrailingSlash(basePath)}/${removeLeadingSlash(path)}`;
  } else if ("pathname" in path) {
    if (path.pathname.startsWith(basePath)) {
      return path;
    }
    return {
      ...path,
      pathname: `${removeTrailingSlash(basePath)}/${removeLeadingSlash(
        path.pathname,
      )}`,
    };
  }
};
