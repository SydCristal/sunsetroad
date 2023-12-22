import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LanguageProvider, SectionProvider, ScreenProvider, ModalProvider, ScrollTopProvider } from './Contexts'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
		<React.StrictMode>
				<ScreenProvider>
						<ModalProvider>
								<LanguageProvider>
										<SectionProvider>
												<ScrollTopProvider>
														<App />
												</ScrollTopProvider>
										</SectionProvider>
								</LanguageProvider>
						</ModalProvider>
				</ScreenProvider>
		</React.StrictMode>
)