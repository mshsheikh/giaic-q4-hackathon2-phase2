'use client';

import React, { useState } from 'react';
import { TaskCreate, TaskUpdate } from '../types/task';

interface TaskFormProps {
  initialData?: TaskCreate | null;
  onSubmit: (taskData: TaskCreate | TaskUpdate) => void;
  onCancel: () => void;
  loading?: boolean;
  submitText?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialData = null,
  onSubmit,
  onCancel,
  loading = false,
  submitText = "Save Task"
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [dueDate, setDueDate] = useState(initialData?.due_date || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskData: TaskCreate | TaskUpdate = {
      title: title.trim(),
      description: description.trim() || undefined,
      due_date: dueDate || undefined,
    };

    // Add validation
    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    if (title.trim().length < 1 || title.trim().length > 100) {
      alert('Title must be between 1 and 100 characters');
      return;
    }

    if (description && description.length > 1000) {
      alert('Description must be less than 1000 characters');
      return;
    }

    onSubmit(taskData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-6 transition-all duration-300 animate-fade-in">
      <div className="mb-5">
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
          placeholder="Task title"
          required
          maxLength={100}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
          placeholder="Task description"
          rows={3}
          maxLength={1000}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300 mb-2">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-5 py-2.5 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg border border-gray-600 transition-all duration-200 hover:border-cyan-500/50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Saving...
            </div>
          ) : (
            submitText
          )}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;