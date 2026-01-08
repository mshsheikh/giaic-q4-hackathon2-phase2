export interface Task {
  id: string; // UUID string
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  created_at: string; // ISO string
  updated_at: string; // ISO string
  user_id: string;
}

export interface TaskCreate {
  title: string;
  description?: string;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  status?: 'pending' | 'completed';
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