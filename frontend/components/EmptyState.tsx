import React from 'react';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  icon,
  action
}) => {
  return (
    <div className="text-center py-16">
      <div className="flex justify-center mb-6">
        {icon || (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-cyan-500/30 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
      <h3 className="text-xl font-semibold text-cyan-300 mb-2">{title}</h3>
      {subtitle && <p className="text-gray-400 text-lg mb-8">{subtitle}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default EmptyState;