import { createContext, useContext, useState } from 'react'
import { C } from '../Utils'

const ScrollTopContext = createContext(null)

const ScrollTopProvider = ({ children }) => {
		const [scrollTop, setScrollTop] = useState(0)

		const value = {
				scrollTop,
				setScrollTop
		}

		return (
				<ScrollTopContext.Provider value={value}>
						{children}
				</ScrollTopContext.Provider>
		)
}

const useScrollTopContext = () => {
		const context = useContext(ScrollTopContext)

		return context
}

export { ScrollTopContext, ScrollTopProvider, useScrollTopContext }