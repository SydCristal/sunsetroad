import { createContext, useContext, useState } from 'react'

const ContactFormContext = createContext(null)

const ContactFormProvider = ({ children }) => {
		const [contactForm, setContactForm] = useState(false)
		const [formPosition, setFormPosition] = useState(0)
		const updateFormPosition = clientHeight => {
				if (!clientHeight) clientHeight = document.documentElement.clientHeight
				let { scrollTop } = document.documentElement
				const content = document.getElementsByClassName('react-parallax')[0]
				const contentHeight = content?.clientHeight || 0
				const maxScrollTop = contentHeight - clientHeight
				setTimeout(() => alert(`clientHeight: ${clientHeight}, contentHeight: ${contentHeight}, scrollTop: ${scrollTop}`), 1)
				if ((scrollTop == 0) || scrollTop > maxScrollTop) {
						scrollTop = maxScrollTop
				}

				setFormPosition(scrollTop)
		}

		const value = {
				formPosition,
				contactForm,
				updateFormPosition,
				setContactForm: display => {
						setContactForm(display)
						updateFormPosition()
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