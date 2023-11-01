import { createContext, useContext, useState } from 'react'

const ContactFormContext = createContext(null)

const ContactFormProvider = ({ children }) => {
		const [contactForm, setContactForm] = useState(false)
		const [formPosition, setFormPosition] = useState(0)
		const updateFormPosition = update => {
				if (!contactForm && !update) return
				let { scrollTop } = document.documentElement
				const content = document.getElementsByClassName('react-parallax')[0]
				console.log('content: ', content);
				const contentHeight = content?.clientHeight || 0
				console.log('contentHeight: ', contentHeight);
				const container = content?.parentElement
				console.log('container: ', container);
				const containerHeight = container?.client || 0
				console.log('containerHeight: ', containerHeight);
				const maxScrollTop = contentHeight - containerHeight
				console.log('maxScrollTop: ', maxScrollTop);
				if (scrollTop == 0 || scrollTop > maxScrollTop) {
						scrollTop = maxScrollTop
				}

				setFormPosition(scrollTop)
				window.scrollTo(0, scrollTop)
		}

		const value = {
				formPosition,
				contactForm,
				updateFormPosition: () => { contactForm && updateFormPosition() },
				setContactForm: display => {
						updateFormPosition(display)
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