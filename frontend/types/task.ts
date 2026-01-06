export interface Task {
  id: string; // UUID string
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  due_date?: string; // ISO string
  created_at: string; // ISO string
  updated_at: string; // ISO string
  user_id: string;
}

export interface TaskCreate {
  title: string;
  description?: string;
  due_date?: string; // ISO string
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  status?: 'pending' | 'completed';
  due_date?: string; // ISO string
}

export interface TaskUpdateStatus {
  status: 'pending' | 'completed';
}

export interface TaskResponse {
  tasks: Task[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}