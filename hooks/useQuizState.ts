import { useState, useEffect } from 'react';

export interface QuizState {
  businessType: string | null;
  stage: string | null;
  branch: 'flow' | 'conversion' | 'retention' | null;
  answers: Record<string, string>;
  currentQuestionId: string;
  resultTag: string | null;
  completedAt: number | null;
}

const INITIAL_STATE: QuizState = {
  businessType: null,
  stage: null,
  branch: null,
  answers: {},
  currentQuestionId: 'Q',
  resultTag: null,
  completedAt: null,
};

const STORAGE_KEY = 'hireflow-quiz-state';

export function useQuizState() {
  const [state, setState] = useState<QuizState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setState(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to load quiz state:', e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isLoaded]);

  const updateState = (partial: Partial<QuizState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  };

  const answerQuestion = (questionId: string, answer: string, nextQuestionId: string) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
      currentQuestionId: nextQuestionId,
    }));
  };

  const selectBusinessType = (type: string) => {
    setState((prev) => ({
      ...prev,
      businessType: type,
    }));
  };

  const selectStage = (stage: string) => {
    setState((prev) => ({
      ...prev,
      stage,
    }));
  };

  const selectBranch = (branch: 'flow' | 'conversion' | 'retention') => {
    setState((prev) => ({
      ...prev,
      branch,
    }));
  };

  const completeQuiz = (resultTag: string) => {
    setState((prev) => ({
      ...prev,
      resultTag,
      completedAt: Date.now(),
    }));
  };

  const resetQuiz = () => {
    setState(INITIAL_STATE);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const restartBranch = () => {
    setState((prev) => ({
      ...prev,
      answers: {},
      resultTag: null,
      completedAt: null,
      currentQuestionId: 'Q1',
    }));
  };

  return {
    state,
    isLoaded,
    updateState,
    answerQuestion,
    selectBusinessType,
    selectStage,
    selectBranch,
    completeQuiz,
    resetQuiz,
    restartBranch,
  };
}
