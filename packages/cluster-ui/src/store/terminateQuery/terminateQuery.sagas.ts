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
import { all, call, put, takeEvery } from "redux-saga/effects";

import { terminateQuery, terminateSession } from "src/api/terminateQueryApi";
import { actions as sessionsActions } from "src/store/sessions";
import { actions as terminateQueryActions } from "./terminateQuery.reducer";

import { cockroach } from "@cockroachlabs/crdb-protobuf-client";
import { XOR } from "src/util/xor";

const CancelSessionRequest = cockroach.server.serverpb.CancelSessionRequest;
const CancelQueryRequest = cockroach.server.serverpb.CancelQueryRequest;
export type ICancelSessionRequest = cockroach.server.serverpb.ICancelSessionRequest;
export type ICancelQueryRequest = cockroach.server.serverpb.ICancelQueryRequest;

export enum NotificationType {
  Success,
  Error,
}

export type SendNotification = (
  type: NotificationType,
  message: string,
) => void;

type CancelSessionType = {
  req: ICancelSessionRequest;
  sendNotification?: SendNotification;
};

export type CancelSessionPayload = XOR<
  CancelSessionType,
  ICancelSessionRequest
>;

export function* terminateSessionSaga(
  action: PayloadAction<CancelSessionPayload>,
) {
  const { sendNotification } = action.payload;
  const req = action.payload.req || action.payload;
  const terminateSessionRequest = new CancelSessionRequest(req);

  try {
    yield call(terminateSession, terminateSessionRequest);
    yield put(terminateQueryActions.terminateSessionCompleted());
    yield put(sessionsActions.invalidated());
    yield put(sessionsActions.refresh());
    sendNotification &&
      sendNotification(NotificationType.Success, "Session terminated.");
    //yield put(terminateSessionAlertLocalSetting.set({ show: true, status: "SUCCESS"}));
  } catch (e) {
    yield put(terminateQueryActions.terminateSessionFailed(e));
    sendNotification &&
      sendNotification(NotificationType.Error, "Session terminated.");
    //yield put(terminateSessionAlertLocalSetting.set({ show: true, status: "FAILED"}));
  }
}

interface CancelQueryWithCallbacks {
  req: ICancelQueryRequest;
  sendNotification?: SendNotification;
}

export type CancelQueryPayload = XOR<
  CancelQueryWithCallbacks,
  ICancelQueryRequest
>;

export function* terminateQuerySaga(action: PayloadAction<CancelQueryPayload>) {
  const { sendNotification } = action.payload;
  const req = action.payload.req || action.payload;
  const terminateQueryRequest = new CancelQueryRequest(req);

  try {
    yield call(terminateQuery, terminateQueryRequest);
    yield put(terminateQueryActions.terminateQueryCompleted());
    yield put(sessionsActions.invalidated());
    yield put(sessionsActions.refresh());
    sendNotification &&
      sendNotification(NotificationType.Success, "Query terminated.");
  } catch (e) {
    //yield put(terminateQueryActions.terminateQueryFailed(e));
    sendNotification &&
      sendNotification(
        NotificationType.Error,
        "There was an error terminating the query.",
      );
  }
}

export function* terminateSaga() {
  yield all([
    takeEvery(terminateQueryActions.terminateSession, terminateSessionSaga),
    takeEvery(terminateQueryActions.terminateQuery, terminateQuerySaga),
  ]);
}
