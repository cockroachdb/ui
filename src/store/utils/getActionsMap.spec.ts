import { assert } from "chai";
import { getActionsMap, SCOPE_NAME } from "./getActionsMap";

describe("getActionsMap", () => {
  const domainName = "test";
  const getTestActions = getActionsMap(domainName);
  const items = ["a", "b", "c"] as const;
  const result = getTestActions(items);

  it("returns object with keys equal to string items in input array", () => {
    assert.sameMembers(Object.keys(result), Array(...items));
  });

  it("constructs correct action names", () => {
    Object.entries(result).forEach(([key, val]) => {
      const expected = `${SCOPE_NAME}/${domainName}/${key}`;
      assert.equal(val, expected);
    });
  });
});
