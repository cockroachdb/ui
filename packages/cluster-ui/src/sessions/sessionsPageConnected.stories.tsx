import React from "react";
import { storiesOf } from "@storybook/react";
import { createMemoryHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware,
} from "connected-react-router";
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
} from "redux";
import { SessionsPageConnected } from "./sessionsPageConnected";
import { AppState, rootReducer, sagas } from "../store";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  actions as TerminateQueryActions,
  ICancelSessionRequest,
} from "src/store/terminateQuery";

const history = createMemoryHistory();
const routerReducer = connectRouter(history);
const sagaMiddleware = createSagaMiddleware();

const exampleNotificationsReducer = createReducer(
  {
    nodeId: "",
  },
  {
    [TerminateQueryActions.terminateSession.type]: (
      state,
      action: PayloadAction<ICancelSessionRequest>,
    ) => {
      state.nodeId = action.payload.node_id;
    },
    [TerminateQueryActions.terminateSessionCompleted.type]: state => {
      alert("Hiya you want to close the session on node: " + state.nodeId);
    },
  },
);
const store: Store<AppState> = createStore(
  combineReducers({
    router: routerReducer,
    adminUI: rootReducer,
    adminUINotifications: exampleNotificationsReducer,
  }),
  compose(
    applyMiddleware(sagaMiddleware, routerMiddleware(history)),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

sagaMiddleware.run(sagas);

storiesOf("Sessions Page Connected", module)
  .addDecorator(storyFn => (
    <Provider store={store}>
      <ConnectedRouter history={history}>{storyFn()}</ConnectedRouter>
    </Provider>
  ))
  .addDecorator(storyFn => (
    <div style={{ backgroundColor: "#F5F7FA" }}>{storyFn()}</div>
  ))
  .add("with data", () => <SessionsPageConnected />);
