import axios from "axios";
import type { User } from "../types/user";

export async function getUsers(): Promise<User[]> {
  const response = await axios.get<User[]>("/mock/users.json");
  return response.data;
}
