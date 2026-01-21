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
  // Enhanced base styles for better touch response
  // active:scale-[0.98] gives a subtle physical feedback without large layout shifts
  const baseStyles = "py-3 px-6 rounded-xl font-semibold transition-all duration-200 text-center select-none cursor-pointer touch-manipulation active:scale-[0.98]";
  
  // Use md:hover to restrict hover effects to desktop devices
  // This prevents the 'double-tap' issue on iOS where the first tap triggers hover and the second triggers click
  const variants = {
    primary: "bg-primary text-white md:hover:bg-slate-800 shadow-lg shadow-slate-200 active:bg-slate-900",
    outline: "border-2 border-primary text-primary md:hover:bg-slate-50 active:bg-slate-100",
    ghost: "text-slate-500 md:hover:text-primary md:hover:bg-slate-100",
    option: "bg-white border border-slate-200 text-slate-700 md:hover:border-primary md:hover:bg-slate-50 text-left shadow-sm active:bg-slate-100 active:border-primary active:text-primary",
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