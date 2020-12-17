import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DOMAIN_NAME, noopReducer } from "../utils";
import { cockroach } from "@cockroachlabs/crdb-protobuf-client";

type LivenessResponse = cockroach.server.serverpb.LivenessResponse;

export type LivenessState = {
  data: LivenessResponse;
  lastError: Error;
  valid: boolean;
};

const initialState: LivenessState = {
  data: null,
  lastError: null,
  valid: true,
};

const livenessSlice = createSlice({
  name: `${DOMAIN_NAME}/liveness`,
  initialState,
  reducers: {
    received: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.lastError = null;
      state.valid = true;
    },
    failed: (state, action: PayloadAction<Error>) => {
      state.valid = false;
      state.lastError = action.payload;
    },
    invalidated: state => {
      state.valid = false;
    },
    refresh: noopReducer,
    request: noopReducer,
  },
});

export const { reducer, actions } = livenessSlice;
