import { createContext, useContext, useState } from 'react'

const ContactFormContext = createContext(null)

const ContactFormProvider = ({ children }) => {
		const [contactForm, setContactForm] = useState(false)
		const [formPosition, setFormPosition] = useState(0)
		const updateFormPosition = () => {
				let { scrollTop } = document.documentElement
				const content = document.getElementsByClassName('react-parallax')[0]
				const contentHeight = content?.clientHeight || 0
				console.log(contentHeight);
				const container = content?.parentElement
				console.log(container);
				const containerHeight = container?.offsetHeight || 0
				console.log(containerHeight);
				const maxScrollTop = contentHeight - containerHeight
				console.log(maxScrollTop);
				if (scrollTop == 0 || scrollTop > maxScrollTop) {
						scrollTop = maxScrollTop
				}

				setFormPosition(scrollTop)
		}

		const value = {
				formPosition,
				contactForm,
				updateFormPosition: () => { contactForm && updateFormPosition() },
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