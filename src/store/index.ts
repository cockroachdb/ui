import { Action } from "redux";

// Default value for data invalidation in redux store.
// The main purpose is to decrease the number of requests on server.
export const CACHE_INVALIDATION_PERIOD = 300000; // defaults to 5min

export type ActionWithPayload<T, P> = {
  payload: P;
} & Action<T>;

export * from "./utils/sagaEffects/throttleWithReset";
export * from "./utils/getActionsMap";
