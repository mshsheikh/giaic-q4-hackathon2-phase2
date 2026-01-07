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

    // Format due date to UTC ISO string if provided
    let formattedDueDate: string | undefined = undefined;
    if (dueDate) {
      // Convert date string to UTC ISO string consistently
      const localDate = new Date(dueDate);
      // Use UTC date object to prevent local timezone offset
      const utcDate = new Date(Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate(),
        23, 59, 59, 999
      ));
      formattedDueDate = utcDate.toISOString();
    }

    const taskData: TaskCreate | TaskUpdate = {
      title: title.trim(),
      description: description.trim() || undefined,
      due_date: formattedDueDate || undefined,
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
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 mb-6 transition-all duration-500 animate-fade-in shadow-lg shadow-cyan-500/10">
      <div className="mb-6">
        <label htmlFor="title" className="block text-sm font-semibold text-cyan-300 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-5 py-4 bg-gray-900/80 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
          placeholder="Enter task title..."
          required
          maxLength={100}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-semibold text-cyan-300 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-5 py-4 bg-gray-900/80 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300 resize-vertical"
          placeholder="Enter task description..."
          rows={4}
          maxLength={1000}
        />
      </div>

      <div className="mb-8">
        <label htmlFor="dueDate" className="block text-sm font-semibold text-cyan-300 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-5 py-4 bg-gray-900/80 border border-cyan-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
        />
      </div>

      <div className="flex justify-end space-x-4 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-3 text-sm font-medium text-gray-300 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-xl border border-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500/50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Processing...
            </div>
          ) : (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              {submitText}
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;