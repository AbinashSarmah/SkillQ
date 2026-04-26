import { Quiz, Player, GlobalLeaderboardEntry } from "../types";
import { apiClient } from "./client";

type AttemptAnswer = { selectedAnswer: number | string | number[] | string[]; timeLeft: number };

const mapQuiz = (quiz: Quiz): Quiz => ({
  ...quiz,
  createdAt: new Date(quiz.createdAt),
});

export const getQuizzes = async () => {
  const data = await apiClient.get<Quiz[]>("/api/quizzes");
  return data.map(mapQuiz);
};

export const getQuizById = async (id: string) => {
  const data = await apiClient.get<Quiz>(`/api/quizzes/${id}`);
  return mapQuiz(data);
};
export const createQuiz = (quiz: Partial<Quiz>) => apiClient.post<Quiz>("/api/quizzes", quiz);

export const submitQuizAttempt = (quizId: string, payload: { answers: AttemptAnswer[]; clientScore: number }) =>
  apiClient.post<{ id: string; clientScore: number; serverScore: number }>(`/api/quizzes/${quizId}/attempts`, payload);

export const getQuizLeaderboard = (quizId: string) =>
  apiClient.get<Player[]>(`/api/quizzes/${quizId}/leaderboard`);

export const getGlobalLeaderboard = () =>
  apiClient.get<GlobalLeaderboardEntry[]>("/api/quizzes/leaderboard");
