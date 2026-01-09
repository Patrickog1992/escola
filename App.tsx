import React, { useState, useEffect } from 'react';
import { StepLayout } from './components/StepLayout';
import { Button } from './components/Button';
import { LoadingScreen } from './components/LoadingScreen';
import { GraphScreen } from './components/GraphScreen';
import { ChatScreen } from './components/ChatScreen';
import { SalesPage } from './components/SalesPage';
import { INITIAL_STATE, QuizState } from './types';
import { Briefcase, Heart, Globe, Scale, Users, HelpCircle, DollarSign, TrendingUp, Rocket, AlertTriangle, BatteryCharging, ShoppingBag, Wrench, BarChart2, Bell, Sun, Clock, BookOpen, PenTool, Smartphone, Monitor, Shield, Home } from 'lucide-react';

// List of critical images to preload
const IMAGES_TO_PRELOAD = [
  "https://i.imgur.com/uLaG7j9.jpeg",
  "https://assets.fnlfx.com/01JJYMQ9ZT5P1Y7DQVTY4P34ZA/EdTysa.webp",
  "https://assets.fnlfx.com/01KBF5MF5T1HGK82GH28F03S90/2ahRVR6z.webp",
  "https://assets.fnlfx.com/01JNRNK8RG99WV2EDA87Y0H0E0/AR8ncc.webp",
  "https://assets.fnlfx.com/01JNRNK8RG99WV2EDA87Y0H0E0/28eC85.webp",
  "https://assets.fnlfx.com/01JNRNK8RG99WV2EDA87Y0H0E0/tKwNE_.webp",
  "https://assets.fnlfx.com/01JNRNK8RG99WV2EDA87Y0H0E0/GmRO7D.webp",
  "https://i.imgur.com/Sza1ZfT.png",
  "https://i.imgur.com/NVXnmUf.jpg",
  "https://i.imgur.com/cGzrRGs.jpg",
  "https://i.imgur.com/Uxfn3tt.jpg",
  "https://assets.fnlfx.com/01JNRNK8RG99WV2EDA87Y0H0E0/5DicJu.webp",
  "https://assets.fnlfx.com/01JNRNK8RG99WV2EDA87Y0H0E0/jkBJKh.webp",
  "https://assets.fnlfx.com/01JJYMQ9ZT5P1Y7DQVTY4P34ZA/Lrn2ex.webp"
];

