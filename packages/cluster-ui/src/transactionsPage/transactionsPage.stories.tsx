import React from "react";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { cloneDeep, noop, extend } from "lodash";
import { data, routeProps } from "./transactions.fixture";

import { TransactionsPage } from ".";
import { RequestError } from "../util";

const getEmptyData = () =>
  extend({}, data, { transactions: [], statements: [] });

export default {
  title: "Transactions Page",
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <MemoryRouter>{storyFn()}</MemoryRouter>
    ),
    (storyFn: () => React.ReactNode) => (
      <div style={{ backgroundColor: "#F5F7FA" }}>{storyFn()}</div>
    ),
  ],
};

export const WithData = () => (
  <TransactionsPage {...routeProps} data={data} refreshData={noop} />
);

export const WithoutData = () => {
  return (
    <TransactionsPage
      {...routeProps}
      data={getEmptyData()}
      refreshData={noop}
    />
  );
};

export const WithEmptySearchResult = () => {
  const route = cloneDeep(routeProps);
  const { history } = route;
  const searchParams = new URLSearchParams(history.location.search);
  searchParams.set("q", "aaaaaaa");
  history.location.search = searchParams.toString();

  return (
    <TransactionsPage
      {...routeProps}
      data={getEmptyData()}
      refreshData={noop}
      history={history}
    />
  );
};

export const WithLoadingIndicator = () => {
  return (
    <TransactionsPage {...routeProps} data={undefined} refreshData={noop} />
  );
};

export const WithErrorAlert = () => {
  return (
    <TransactionsPage
      {...routeProps}
      data={undefined}
      error={
        new RequestError(
          "Forbidden",
          403,
          "this operation requires admin privilege",
        )
      }
      refreshData={noop}
    />
  );
};
