import React, { ComponentType } from "react";
import { LocationDescriptor } from "history";
import { useNavigation } from "./useNavigation";

export type WithNavigationProps = {
  navigate: (path: LocationDescriptor, action?: "PUSH" | "REPLACE") => void;
};

export const withNavigation = <P extends {}>(
  WrappedComponent: ComponentType<P & WithNavigationProps>,
): React.FC<P> => {
  return (props: P) => {
    const { navigate } = useNavigation();
    return <WrappedComponent {...props} navigate={navigate} />;
  };
};
