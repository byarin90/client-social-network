import './App.css'
import { LanguageProvider } from './shared/context/LanguageContext'
import ThemeProvider from './shared/utils/ThemeProvider'
import MainRouter from './shared/routes/MainRouter'
import { QueryClientProvider } from 'react-query'
import queryClient from './shared/services/queryClient'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider>
          <MainRouter />
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  )
}

export default App
