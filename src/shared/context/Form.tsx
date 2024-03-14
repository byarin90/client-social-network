import React, { createContext, useContext, ReactNode, useState } from 'react';

// Utility function to create a form context and provider
export function createFormContext<T>() {

  type UpdateData = ((key: keyof T, value: any) => void) & ((data: Partial<T>) => void);

  type ContextValue = {
    formData: T;
    onChangeFormData: UpdateData
    clearFormData: () => void;
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

     const onChangeFormData: UpdateData = (keyOrData: keyof T | Partial<T>, value?: any) => {
      if (typeof keyOrData === 'string' || typeof keyOrData === 'number' || typeof keyOrData === 'symbol') {
        setFormData((prev) => ({
          ...prev,
          [keyOrData]: value,
        }));
      } else {
        const data = keyOrData as Partial<T>;
        setFormData((prev) => ({
          ...prev,
          ...data,
        }));
      }
    };

    const clearFormData = () => {
      setFormData(initialFormData); 
    };

    const value = { formData, onChangeFormData, clearFormData };

    return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
  };

  return { FormProvider, useForm };
}
