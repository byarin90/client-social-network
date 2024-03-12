import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StepperProps {
  step: number;
  setStep: (value: number) => void;
  increment: () => void;
  decrement: () => void;
  goBack: () => void;
}

const StepperContext = createContext<StepperProps | undefined>(undefined);

export function useStepper(): StepperProps {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepper must be used within a StepperProvider');
  }
  return context;
}

export const StepperProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [step, setStep] = useState(1);
  const [previousSteps, setPreviousSteps] = useState<number[]>([]);

  const changeStep = (newStep: number): void => {
    if (newStep < 1 || newStep === step) return;

    setPreviousSteps((prev) => [...prev, step]);
    setStep(newStep);
  };

  const increment = (): void => {
    changeStep(step + 1);
  };

  const decrement = (): void => {
    changeStep(step - 1);
  };

  const goBack = (): void => {
    if (!previousSteps.length) return;

    setPreviousSteps((prev) => {
      const prevStepsCopy = [...prev];
      const stepToReturnTo = prevStepsCopy.pop();
      setStep(stepToReturnTo as number);
      return prevStepsCopy;
    });
  };

  const value = { step, setStep: changeStep, increment, decrement, goBack };

  return <StepperContext.Provider value={value}>{children}</StepperContext.Provider>;
};

