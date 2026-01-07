import React from 'react';
import SkeletonLoader from './SkeletonLoader';

const TaskSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 mb-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <SkeletonLoader className="w-5 h-5 rounded" />
          <SkeletonLoader className="w-32 h-4 rounded" />
        </div>
        <div className="flex space-x-2">
          <SkeletonLoader className="w-8 h-8 rounded" />
          <SkeletonLoader className="w-8 h-8 rounded" />
        </div>
      </div>
      <SkeletonLoader className="w-full h-3 rounded mt-3" />
    </div>
  );
};

export default TaskSkeleton;