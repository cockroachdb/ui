import { all, fork } from "redux-saga/effects";

import { localStorageSaga } from "./localStorage";
import { statementsDiagnosticsSagas } from "./statementDiagnostics";
import { statementsSaga } from "./statements";

export function* sagas(cacheInvalidationPeriod?: number, apiBasePath?: string) {
  yield all([
    fork(localStorageSaga),
    fork(statementsSaga, cacheInvalidationPeriod, apiBasePath),
    fork(statementsDiagnosticsSagas, cacheInvalidationPeriod),
  ]);
}
