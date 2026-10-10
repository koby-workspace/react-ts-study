import type { User } from "../types/user";
import { apiClient } from "./client";

export async function getUsers(): Promise<User[]> {
  const response = await apiClient.get<User[]>("/users");
  return response.data;
}
