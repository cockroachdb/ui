import { createSelector } from "reselect";
import { chain, last, sortBy } from "lodash";

import { cockroach } from "@cockroachlabs/crdb-protobuf-client";
import { StateWithStatements } from "../../statementsPage/store";
type IStatementDiagnosticsReport = cockroach.server.serverpb.IStatementDiagnosticsReport;

export const statementDiagnostics = createSelector(
  (state: StateWithStatements) => state.adminUI,
  state => state.statementDiagnosticsReports,
);

export const selectStatementDiagnosticsReports = createSelector(
  statementDiagnostics,
  state => state.data?.reports,
);

type StatementDiagnosticsDictionary = {
  [statementFingerprint: string]: IStatementDiagnosticsReport;
};

export const selectLastDiagnosticsReportPerStatement = createSelector(
  selectStatementDiagnosticsReports,
  (
    diagnosticsReports: IStatementDiagnosticsReport[],
  ): StatementDiagnosticsDictionary =>
    chain(diagnosticsReports)
      .groupBy(diagnosticsReport => diagnosticsReport.statement_fingerprint)
      // Perform ASC sorting and take the last item
      .mapValues(diagnostics =>
        last(sortBy(diagnostics, d => d.requested_at.seconds.toNumber())),
      )
      .value(),
);
