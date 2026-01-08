'use client';

import React, { useEffect, useState } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type} animate-slide-in`}>
      <div className="flex items-center">
        <span className="flex-1">{message}</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white ml-4"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;