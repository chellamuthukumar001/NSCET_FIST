import React from 'react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onActionClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  actionLink,
  onActionClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center glass-panel rounded-2xl border border-white/40">
      <div className="w-14 h-14 rounded-2xl bg-[#173B2F]/10 text-[#173B2F] flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#17201C] mb-1">{title}</h3>
      <p className="text-sm text-[#66736C] max-w-md mb-6">{description}</p>
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="px-5 py-2.5 rounded-xl bg-[#173B2F] text-white font-medium text-sm hover:bg-[#285443] transition-colors shadow-sm"
        >
          {actionText}
        </Link>
      )}
      {actionText && onActionClick && !actionLink && (
        <button
          onClick={onActionClick}
          className="px-5 py-2.5 rounded-xl bg-[#173B2F] text-white font-medium text-sm hover:bg-[#285443] transition-colors shadow-sm cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

