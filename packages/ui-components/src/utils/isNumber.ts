const isNumber = (value: unknown) => {
  return typeof value === "number" && Number.isFinite(value);
};

export default isNumber;
