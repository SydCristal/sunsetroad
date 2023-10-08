import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LanguageProvider, SectionProvider } from './Contexts'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <LanguageProvider>
      <SectionProvider>
        <App />
      </SectionProvider>
    </LanguageProvider>
  </React.StrictMode>
)