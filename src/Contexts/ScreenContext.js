import { createContext, useContext, useState } from 'react'

const ScreenContext = createContext(null)

const ScreenProvider = ({ children }) => {
		const [screenWidth, setScreenWidth] = useState(document.documentElement.clientWidth)

		const value = {
				screenWidth,
				setScreenWidth
		}

		return (
				<ScreenContext.Provider value={value}>
						{children}
				</ScreenContext.Provider>
		)
}

const useScreenContext = () => {
		const context = useContext(ScreenContext)

		return context
}

export { ScreenContext, ScreenProvider, useScreenContext }