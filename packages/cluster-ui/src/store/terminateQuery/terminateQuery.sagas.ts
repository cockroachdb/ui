// Copyright 2020 The Cockroach Authors.
//
// Use of this software is governed by the Business Source License
// included in the file licenses/BSL.txt.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the Apache License, Version 2.0, included in the file
// licenses/APL.txt.

import { PayloadAction } from "@reduxjs/toolkit";
import {all, call, put, takeEvery} from "redux-saga/effects";

// import {terminateQueryAlertLocalSetting, terminateSessionAlertLocalSetting} from "src/redux/alerts";
import { terminateQuery, terminateSession } from "src/api/terminateQueryApi";
import { actions as SessionsActions } from "src/store/sessions";
import { actions } from "./terminateQuery.reducer"


import { cockroach } from "@cockroachlabs/crdb-protobuf-client";
const CancelSessionRequest = cockroach.server.serverpb.CancelSessionRequest;
const CancelQueryRequest = cockroach.server.serverpb.CancelQueryRequest;
export type ICancelSessionRequest = cockroach.server.serverpb.CancelSessionRequest;
export type ICancelQueryRequest = cockroach.server.serverpb.CancelQueryRequest;

export function* terminateSessionSaga(action: PayloadAction<ICancelSessionRequest>) {
  const terminateSessionRequest = new CancelSessionRequest(action.payload);
  try {
    yield call(terminateSession, terminateSessionRequest);
    yield put(actions.terminateSessionCompleted());
    yield put(SessionsActions.invalidated());
    yield put(SessionsActions.refresh());
    //yield put(terminateSessionAlertLocalSetting.set({ show: true, status: "SUCCESS"}));
  } catch (e) {
    yield put(actions.terminateSessionFailed(e));
    //yield put(terminateSessionAlertLocalSetting.set({ show: true, status: "FAILED"}));
  }
}

export function* terminateQuerySaga(action: PayloadAction<ICancelQueryRequest>) {
  const terminateQueryRequest = new CancelQueryRequest(action.payload);
  try {
    yield call(terminateQuery, terminateQueryRequest);
    yield put(actions.terminateQueryCompleted());
    yield put(SessionsActions.invalidated());
    yield put(SessionsActions.refresh());
    //yield put(terminateQueryAlertLocalSetting.set({ show: true, status: "SUCCESS"}));
  } catch (e) {
    yield put(actions.terminateQueryFailed(e));
    //yield put(terminateQueryAlertLocalSetting.set({ show: true, status: "FAILED"}));
  }
}

export function* terminateSaga() {
  yield all([
    takeEvery(actions.terminateSession, terminateSessionSaga),
    takeEvery(actions.terminateQuery, terminateQuerySaga),
  ]);
}
