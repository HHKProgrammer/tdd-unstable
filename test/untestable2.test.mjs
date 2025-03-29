import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue } from "../src/untestable2.mjs";

describe("Untestable 2: a dice game", () => {
  test("Returns a number", () => {
    const result = diceHandValue();
    expect(result).to.be.a("number");
  });
});
