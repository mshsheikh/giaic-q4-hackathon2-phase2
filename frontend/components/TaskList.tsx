'use client';

import React from 'react';
import { Task } from '../types/task';
import TaskCard from './TaskCard';
import TaskSkeleton from './TaskSkeleton';
import EmptyState from './EmptyState';

interface TaskListProps {
  tasks: Task[];
  loading?: boolean;
  emptyMessage?: string;
  filter?: 'all' | 'pending' | 'completed';
  onTaskToggle: (taskId: string, status: 'pending' | 'completed') => void;
  onTaskEdit: (taskId: string) => void;
  onTaskDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading = false,
  emptyMessage = "No tasks found",
  filter,
  onTaskToggle,
  onTaskEdit,
  onTaskDelete
}) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, index) => (
          <TaskSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    let emptyTitle = "No tasks found";
    let emptySubtitle = "Get started by creating your first task";

    if (filter === 'pending') {
      emptyTitle = "No pending tasks";
      emptySubtitle = "All tasks are completed! Great job!";
    } else if (filter === 'completed') {
      emptyTitle = "No completed tasks";
      emptySubtitle = "Start completing tasks to see them here";
    }

    return (
      <EmptyState
        title={emptyTitle}
        subtitle={emptySubtitle}
      />
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onTaskToggle}
          onEdit={onTaskEdit}
          onDelete={onTaskDelete}
          loading={loading}
        />
      ))}
    </div>
  );
};

export default TaskList;