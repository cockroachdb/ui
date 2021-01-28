import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cockroach } from "@cockroachlabs/crdb-protobuf-client";
import { DOMAIN_NAME, noopReducer } from "../utils";
import { ICancelQueryRequest, ICancelSessionRequest } from ".";

type CancelQueryResponse = cockroach.server.serverpb.CancelQueryResponse;

export type TerninateQueryState = {
  data: CancelQueryResponse;
  lastError: Error;
  valid: boolean;
};

const initialState: TerninateQueryState = {
  data: null,
  lastError: null,
  valid: true,
};

const terninateQuery = createSlice({
  name: `${DOMAIN_NAME}/terninateQuery`,
  initialState,
  reducers: {
    terminateSession: (_state, _action: PayloadAction<ICancelSessionRequest>) => {},
    terminateSessionCompleted: noopReducer,
    terminateSessionFailed: (_state, _action: PayloadAction<Error>) => {},
    terminateQuery: (_state, _action: PayloadAction<ICancelQueryRequest>) => {},
    terminateQueryCompleted: noopReducer,
    terminateQueryFailed: (_state, _action: PayloadAction<Error>) => {},
  },
});

export const { reducer, actions } = terninateQuery;
