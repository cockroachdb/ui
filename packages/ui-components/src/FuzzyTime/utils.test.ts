import {
  gteq,
  lt,
  compare,
  gteqZero,
  ltZero,
  pastTemplate,
  fuzzyFormatter,
  setFuzzy,
  fuzzy,
} from "./util";

describe("comparison", () => {
  describe("gteq (greater than equal)", () => {
    test("comparing two  numbers", () => {
      expect(gteq(2, 1)).toBe(true);
      expect(gteq(1, 1)).toBe(true);
      expect(gteq(1, 2)).toBe(false);
    });
  });

  describe("lt (less than)", () => {
    test("comparing two  numbers", () => {
      expect(lt(2, 1)).toBe(false);
      expect(lt(1, 1)).toBe(false);
      expect(lt(1, 2)).toBe(true);
    });
  });

  describe("compare function", () => {
    const gt = (x: number, y: number): boolean => x > y;

    test("creates comparison functions", () => {
      const compareGT = compare(gt);
      const greaterThanTwo = compareGT(2);
      expect(greaterThanTwo(3)).toBe(true);
    });
  });

  describe("gteqZero (greater than equal to zero)", () => {
    test("compares to 0", () => {
      expect(gteqZero(1)).toBe(true);
      expect(gteqZero(0)).toBe(true);
      expect(gteqZero(-1)).toBe(false);
    });
  });

  describe("ltZero (less than to zero)", () => {
    test("compares to 0", () => {
      expect(ltZero(1)).toBe(false);
      expect(ltZero(0)).toBe(false);
      expect(ltZero(-1)).toBe(true);
    });
  });
});

describe("pastTemplate", () => {
  test("renders singular durations", () => {
    expect(pastTemplate(1, "second")).toBe("1 second ago");
    expect(pastTemplate(1, "jiffy")).toBe("1 jiffy ago");
    expect(pastTemplate(1, "year")).toBe("1 year ago");
    expect(pastTemplate(1, "microcentury")).toBe("1 microcentury ago");
  });
  test("renders plural durations", () => {
    expect(pastTemplate(3, "parsec")).toBe("3 parsecs ago");
    expect(pastTemplate(25, "second")).toBe("25 seconds ago");
  });
});

describe("fuzzyFormatter", () => {
  const fizzywiggUnit = {
    amount: 3000,
    template: (d: number) => `about ${d} fizzywiggs ago`,
    comparator: (x: number) => x >= 3000,
  };

  test("formats given a diff", () => {
    const f = fuzzyFormatter(3000000);
    const result = f(fizzywiggUnit);
    const expected = "about 1000 fizzywiggs ago";
    expect(result).toBe(expected);
  });

  test("format returns an empty string if time diff undefined", () => {
    const f = fuzzyFormatter(undefined);
    const result = f(fizzywiggUnit);
    const expected = "";
    expect(result).toBe(expected);
  });

  test("format returns an empty string if time unit undefined", () => {
    const f = fuzzyFormatter(30000000);
    const result = f(undefined);
    const expected = "";
    expect(result).toBe(expected);
  });
});

describe("fuzzy", () => {
  const fiveMonthsAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 5);
  const now = new Date();
  const theFuture = new Date(Date.now() + 31104000000);

  test("formats a time in the past", () => {
    const result = fuzzy(fiveMonthsAgo);
    const expected = "5 months ago";
    expect(result).toBe(expected);
  });

  test("formats a time as now", () => {
    // doing this just to ensure that we are comparing the same time instead
    // of the time between when I create a variable and the function is run
    const f = setFuzzy(now);
    const result = f(now);
    const expected = "just now";
    expect(result).toBe(expected);
  });

  test("formats a time as the future", () => {
    const result = fuzzy(theFuture);
    const expected = "the future";
    expect(result).toBe(expected);
  });
});
