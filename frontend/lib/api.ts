const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function request(
  path: string,
  options: RequestInit = {}
) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }

  return res.json();
}

export const api = {
  getTasks: (page = 1, limit = 10, statusFilter?: 'all' | 'pending' | 'completed') =>
    request(`/api/v1/tasks/?${statusFilter && statusFilter !== 'all' ? `status=${statusFilter}&` : ''}page=${page}&limit=${limit}`),

  createTask: (data: any) =>
    request(`/api/v1/tasks/`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateTask: (id: string, data: any) =>
    request(`/api/v1/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteTask: (id: string) =>
    request(`/api/v1/tasks/${id}`, {
      method: "DELETE",
    }),
};