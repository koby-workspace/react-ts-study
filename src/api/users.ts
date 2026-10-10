import type { User, UserFormValues } from "../types/user";
import { apiClient } from "./client";

export async function getUsers(): Promise<User[]> {
  const response = await apiClient.get<User[]>("/users");
  return response.data;
}

export async function createUser(user: UserFormValues): Promise<User> {
  const response = await apiClient.post<User>("/users", user);
  return response.data;
}

export async function deleteUser(id: string): Promise<void> {
  await apiClient.delete(`/users/${encodeURIComponent(id)}`);
}

export async function updateUser(
  id: string,
  values: UserFormValues,
): Promise<User> {
  const response = await apiClient.patch<User>(
    `/users/${encodeURIComponent(id)}`,
    values,
  );
  return response.data;
}
