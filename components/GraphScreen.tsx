import React from 'react';
import { StepLayout } from './StepLayout';
import { Button } from './Button';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, ReferenceDot, Label } from 'recharts';

interface GraphScreenProps {
  onNext: () => void;
}

export const GraphScreen: React.FC<GraphScreenProps> = ({ onNext }) => {
  const data = [
    { day: 0, value: 10 },
    { day: 7, value: 30 },
    { day: 14, value: 55 },
    { day: 21, value: 80 },
    { day: 28, value: 100 },
  ];

  return (
    <StepLayout className="!px-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-primary text-center">
        Seu plano de 4 semanas para o crescimento financeiro
      </h2>
      <p className="text-base text-slate-600 mb-8 text-center">
        Tenha acesso a mais de 400 ferramentas para melhorar sua vida.
      </p>

      <div className="w-full bg-white rounded-xl shadow-sm p-4 mb-8 border border-slate-100">
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis hide />
              <YAxis hide domain={[0, 110]} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#10B981" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
                strokeWidth={3}
              />
              <ReferenceDot x={0} y={10} r={6} fill="#EF4444" stroke="white" strokeWidth={2}>
                 <Label value="AGORA" offset={15} position="top" fill="#EF4444" fontSize={11} fontWeight="bold" />
              </ReferenceDot>
              <ReferenceDot x={28} y={100} r={6} fill="#10B981" stroke="white" strokeWidth={2}>
                 <Label value="OBJETIVO" offset={15} position="top" fill="#10B981" fontSize={11} fontWeight="bold" />
              </ReferenceDot>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Button onClick={onNext} fullWidth>Continuar</Button>
    </StepLayout>
  );
};