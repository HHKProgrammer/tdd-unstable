import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("Calculates days correctly when before Christmas", () => {
    const mockDate = new Date("2025-12-20");
    const result = daysUntilChristmas(mockDate);
    expect(result).to.equal(5); // 5 days until cchristmas
   //expect(daysUntilChristmas()).to.be.a("number");

  });

  test("Calculates days correctly when it is Christmas Day", () => {
    const mockDate = new Date("2025-12-25"); // today christmas day
    const result = daysUntilChristmas(mockDate);
    expect(result).to.equal(0); // today so 0 days left
  });
  test("Calculates days correctly when after Christmas", () => {
    const mockDate = new Date("2025-12-26"); // 1 day after christmas
    const result = daysUntilChristmas(mockDate);
    expect(result).to.equal(364); // 364  until the next christmas
  });
});
