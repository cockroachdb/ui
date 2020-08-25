import { AnyAction, Reducer } from "redux";

export const UPDATE_LOCAL_STORAGE = "ADMIN_UI/UPDATE_LOCAL_STORAGE";

export interface LocalStorageState {
  [key: string]: any;
}

// TODO (koorosh): initial state should be restored from preserved keys in LocalStorage
const initialState: LocalStorageState = {};

export const localStorageReducer: Reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_LOCAL_STORAGE:
      return {
        ...state,
        [payload.key]: payload.value,
      };
    default:
      return state;
  }
};

export const updateLocalStorage = (
  key: string,
  value: string | boolean | number,
): AnyAction => {
  return {
    type: UPDATE_LOCAL_STORAGE,
    payload: {
      key,
      value,
    },
  };
};
