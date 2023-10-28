import { createContext, useContext, useState } from 'react'

const ContactFormContext = createContext(null)

const ContactFormProvider = ({ children }) => {
		const [contactForm, setContactForm] = useState(false)
		const [scrollTop, setScrollTop] = useState(0)

		const value = {
				scrollTop,
				contactForm,
				setContactForm: display => {
						const newScrollTop = document.documentElement.scrollTop
						if (newScrollTop) setScrollTop(newScrollTop)
						setContactForm(display)
				},
		}

		return (
				<ContactFormContext.Provider value={value}>
						{children}
				</ContactFormContext.Provider>
		)
}

const useContactFormContext = () => {
		const context = useContext(ContactFormContext)

		return context
}

export { ContactFormContext, ContactFormProvider, useContactFormContext }