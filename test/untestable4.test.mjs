import { afterEach, beforeEach, describe, test, vi } from "vitest";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";
import { expect } from "chai";
import argon2 from "@node-rs/argon2";

// Mock client
const mockDbClient = {
  query: vi.fn(),
  end: vi.fn(),
};

describe("Untestable 4: enterprise application", () => {
  let service;
  let userDao;

  beforeEach(() => {
    userDao = new PostgresUserDao(mockDbClient);
    service = new PasswordService(userDao);
  });

  afterEach(() => {
    userDao.close();
    vi.restoreAllMocks();
  });

  test("Successfully changes password with correct old password", async () => {
    const userId = "helin";
    const oldPassword = "oldPassword";
    const newPassword = "newPassword";
    const hashedOldPassword = await argon2.hash(oldPassword);
    //const hashedNewPassword = await argon2.hash(newPassword);

    mockDbClient.query.mockResolvedValueOnce({
      rows: [{ user_id: userId, password_hash: hashedOldPassword }],
    });

    mockDbClient.query.mockResolvedValueOnce({ rows: [] });

    await service.changePassword(userId, oldPassword, newPassword);

    expect(mockDbClient.query).toHaveBeenCalledTimes(2);


//select
    const selectQuery = mockDbClient.query.mock.calls[0][0];
    const selectParams = mockDbClient.query.mock.calls[0][1];

    expect(typeof selectQuery).toBe("string");

    expect(selectQuery).toMatch(/select user_id, password_hash\s*from users\s*where user_id = \$1/i);
    expect(selectParams).toEqual([userId]);

//insert
    const insertQuery = mockDbClient.query.mock.calls[1][0];
    const insertParams = mockDbClient.query.mock.calls[1][1];

    expect(typeof insertQuery).toBe("string");
    expect(insertQuery).toMatch(/insert into users \(user_id, password_hash\).*on conflict \(user_id\) do update.*password_hash/si);

    const hashedNewPassword = insertParams[1];
    const isValidHash = await argon2.verify(hashedNewPassword, newPassword);
    expect(isValidHash).toBe(true);

    expect(insertParams[0]).toEqual(userId);
  });


  test("Throws error when old password is incorrect", async () => {
    const userId = "helin";
    const oldPassword = "wrongPassword";
    const newPassword = "newPassword";
    const hashedOldPassword = await argon2.hash("correctPassword");

    mockDbClient.query.mockResolvedValueOnce({
      rows: [{ user_id: userId, password_hash: hashedOldPassword }],
    });

    await expect(service.changePassword(userId, oldPassword, newPassword)).rejects.toThrow("wrong old password");
  });
});
