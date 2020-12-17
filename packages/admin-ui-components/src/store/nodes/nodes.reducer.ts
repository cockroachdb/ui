import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { cockroach } from "@cockroachlabs/crdb-protobuf-client";
import { DOMAIN_NAME } from "../utils";

export type INodeStatus = cockroach.server.status.statuspb.INodeStatus;

export type NodeStatusState = {
  data: INodeStatus[];
  lastError: Error;
};

const nodes = createSlice<NodeStatusState, SliceCaseReducers<NodeStatusState>>({
  name: `${DOMAIN_NAME}/nodes`,
  initialState: {
    data: [],
    lastError: undefined,
  },
  reducers: {
    refresh: (state, action: PayloadAction<number>) => {
      state.data = [];
    },
  },
});

export const { actions, reducer } = nodes;
