import { createContext, useContext, useState } from 'react'

const ScreenContext = createContext(null)

const ScreenProvider = ({ children }) => {
		const { clientWidth, clientHeight, scrollTop } = document.documentElement
		const [screen, setScreen] = useState({
				width: clientWidth || 0,
				height: clientHeight || 0,
				scrollTop: scrollTop || 0
		})

		const value = {
				screen,
				setScreen: screen => {
						setScreen(screen)
				}
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