import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'option';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  type = 'button', // Default to button to prevent accidental form submits
  ...props 
}) => {
  // REMOVED: active:scale-95 (This causes click misses on mobile)
  const baseStyles = "py-3 px-6 rounded-xl font-semibold transition-colors duration-200 text-center select-none cursor-pointer touch-manipulation";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-slate-800 shadow-lg shadow-slate-200 active:bg-slate-900",
    outline: "border-2 border-primary text-primary hover:bg-slate-50 active:bg-slate-100",
    ghost: "text-slate-500 hover:text-primary hover:bg-slate-100",
    option: "bg-white border border-slate-200 text-slate-700 hover:border-primary hover:bg-slate-50 text-left shadow-sm active:bg-slate-100",
  };

  return (
    <button 
      type={type}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};