import { createContext, useContext, useState } from 'react'

const ContactFormContext = createContext(null)

const ContactFormProvider = ({ children }) => {
		const [contactForm, setContactForm] = useState(false)
		const [formPosition, setFormPosition] = useState(0)
		const updateFormPosition = () => {
				let { scrollTop } = document.documentElement
				const content = document.getElementsByClassName('react-parallax')[0]
				const contentHeight = content?.clientHeight || 0
				const containerHeight = content?.parentElement?.clientHeight || 0
				const maxScrollTop = contentHeight - 350
				if (scrollTop == 0) scrollTop = contentHeight - containerHeight
				if (scrollTop > maxScrollTop) scrollTop = maxScrollTop
				setFormPosition(scrollTop)
		}

		const value = {
				formPosition,
				contactForm,
				updateFormPosition,
				setContactForm: display => {
						if (display) updateFormPosition()
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