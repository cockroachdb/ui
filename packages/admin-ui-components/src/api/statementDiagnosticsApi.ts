import { cockroach } from "@cockroachlabs/crdb-protobuf-client";
import { fetchData } from "src/api";

type CreateStatementDiagnosticsReportResponseMessage = cockroach.server.serverpb.CreateStatementDiagnosticsReportResponse;

const STATEMENT_DIAGNOSTIC_REPORT_PATH = "/_status/stmtdiagreports";
const STATEMENT_DIAGNOSTIC_PATH = "/_status/stmtdiag";

export function getStatementDiagnosticsReports(): Promise<
  cockroach.server.serverpb.StatementDiagnosticsReportsResponse
> {
  return fetchData(
    cockroach.server.serverpb.StatementDiagnosticsReportsResponse,
    STATEMENT_DIAGNOSTIC_REPORT_PATH,
  );
}

export function createStatementDiagnosticsReport(
  statementsFingerprint: string,
): Promise<CreateStatementDiagnosticsReportResponseMessage> {
  return fetchData(
    cockroach.server.serverpb.CreateStatementDiagnosticsReportResponse,
    STATEMENT_DIAGNOSTIC_REPORT_PATH,
    cockroach.server.serverpb.CreateStatementDiagnosticsReportRequest,
    {
      statement_fingerprint: statementsFingerprint,
    },
  );
}

export function getStatementDiagnostics(
  diagnosticsId: string,
): Promise<cockroach.server.serverpb.StatementDiagnosticsResponse> {
  return fetchData(
    cockroach.server.serverpb.StatementDiagnosticsResponse,
    `${STATEMENT_DIAGNOSTIC_PATH}/${diagnosticsId}`,
  );
}
