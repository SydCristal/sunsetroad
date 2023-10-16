import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LanguageProvider, SectionProvider, AgeConfirmationProvider } from './Contexts'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <AgeConfirmationProvider>
      <LanguageProvider>
        <SectionProvider>
          <App />
        </SectionProvider>
      </LanguageProvider>
    </AgeConfirmationProvider>
  </React.StrictMode>
)
