import { createSelector } from "reselect";
import {
  aggregateStatementStats,
  appAttr,
  combineStatementStats,
  ExecutionStatistics,
  flattenStatementStats,
  formatDate,
  getMatchParamByName,
  StatementStatistics,
  TimestampToMoment,
} from "src/util";
import { cockroach } from "@cockroachlabs/crdb-protobuf-client";
import { RouteComponentProps } from "react-router-dom";
import { StatementsState } from "./statementsPage.reducer";
import { selectLastDiagnosticsReportPerStatement } from "src/statementsDiagnostics";
import { StateWithStatements } from "./index";

type ICollectedStatementStatistics = cockroach.server.serverpb.StatementsResponse.ICollectedStatementStatistics;

export interface StatementsSummaryData {
  statement: string;
  implicitTxn: boolean;
  stats: StatementStatistics[];
}

function keyByStatementAndImplicitTxn(stmt: ExecutionStatistics): string {
  return stmt.statement + stmt.implicit_txn;
}

export const adminUISelector = createSelector(
  (state: StateWithStatements) => state.adminUI,
  adminUiState => adminUiState,
);

export const statementsSelector = createSelector(
  adminUISelector,
  adminUiState => adminUiState.statements,
);

// selectApps returns the array of all apps with statement statistics present
// in the data.
export const selectApps = createSelector(
  statementsSelector,
  statementsState => {
    if (!statementsState.data) {
      return [];
    }

    let sawBlank = false;
    let sawInternal = false;
    const apps: { [app: string]: boolean } = {};
    statementsState.data.statements.forEach(
      (statement: ICollectedStatementStatistics) => {
        if (
          statementsState.data.internal_app_name_prefix &&
          statement.key.key_data.app.startsWith(
            statementsState.data.internal_app_name_prefix,
          )
        ) {
          sawInternal = true;
        } else if (statement.key.key_data.app) {
          apps[statement.key.key_data.app] = true;
        } else {
          sawBlank = true;
        }
      },
    );
    return []
      .concat(sawInternal ? ["(internal)"] : [])
      .concat(sawBlank ? ["(unset)"] : [])
      .concat(Object.keys(apps));
  },
);

// selectTotalFingerprints returns the count of distinct statement fingerprints
// present in the data.
export const selectTotalFingerprints = createSelector(
  statementsSelector,
  state => {
    if (!state.data) {
      return 0;
    }
    const aggregated = aggregateStatementStats(state.data.statements);
    return aggregated.length;
  },
);

// selectLastReset returns a string displaying the last time the statement
// statistics were reset.
export const selectLastReset = createSelector(statementsSelector, state => {
  if (!state.data) {
    return "";
  }

  return formatDate(TimestampToMoment(state.data.last_reset));
});

export const selectStatements = createSelector(
  statementsSelector,
  (_: StateWithStatements, props: RouteComponentProps) => props,
  selectLastDiagnosticsReportPerStatement,
  (
    state: StatementsState,
    props: RouteComponentProps<any>,
    lastDiagnosticsReportPerStatement,
  ) => {
    if (!state.data) {
      return null;
    }
    let statements = flattenStatementStats(state.data.statements);
    const app = getMatchParamByName(props.match, appAttr);
    const isInternal = (statement: ExecutionStatistics) =>
      statement.app.startsWith(state.data.internal_app_name_prefix);

    if (app) {
      let criteria = decodeURIComponent(app);
      let showInternal = false;
      if (criteria === "(unset)") {
        criteria = "";
      } else if (criteria === "(internal)") {
        showInternal = true;
      }

      statements = statements.filter(
        (statement: ExecutionStatistics) =>
          (showInternal && isInternal(statement)) || statement.app === criteria,
      );
    } else {
      statements = statements.filter(
        (statement: ExecutionStatistics) => !isInternal(statement),
      );
    }

    const statsByStatementAndImplicitTxn: {
      [statement: string]: StatementsSummaryData;
    } = {};
    statements.forEach(stmt => {
      const key = keyByStatementAndImplicitTxn(stmt);
      if (!(key in statsByStatementAndImplicitTxn)) {
        statsByStatementAndImplicitTxn[key] = {
          statement: stmt.statement,
          implicitTxn: stmt.implicit_txn,
          stats: [],
        };
      }
      statsByStatementAndImplicitTxn[key].stats.push(stmt.stats);
    });

    return Object.keys(statsByStatementAndImplicitTxn).map(key => {
      const stmt = statsByStatementAndImplicitTxn[key];
      return {
        label: stmt.statement,
        implicitTxn: stmt.implicitTxn,
        stats: combineStatementStats(stmt.stats),
        diagnosticsReport: lastDiagnosticsReportPerStatement[stmt.statement],
      };
    });
  },
);

export const selectStatementsLastError = createSelector(
  statementsSelector,
  state => state.lastError,
);
