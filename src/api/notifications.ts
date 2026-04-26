import { apiClient } from "./client";

export type AppNotification = {
  id: string;
  message: string;
  time: string;
  type: "success" | "error" | "info";
  read: boolean;
};

export const getNotifications = () => apiClient.get<AppNotification[]>("/api/notifications");
export const markNotificationRead = (id: string) =>
  apiClient.patch<{ id: string; read: boolean }>(`/api/notifications/${id}/read`);
