import i18next from 'i18next'
import React, { createContext, useContext, useState, useEffect } from 'react'

enum Direction {
  RTL = 'rtl',
  LTR = 'ltr'
}

const LanguageContext = createContext<{
  language: string
  direction?: Direction
  changeLanguage: (lang: string) => void
}>({
  language: i18next.language,
  direction: Direction.LTR,
  changeLanguage: () => { }
})

export function useLanguage() {
  return useContext(LanguageContext)
}

export function LanguageProvider({ children }: React.PropsWithChildren<object>): JSX.Element {

  const [currLang, setLang] = useState(i18next.language)

  const changeLanguage = async (lang: string): Promise<void> => {
    localStorage.setItem('selected_language', lang)
    setLang(lang)
    await i18next.changeLanguage(lang)
  }

  useEffect(() => {
    changeLanguage(localStorage.getItem('selected_language') ?? 'he')
  }, [])
  const dir = currLang === 'he' ? Direction.RTL : Direction.LTR

  return (
    <LanguageContext.Provider
      value={{
        language: currLang,
        changeLanguage,
        direction: dir 
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
