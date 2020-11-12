import { zipObject } from "lodash";

export const SCOPE_NAME = "adminUI";

export const actionName = (domainName: string) => (description: string) =>
  `${SCOPE_NAME}/${domainName}/${description}`;

export type ActionsDict<T extends ReadonlyArray<string>> = {
  [P in T[number]]?: P;
};

export const getActionsMap = (domainName: string) => {
  const getActionName = actionName(domainName);
  return <T extends ReadonlyArray<string>>(actionKeys: T): ActionsDict<T> => {
    const values = actionKeys.map(getActionName);
    return zipObject(actionKeys, values) as ActionsDict<T>;
  };
};
