import React from 'react';

interface StepLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const StepLayout: React.FC<StepLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col items-center py-8 px-4 sm:px-6 ${className}`}>
      <img 
        src="https://i.imgur.com/oTDYdgG.png" 
        alt="Logo Academia de Orações" 
        className="w-[100px] h-[100px] object-contain mb-6"
      />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center text-center animate-fade-in">
        {children}
      </div>
    </div>
  );
};