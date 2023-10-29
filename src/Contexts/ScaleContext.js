import { createContext, useContext, useState } from 'react'

const ScaleContext = createContext(null)

const ScaleProvider = ({ children }) => {
		const { clientWidth, clientHeight } = document.documentElement
		const [scale, setScale] = useState({ width: clientWidth || 0, height: clientHeight || 0 })

		const value = {
				scale,
				setScale: scale => {
						setScale(scale)
				}
		}

		return (
				<ScaleContext.Provider value={value}>
						{children}
				</ScaleContext.Provider>
		)
}

const useScaleContext = () => {
		const context = useContext(ScaleContext)

		return context
}

export { ScaleContext, ScaleProvider, useScaleContext }