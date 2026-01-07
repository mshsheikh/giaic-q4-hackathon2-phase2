'use client';

import React, { useState, useEffect } from 'react';
import { Task, TaskCreate, TaskUpdate } from '../types/task';
import { api } from '../lib/api';
import { isAuthenticated } from '../lib/auth';
import { useRouter } from 'next/navigation';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const HomePage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    } else {
      loadTasks();
    }
  }, [router]);

  // Reload tasks when filter or page changes
  useEffect(() => {
    if (isAuthenticated()) {
      loadTasks();
    }
  }, [filter, currentPage]);

  const loadTasks = async () => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    try {
      setLoading(true);

      const response = await api.getTasks(currentPage, 10, filter);
      setTasks(response.tasks);
      setTotalPages(response.pagination.pages);
    } catch (error) {
      console.error('Error loading tasks:', error);
      if (error instanceof Error && error.message.includes('401')) {
        router.push('/login');
      } else {
        alert(error instanceof Error ? error.message : 'Failed to load tasks');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: TaskCreate) => {
    // Validate JWT token exists and is not expired before making API call
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    // Check if token exists in localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert('No authentication token found. Please log in again.');
        router.push('/login');
        return;
      }
    }

    // Optimistic update: add task immediately to UI
    const tempId = `temp-${Date.now()}`;
    const newTask: Task = {
      id: tempId,
      title: taskData.title,
      description: taskData.description,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: '',
      due_date: taskData.due_date
    };

    setTasks(prev => [newTask, ...prev]);
    setShowForm(false);

    try {
      const createdTask = await api.createTask(taskData);
      // Replace the temporary task with the actual created task only if API succeeds
      setTasks(prev => prev.map(task => task.id === tempId ? createdTask : task));
    } catch (error) {
      // If the API call fails, remove the temporary task
      setTasks(prev => prev.filter(task => task.id !== tempId));
      console.error('Error creating task:', error);
      if (error instanceof Error && error.message.includes('401')) {
        router.push('/login');
      } else {
        alert(error instanceof Error ? error.message : 'Failed to create task');
      }
    }
  };

  const handleUpdateTask = async (taskId: string, taskData: TaskUpdate) => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    try {
      const updatedTask = await api.updateTask(taskId, taskData);
      setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
      if (error instanceof Error && error.message.includes('401')) {
        router.push('/login');
      } else {
        alert(error instanceof Error ? error.message : 'Failed to update task');
      }
    }
  };

  const handleToggleTask = async (taskId: string, status: 'pending' | 'completed') => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    // Optimistic update: update the task status immediately in the UI
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, status, updated_at: new Date().toISOString() } : task
    ));

    try {
      // For the canonical API, we'll use updateTask to change the status
      const taskToUpdate = tasks.find(task => task.id === taskId);
      if (taskToUpdate) {
        const updatedTask = await api.updateTask(taskId, { ...taskToUpdate, status });
        // Update with the server response
        setTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
      }
    } catch (error) {
      // If the API call fails, revert the optimistic update
      setTasks(prev => prev.map(task =>
        task.id === taskId ? { ...task, status: status === 'completed' ? 'pending' : 'completed', updated_at: new Date().toISOString() } : task
      ));

      console.error('Error updating task status:', error);
      if (error instanceof Error && error.message.includes('401')) {
        router.push('/login');
      } else {
        alert(error instanceof Error ? error.message : 'Failed to update task status');
      }
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    // Optimistic update: remove the task immediately from the UI
    const taskToDelete = tasks.find(task => task.id === taskId);
    if (!taskToDelete) return;

    setTasks(prev => prev.filter(task => task.id !== taskId));

    try {
      await api.deleteTask(taskId);
      // Task deletion successful, UI is already updated
    } catch (error) {
      // If the API call fails, restore the deleted task
      setTasks(prev => [...prev, taskToDelete]);

      console.error('Error deleting task:', error);
      if (error instanceof Error && error.message.includes('401')) {
        router.push('/login');
      } else {
        alert(error instanceof Error ? error.message : 'Failed to delete task');
      }
    }
  };

  const handleEditTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setEditingTask(task);
      setShowForm(true);
    }
  };

  const handleFormSubmit = (taskData: TaskCreate | TaskUpdate) => {
    if (editingTask) {
      handleUpdateTask(editingTask.id, taskData as TaskUpdate);
    } else {
      handleCreateTask(taskData as TaskCreate);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-lg border-b border-cyan-500/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Todo App
            </h1>
            <p className="text-gray-400 text-sm">Manage your tasks efficiently</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">

      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md ${
              filter === 'pending'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-md ${
              filter === 'completed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Completed
          </button>
        </div>

        <button
          onClick={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Task
        </button>
      </div>

      {showForm && (
        <TaskForm
          initialData={editingTask || null}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          submitText={editingTask ? "Update Task" : "Create Task"}
        />
      )}

      <TaskList
        tasks={tasks}
        loading={loading}
        filter={filter}
        onTaskToggle={handleToggleTask}
        onTaskEdit={handleEditTask}
        onTaskDelete={handleDeleteTask}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
    </div>
  );
};

export default HomePage;