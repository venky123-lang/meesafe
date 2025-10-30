
import React from 'react';
import { WarrantyStatus } from '../../types';

interface BadgeProps {
  status: WarrantyStatus;
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  const statusClasses = {
    [WarrantyStatus.Pending]: 'bg-yellow-100 text-yellow-800',
    [WarrantyStatus.Approved]: 'bg-green-100 text-green-800',
    [WarrantyStatus.Rejected]: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

export default Badge;
