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

export function* requestStatementsSaga(apiBasePath: string) {
  try {
    const result = yield call(getStatements, apiBasePath);
    yield put(statementsReceived(result));
  } catch (e) {
    yield put(statementsRequestFailed(e));
  }
}

export function* receivedStatementsSaga(delayMs: number) {
  yield delay(delayMs);
  yield put(invalidateStatements());
}

export function* statementsSaga(
  cacheInvalidationPeriod: number = CACHE_INVALIDATION_PERIOD,
  apiBasePath: string = undefined,
) {
  yield all([
    throttleWithReset(
      cacheInvalidationPeriod,
      statementsActionsMap.refresh,
      [statementsActionsMap.invalidated, statementsActionsMap.failed],
      refreshStatementsSaga,
    ),
    takeLatest(
      statementsActionsMap.request,
      requestStatementsSaga,
      apiBasePath,
    ),
    takeLatest(
      statementsActionsMap.received,
      receivedStatementsSaga,
      cacheInvalidationPeriod,
    ),
  ]);
}
