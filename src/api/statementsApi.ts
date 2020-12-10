import { cockroach } from "@cockroachlabs/crdb-protobuf-client";
import { fetchData } from "src/api";

const STATEMENTS_PATH = "/_status/statements";

export const getStatements = (
  basePath = "",
): Promise<cockroach.server.serverpb.StatementsResponse> => {
  return fetchData(
    cockroach.server.serverpb.StatementsResponse,
    `${basePath}${STATEMENTS_PATH}`,
  );
};
