import { User } from "../types";
import { apiClient } from "./client";

export type UserSettings = {
  backgroundMusic: boolean;
  soundEffects: boolean;
  quizReminders: boolean;
  achievementAlerts: boolean;
  theme?: "light" | "dark";
};

export type UserStats = {
  totalScore: number;
  quizzesTaken: number;
  winRate: number;
  categoryScores: Record<string, number>;
  streakDays: number;
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt: string;
  }>;
  followers?: number;
  following?: number;
};

export const getMe = () => apiClient.get<User>("/api/me");
export const updateMe = (payload: Partial<User>) => apiClient.patch<User>("/api/me", payload);
export const getMyStats = () => apiClient.get<UserStats>("/api/me/stats");
export const getMySettings = () => apiClient.get<UserSettings>("/api/me/settings");
export const updateMySettings = (payload: Partial<UserSettings>) =>
  apiClient.patch<UserSettings>("/api/me/settings", payload);
