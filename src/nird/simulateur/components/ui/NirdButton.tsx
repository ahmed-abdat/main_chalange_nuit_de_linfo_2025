import { forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../../lib/utils';

interface NirdButtonProps {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const NirdButton = forwardRef<HTMLButtonElement, NirdButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, onClick, disabled, type = 'button' }, ref) => {
    const baseStyles = 'relative font-display font-semibold tracking-wider uppercase transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'btn-nird text-white',
      outline: 'btn-outline-nird text-white',
      ghost: 'bg-transparent text-foreground hover:bg-muted/50 border border-transparent hover:border-border rounded-lg',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={disabled ? {} : { scale: 1.02 }}
        whileTap={disabled ? {} : { scale: 0.98 }}
        onClick={onClick}
        disabled={disabled}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      </motion.button>
    );
  }
);

NirdButton.displayName = 'NirdButton';

