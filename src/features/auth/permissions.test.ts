import { describe, expect, it } from "vitest";
import type { LoginUser, UserRole } from "@/features/auth/authSlice";
import {
  canAccessPage,
  canPerformAction,
  getDefaultPath,
} from "@/features/auth/permissions";

// 테스트용 로그인 사용자를 역할만 바꿔 만든다.
function createUser(role: UserRole): LoginUser {
  return { loginId: `test.${role}`, name: `Test ${role}`, role };
}

describe("getDefaultPath", () => {
  it("관리자는 메뉴 관리로 이동한다", () => {
    expect(getDefaultPath(createUser("admin"))).toBe("/menus");
  });

  it("일반 사용자는 사용자 관리로 이동한다", () => {
    expect(getDefaultPath(createUser("user"))).toBe("/users");
  });

  it("로그인하지 않았으면 메뉴 관리로 이동한다", () => {
    expect(getDefaultPath(null)).toBe("/menus");
  });
});

describe("canAccessPage", () => {
  it.each([
    { role: "admin", page: "menus", expected: true },
    { role: "admin", page: "users", expected: true },
    { role: "user", page: "menus", expected: false },
    { role: "user", page: "users", expected: true },
  ] as const)(
    "$role 역할의 $page 화면 접근은 $expected",
    ({ role, page, expected }) => {
      expect(canAccessPage(createUser(role), page)).toBe(expected);
    },
  );

  it("로그인하지 않았으면 어떤 화면에도 접근할 수 없다", () => {
    expect(canAccessPage(null, "menus")).toBe(false);
    expect(canAccessPage(null, "users")).toBe(false);
  });
});

describe("canPerformAction", () => {
  const actions = ["users.create", "users.update", "users.delete"] as const;

  it.each(actions)("관리자는 %s 작업을 할 수 있다", (action) => {
    expect(canPerformAction(createUser("admin"), action)).toBe(true);
  });

  it.each(actions)("일반 사용자는 %s 작업을 할 수 없다", (action) => {
    expect(canPerformAction(createUser("user"), action)).toBe(false);
  });

  it("로그인하지 않았으면 작업을 할 수 없다", () => {
    expect(canPerformAction(null, "users.create")).toBe(false);
  });
});
