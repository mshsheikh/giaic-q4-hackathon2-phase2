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
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        {icon || (
          <svg
            className="w-16 h-16 text-gray-500"
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
        )}
      </div>
      <h3 className="text-lg font-medium text-gray-300 mb-1">{title}</h3>
      {subtitle && <p className="text-gray-500 mb-6">{subtitle}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;