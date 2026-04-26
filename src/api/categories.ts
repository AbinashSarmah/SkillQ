import { Category } from "../types";
import { apiClient } from "./client";

export const getCategories = () => apiClient.get<Category[]>("/api/categories");
export const createCategory = (payload: Partial<Category>) =>
  apiClient.post<Category>("/api/categories", payload);
