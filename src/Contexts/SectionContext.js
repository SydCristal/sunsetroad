import { createContext, useContext, useState } from 'react'

const SectionContext = createContext(null)
const sections = ['products', 'partners', 'info']

const SectionProvider = ({ children }) => {
		const [section, setSection] = useState(localStorage.getItem('section') || 'products')
		let desktopLayout

		const value = {
				section,
				setSection: newSection => {
						if (!desktopLayout) desktopLayout = document.getElementById('desktop-layout')
						const layoutClasses = desktopLayout.classList
						if (layoutClasses.contains('transitioning')) return
						const newLayoutClasses = [...layoutClasses, ...sections, 'transitioning'].filter(c => c === newSection || !sections.includes(c)).join(' ')
						desktopLayout.className = newLayoutClasses
						localStorage.setItem('section', newSection)
						setSection(newSection)
						setTimeout(() => desktopLayout.classList.remove('transitioning'), 500)
				}
		}

		return (
				<SectionContext.Provider value={value}>
						{children}
				</SectionContext.Provider>
		)
}

const useSectionContext = () => {
		const context = useContext(SectionContext)

		return context
}

export { SectionContext, SectionProvider, useSectionContext }