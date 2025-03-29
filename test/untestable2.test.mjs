import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue } from "../src/untestable2.mjs";

describe("Untestable 2: a dice game", () => {
  test("Returns a number", () => {
    const result = diceHandValue();
    expect(result).to.be.a("number");
  });

  test("Returns correct value when dice roll a pair", () => {
    const mockRandom = () => 0.5; //  will always return 4 for a dice roll (1 + 4 * 6 = 4)

    const result = diceHandValue(mockRandom);
    expect(result).to.equal(104); // 100 + 4 (pair)
  });
});
