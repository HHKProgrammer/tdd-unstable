import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

// Parse CSV from string
export function parsePeopleCsvFromString(csvData) {
  const records = parse(csvData, {
    skip_empty_lines: true,
    trim: true,
  });
  return records.map(([firstName, lastName, age, gender]) => {
    const person = {
      firstName,
      lastName,
      gender: gender ? gender.charAt(0).toLowerCase() : undefined,
    };
    if (age !== "") {
      person.age = parseInt(age);
    }
    return person;
  });
}

// Parse CSV from file
export async function parsePeopleCsv(filePath) {
  const csvData = await readFile(filePath, { encoding: "utf8" });
  return parsePeopleCsvFromString(csvData);
}
