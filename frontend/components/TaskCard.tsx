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
    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-lg p-4 mb-3 transition-all duration-200 hover:border-cyan-400/50 hover:shadow-sm hover:shadow-cyan-500/20 group">
      <div className="flex items-start">
        <button
          onClick={handleToggle}
          disabled={loading}
          className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            task.status === 'completed'
              ? 'bg-cyan-600 border-cyan-600'
              : 'border-cyan-500/50 group-hover:border-cyan-400'
          }`}
        >
          {task.status === 'completed' && (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <div className="ml-3 flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className={`text-base font-medium transition-all duration-200 ${
              task.status === 'completed'
                ? 'line-through text-gray-500'
                : 'text-gray-200 group-hover:text-cyan-300'
            }`}>
              {task.title}
            </h3>
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => onEdit(task.id)}
                disabled={loading}
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 p-1 rounded hover:bg-gray-700/50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(task.id)}
                disabled={loading}
                className="text-red-500 hover:text-red-400 transition-colors duration-200 p-1 rounded hover:bg-gray-700/50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          {task.description && (
            <p className="mt-2 text-sm text-gray-400">
              {task.description}
            </p>
          )}
          {task.due_date && (
            <p className="mt-2 text-xs text-cyan-400 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Due: {new Date(task.due_date).toLocaleDateString()}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            Created: {new Date(task.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;