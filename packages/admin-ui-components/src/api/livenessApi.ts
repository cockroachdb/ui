import { cockroach } from "@cockroachlabs/crdb-protobuf-client";
import { fetchData } from "src/api";

const LIVENESS_PATH = "_admin/v1/liveness";

export function getLiveness(
  basePath = "",
): Promise<cockroach.server.serverpb.LivenessResponse> {
  return fetchData(
    cockroach.server.serverpb.LivenessResponse,
    `${basePath}/${LIVENESS_PATH}`,
  );
}
