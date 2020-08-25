import { all, call, put, delay, takeLatest } from "redux-saga/effects";
import { getStatements } from "../api/statementsApi";
import {
  invalidateStatements,
  statementsReceived,
  statementsRequestFailed,
  requestStatements,
  statementsActionsMap,
} from "./statementsPage.reducer";
import { CACHE_INVALIDATION_PERIOD, throttleWithReset } from "src/store";

export function* refreshStatementsSaga() {
  yield put(requestStatements());
}

export function* requestStatementsSaga() {
  try {
    const result = yield call(getStatements);
    yield put(statementsReceived(result));
  } catch (e) {
    yield put(statementsRequestFailed(e));
  }
}

export function* receivedStatementsSaga(delayMs: number) {
  yield delay(delayMs);
  yield put(invalidateStatements());
}

export function* statementsSaga(delayMs: number = CACHE_INVALIDATION_PERIOD) {
  yield all([
    throttleWithReset(
      delayMs,
      statementsActionsMap.refresh,
      [statementsActionsMap.invalidated, statementsActionsMap.failed],
      refreshStatementsSaga,
    ),
    takeLatest(statementsActionsMap.request, requestStatementsSaga),
    takeLatest(statementsActionsMap.received, receivedStatementsSaga, delayMs),
  ]);
}
