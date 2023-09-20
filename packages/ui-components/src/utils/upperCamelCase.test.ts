import upperCamelCase from "./upperCamelCase";

describe("upperCamelCase", () => {
  test("should convert a sausage case string to an UpperCamelCase string", () => {
    const testString = "cockroach-labs-serverless-database-service";
    const result = upperCamelCase(testString);
    const expected = "CockroachLabsServerlessDatabaseService";

    expect(result).toBe(expected);
  });

  test("should convert a spaced string to an UpperCamelCase string", () => {
    const testString = "cockroach labs serverless database service computer";
    const result = upperCamelCase(testString);
    const expected = "CockroachLabsServerlessDatabaseServiceComputer";

    expect(result).toBe(expected);
  });

  test("should convert a camelCase string to an UpperCamelCase string", () => {
    const testString = "cockroachLabsServerlessDatabaseComputerServiceCompany";
    const result = upperCamelCase(testString);
    const expected = "CockroachLabsServerlessDatabaseComputerServiceCompany";

    expect(result).toBe(expected);
  });

  test("should convert a mixed string to an UpperCamelCase string", () => {
    const testString =
      "cockroach..labs serverless  database // computer ** company";
    const result = upperCamelCase(testString);
    const expected = "CockroachLabsServerlessDatabaseComputerCompany";

    expect(result).toBe(expected);
  });

  test("should capitalize a single word", () => {
    const testString = "cockroach";
    const result = upperCamelCase(testString);
    const expected = "Cockroach";

    expect(result).toBe(expected);
  });
});
