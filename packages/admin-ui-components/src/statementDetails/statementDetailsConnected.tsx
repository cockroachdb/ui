import {
  appAttr,
  combineStatementStats,
  ExecutionStatistics,
  FixLong,
  flattenStatementStats,
  getMatchParamByName,
  implicitTxnAttr,
  statementAttr,
  StatementStatistics,
} from "../util";
import { AggregateStatistics } from "../statementsTable";
import {
  match as Match,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { createSelector } from "reselect";
import _ from "lodash";
import { connect } from "react-redux";
import {
  Fraction,
  StatementDetails,
  StatementDetailsDispatchProps,
  StatementDetailsProps,
  StatementDetailsStateProps,
} from "./statementDetails";
import {
  actions as statementsActions,
  statementsSelector,
} from "src/store/statements";
import { actions as diagnosticsActions } from "src/store/statementDiagnostics";
import { selectDiagnosticsReportsByStatementFingerprint } from "./statementDetails.selectors";
import { nodeDisplayNameByIDSelector } from "../store/nodes";
import { AppState } from "../store";

interface StatementDetailsData {
  nodeId: number;
  implicitTxn: boolean;
  stats: StatementStatistics[];
}

function keyByNodeAndImplicitTxn(stmt: ExecutionStatistics): string {
  return stmt.node_id.toString() + stmt.implicit_txn;
}

function coalesceNodeStats(
  stats: ExecutionStatistics[],
): AggregateStatistics[] {
  const byNodeAndImplicitTxn: { [nodeId: string]: StatementDetailsData } = {};

  stats.forEach(stmt => {
    const key = keyByNodeAndImplicitTxn(stmt);
    if (!(key in byNodeAndImplicitTxn)) {
      byNodeAndImplicitTxn[key] = {
        nodeId: stmt.node_id,
        implicitTxn: stmt.implicit_txn,
        stats: [],
      };
    }
    byNodeAndImplicitTxn[key].stats.push(stmt.stats);
  });

  return Object.keys(byNodeAndImplicitTxn).map(key => {
    const stmt = byNodeAndImplicitTxn[key];
    return {
      label: stmt.nodeId.toString(),
      implicitTxn: stmt.implicitTxn,
      stats: combineStatementStats(stmt.stats),
    };
  });
}

function fractionMatching(
  stats: ExecutionStatistics[],
  predicate: (stmt: ExecutionStatistics) => boolean,
): Fraction {
  let numerator = 0;
  let denominator = 0;

  stats.forEach(stmt => {
    const count = FixLong(stmt.stats.first_attempt_count).toInt();
    denominator += count;
    if (predicate(stmt)) {
      numerator += count;
    }
  });

  return { numerator, denominator };
}

function filterByRouterParamsPredicate(
  match: Match<any>,
  internalAppNamePrefix: string,
): (stat: ExecutionStatistics) => boolean {
  const statement = getMatchParamByName(match, statementAttr);
  const implicitTxn = getMatchParamByName(match, implicitTxnAttr) === "true";
  let app = getMatchParamByName(match, appAttr);

  const filterByStatementAndImplicitTxn = (stmt: ExecutionStatistics) =>
    stmt.statement === statement && stmt.implicit_txn === implicitTxn;

  if (!app) {
    return filterByStatementAndImplicitTxn;
  }

  if (app === "(unset)") {
    app = "";
  }

  if (app === "(internal)") {
    return (stmt: ExecutionStatistics) =>
      filterByStatementAndImplicitTxn(stmt) &&
      stmt.app.startsWith(internalAppNamePrefix);
  }

  return (stmt: ExecutionStatistics) =>
    filterByStatementAndImplicitTxn(stmt) && stmt.app === app;
}

export const selectStatement = createSelector(
  statementsSelector,
  (_state: AppState, props: RouteComponentProps) => props,
  (statementsState, props) => {
    const statements = statementsState.data?.statements;
    if (!statements) {
      return null;
    }

    const internalAppNamePrefix =
      statementsState.data?.internal_app_name_prefix;
    const flattened = flattenStatementStats(statements);
    const results = _.filter(
      flattened,
      filterByRouterParamsPredicate(props.match, internalAppNamePrefix),
    );
    const statement = getMatchParamByName(props.match, statementAttr);
    return {
      statement,
      stats: combineStatementStats(results.map(s => s.stats)),
      byNode: coalesceNodeStats(results),
      app: _.uniq(results.map(s => s.app)),
      distSQL: fractionMatching(results, s => s.distSQL),
      vec: fractionMatching(results, s => s.vec),
      opt: fractionMatching(results, s => s.opt),
      implicit_txn: fractionMatching(results, s => s.implicit_txn),
      failed: fractionMatching(results, s => s.failed),
      node_id: _.uniq(results.map(s => s.node_id)),
    };
  },
);

const lastErrorSelector = createSelector(
  statementsSelector,
  state => state.lastError,
);

const mapStateToProps = (
  state: AppState,
  props: StatementDetailsProps,
): StatementDetailsStateProps => {
  const statement = selectStatement(state, props);
  const statementFingerprint = statement?.statement;
  return {
    statement,
    statementsError: lastErrorSelector(state),
    nodeNames: nodeDisplayNameByIDSelector(state),
    diagnosticsReports: selectDiagnosticsReportsByStatementFingerprint(
      state,
      statementFingerprint,
    ),
  };
};

const mapDispatchToProps: StatementDetailsDispatchProps = {
  refreshStatements: statementsActions.refresh,
  refreshStatementDiagnosticsRequests: diagnosticsActions.refresh,
  createStatementDiagnosticsReport: diagnosticsActions.createReport,
  dismissStatementDiagnosticsAlertMessage: () => {
    // createStatementDiagnosticsAlertLocalSetting.set({ show: false }),
  },
};

const StatementDetailsConnected = withRouter(
  connect<StatementDetailsStateProps, StatementDetailsDispatchProps>(
    mapStateToProps,
    mapDispatchToProps,
  )(StatementDetails),
);

export default StatementDetailsConnected;
