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
      <h3 className="text-lg font-medium text-gray-300 mb-2">{title}</h3>
      {subtitle && <p className="text-gray-500 mb-6">{subtitle}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;