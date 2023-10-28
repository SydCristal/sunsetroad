import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LanguageProvider, SectionProvider, AgeConfirmationProvider, ScaleProvider, ContactFormProvider } from './Contexts'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ScaleProvider>
      <AgeConfirmationProvider>
        <LanguageProvider>
          <SectionProvider>
            <ContactFormProvider>
              <App />
            </ContactFormProvider>
          </SectionProvider>
        </LanguageProvider>
      </AgeConfirmationProvider>
    </ScaleProvider>
  </React.StrictMode>
)
