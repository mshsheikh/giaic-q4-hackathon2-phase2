import { Task, TaskCreate, TaskUpdate, TaskUpdateStatus, TaskResponse } from '../types/task';

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';
  }

  setToken(token: string) {
    this.token = token;
  }

  removeToken() {
    this.token = null;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token might be expired, remove it
        this.removeToken();
        // Optionally redirect to login page
        // window.location.href = '/login';
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Task API methods
  async getTasks(
    status?: 'pending' | 'completed',
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'created_at',
    order: string = 'desc'
  ): Promise<TaskResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort_by: sortBy,
      order,
    });

    if (status) {
      params.append('status', status);
    }

    const queryString = params.toString();
    const endpoint = `/tasks${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint);
  }

  async createTask(taskData: TaskCreate): Promise<Task> {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async getTask(taskId: string): Promise<Task> {
    return this.request(`/tasks/${taskId}`);
  }

  async updateTask(taskId: string, taskData: TaskUpdate): Promise<Task> {
    return this.request(`/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  async updateTaskStatus(taskId: string, statusData: TaskUpdateStatus): Promise<Task> {
    return this.request(`/tasks/${taskId}/status`, {
      method: 'PATCH',
      body: JSON.stringify(statusData),
    });
  }

  async deleteTask(taskId: string): Promise<{ message: string }> {
    return this.request(`/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }

  // Auth methods would go here
  async login(email: string, password: string): Promise<{ user: any; token: string }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: { email: string; password: string; name?: string }): Promise<{ user: any; token: string }> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<{ message: string }> {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }
}

export const apiClient = new ApiClient();