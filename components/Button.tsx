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
  ...props 
}) => {
  const baseStyles = "py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform active:scale-95 text-center";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-slate-800 shadow-lg shadow-slate-200",
    outline: "border-2 border-primary text-primary hover:bg-slate-50",
    ghost: "text-slate-500 hover:text-primary hover:bg-slate-100",
    option: "bg-white border border-slate-200 text-slate-700 hover:border-primary hover:bg-slate-50 text-left shadow-sm",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};