import { createContext, useContext, useState } from 'react'

const ContactFormContext = createContext(null)

const ContactFormProvider = ({ children }) => {
		const [contactForm, setContactForm] = useState(false)
		const [formPosition, setFormPosition] = useState(0)

		const value = {
				formPosition,
				contactForm,
				setContactForm: display => {
						if (display) {
								let { scrollTop } = document.documentElement
								const containerHeight = document.getElementsByClassName('react-parallax')[0]?.clientHeight
								const maxScrollTop = containerHeight - 350
								if (scrollTop > maxScrollTop) scrollTop = maxScrollTop
								setFormPosition(scrollTop)
						}
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