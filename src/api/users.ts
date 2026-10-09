import type { User } from "../types/user";

export async function getUsers(): Promise<User[]> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 1000);
  });

  return [
    { id: "user1", name: "사용자1", email: "a@test.com" },
    { id: "user2", name: "사용자2", email: "b@test.com" },
  ];
}
