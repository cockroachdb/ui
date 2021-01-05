import React from "react";
import { LocationDescriptor } from "history";
import { useHistory } from "react-router-dom";
import { BasePathContext } from "./basePathContext";
import { extendWithBasePath } from "./pathUtils";

export const useNavigation = () => {
  const basePath = React.useContext(BasePathContext);
  const history = useHistory();
  const navigate = React.useCallback(
    (path: LocationDescriptor, action: "PUSH" | "REPLACE" = "PUSH") => {
      const nextPath = extendWithBasePath(path, basePath);
      if (action === "PUSH") {
        history.push(nextPath);
      } else {
        history.replace(nextPath);
      }
    },
    [history, basePath],
  );
  return { navigate };
};
