import { createContext, useContext, useState } from 'react'

const ContactFormContext = createContext(null)

const ContactFormProvider = ({ children }) => {
		const [contactForm, setContactForm] = useState(false)
		const [formPosition, setFormPosition] = useState(0)
		const updateFormPosition = () => {
				let { scrollTop, clientHeight } = document.documentElement
				alert(`scrollTop: ${scrollTop}, clientHeight: ${clientHeight}`)
				const content = document.getElementsByClassName('react-parallax')[0]
				const contentHeight = content?.clientHeight || 0
				const maxScrollTop = contentHeight - clientHeight
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