export interface QuizState {
  gender: string;
  age: string;
  goal: string;
  challenges: string[];
  industry: string;
  alignedWithPurpose: string;
  workLifeBalance: string;
  incomeGoal: string;
  fearOfFailure: string;
  forgiveMistakes: string;
  quietMind: string;
  relaxHabit: string;
  socialTime: string;
  fulfillment: string[];
  pastSins: string;
  badHabits: string[];
  motivation: string[];
  dedicationTime: string;
}

export const INITIAL_STATE: QuizState = {
  gender: '',
  age: '',
  goal: '',
  challenges: [],
  industry: '',
  alignedWithPurpose: '',
  workLifeBalance: '',
  incomeGoal: '',
  fearOfFailure: '',
  forgiveMistakes: '',
  quietMind: '',
  relaxHabit: '',
  socialTime: '',
  fulfillment: [],
  pastSins: '',
  badHabits: [],
  motivation: [],
  dedicationTime: '',
};