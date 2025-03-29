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
  test("Returns correct value when dice roll different numbers", () => {
    let toggle = false;
    const mockRandom = () => {
      toggle = !toggle;
      return toggle ? 0.3 : 0.8; // 3 , 5
      //0.4 is  3 Math.floor(0.4 * 6 + 1)  = 3
      //
      // 0.8 is 5 Math.floor(0.8 * 6 + 1) = 5
    };

    const result = diceHandValue(mockRandom);
    expect(result).to.equal(5); // highest die is 5
  });


});
