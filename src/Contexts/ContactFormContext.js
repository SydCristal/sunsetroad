﻿import { createContext, useContext, useState } from 'react'

const ContactFormContext = createContext(null)

const ContactFormProvider = ({ children }) => {
		const [contactForm, setContactForm] = useState(false)
		const [formPosition, setFormPosition] = useState(0)
		const updateFormPosition = update => {
				if (!contactForm && !update) return setFormPosition(formPosition)
				let { scrollTop, clientHeight } = document.documentElement
				const content = document.getElementsByClassName('react-parallax')[0]
				const contentHeight = content?.clientHeight || 0
				const maxScrollTop = contentHeight - clientHeight
				if ((contactForm && scrollTop == 0) || scrollTop > maxScrollTop) {
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
						updateFormPosition(true)
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