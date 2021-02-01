// Copyright 2020 The Cockroach Authors.
//
// Use of this software is governed by the Business Source License
// included in the file licenses/BSL.txt.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the Apache License, Version 2.0, included in the file
// licenses/APL.txt.

//import {refreshSessions} from "src/redux/apiReducers";
import { createMemoryHistory } from "history";
import { SessionDetailsProps } from "./sessionDetails";
import {
  activeSession,
  idleSession,
  idleTransactionSession,
} from "./sessionsPage.fixture";
import { sessionAttr } from "src/util/constants";

import { actions as sessionsActions } from "src/store/sessions";
import { actions as nodesActions } from "src/store/nodes";
import { actions as nodesLivenessActions } from "src/store/liveness";
import { actions as terminateQueryActions } from "src/store/terminateQuery";

const history = createMemoryHistory({ initialEntries: ["/sessions"] });

const sessionDetailsPropsBase: SessionDetailsProps = {
  id: "blah",
  nodeNames: {
    1: "localhost",
  },
  sessionError: null,
  session: null,
  history,
  location: {
    pathname: "/sessions/blah",
    search: "",
    hash: "",
    state: null,
  },
  match: {
    path: "/sessions/blah",
    url: "/sessions/blah",
    isExact: true,
    params: { [sessionAttr]: "blah" },
  },

  refreshSessions: (() => {}) as typeof sessionsActions.refresh,
  cancelSession: (() => {}) as typeof terminateQueryActions.terminateSession,
  cancelQuery: (() => {}) as typeof terminateQueryActions.terminateQuery,
  refreshNodes: (() => {}) as typeof nodesActions.refresh,
  refreshNodesLiveness: (() => {}) as typeof nodesLivenessActions.refresh,
};

export const sessionDetailsIdlePropsFixture: SessionDetailsProps = {
  ...sessionDetailsPropsBase,
  session: idleSession,
};

export const sessionDetailsActiveTxnPropsFixture: SessionDetailsProps = {
  ...sessionDetailsPropsBase,
  session: idleTransactionSession,
};

export const sessionDetailsActiveStmtPropsFixture: SessionDetailsProps = {
  ...sessionDetailsPropsBase,
  session: activeSession,
};

export const sessionDetailsNotFound: SessionDetailsProps = {
  ...sessionDetailsPropsBase,
  session: { session: null },
};
