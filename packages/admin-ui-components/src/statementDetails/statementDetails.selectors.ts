import { createSelector } from "reselect";
import _ from "lodash";
import { cockroach } from "@cockroachlabs/crdb-protobuf-client";
import { AppState } from "src/store";
import { selectStatementDiagnosticsReports } from "src/store/statementDiagnostics";
import {
  nodeDisplayNameByIDSelector,
  nodeStatusesSelector,
  nodeSumsSelector,
} from "src/store/nodes";
import {
  livenessesSelector,
  livenessStatusByNodeIDSelector,
} from "src/store/liveness";

export const selectDiagnosticsReportsByStatementFingerprint = createSelector(
  selectStatementDiagnosticsReports,
  (_state: AppState, statementFingerprint: string) => statementFingerprint,
  (reports, statementFingerprint) =>
    (reports || []).filter(
      report => report.statement_fingerprint === statementFingerprint,
    ),
);

export const selectDiagnosticsReportsCountByStatementFingerprint = createSelector(
  selectDiagnosticsReportsByStatementFingerprint,
  requests => requests.length,
);

/**
 * nodeIDsSelector returns the NodeID of all nodes currently on the cluster.
 */
const nodeIDsSelector = createSelector(nodeStatusesSelector, nodeStatuses => {
  return _.map(nodeStatuses, ns => ns.desc.node_id.toString());
});

/**
 * nodeStatusByIDSelector returns a map from NodeID to a current INodeStatus.
 */
export const nodeStatusByIDSelector = createSelector(
  nodeStatusesSelector,
  nodeStatuses => {
    const statuses: {
      [s: string]: cockroach.server.status.statuspb.INodeStatus;
    } = {};
    _.each(nodeStatuses, ns => {
      statuses[ns.desc.node_id.toString()] = ns;
    });
    return statuses;
  },
);

/**
 * livenessByNodeIDSelector returns a map from NodeID to the Liveness record for
 * that node.
 */
export const livenessByNodeIDSelector = createSelector(
  livenessesSelector,
  livenesses => {
    if (livenesses) {
      return _.keyBy(livenesses.livenesses, l => l.node_id);
    }
    return {};
  },
);

// selectStoreIDsByNodeID returns a map from node ID to a list of store IDs for
// that node. Like nodeIDsSelector, the store ids are converted to strings.
export const selectStoreIDsByNodeID = createSelector(
  nodeStatusesSelector,
  nodeStatuses => {
    const result: { [key: string]: string[] } = {};
    _.each(
      nodeStatuses,
      ns =>
        (result[ns.desc.node_id] = _.map(ns.store_statuses, ss =>
          ss.desc.store_id.toString(),
        )),
    );
    return result;
  },
);

/**
 * nodesSummarySelector returns a directory object containing a variety of
 * computed information based on the current nodes. This object is easy to
 * connect to components on child pages.
 */
export const nodesSummarySelector = createSelector(
  nodeStatusesSelector,
  nodeIDsSelector,
  nodeStatusByIDSelector,
  nodeSumsSelector,
  nodeDisplayNameByIDSelector,
  livenessStatusByNodeIDSelector,
  livenessByNodeIDSelector,
  selectStoreIDsByNodeID,
  (
    nodeStatuses,
    nodeIDs,
    nodeStatusByID,
    nodeSums,
    nodeDisplayNameByID,
    livenessStatusByNodeID,
    livenessByNodeID,
    storeIDsByNodeID,
  ) => {
    return {
      nodeStatuses,
      nodeIDs,
      nodeStatusByID,
      nodeSums,
      nodeDisplayNameByID,
      livenessStatusByNodeID,
      livenessByNodeID,
      storeIDsByNodeID,
    };
  },
);
