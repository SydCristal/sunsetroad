import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LanguageProvider, SectionProvider, AgeConfirmationProvider, ScreenProvider, ContactFormProvider } from './Contexts'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ScreenProvider>
      <AgeConfirmationProvider>
        <LanguageProvider>
          <SectionProvider>
            <ContactFormProvider>
              <App />
            </ContactFormProvider>
          </SectionProvider>
        </LanguageProvider>
      </AgeConfirmationProvider>
    </ScreenProvider>
  </React.StrictMode>
)
