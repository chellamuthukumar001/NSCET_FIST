import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'subtle';
  hoverEffect?: boolean;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'light',
  hoverEffect = true,
  className = '',
  ...props
}) => {
  const variantClasses = {
    light: 'glass-panel',
    dark: 'dark-glass',
    subtle: 'dark-glass-subtle',
  }[variant];

  const hoverClass = hoverEffect ? 'glass-card-hover' : '';

  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-200 ${variantClasses} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

