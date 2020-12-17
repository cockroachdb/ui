import { createSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import { cockroach } from "@cockroachlabs/crdb-protobuf-client";

import { AppState } from "../reducers";
import { INodeStatus } from "./nodes.reducer";
import { livenessesSelector } from "../liveness";
import { getDisplayName, nodeCapacityStats } from "src/util/nodes";
import { BytesUsed, MetricConstants } from "src/util";

const LivenessStatus =
  cockroach.kv.kvserver.liveness.livenesspb.NodeLivenessStatus;

/*
 * nodeStatusesSelector returns the current status for each node in the cluster.
 */
export const nodeStatusesSelector = (state: AppState) =>
  state.adminUI.nodes.data;

/**
 * nodeIDsSelector returns the NodeID of all nodes currently on the cluster.
 */
const nodeIDsSelector = createSelector(nodeStatusesSelector, nodeStatuses => {
  return _.map(nodeStatuses, ns => ns.desc.node_id.toString());
});

/**
 * nodeStatusByIDSelector returns a map from NodeID to a current INodeStatus.
 */
const nodeStatusByIDSelector = createSelector(
  nodeStatusesSelector,
  nodeStatuses => {
    const statuses: { [s: string]: INodeStatus } = {};
    _.each(nodeStatuses, ns => {
      statuses[ns.desc.node_id.toString()] = ns;
    });
    return statuses;
  },
);

/**
 * livenessStatusByNodeIDSelector returns a map from NodeID to the
 * LivenessStatus of that node.
 */
export const livenessStatusByNodeIDSelector = createSelector(
  livenessesSelector,
  livenesses => (livenesses ? livenesses.statuses || {} : {}),
);

export function sumNodeStats(
  nodeStatuses: INodeStatus[],
  livenessStatusByNodeID: {
    [id: string]: cockroach.kv.kvserver.liveness.livenesspb.NodeLivenessStatus;
  },
) {
  const result = {
    nodeCounts: {
      total: 0,
      healthy: 0,
      suspect: 0,
      dead: 0,
      decommissioned: 0,
    },
    capacityUsed: 0,
    capacityAvailable: 0,
    capacityTotal: 0,
    capacityUsable: 0,
    usedBytes: 0,
    usedMem: 0,
    totalRanges: 0,
    underReplicatedRanges: 0,
    unavailableRanges: 0,
    replicas: 0,
  };
  if (_.isArray(nodeStatuses) && _.isObject(livenessStatusByNodeID)) {
    nodeStatuses.forEach(n => {
      const status = livenessStatusByNodeID[n.desc.node_id];
      if (status !== LivenessStatus.NODE_STATUS_DECOMMISSIONED) {
        result.nodeCounts.total += 1;
      }
      switch (status) {
        case LivenessStatus.NODE_STATUS_LIVE:
          result.nodeCounts.healthy++;
          break;
        case LivenessStatus.NODE_STATUS_UNAVAILABLE:
        case LivenessStatus.NODE_STATUS_DECOMMISSIONING:
          result.nodeCounts.suspect++;
          break;
        case LivenessStatus.NODE_STATUS_DECOMMISSIONED:
          result.nodeCounts.decommissioned++;
          break;
        case LivenessStatus.NODE_STATUS_DEAD:
        default:
          result.nodeCounts.dead++;
          break;
      }
      if (
        status !== LivenessStatus.NODE_STATUS_DEAD &&
        status !== LivenessStatus.NODE_STATUS_DECOMMISSIONED
      ) {
        const { available, used, usable } = nodeCapacityStats(n);

        result.capacityUsed += used;
        result.capacityAvailable += available;
        result.capacityUsable += usable;
        result.capacityTotal += n.metrics[MetricConstants.capacity];
        result.usedBytes += BytesUsed(n);
        result.usedMem += n.metrics[MetricConstants.rss];
        result.totalRanges += n.metrics[MetricConstants.ranges];
        result.underReplicatedRanges +=
          n.metrics[MetricConstants.underReplicatedRanges];
        result.unavailableRanges +=
          n.metrics[MetricConstants.unavailableRanges];
        result.replicas += n.metrics[MetricConstants.replicas];
      }
    });
  }
  return result;
}

/**
 * nodeSumsSelector returns an object with certain cluster-wide totals which are
 * used in different places in the UI.
 */
export const nodeSumsSelector = createSelector(
  nodeStatusesSelector,
  livenessStatusByNodeIDSelector,
  sumNodeStats,
);

// nodeDisplayNameByIDSelector provides a unique, human-readable display name
// for each node.
export const nodeDisplayNameByIDSelector = createSelector(
  nodeStatusesSelector,
  livenessStatusByNodeIDSelector,
  (nodeStatuses, livenessStatusByNodeID) => {
    const result: { [key: string]: string } = {};
    if (!_.isEmpty(nodeStatuses)) {
      nodeStatuses.forEach(ns => {
        result[ns.desc.node_id] = getDisplayName(
          ns,
          livenessStatusByNodeID[ns.desc.node_id],
        );
      });
    }
    return result;
  },
);
