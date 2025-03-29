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
});
