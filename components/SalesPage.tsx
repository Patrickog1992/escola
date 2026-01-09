import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { QuizState } from '../types';
import { Check, ChevronDown, ChevronUp, Star, Lock, BookOpen, BarChart2, MessageCircle, Home, User, BatteryCharging, Heart, Sun, MapPin } from 'lucide-react';

interface SalesPageProps {
  answers: QuizState;
}

export const SalesPage: React.FC<SalesPageProps> = ({ answers }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Notification State
  const [notification, setNotification] = useState({ visible: false, name: '', city: '' });

  const CHECKOUT_LINK = "https://go.perfectpay.com.br/PPU38CQ5PQR";

  // Countdown Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Social Proof Popup Logic
  useEffect(() => {
    const buyers = [
      { name: "Mariana S.", city: "São Paulo" },
      { name: "Carlos A.", city: "Rio de Janeiro" },
      { name: "Fernanda M.", city: "Curitiba" },
      { name: "João P.", city: "Salvador" },
      { name: "Ana L.", city: "Belo Horizonte" },
      { name: "Ricardo O.", city: "Porto Alegre" },
      { name: "Patrícia G.", city: "Brasília" },
      { name: "Roberto F.", city: "Recife" }
    ];

    const showBuyer = () => {
      const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
      setNotification({ visible: true, name: randomBuyer.name, city: randomBuyer.city });
      
      // Hide after 4 seconds
      setTimeout(() => {
        setNotification(prev => ({ ...prev, visible: false }));
      }, 4000);
    };

    // Initial delay
    const initialTimeout = setTimeout(showBuyer, 2000);

    // Loop every 8 seconds
    const interval = setInterval(showBuyer, 8000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // App Carousel Logic
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000); 
    return () => clearInterval(slideTimer);
  }, []);

  // Testimonial Carousel Logic
  useEffect(() => {
    const testTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(testTimer);
  }, []);

  // Derive personalized protocol items
  const protocolItems = [
    ...(answers.challenges || []).slice(0, 2),
    ...(answers.goal ? [answers.goal] : []),
    ...(answers.badHabits || []).slice(0, 2),
    ...(answers.motivation || []).slice(0, 1)
  ].slice(0, 5);
  
  if (protocolItems.length < 5) {
      protocolItems.push("Estabilidade Financeira", "Paz Espiritual", "Disciplina");
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCheckout = () => {
    window.location.href = CHECKOUT_LINK;
  };

  const appExplanations = [
    { title: "Chat com Coach", text: "Converse diretamente com seu Coach Financeiro a qualquer momento para tirar dúvidas e receber orientação bíblica personalizada." },
    { title: "Biblioteca de Sabedoria", text: "Acesse uma biblioteca completa com mais de 400 livros e ferramentas sobre gestão, investimentos e sabedoria milenar." },
    { title: "Plano Diário", text: "Acompanhe seu progresso diário com um plano estruturado de 4 semanas, monitorando sua evolução espiritual e financeira." }
  ];

  const testimonials = [
    {
      img: "https://i.imgur.com/Sza1ZfT.png",
      name: "Maria S.",
      text: "Minha vida financeira estava um caos total. Dívidas acumuladas, nome sujo e sem esperança. A Escola de Oração me deu o passo a passo espiritual e prático. Hoje durmo em paz."
    },
    {
      img: "https://i.imgur.com/NVXnmUf.jpg",
      name: "Ana C.",
      text: "Eu achava que prosperidade era pecado. Descobri que Deus quer que eu cresça. Tripliquei minha renda aplicando os princípios ensinados aqui em apenas 3 meses."
    },
    {
      img: "https://i.imgur.com/cGzrRGs.jpg",
      name: "João P.",
      text: "Homem de pouca fé e muitas contas, esse era eu. O Pastor Coach abriu meus olhos. A organização financeira somada à oração diária salvou meu casamento."
    },
    {
      img: "https://i.imgur.com/Uxfn3tt.jpg",
      name: "Carlos M.",
      text: "Simplesmente transformador. O valor é irrisório perto do que entregam. As ferramentas de controle emocional me impediram de gastar por impulso."
    }
  ];

  const faqs = [
    {
      q: "Preciso ter muito conhecimento bíblico?",
      a: "Não. A Escola de Oração é desenhada para todos os níveis, desde quem está começando até quem já caminha na fé há anos."
    },
    {
      q: "E se eu não tiver tempo?",
      a: "O método foi criado para pessoas ocupadas. Apenas 15 minutos por dia são suficientes para ver transformação."
    },
    {
      q: "Funciona para quem tem muitas dívidas?",
      a: "Sim! Temos módulos específicos para organização de dívidas com princípios de sabedoria e negociação."
    },
    {
        q: "Como acesso o conteúdo?",
        a: "O acesso é imediato e 100% online através da nossa plataforma exclusiva, disponível no computador ou celular."
    }
  ];

  const PulsingButton = ({ children, className = "", ...props }: any) => (
    <Button 
      className={`!bg-green-600 hover:!bg-green-500 !text-white !font-extrabold animate-pulse shadow-[0_0_20px_rgba(22,163,74,0.6)] !border-none transition-all transform hover:scale-105 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* Social Proof Popup - Micro Version */}
      <div 
        className={`fixed top-2 right-2 z-50 bg-white/95 backdrop-blur-sm shadow-md border-l-2 border-green-500 rounded p-1.5 max-w-[140px] transition-all duration-500 transform ${notification.visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
      >
        <div className="flex items-start gap-1.5">
            <div className="bg-green-100 p-0.5 rounded-full mt-0.5">
                <Check size={8} className="text-green-600" />
            </div>
            <div>
                <p className="text-[7px] uppercase tracking-wider text-slate-400 font-bold mb-0 leading-none">Nova Inscrição</p>
                <p className="text-[8px] text-slate-800 leading-tight mt-0.5">
                    <span className="font-bold">{notification.name}</span> de <span className="font-semibold text-slate-600">{notification.city}</span> recebeu a <span className="font-bold text-green-700">ESCOLA DE ORAÇÃO</span>
                </p>
            </div>
        </div>
      </div>

      {/* Static Banner - Not Fixed */}
      <div className="w-full bg-red-600 text-white py-3 px-2 text-center shadow-md">
        <p className="text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span>VOCÊ ACABA DE GANHAR UM DESCONTO DE 60% EXPIRA EM</span>
          <span className="text-yellow-300 font-mono text-base sm:text-lg bg-red-800/30 px-2 rounded">
             {formatTime(timeLeft)}
          </span>
        </p>
      </div>

      {/* Header/Hero Section */}
      <section className="bg-slate-900 text-white py-12 px-4 text-center flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Daqui 1 mês você vai agradecer por ter começado HOJE...</h1>
        <p className="text-xl text-slate-300">De acordo com suas respostas esses poderão ser seus resultados...</p>
      </section>

      {/* Before/After Section */}
      <section className="py-12 px-4 max-w-4xl mx-auto space-y-12">
        
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-red-600 font-bold text-xl mb-4 flex items-center gap-2">ANTES DA ESCOLA DE ORAÇÃO</h3>
          <img src="https://i.imgur.com/qTALPdf.jpeg" alt="Antes" className="w-full h-auto rounded-xl mb-6 opacity-80 grayscale" />
          <ul className="space-y-3">
            <li className="flex gap-2 items-start"><span className="text-red-500">✕</span> Muito esforço. Pouco resultado.</li>
            <li className="flex gap-2 items-start"><span className="text-red-500">✕</span> Estresse financeiro todos os dias.</li>
            <li className="flex gap-2 items-start"><span className="text-red-500">✕</span> Trabalhar muito e continuar no mesmo lugar.</li>
            <li className="flex gap-2 items-start"><span className="text-red-500">✕</span> Mente cansada. Coração inquieto.</li>
            <li className="flex gap-2 items-start"><span className="text-red-500">✕</span> Desejo de prosperar, sem direção clara.</li>
          </ul>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 shadow-lg transform scale-105">
          <h3 className="text-emerald-600 font-bold text-xl mb-4 flex items-center gap-2">DEPOIS DA ESCOLA DE ORAÇÃO</h3>
          <img src="https://i.imgur.com/rcOkmPA.jpeg" alt="Depois" className="w-full h-auto rounded-xl mb-6" />
          <ul className="space-y-3">
            <li className="flex gap-2 items-start"><Check className="text-emerald-500 w-5 h-5" /> Clareza, paz e crescimento constante.</li>
            <li className="flex gap-2 items-start"><Check className="text-emerald-500 w-5 h-5" /> Prosperidade com propósito.</li>
            <li className="flex gap-2 items-start"><Check className="text-emerald-500 w-5 h-5" /> Menos estresse. Mais direção.</li>
            <li className="flex gap-2 items-start"><Check className="text-emerald-500 w-5 h-5" /> Disciplina financeira e paz interior.</li>
            <li className="flex gap-2 items-start"><Check className="text-emerald-500 w-5 h-5" /> Crescimento financeiro alinhado com fé.</li>
          </ul>
        </div>

      </section>

      {/* Protocol Section */}
      <section className="bg-slate-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">SEU PROTOCOLO PERSONALIZADO DA ESCOLA DE ORAÇÃO</h2>
          <div className="space-y-4">
             {protocolItems.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex gap-4 items-center">
                    <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">{idx + 1}</div>
                    <div>
                        <h4 className="font-bold text-slate-800">{item}</h4>
                        <p className="text-sm text-slate-600">
                           Vamos aplicar estratégias bíblicas e financeiras específicas para transformar essa área da sua vida.
                        </p>
                    </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* What You Receive */}
      <section className="py-12 px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-8">O que você recebe</h2>
        <div className="grid gap-6 md:grid-cols-2 text-left mb-16">
            {[
                { title: "Você cresce em paz financeira", desc: "ao substituir a preocupação por lições diárias de 15 minutos guiadas pela fé sobre dinheiro e mentalidade" },
                { title: "Você vê crescimento na sua renda e na sua mentalidade", desc: "ao aplicar disciplina espiritual aos seus hábitos diários" },
                { title: "Você sente a orientação de Deus em suas decisões", desc: "ao alinhar seu dinheiro, seus objetivos e sua generosidade com os princípios d’Ele" },
                { title: "Você sente a orientação de Deus em suas decisões", desc: "ao alinhar seu dinheiro, seus objetivos e sua generosidade com os princípios d’Ele" },
                { title: "Você constrói uma parceria duradoura com Deus", desc: "ao convidá-lo para a forma como você ganha, economiza e contribui" }
            ].map((card, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-primary">
                    <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                    <p className="text-slate-600">{card.desc}</p>
                </div>
            ))}
        </div>

        {/* APP PREVIEW CAROUSEL */}
        <h2 className="text-2xl font-bold mb-8 uppercase text-slate-900">VEJA O QUE VOCÊ RECEBE</h2>
        
        <div className="max-w-md mx-auto">
          <div className="relative mx-auto w-[300px] h-[600px] bg-slate-900 rounded-[2.5rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden mb-6">
             {/* iPhone Notch */}
             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-slate-800 rounded-b-2xl z-20"></div>
             
             {/* Screen Content */}
             <div className="w-full h-full bg-slate-50 relative">
                
                {/* Slide 1: Chat */}
                <div className={`absolute inset-0 transition-opacity duration-500 bg-slate-900 text-white flex flex-col ${currentSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                    <div className="pt-12 pb-4 px-4 bg-slate-800 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent"></div>
                        <span className="font-semibold">Coach Financeiro</span>
                    </div>
                    <div className="flex-1 p-4 space-y-4 overflow-hidden">
                        <div className="self-end bg-accent/20 p-3 rounded-t-xl rounded-l-xl ml-auto max-w-[80%]">
                            <p className="text-sm">Tenho dívidas e não sei por onde começar.</p>
                        </div>
                        <div className="self-start bg-slate-800 p-3 rounded-t-xl rounded-r-xl max-w-[90%]">
                            <p className="text-sm">A dívida pode ser gerenciada com a estratégia certa. Vamos analisar passo a passo. Primeiro, vamos olhar sua renda.</p>
                        </div>
                        <div className="self-end bg-accent/20 p-3 rounded-t-xl rounded-l-xl ml-auto max-w-[80%]">
                            <p className="text-sm">Não tenho renda fixa.</p>
                        </div>
                        <div className="self-start bg-slate-800 p-3 rounded-t-xl rounded-r-xl max-w-[90%]">
                            <p className="text-sm">Sem problemas! Podemos criar um plano flexível que funcione para você, focando no essencial.</p>
                        </div>
                    </div>
                </div>

                {/* Slide 2: Library */}
                <div className={`absolute inset-0 transition-opacity duration-500 bg-slate-900 text-white flex flex-col ${currentSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                   <div className="pt-12 px-4 pb-4">
                      <h3 className="text-xl font-bold mb-1">Planos de Estudo</h3>
                      <p className="text-xs text-slate-400">400+ Ferramentas Diárias</p>
                   </div>
                   <div className="flex-1 p-4 grid grid-cols-2 gap-3 overflow-hidden content-start">
                       {[
                           { title: "Mente Rica", auth: "Hábitos Inteligentes", color: "bg-amber-600" },
                           { title: "O Poder", auth: "Construindo Riqueza", color: "bg-emerald-600" },
                           { title: "Sem Dívidas", auth: "O Guia Bíblico", color: "bg-red-600" },
                           { title: "Tempo & Dinheiro", auth: "Organização Real", color: "bg-blue-600" }
                       ].map((book, i) => (
                           <div key={i} className="bg-slate-800 rounded-xl p-3 flex flex-col aspect-[3/4]">
                               <div className={`flex-1 rounded-lg mb-2 ${book.color} w-full shadow-inner`}></div>
                               <p className="font-bold text-sm leading-tight">{book.title}</p>
                               <p className="text-[10px] text-slate-400">{book.auth}</p>
                           </div>
                       ))}
                   </div>
                </div>

                {/* Slide 3: Dashboard */}
                <div className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col ${currentSlide === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
                   <div className="pt-12 px-6 mb-6">
                      <div className="flex justify-between items-center mb-4">
                          <div>
                              <h3 className="text-xl font-bold">Seu Plano Diário</h3>
                              <p className="text-xs text-emerald-400">Estabilidade Financeira</p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                      </div>
                      <div className="bg-slate-800/50 rounded-full h-2 w-full mb-1">
                          <div className="w-1/4 bg-emerald-500 h-full rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400">
                          <span>Progresso hoje</span>
                          <span>25%</span>
                      </div>
                   </div>
                   
                   <div className="px-4 mb-6">
                      <div className="flex gap-2 overflow-hidden">
                          {[1, 2, 3, 4, 5].map(day => (
                              <div key={day} className={`flex-1 rounded-xl py-3 text-center ${day === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                  <div className="text-xs mb-1">Dia</div>
                                  <div className="font-bold">{day}</div>
                              </div>
                          ))}
                      </div>
                   </div>

                   <div className="px-4">
                       <h4 className="font-bold mb-3 text-sm">Afirmações</h4>
                       <div className="flex gap-3 mb-6">
                           <div className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-amber-500" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=100)'}}></div>
                           <div className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-emerald-500" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=100)'}}></div>
                           <div className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-blue-500" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&q=80&w=100)'}}></div>
                       </div>
                       <h4 className="font-bold mb-3 text-sm">Como você se sente?</h4>
                       <div className="flex gap-2">
                          <div className="bg-slate-800 p-2 rounded-lg text-center flex-1">😡</div>
                          <div className="bg-slate-800 p-2 rounded-lg text-center flex-1">😷</div>
                          <div className="bg-slate-800 p-2 rounded-lg text-center flex-1">🙏</div>
                       </div>
                   </div>
                </div>
                
                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2 z-30">
                    {[0, 1, 2].map(idx => (
                        <div key={idx} className={`w-2 h-2 rounded-full ${currentSlide === idx ? 'bg-white' : 'bg-white/30'}`}></div>
                    ))}
                </div>

             </div>
          </div>
          
          {/* EXPLANATION TEXT SYNCED WITH SLIDE */}
          <div className="text-center bg-slate-100 p-6 rounded-xl shadow-md min-h-[160px] flex flex-col justify-center animate-fade-in mb-12">
              <h3 className="text-xl font-bold text-primary mb-2 transition-all duration-300">
                {appExplanations[currentSlide].title}
              </h3>
              <p className="text-slate-600 transition-all duration-300">
                {appExplanations[currentSlide].text}
              </p>
          </div>
        </div>

      </section>

      {/* Testimonials Carousel */}
      <section className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
             <h2 className="text-2xl font-bold text-center mb-8">O QUE OS FIÉIS DIZEM SOBRE A ESCOLA</h2>
             
             <div className="relative min-h-[300px] flex items-center justify-center">
                 {testimonials.map((t, index) => (
                    <div 
                        key={index} 
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col items-center justify-center text-center p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl ${index === currentTestimonial ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <img 
                            src={t.img} 
                            alt={t.name} 
                            className="w-24 h-24 rounded-full border-4 border-accent mb-4 object-cover"
                        />
                        <h3 className="text-xl font-bold text-white mb-2">{t.name}</h3>
                        <div className="flex text-yellow-400 mb-4 justify-center">
                            <Sun size={20} fill="currentColor" />
                            <Sun size={20} fill="currentColor" />
                            <Sun size={20} fill="currentColor" />
                            <Sun size={20} fill="currentColor" />
                            <Sun size={20} fill="currentColor" />
                        </div>
                        <p className="italic text-slate-300 text-lg leading-relaxed">
                            "{t.text}"
                        </p>
                    </div>
                 ))}
             </div>
             
             {/* Indicators for Testimonials */}
             <div className="flex justify-center gap-2 mt-8">
                 {testimonials.map((_, idx) => (
                     <div key={idx} className={`w-3 h-3 rounded-full transition-all duration-300 ${currentTestimonial === idx ? 'bg-accent scale-125' : 'bg-slate-700'}`}></div>
                 ))}
             </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-12 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-2">E O MELHOR? Isso tudo custa menos que uma PIZZA</h2>
            <p className="text-lg text-slate-600">Tenha a prosperidade de vida que você realmente merece…</p>
        </div>
        
        <div className="space-y-3 mb-12">
            {[
                "Sinta paz ao pensar no seu futuro financeiro",
                "Veja suas decisões começarem a gerar resultados reais",
                "Acorde com clareza, direção e confiança",
                "Perca o medo do dinheiro e das contas",
                "Escute das pessoas: “O que mudou? Você está diferente.”"
            ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                    <div className="bg-green-100 p-1 rounded-full"><Check className="text-green-600 w-4 h-4" /></div>
                    <span className="font-medium">{item}</span>
                </div>
            ))}
        </div>

        {/* Timeline */}
        <h2 className="text-2xl font-bold text-center mb-8">Sua jornada de transformação com a Escola de Oração</h2>
        <div className="space-y-8 relative border-l-2 border-slate-200 ml-4 pl-8 mb-12">
            {[
                { day: "7 Dias – Primeira Semana", text: "Você acorda com a mente limpa e foco total. A ansiedade financeira cai drasticamente e você para de tomar decisões no impulso. Pela primeira vez, sente que o dinheiro não te controla mais." },
                { day: "14 Dias – Segunda Semana", text: "Sua postura muda. Você fala diferente, decide diferente e age com segurança. Alguém próximo solta, sem você esperar: “Tem algo diferente em você… parece que tudo começou a fluir.”" },
                { day: "21 Dias – Terceira Semana", text: "Os resultados ficam visíveis. Contas organizadas, decisões firmes e oportunidades surgindo. As pessoas percebem e comentam: “Você está em outro nível. O que aconteceu com você?”" }
            ].map((step, i) => (
                <div key={i} className="relative">
                    <div className="absolute -left-[41px] top-0 bg-primary text-white w-6 h-6 rounded-full border-4 border-white"></div>
                    <h3 className="font-bold text-lg text-primary">{step.day}</h3>
                    <p className="text-slate-600">{step.text}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Bonuses */}
      <section className="bg-slate-50 py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Ganhe 5 bônus exclusivos que aceleram sua evolução - ÚLTIMAS 5 VAGAS</h2>
            <div className="space-y-4 mb-8">
                {[
                    { title: "Bônus 1 — Plano Financeiro Bíblico de 30 Dias", desc: "Organize suas finanças com princípios espirituais simples e aplicáveis.", val: "R$ 97" },
                    { title: "Bônus 2 — Devocional Diário para Prosperidade e Paz", desc: "Orações guiadas para alinhar fé, mente e decisões financeiras.", val: "R$ 67" },
                    { title: "Bônus 3 — Método Antiestresse Financeiro (15 Minutos por Dia)", desc: "Reduza ansiedade e medo ao lidar com dinheiro.", val: "R$ 87" },
                    { title: "Bônus 4 — Aula Especial: Como Destravar Bloqueios Espirituais da Prosperidade", desc: "Identifique e elimine crenças que travam seu crescimento.", val: "R$ 127" },
                    { title: "Bônus 5 — Comunidade Fechada da Escola de Oração", desc: "Apoio, direcionamento e crescimento em conjunto.", val: "R$ 97" },
                ].map((bonus, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                        <h4 className="font-bold text-primary">🎁 {bonus.title}</h4>
                        <p className="text-sm text-slate-600 mb-2">{bonus.desc}</p>
                        <p className="text-xs font-bold text-slate-400">Valor: {bonus.val}</p>
                    </div>
                ))}
            </div>
            
            <div className="text-center bg-yellow-50 p-6 rounded-xl border border-yellow-200 mb-8">
                <p className="text-xl font-bold text-slate-800 mb-2">💰 Valor total dos bônus: <span className="line-through text-slate-400">R$ 475</span></p>
                <p className="text-lg mb-4">👉 Ao se inscrever na Escola de Oração hoje, você recebe TODOS esses bônus 100% GRATUITOS.</p>
                <p className="text-sm mb-4">Mas apenas hoje, até às 23:59 ou enquanto durarem as 5 últimas vagas, você garante acesso por apenas <span className="text-5xl font-extrabold text-emerald-600 block my-4">R$ 47</span> com mais de 90% de DESCONTO 👇</p>
                <PulsingButton className="w-full text-lg" onClick={handleCheckout}>QUERO MINHA VAGA AGORA</PulsingButton>
            </div>
            
            <p className="text-center text-slate-500 italic">Imagine se daqui 4 semanas você olha no espelho e mal se reconhece... Só porque decidiu começar HOJE.</p>
          </div>
      </section>

      {/* Guarantee */}
      <section className="py-12 px-4 max-w-2xl mx-auto text-center">
          <div className="border-2 border-slate-900 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">GARANTIA TOTAL</h2>
            <p className="mb-4">Você tem 30 dias completos para colocar a Escola de Oração em prática. Se, por qualquer motivo, você não sentir mais paz, clareza ou progresso financeiro, basta enviar um e-mail ou WhatsApp que devolvemos 100% do seu dinheiro.</p>
            <p className="mb-4 font-bold">💰 Sem riscos, sem burocracia, sem letras miúdas.</p>
            <p className="mb-6">🎯 É simples: ou você começa a ver sua vida financeira e espiritual destravar, ou não paga absolutamente nada.</p>
            <PulsingButton className="w-full" onClick={handleCheckout}>COMEÇAR AGORA</PulsingButton>
          </div>
      </section>

      {/* Two Choices */}
      <section className="bg-slate-100 py-12 px-4">
          <div className="max-w-2xl mx-auto">
             <h2 className="text-2xl font-bold text-center mb-8">Agora você tem 2 escolhas…</h2>
             <div className="space-y-4">
                 <div className="bg-white p-6 rounded-xl shadow-sm opacity-70">
                     <h4 className="font-bold text-slate-500 mb-2">🔸 1. Continuar preso(a) ao estresse financeiro</h4>
                     <p className="text-sm">tentando “dar um jeito” sozinho(a), repetindo os mesmos erros, vivendo no aperto e sentindo que nada muda.</p>
                 </div>
                 <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-primary transform scale-105">
                     <h4 className="font-bold text-primary mb-2">🔹 2. Começar hoje com a Escola de Oração</h4>
                     <p className="text-sm">usando um método simples e acessível, que já ajudou milhares de pessoas a destravar a vida financeira e encontrar paz, dedicando apenas alguns minutos por dia, sem complicação.</p>
                 </div>
             </div>
             <div className="mt-8 text-center">
                 <PulsingButton className="w-full text-xl py-4" onClick={handleCheckout}>ENTRAR NA ACADEMIA DE ORAÇÃO</PulsingButton>
             </div>
          </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 max-w-2xl mx-auto">
         <h2 className="text-2xl font-bold text-center mb-8">PERGUNTAS FREQUENTES</h2>
         <div className="space-y-2">
            {faqs.map((item, index) => (
                <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
                    <button 
                        onClick={() => toggleFaq(index)}
                        className="w-full flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100 text-left font-semibold"
                    >
                        {item.q}
                        {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {openFaq === index && (
                        <div className="p-4 bg-white text-slate-600 text-sm">
                            {item.a}
                        </div>
                    )}
                </div>
            ))}
         </div>
      </section>

    </div>
  );
};