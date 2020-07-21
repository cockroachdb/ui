import { assert } from "chai";
import { paginationPageCount } from "./pagination";

const selectedApp = "$ cockroach demo";

describe("Pagination", () => {
  describe("page count", () => {
    it("get page count label", () => {
      assert.equal(
        paginationPageCount({ pageSize: 20, current: 1, total: 200 }, "test"),
        "1-20 of 200 test",
      );
      assert.equal(
        paginationPageCount({ pageSize: 20, current: 1, total: 7 }, "test"),
        "1-7 of 7 test",
      );
      assert.equal(
        paginationPageCount({ pageSize: 20, current: 1, total: 0 }, "test"),
        "0 test",
      );
      assert.equal(
        paginationPageCount({ pageSize: 10, current: 2, total: 15 }, "test"),
        "11-15 of 15 test",
      );
      assert.equal(
        paginationPageCount(
          { pageSize: 20, current: 2, total: 300 },
          "test",
          selectedApp,
        ),
        "21-40 of 300 results",
      );
      assert.equal(
        paginationPageCount(
          { pageSize: 20, current: 1, total: 64 },
          "test",
          selectedApp,
          "test",
        ),
        "1-20 of 64 results",
      );
      assert.equal(
        paginationPageCount(
          { pageSize: 20, current: 1, total: 0 },
          "test",
          selectedApp,
          "search",
        ),
        "0 results",
      );
      assert.equal(
        paginationPageCount(
          { pageSize: 10, current: 2, total: 15 },
          "test",
          selectedApp,
          "search",
        ),
        "11-15 of 15 results",
      );
    });
  });
});
