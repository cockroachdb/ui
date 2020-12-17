import { AppState } from "../reducers";
import { createSelector } from "@reduxjs/toolkit";
import { cockroach } from "@cockroachlabs/crdb-protobuf-client";

const LivenessStatus =
  cockroach.kv.kvserver.liveness.livenesspb.NodeLivenessStatus;

/**
 * livenessNomenclature resolves a mismatch between the terms used for liveness
 * status on our Admin UI and the terms used by the backend. Examples:
 * + "Live" on the server is "Healthy" on the Admin UI
 * + "Unavailable" on the server is "Suspect" on the Admin UI
 */
export function livenessNomenclature(
  liveness: cockroach.kv.kvserver.liveness.livenesspb.NodeLivenessStatus,
) {
  switch (liveness) {
    case LivenessStatus.NODE_STATUS_LIVE:
      return "healthy";
    case LivenessStatus.NODE_STATUS_UNAVAILABLE:
      return "suspect";
    case LivenessStatus.NODE_STATUS_DECOMMISSIONING:
      return "decommissioning";
    case LivenessStatus.NODE_STATUS_DECOMMISSIONED:
      return "decommissioned";
    default:
      return "dead";
  }
}

// Functions to select data directly from the redux state.
export const livenessesSelector = (state: AppState) =>
  state.adminUI.liveness.data;

/**
 * livenessStatusByNodeIDSelector returns a map from NodeID to the
 * LivenessStatus of that node.
 */
export const livenessStatusByNodeIDSelector = createSelector(
  livenessesSelector,
  livenesses => (livenesses ? livenesses.statuses || {} : {}),
);
