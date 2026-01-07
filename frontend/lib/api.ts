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

  // Validate JWT token exists
  if (!token) {
    throw new Error('No authentication token found. Please log in again.');
  }

  // Log request details
  console.log('API Request:', {
    url: `${API_BASE_URL}${path}`,
    method: options.method || 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ***`,
      ...(options.headers || {}),
    },
    body: options.body || null
  });

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  // Log response details
  const responseText = await res.text();
  console.log('API Response:', {
    status: res.status,
    statusText: res.statusText,
    url: res.url,
    body: responseText
  });

  if (!res.ok) {
    // Check for specific error types
    if (res.status === 401) {
      // Clear invalid token
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
      }
      throw new Error('Authentication failed. Please log in again.');
    }

    throw new Error(`API ${res.status}: ${responseText}`);
  }

  return JSON.parse(responseText);
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