import { FixLong, summarize } from "src/util";
import { shortStatement } from "src/statementsTable/statementsTable";

export const longToInt = (value: number | Long) => Number(FixLong(value));

export const createLabel = (statement: string) =>
  shortStatement(summarize(statement), statement);
