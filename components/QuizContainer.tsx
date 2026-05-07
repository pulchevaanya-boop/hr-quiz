'use client';

import { useState, useEffect } from 'react';
import quizData from '../data/quiz.json';
import { useQuizState } from '../hooks/useQuizState';
import { ProgressBar } from './ProgressBar';
import { Question } from './Question';
import { Results, DiagnosticResult } from './Results';

export function QuizContainer() {
  const { state, isLoaded, selectBusinessType, selectStage, selectBranch, answerQuestion, completeQuiz, resetQuiz, restartBranch } = useQuizState();
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  // Business type color mapping
  const branchColors = {
    flow: '#8B3A42',
    conversion: '#1E3A5F',
    retention: '#2D5A3D',
  };

  const branchColor = state.branch ? branchColors[state.branch] : '#8B3A42';
  const businessTypeName = state.businessType ? quizData.businessTypes[state.businessType as keyof typeof quizData.businessTypes]?.name : '';

  // Load current question
  useEffect(() => {
    if (!isLoaded) return;

    const qId = state.currentQuestionId;

    // Handle initial questions
    if (qId === 'Q' || qId === 'Q1') {
      const initQuestions = quizData.initialQuestions;
      const q = initQuestions.find((q) => q.id === qId);
      setCurrentQuestion(q);
      setCurrentQuestionIndex(initQuestions.findIndex((q) => q.id === qId));
      setQuestionCount(initQuestions.length);
      return;
    }

    // Handle branch selection
    if (qId === 'branch-selection') {
      setCurrentQuestion(quizData.branchSelection);
      setQuestionCount(1);
      return;
    }

    // Handle branch questions
    if (state.branch) {
      const branchData = quizData.branches[state.branch];
      if (!branchData) return;

      const q = branchData.questions.find((q) => q.id === qId);
      if (q) {
        setCurrentQuestion(q);
        setCurrentQuestionIndex(branchData.questions.findIndex((q) => q.id === qId));
        setQuestionCount(branchData.questions.length);
        return;
      }
    }

    // Handle results
    if (qId in quizData.diagnosticResults) {
      const res = quizData.diagnosticResults[qId as keyof typeof quizData.diagnosticResults];
      setResult(res as DiagnosticResult);
      setCurrentQuestion(null);
      completeQuiz(qId);
      return;
    }
  }, [state.currentQuestionId, state.branch, isLoaded, completeQuiz]);

  if (!isLoaded) {
    return <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Загрузка...</div>;
  }

  // Show results
  if (result) {
    return (
      <div style={{ padding: '40px 20px' }}>
        <Results
          result={result}
          branchColor={branchColor}
          businessType={businessTypeName}
          onRestart={() => {
            setResult(null);
            resetQuiz();
          }}
        />
      </div>
    );
  }

  // Show current question
  if (!currentQuestion) {
    return <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Загрузка вопроса...</div>;
  }

  const handleAnswer = (answer: string, nextQuestionId: string) => {
    // Handle initial questions
    if (state.currentQuestionId === 'Q') {
      selectBusinessType(answer);
      answerQuestion(state.currentQuestionId, answer, 'Q1');
      return;
    }

    if (state.currentQuestionId === 'Q1') {
      selectStage(answer);
      answerQuestion(state.currentQuestionId, answer, 'branch-selection');
      return;
    }

    // Handle branch selection
    if (state.currentQuestionId === 'branch-selection') {
      selectBranch(answer as 'flow' | 'conversion' | 'retention');
      const branchStartQuestions: Record<string, string> = {
        flow: 'F1',
        conversion: 'C1',
        retention: 'R1',
      };
      const branchStartQuestion = branchStartQuestions[answer] || 'F1';
      answerQuestion(state.currentQuestionId, answer, branchStartQuestion);
      return;
    }

    // Handle yes/no logic
    if (currentQuestion.type === 'yesno') {
      if (answer === 'yes' && currentQuestion.nextQuestions?.yes) {
        answerQuestion(state.currentQuestionId, answer, currentQuestion.nextQuestions.yes);
      } else if (answer === 'no' && currentQuestion.nextQuestions?.no) {
        answerQuestion(state.currentQuestionId, answer, currentQuestion.nextQuestions.no);
      }
      return;
    }

    // Handle select - nextQuestionId is passed from button click
    answerQuestion(state.currentQuestionId, answer, nextQuestionId);
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px 20px',
      backgroundColor: '#F5F5F5',
    }}>
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '40px 32px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '8px',
          }}>
            Диагностика бизнеса
          </h1>
          <p style={{
            fontSize: '15px',
            color: '#999',
          }}>
            Узнайте, что мешает вашему росту
          </p>
        </div>

        {/* Progress */}
        {state.branch && <ProgressBar current={currentQuestionIndex + 1} total={questionCount} branch={state.branch} />}

        {/* Current Question */}
        <Question
          id={currentQuestion.id}
          text={currentQuestion.text}
          type={currentQuestion.type}
          options={currentQuestion.options}
          onAnswer={handleAnswer}
          branchColor={branchColor}
        />
      </div>
    </div>
  );
}
