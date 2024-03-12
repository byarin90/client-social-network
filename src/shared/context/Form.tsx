import React, { createContext, useContext, ReactNode, useState } from 'react';

// Utility function to create a form context and provider
export function createFormContext<T>() {
  type ContextValue = {
    formData: T;
    onChangeFormData: (key: keyof T, value: any) => void;
  };

  const FormContext = createContext<ContextValue | null>(null);

  const useForm = (): ContextValue => {
    const context = useContext(FormContext);
    if (!context) {
      throw new Error('useForm must be used within its corresponding FormProvider');
    }
    return context;
  };

  interface FormProviderProps {
    children: ReactNode;
    initialFormData: T;
  }

  const FormProvider: React.FC<FormProviderProps> = ({ children, initialFormData }) => {
    const [formData, setFormData] = useState<T>(initialFormData);

    const onChangeFormData = (key: keyof T, value: any) => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

    const value = { formData, onChangeFormData };

    return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
  };

  return { FormProvider, useForm };
}