const App = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizState>(INITIAL_STATE);

  // Preload Images on Mount
  useEffect(() => {
    IMAGES_TO_PRELOAD.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Handle Scroll on Step Change - Force top immediately
  useEffect(() => {
    // Force immediate scroll to top
    window.scrollTo(0, 0);
    
    // Safety timeout for mobile browsers that might have layout shifts
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [step]);

  const nextStep = () => {
    window.scrollTo(0, 0);
    setStep(prev => prev + 1);
  };

  const updateAnswer = (key: keyof QuizState, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const toggleSelection = (key: keyof QuizState, value: string) => {
    setAnswers(prev => {
      const current = prev[key] as string[];
      if (current.includes(value)) {
        return { ...prev, [key]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [key]: [...current, value] };
      }
    });
  };

  const renderStep = () => {
    switch (step) {
      // INTRO
      case 0:
        return (
          <StepLayout>
            <h1 className="text-xl font-bold mb-2">Desafio de PROSPERIDADE de Deus em 28 dias</h1>
            <h2 className="text-2xl font-extrabold mb-6 text-primary">Tornar-se financeiramente irreconhecível<br />em 2026.</h2>
            <img src="https://i.imgur.com/uLaG7j9.jpeg" alt="Desafio Financeiro" className="w-full rounded-xl mb-6 shadow-md" />
            <p className="mb-4 font-semibold">Selecione seu gênero</p>
            <p className="text-sm text-slate-500 mb-6">Usamos sua idade apenas para personalizar seu plano.</p>
            <div className="w-full space-y-3">
              <Button fullWidth onClick={() => { updateAnswer('gender', 'HOMEM'); nextStep(); }}>HOMEM</Button>
              <Button fullWidth variant="outline" onClick={() => { updateAnswer('gender', 'MULHER'); nextStep(); }}>MULHER</Button>
            </div>
          </StepLayout>
        );

      case 1:
        return (
          <StepLayout>
            <h2 className="text-xl font-bold mb-6">SELECIONE SUA IDADE</h2>
            <div className="w-full space-y-3">
              {['18 – 29', '30 – 45', '46 – 55', '55+'].map(opt => (
                <Button key={opt} fullWidth variant="option" onClick={() => { updateAnswer('age', opt); nextStep(); }}>{opt}</Button>
              ))}
            </div>
          </StepLayout>
        );

      case 2:
        return (
          <StepLayout>
            <h2 className="text-xl font-bold mb-2">Mais de 500.000 pessoas</h2>
            <p className="text-lg mb-6">já utiliza a Academia de Orações</p>
            <div className="bg-slate-100 p-4 rounded-lg italic text-slate-700 mb-6">
              "O sucesso não se resume a números; líderes que integram estratégia financeira com consciência espiritual abrem portas para novas oportunidades."
            </div>
            <img src="https://assets.fnlfx.com/01JJYMQ9ZT5P1Y7DQVTY4P34ZA/EdTysa.webp" alt="Social Proof" className="w-full rounded-xl mb-6 shadow-md" />
            <Button fullWidth onClick={nextStep}>Continuar</Button>
          </StepLayout>
        );

      case 3:
        return (
          <StepLayout>
            <h2 className="text-xl font-bold mb-6">Qual é o seu principal objetivo?</h2>
            <div className="w-full space-y-3">
              {[
                { label: 'Alcançar a estabilidade financeira', icon: DollarSign },
                { label: 'Crescimento na carreira', icon: TrendingUp },
                { label: 'Comece um negócio', icon: Rocket },
                { label: 'Viaje pelo mundo', icon: Globe },
                { label: 'Equilíbrio entre vida profissional e pessoal', icon: Scale },
                { label: 'Fortalecer os laços com outras pessoas', icon: Users },
                { label: 'Outro', icon: HelpCircle },
              ].map(opt => (
                <Button key={opt.label} fullWidth variant="option" className="flex items-center gap-3" onClick={() => { updateAnswer('goal', opt.label); nextStep(); }}>
                  <opt.icon size={20} className="text-primary" /> {opt.label}
                </Button>
              ))}
            </div>
          </StepLayout>
        );

      case 4:
        return (
          <StepLayout>
            <h2 className="text-xl font-bold mb-2">Quais são os seus maiores desafios financeiros atualmente?</h2>
            <p className="text-sm text-slate-500 mb-6">(Escolha quantas opções quiser)</p>
            <div className="w-full space-y-3 mb-6">
              {[
                { label: 'Baixa renda', icon: DollarSign },
                { label: 'Sem economias', icon: Home },
                { label: 'Despesas elevadas', icon: TrendingUp },
                { label: 'Sem plano financeiro', icon: Briefcase },
                { label: 'Falta de educação financeira', icon: BookOpen },
                { label: 'Vivendo de salário em salário.', icon: Clock },
                { label: 'Endividamento', icon: AlertTriangle },
                { label: 'Renda instável', icon: BarChart2 },
                { label: 'Estresse financeiro', icon: AlertTriangle },
                { label: 'Gastos impulsivos', icon: ShoppingBag },
                { label: 'Despesas inesperadas', icon: Wrench },
                { label: 'Outro', icon: HelpCircle },
              ].map(opt => (
                <Button 
                  key={opt.label} 
                  fullWidth 
                  variant={answers.challenges.includes(opt.label) ? 'primary' : 'option'} 
                  className="flex items-center gap-3" 
                  onClick={() => toggleSelection('challenges', opt.label)}
                >
                  <opt.icon size={20} /> {opt.label}
                </Button>
              ))}
            </div>
            <Button fullWidth onClick={nextStep}>Continuar</Button>
          </StepLayout>
        );

      case 5:
        return (
          <StepLayout>
            <h2 className="text-xl font-bold mb-4">Podemos ajudar você a realizar seu desejo!</h2>
            <p className="mb-4">Os seus desafios são comuns e vivenciados por 74% dos nossos usuários.</p>
            <p className="mb-6 text-slate-600">Com uma ferramenta personalizada, você poderá atingir seu objetivo com um suporte robusto.</p>
            <img src="https://assets.fnlfx.com/01KBF5MF5T1HGK82GH28F03S90/2ahRVR6z.webp" alt="Help" className="w-full rounded-xl mb-6 shadow-md" />
            <Button fullWidth onClick={nextStep}>Continuar</Button>
          </StepLayout>
        );

      case 6:
        return (
           <StepLayout>
            <h2 className="text-xl font-bold mb-6">Em que setor você trabalha atualmente?</h2>
            <div className="w-full space-y-3">
              {[
                {l: 'Finanças e Bancos', i: BarChart2}, {l: 'Setor de serviços', i: Bell}, {l: 'Vendas', i: Briefcase},
                {l: 'Saúde e Medicina', i: Heart}, {l: 'Tecnologia e TI', i: Monitor}, {l: 'Educação', i: BookOpen},
                {l: 'Marketing e Criação', i: PenTool}, {l: 'Logística', i:  Rocket}, {l: 'Jurídico', i: Scale},
                {l: 'Entretenimento e mídia', i: Video}, {l: 'Aposentado', i: User}, {l: 'Dona de casa', i: Home},
                {l: 'Temporariamente desempregado', i: Clock}, {l: 'Outro', i: HelpCircle}
              ].map((opt: any) => (
                <Button key={opt.l} fullWidth variant="option" className="flex items-center gap-3" onClick={() => { updateAnswer('industry', opt.l); nextStep(); }}>
                   {opt.l}
                </Button>
              ))}
            </div>
          </StepLayout> 
        )

      case 7:
        return (
          <StepLayout>
             <h2 className="text-xl font-bold mb-6">Você sente que seu emprego atual ou sua fonte de renda estão alinhados com seu propósito maior?</h2>
             <div className="w-full space-y-3">
                 <Button fullWidth onClick={() => { updateAnswer('alignedWithPurpose', 'SIM'); nextStep(); }}>SIM</Button>
                 <Button fullWidth variant="outline" onClick={() => { updateAnswer('alignedWithPurpose', 'NÃO'); nextStep(); }}>NÃO</Button>
             </div>
          </StepLayout>
        )

      case 8:
         return (
            <StepLayout>
                <h2 className="text-xl font-bold mb-6">Como você descreveria seu equilíbrio entre vida profissional e pessoal?</h2>
                <div className="w-full space-y-3">
                    {[
                        {l: 'Nenhum equilíbrio.', i: AlertTriangle}, {l: 'O trabalho toma conta da minha vida.', i: Clock},
                        {l: 'Poderia ser melhor', i: HelpCircle}, {l: 'Perfeitamente equilibrado', i: Scale}
                    ].map(opt => (
                        <Button key={opt.l} fullWidth variant="option" className="flex items-center gap-3" onClick={() => { updateAnswer('workLifeBalance', opt.l); nextStep(); }}>
                            <opt.i size={20} /> {opt.l}
                        </Button>
                    ))}
                </div>
            </StepLayout>
         )

      case 9:
          return (
              <StepLayout>
                  <h2 className="text-xl font-bold mb-4">Qual o nível de renda anual que você deseja alcançar?</h2>
                  <img src="https://assets.fnlfx.com/01JNRNK8RG99WV2EDA87Y0H0E0/AR8ncc.webp" className="w-full h-auto rounded-xl mb-6" alt="Income" />
                  <div className="w-full space-y-3">
                      {['R$ 100 mil', 'R$ 150 mil', 'R$ 200 mil', 'R$ 250 mil', 'Mais de R$ 500 mil'].map(opt => (
                          <Button key={opt} fullWidth variant="option" onClick={() => { updateAnswer('incomeGoal', opt); nextStep(); }}>{opt}</Button>
                      ))}
                  </div>
              </StepLayout>
          )

      case 10:
          return (
              <StepLayout>
                  <h2 className="text-xl font-bold mb-2">Qual a sua opinião sobre essa declaração?</h2>
                  <p className="mb-4">Frequentemente, deixo de perseguir meus objetivos por medo de cometer erros ou fracassar.</p>
                  <img src="https://assets.fnlfx.com/01JNRNK8RG99WV2EDA87Y0H0E0/28eC85.webp" className="w-full h-auto rounded-xl mb-6" alt="Fear" />
                  <div className="w-full space-y-3">
                      {['Discordo totalmente.', 'Concordo plenamente.', 'Não sei dizer.'].map(opt => (
                          <Button key={opt} fullWidth variant="option" onClick={() => { updateAnswer('fearOfFailure', opt); nextStep(); }}>{opt}</Button>
                      ))}
                  </div>
              </StepLayout>
          )

      case 11:
          return (
              <StepLayout>
                  <h2 className="text-xl font-bold mb-2">Qual a sua opinião sobre essa declaração?</h2>
                  <p className="mb-4">Tenho dificuldade em me perdoar por erros passados.</p>
                  <img src="https://assets.fnlfx.com/01JNRNK8RG99WV2EDA87Y0H0E0/tKwNE_.webp" className="w-full h-auto rounded-xl mb-6" alt="Forgive" />
                  <div className="w-full space-y-3">
                      {['Discordo totalmente.', 'Concordo plenamente.', 'Não sei dizer.'].map(opt => (
                          <Button key={opt} fullWidth variant="option" onClick={() => { updateAnswer('forgiveMistakes', opt); nextStep(); }}>{opt}</Button>
                      ))}
                  </div>
              </StepLayout>
          )

      case 12:
          return (
              <StepLayout>
                  <h2 className="text-xl font-bold mb-2">Qual a sua opinião sobre essa declaração?</h2>
                  <p className="mb-4">Tenho dificuldade em aquietar a mente quando tento orar ou meditar.</p>
                  <img src="https://assets.fnlfx.com/01JNRNK8RG99WV2EDA87Y0H0E0/GmRO7D.webp" className="w-full h-auto rounded-xl mb-6" alt="Mind" />
                  <div className="w-full space-y-3">
                      {['Discordo totalmente.', 'Concordo plenamente.', 'Não sei dizer.'].map(opt => (
                          <Button key={opt} fullWidth variant="option" onClick={() => { updateAnswer('quietMind', opt); nextStep(); }}>{opt}</Button>
                      ))}
                  </div>
              </StepLayout>
          )

      case 13:
          return (
              <StepLayout>
                  <h2 className="text-2xl font-bold mb-2 text-primary">Eis o que<br />dizem os nossos usuários.</h2>
                  <div className="w-full space-y-6 my-6">
                      {[
                          { img: "https://i.imgur.com/Sza1ZfT.png", name: "Maria S.", text: "Foi a melhor decisão que tomei este ano. Minha fé e finanças estão alinhadas." },
                          { img: "https://i.imgur.com/NVXnmUf.jpg", name: "Ana C.", text: "O conteúdo é prático e profundo. Recomendo a todos." },
                          { img: "https://i.imgur.com/cGzrRGs.jpg", name: "João P.", text: "Paz de espírito não tem preço. Obrigado!" },
                          { img: "https://i.imgur.com/Uxfn3tt.jpg", name: "Carlos M.", text: "Consegui organizar minhas dívidas em 2 meses." }
                      ].map((t, i) => (
                          <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl shadow-md text-left flex flex-col items-center sm:items-start gap-4">
                              <div className="flex items-center gap-4 w-full">
                                <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary" />
                                <div>
                                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                                  <div className="flex text-yellow-400"><Sun size={14} fill="currentColor" /><Sun size={14} fill="currentColor" /><Sun size={14} fill="currentColor" /><Sun size={14} fill="currentColor" /><Sun size={14} fill="currentColor" /></div>
                                </div>
                              </div>
                              <p className="italic text-slate-600 text-sm">"{t.text}"</p>
                          </div>
                      ))}
                  </div>
                  <Button fullWidth onClick={nextStep}>Continuar</Button>
              </StepLayout>
          )

      case 14:
          return (
              <StepLayout>
                  <h2 className="text-xl font-bold mb-6">Como você costuma relaxar antes de dormir?</h2>
                  <div className="w-full space-y-3">
                      {[
                          {l: 'Estou navegando pelo meu celular.', i: Smartphone},
                          {l: 'Ler um livro ou a Bíblia.', i: BookOpen},
                          {l: 'Orar ou meditar', i: Sun},
                          {l: 'Escrever em um diário ou anotar pensamentos', i: PenTool},
                          {l: 'Outro', i: HelpCircle}
                      ].map(opt => (
                          <Button key={opt.l} fullWidth variant="option" className="flex items-center gap-3" onClick={() => { updateAnswer('relaxHabit', opt.l); nextStep(); }}>
                              <opt.i size={20} /> {opt.l}
                          </Button>
                      ))}
                  </div>
              </StepLayout>
          )

      case 15:
          return (
              <StepLayout>
                  <h2 className="text-xl font-bold mb-6">Quanto tempo você passa nas redes sociais diariamente?</h2>
                  <div className="w-full space-y-3">
                      {[{l:'Mais de 5 horas', i:Smartphone}, {l:'3 a 5 horas', i:Clock}, {l:'2 a 3 horas', i:Clock}, {l:'1 a 2 horas', i:Clock}, {l:'Menos de 1 hora', i:Clock}].map(opt => (
                          <Button key={opt.l} fullWidth variant="option" className="flex items-center gap-3" onClick={() => { updateAnswer('socialTime', opt.l); nextStep(); }}>
                              <opt.i size={20} /> {opt.l}
                          </Button>
                      ))}
                  </div>
              </StepLayout>
          )

      case 16:
          return (
              <StepLayout>
                  <h2 className="text-xl font-bold mb-4">Trocar seus hábitos</h2>
                  <p className="mb-4 text-sm">86% dos nossos usuários que trocaram a navegação compulsiva em notícias negativas por sessões diárias de coaching transformaram sua mentalidade e assumiram o controle de suas finanças.</p>
                  <img src="https://assets.fnlfx.com/01JNRNK8RG99WV2EDA87Y0H0E0/5DicJu.webp" alt="Habits" className="w-full rounded-xl mb-6" />
                  <p className="mb-4 font-semibold text-slate-700">Com 2 a 3 horas diárias navegando na internet, você desperdiçará mais de 8 anos da sua vida.</p>
                  <p className="mb-6">Por que não redirecionar esse tempo para construir estabilidade financeira e crescimento espiritual?</p>
                  <Button fullWidth onClick={nextStep}>Quero saber mais !</Button>
              </StepLayout>
          )

      case 17:
          return (
              <StepLayout>
                  <h2 className="text-xl font-bold mb-4">Quando você se sente verdadeiramente realizado?</h2>
                  <p className="text-sm text-slate-500 mb-6">Selecione todas as opções aplicáveis.</p>
                  <div className="w-full space-y-3 mb-6">
                      {[
                          {l:'Conversar com pessoas que pensam como você.', i:Users}, {l:'Escrever ou fazer um diário', i:PenTool},
                          {l:'Caminhando na natureza', i:Sun}, {l:'Ouvir música', i:Bell}, {l:'Praticando a atenção plena', i:Heart},
                          {l:'Criar arte ou artesanato', i:PenTool}, {l:'Alcançar um grande objetivo', i:Rocket},
                          {l:'Exercitando-se', i:BatteryCharging}, {l:'Aprender algo novo', i:BookOpen}, {l:'Outro', i:HelpCircle}
                      ].map(opt => (
                          <Button 
                              key={opt.l} fullWidth variant={answers.fulfillment.includes(opt.l) ? 'primary' : 'option'} 
                              className="flex items-center gap-3" onClick={() => toggleSelection('fulfillment', opt.l)}
                          >
                              <opt.i size={20} /> {opt.l}
                          </Button>
                      ))}
                  </div>
                  <Button fullWidth onClick={nextStep}>Continuar</Button>
              </StepLayout>
          )

      case 18:
          return (
              <StepLayout>
                  <h2 className="text-xl font-bold mb-4">Existem erros ou pecados do passado que você sente que estão bloqueando sua felicidade e seu sucesso?</h2>
                  <img src="https://assets.fnlfx.com/01JNRNK8RG99WV2EDA87Y0H0E0/jkBJKh.webp" className="w-full h-auto rounded-xl mb-6" alt="Past" />
                  <div className="w-full space-y-3">
                      <Button fullWidth onClick={() => { updateAnswer('pastSins', 'Sim'); nextStep(); }}>Sim</Button>
                      <Button fullWidth variant="outline" onClick={() => { updateAnswer('pastSins', 'Não'); nextStep(); }}>Não</Button>
                  </div>
              </StepLayout>
          )

      case 19:
          return (
              <StepLayout>
                  <h2 className="text-xl font-bold mb-4">🙏 Obrigado por compartilhar</h2>
                  <p className="mb-4">Todos têm pecados, e isso é normal.</p>
                  <p className="mb-4 font-bold">O que importa é como você lida com eles.</p>
                  <p className="mb-6">Na Academia de Oração nosso Pastor Coach está pronto para ajudá-lo a se libertar da culpa, encontrar paz e desbloquear o crescimento financeiro.</p>
                  <img src="https://assets.fnlfx.com/01JJYMQ9ZT5P1Y7DQVTY4P34ZA/Lrn2ex.webp" className="w-full h-auto rounded-xl mb-6" alt="Pastor" />
                  <p className="italic text-slate-600 mb-6">“Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.” — 1 João 1:9</p>
                  <Button fullWidth onClick={nextStep}>Continuar</Button>
              </StepLayout>
          )

      case 20:
          return (
              <StepLayout>
                  <h2 className="text-xl font-bold mb-4">Você tem algum hábito que gostaria de abandonar?</h2>
                  <p className="text-sm text-slate-500 mb-6">Selecione todas as opções aplicáveis.</p>
                  <div className="w-full space-y-3 mb-6">
                      {[
                          {l:'Consumir álcool', i:AlertTriangle}, {l:'Uso excessivo de redes sociais', i:Smartphone},
                          {l:'Perder o sono', i:Clock}, {l:'Acumulação de dívidas', i:DollarSign}, {l:'Vício em pornografia', i:Shield},
                          {l:'Procrastinação', i:Clock}, {l:'Jogatina', i:AlertTriangle}, {l:'Alimentação não saudável', i:Heart},
                          {l:'Fumar', i:AlertTriangle}, {l:'Compras por impulso', i:ShoppingBag}, {l:'Relacionamentos tóxicos', i:Users},
                          {l:'Outro', i:HelpCircle}
                      ].map(opt => (
                          <Button key={opt.l} fullWidth variant={answers.badHabits.includes(opt.l) ? 'primary' : 'option'} className="flex items-center gap-3" onClick={() => toggleSelection('badHabits', opt.l)}>
                              <opt.i size={20} /> {opt.l}
                          </Button>
                      ))}
                  </div>
                  <Button fullWidth onClick={nextStep}>Continuar</Button>
              </StepLayout>
          )

      case 21:
          return (
              <StepLayout>
                  <h2 className="text-xl font-bold mb-4">O que te motiva a se aprimorar?</h2>
                  <div className="w-full space-y-3 mb-6">
                      {[
                          {l:'Alcançar meus objetivos', i:Rocket}, {l:'Sucesso pessoal', i:Star}, {l:'Carro dos sonhos', i:Rocket},
                          {l:'Casa própria', i:Home}, {l:'Viaje mais', i:Globe}, {l:'Crescimento na carreira', i:TrendingUp},
                          {l:'Impacto na comunidade', i:Users}, {l:'Outro', i:HelpCircle}
                      ].map(opt => (
                          <Button key={opt.l} fullWidth variant={answers.motivation.includes(opt.l) ? 'primary' : 'option'} className="flex items-center gap-3" onClick={() => toggleSelection('motivation', opt.l)}>
                              <opt.i size={20} /> {opt.l}
                          </Button>
                      ))}
                  </div>
                  <Button fullWidth onClick={nextStep}>Continuar</Button>
              </StepLayout>
          )

      case 22:
          return (
              <StepLayout>
                  <h2 className="text-xl font-bold mb-6">Quanto tempo você está disposto a dedicar ao seu crescimento financeiro e espiritual?</h2>
                  <div className="w-full space-y-3">
                      {['5 min/dia', '10 min/dia', '15 min/dia', '30 min/dia', 'Mais que 30 min'].map(opt => (
                          <Button key={opt} fullWidth variant="option" onClick={() => { updateAnswer('dedicationTime', opt); nextStep(); }}>{opt}</Button>
                      ))}
                  </div>
              </StepLayout>
          )

      case 23:
          return <LoadingScreen onComplete={nextStep} />;

      case 24:
          return <GraphScreen onNext={nextStep} />;

      case 25:
          return (
              <StepLayout>
                  <h1 className="text-3xl font-bold text-center mb-8">O teste terminou 🏆</h1>
                  <ChatScreen onNext={nextStep} />
              </StepLayout>
          );
      
      case 26:
          return <SalesPage answers={answers} />;

      default:
        return null;
    }
  };

  return (
    <div className="font-sans text-slate-900 selection:bg-accent selection:text-white">
      {renderStep()}
    </div>
  );
};

// Simple Icon Placeholders/Proxies for specific prompt requirements not in Lucide
const Video = Monitor; // Proxy
const User = Users; // Proxy
const Star = Users; // Proxy - Replaced in specific context or import from lucide

export default App;