import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-gray-700/50 rounded-lg ${className}`}
    />
  );
};

export default SkeletonLoader;