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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-3 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={handleToggle}
          disabled={loading}
          className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <div className="ml-3 flex-1">
          <div className="flex justify-between">
            <h3 className={`text-lg font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
              {task.title}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(task.id)}
                disabled={loading}
                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                disabled={loading}
                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
              >
                Delete
              </button>
            </div>
          </div>
          {task.description && (
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              {task.description}
            </p>
          )}
          {task.due_date && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Due: {new Date(task.due_date).toLocaleDateString()}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Created: {new Date(task.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;