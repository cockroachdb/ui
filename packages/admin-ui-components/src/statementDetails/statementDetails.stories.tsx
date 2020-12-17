import React from "react";
import { storiesOf } from "@storybook/react";
import { createMemoryHistory, Location } from "history";

import { StatementDetails } from "./statementDetails";
import { statementDetailsPropsFixture } from "./statementDetails.fixture";
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
import { AppState, rootReducer } from "../store";
import { Provider } from "react-redux";

const history = createMemoryHistory();
const routerReducer = connectRouter(history);

const store: Store<AppState> = createStore(
  combineReducers({
    router: routerReducer,
    adminUI: rootReducer,
  }),
  compose(
    applyMiddleware(routerMiddleware(history)),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

storiesOf("StatementDetails", module)
  .addDecorator(storyFn => (
    <Provider store={store}>
      <ConnectedRouter history={history}>{storyFn()}</ConnectedRouter>
    </Provider>
  ))
  .add("Overview tab", () => (
    <StatementDetails {...statementDetailsPropsFixture} />
  ))
  .add("Logical Plan tab", () => {
    const location: Location = {
      ...statementDetailsPropsFixture.history.location,
      search: new URLSearchParams([["tab", "logical-plan"]]).toString(),
    };
    return (
      <StatementDetails
        {...statementDetailsPropsFixture}
        history={{
          ...statementDetailsPropsFixture.history,
          location,
        }}
      />
    );
  })
  .add("Execution Stats tab", () => {
    const location: Location = {
      ...statementDetailsPropsFixture.history.location,
      search: new URLSearchParams([["tab", "execution-stats"]]).toString(),
    };
    return (
      <StatementDetails
        {...statementDetailsPropsFixture}
        history={{
          ...statementDetailsPropsFixture.history,
          location,
        }}
      />
    );
  });
