const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

const request = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let body: ApiResponse<T>;
  try {
    body = await response.json();
  } catch {
    throw new Error("Invalid API response");
  }

  if (!response.ok || !body.success) {
    throw new Error(body.message || "Request failed");
  }

  return body.data;
};

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, payload?: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(payload || {}) }),
  patch: <T>(path: string, payload?: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(payload || {}) }),
};
