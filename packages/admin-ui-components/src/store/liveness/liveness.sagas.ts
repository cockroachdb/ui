import { all, call, put, delay, takeLatest } from "redux-saga/effects";
import { getLiveness } from "src/api/livenessApi";
import { actions } from "./liveness.reducer";

import { CACHE_INVALIDATION_PERIOD, throttleWithReset } from "src/store/utils";

export function* refreshLivenessStatusesSaga() {
  yield put(actions.request());
}

export function* requestLivenessStatusesSaga(apiBasePath: string) {
  try {
    const result = yield call(getLiveness, apiBasePath);
    yield put(actions.received(result));
  } catch (e) {
    yield put(actions.failed(e));
  }
}

export function* receivedStatementsSaga(delayMs: number) {
  yield delay(delayMs);
  yield put(actions.invalidated());
}

export function* livenessSaga(
  cacheInvalidationPeriod: number = CACHE_INVALIDATION_PERIOD,
  apiBasePath: string = undefined,
) {
  yield all([
    throttleWithReset(
      cacheInvalidationPeriod,
      actions.refresh,
      [actions.invalidated, actions.failed],
      refreshLivenessStatusesSaga,
    ),
    takeLatest(actions.request, requestLivenessStatusesSaga, apiBasePath),
    takeLatest(
      actions.received,
      receivedStatementsSaga,
      cacheInvalidationPeriod,
    ),
  ]);
}
