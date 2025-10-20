import { formatCurrency } from "../scripts/utils/money.js";

describe("test suite: formatCurrency", () => {
  it("coverts cents into dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });
  it("works with 0", () => {
    expect(formatCurrency(0)).toBe("0.00");
  });
  it("rounds up to the nearest cent", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
});
