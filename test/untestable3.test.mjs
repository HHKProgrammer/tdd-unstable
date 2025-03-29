import { describe, test } from "vitest";
import { expect } from "chai";
import { parsePeopleCsv, parsePeopleCsvFromString } from "../src/untestable3.mjs";


// example input:
const input = `
Loid,Forger,,Male
Anya,Forger,6,Female
Yor,Forger,27,Female
`.trim();

const expected = [
   { firstName: "Loid", lastName: "Forger", gender: "m" },
   { firstName: "Anya", lastName: "Forger", age: 6, gender: "f" },
   { firstName: "Yor", lastName: "Forger", age: 27, gender: "f" },
];
describe("Untestable 3: CSV file parsing", () => {
  test("Parse full CSV data correctly", () => {
    const result = parsePeopleCsvFromString(input);
    expect(result).to.deep.equal(expected);
  });
});
