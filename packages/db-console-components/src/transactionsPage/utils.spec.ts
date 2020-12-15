import { assert } from "chai";
import { getStatementsById } from "./utils";
import Long from "long";

describe("getStatementsById", () => {
  it("filters statements by id", () => {
    const selectedStatements = getStatementsById(
      [Long.fromInt(4104049045071304794), Long.fromInt(3334049045071304794)],
      [
        { id: Long.fromInt(4104049045071304794) },
        { id: Long.fromInt(5554049045071304794) },
      ],
    );
    assert.lengthOf(selectedStatements, 1);
    assert.isTrue(
      selectedStatements[0].id.eq(Long.fromInt(4104049045071304794)),
    );
  });
});
