import React from 'react';
import { ConfidenceScore } from '../../types';
import { ShieldCheck, AlertTriangle, AlertCircle } from 'lucide-react';

interface ConfidenceBadgeProps {
  confidence?: ConfidenceScore;
  className?: string;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({
  confidence = 'MODERATE',
  className = '',
}) => {
  switch (confidence) {
    case 'HIGH':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 shadow-sm ${className}`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>HIGH RELIABILITY</span>
        </span>
      );
    case 'MODERATE':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950/70 text-amber-300 border border-amber-500/40 shadow-sm ${className}`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>MODERATE RELIABILITY</span>
        </span>
      );
    case 'INSUFFICIENT_EVIDENCE':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-950/70 text-rose-300 border border-rose-500/40 shadow-sm ${className}`}
        >
          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>INSUFFICIENT EVIDENCE</span>
        </span>
      );
    default:
      return null;
  }
};

