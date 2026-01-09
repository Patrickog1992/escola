import React, { useEffect, useState } from 'react';
import { StepLayout } from './StepLayout';

interface LoadingScreenProps {
  onComplete: () => void;
}

const steps = [
  "Analisando seus dados demográficos",
  "Analisando seus objetivos",
  "Como escolher as melhores ferramentas para você",
  "Configurando seu aplicativo"
];

const testimonials = [
  "Incrível! Mudou minha vida financeira.",
  "Finalmente encontrei paz e direção.",
  "Simples, prático e abençoado.",
  "Nunca pensei que seria tão claro."
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState([0, 0, 0, 0]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const totalDuration = 6000; // 6 seconds total loading
    const stepDuration = totalDuration / 4;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = [...prev];
        if (newProgress[currentStep] < 100) {
          newProgress[currentStep] += 2; // Increment speed
        } else if (currentStep < 3) {
          currentStep++;
        }
        
        // Check if all done
        if (newProgress[3] >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
        }
        return newProgress;
      });
    }, stepDuration / 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const carousel = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 2000);
    return () => clearInterval(carousel);
  }, []);

  return (
    <StepLayout>
      <h2 className="text-xl font-bold mb-6 text-primary">Criando seu plano pessoal</h2>
      
      <div className="w-full space-y-6 mb-8">
        {steps.map((step, idx) => (
          <div key={idx} className="w-full">
            <div className="flex justify-between text-sm font-medium mb-1 text-slate-700">
              <span>{step}</span>
              <span>{Math.min(100, progress[idx])}% {progress[idx] >= 100 && '✅'}</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-success transition-all duration-75"
                style={{ width: `${Math.min(100, progress[idx])}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200">
        <p className="italic text-slate-600">"{testimonials[testimonialIndex]}"</p>
      </div>
    </StepLayout>
  );
};