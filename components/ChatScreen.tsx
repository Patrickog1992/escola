import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { Send, Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';

interface ChatScreenProps {
  onNext: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ onNext }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const allMessages = [
    "Olá, sou seu coach personalizado! Estou aqui para te ajudar a alcançar seu objetivo.",
    "Renda instável, estresse financeiro, entre outros — essas são dificuldades que milhões de pessoas enfrentam diariamente.",
    "Você não está sozinho(a) 🤝",
    "Já ajudamos milhares de pessoas a superar exatamente esses desafios.",
    "Com a abordagem certa, a mudança está ao seu alcance. Aliás, 86% das pessoas com quem trabalhei comprovaram que a liberdade financeira é possível.",
    "💡 Usar ferramentas avançadas e exercícios financeiros guiados pode acelerar sua jornada rumo à liberdade financeira.",
    "Pesquisas de Oxford, Berkeley e Harvard mostram que hábitos financeiros estruturados, combinados com crescimento espiritual, criam riqueza duradoura",
    "📊 Seu potencial financeiro está atualmente em 32%",
    "Dedicar apenas 10 a 15 minutos por dia a estratégias financeiras comprovadas pode aumentá-lo para mais de 85% em um mês",
    "💪 Junte-se à nossa academia hoje mesmo para assumir o controle das suas finanças — além disso, temos uma oferta especial para ajudá-lo a chegar lá ainda mais rápido!"
  ];

  useEffect(() => {
    let delay = 500;
    allMessages.forEach((msg, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, msg]);
      }, delay);
      delay += 1500 + msg.length * 20; // Dynamic delay based on reading time
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const isFinished = messages.length === allMessages.length;

  return (
    <div className="fixed inset-0 bg-[#e5ddd5] flex flex-col z-50">
      {/* Header */}
      <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between text-white shadow-md">
        <div className="flex items-center gap-2">
            <ArrowLeft size={20} />
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50">
                <img src="https://assets.fnlfx.com/01JJYMQ9ZT5P1Y7DQVTY4P34ZA/dze8fY.webp" alt="Coach" className="w-full h-full object-cover"/>
            </div>
            <div className="flex flex-col">
                <span className="font-semibold text-sm">Pastor Coach</span>
                <span className="text-xs text-white/80">Online</span>
            </div>
        </div>
        <div className="flex gap-4">
            <Video size={20} />
            <Phone size={20} />
            <MoreVertical size={20} />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", backgroundBlendMode: "overlay" }}>
        <div className="bg-[#DCF8C6] shadow-sm p-2 rounded-lg text-xs text-center text-slate-600 mb-4 inline-block mx-auto w-full max-w-xs">
           🔒 As mensagens são protegidas com criptografia de ponta a ponta.
        </div>

        {messages.map((msg, idx) => (
          <div key={idx} className="flex flex-col items-start animate-fade-in-up">
            <div className="bg-white rounded-tr-lg rounded-br-lg rounded-bl-lg p-3 shadow-sm max-w-[85%] text-sm text-slate-800 relative">
              {msg}
              <div className="absolute top-0 left-[-8px] w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent"></div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer/Action */}
      <div className="bg-[#f0f0f0] p-3 flex items-center gap-2">
         {isFinished ? (
             <Button onClick={onNext} className="w-full !bg-[#075E54] hover:!bg-[#128C7E] !py-3">
                 DESBLOQUEAR MEU CRESCIMENTO
             </Button>
         ) : (
            <div className="w-full bg-white rounded-full h-10 px-4 flex items-center text-slate-400 text-sm">
                Digitando...
            </div>
         )}
         {!isFinished && <div className="p-3 bg-[#075E54] rounded-full text-white"><Send size={18} /></div>}
      </div>
    </div>
  );
};