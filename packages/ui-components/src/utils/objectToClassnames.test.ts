import objectToClassnames from "./objectToClassnames";

describe("objectToClassnames", () => {
  test("should be a function", () => {
    expect(typeof objectToClassnames).toBe("function");
  });

  test("should return an array", () => {
    const className = objectToClassnames({
      foo: "bar",
      baz: "bim",
      boof: "boof",
    });
    expect(Array.isArray(className)).toBe(true);
  });

  test("should return a className array for a given prop", () => {
    const className = objectToClassnames({ foo: "bar" });
    expect(className).toStrictEqual(["foo-bar"]);
  });

  test("should return a className string for several props", () => {
    const className = objectToClassnames({
      foo: "bar",
      baz: "bim",
      biff: "boop",
    });

    expect(className).toContain("foo-bar");
    expect(className).toContain("baz-bim");
    expect(className).toContain("biff-boop");
  });

  test("should return a className string with a custom delimiter", () => {
    const className = objectToClassnames({ foo: "bar", baz: "bim" }, "___");
    expect(className).toContain("foo___bar");
    expect(className).toContain("baz___bim");
  });

  test("should return a className string with an empty delimiter", () => {
    const className = objectToClassnames({ foo: "bar", baz: "bim" }, "");
    expect(className).toContain("foobar");
    expect(className).toContain("bazbim");
  });
});
