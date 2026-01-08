'use client';

import React from 'react';
import { Task, TaskUpdateStatus } from '../types/task';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string, status: 'pending' | 'completed') => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  loading = false
}) => {
  const handleToggle = () => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    onToggleComplete(task.id, newStatus);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-3 shadow-sm transition-all duration-200 hover:shadow-md group">
      <div className="flex items-start">
        <button
          onClick={handleToggle}
          disabled={loading}
          className={`mt-1 h-5 w-5 rounded-sm border flex items-center justify-center transition-all duration-200 ${
            task.status === 'completed'
              ? 'bg-blue-600 border-blue-600'
              : 'border-gray-400 dark:border-gray-500 group-hover:border-gray-500 dark:group-hover:border-gray-400'
          }`}
        >
          {task.status === 'completed' && (
            <span className="text-xs text-white font-bold">✓</span>
          )}
        </button>
        <div className="ml-3 flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className={`text-base font-medium transition-all duration-200 ${
              task.status === 'completed'
                ? 'line-through text-gray-500 dark:text-gray-500'
                : 'text-gray-800 dark:text-gray-200'
            }`}>
              {task.title}
            </h3>
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => onEdit(task.id)}
                disabled={loading}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                disabled={loading}
                className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors duration-200 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
          {task.description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {task.description}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            Created: {new Date(task.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;