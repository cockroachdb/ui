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
import { ConnectedStatementsPage } from "./statementsPageConnected";
import {
  statementsReducers,
  StateWithStatements,
  statementsSagas,
} from "../store";

const history = createMemoryHistory();
const routerReducer = connectRouter(history);
const sagaMiddleware = createSagaMiddleware();

const store: Store<StateWithStatements> = createStore(
  combineReducers({
    router: routerReducer,
    adminUI: statementsReducers,
  }),
  compose(
    applyMiddleware(sagaMiddleware, routerMiddleware(history)),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

sagaMiddleware.run(statementsSagas);

storiesOf("statementsPageConnected", module)
  .addDecorator(storyFn => (
    <Provider store={store}>
      <ConnectedRouter history={history}>{storyFn()}</ConnectedRouter>
    </Provider>
  ))
  .addDecorator(storyFn => (
    <div style={{ backgroundColor: "#F5F7FA" }}>{storyFn()}</div>
  ))
  .add("with data", () => <ConnectedStatementsPage />);
