import { createContext, useContext, useState } from 'react'

const AgeConfirmationContext = createContext(null)

const AgeConfirmationProvider = ({ children }) => {
		const [ageConfirmation, setAgeConfirmation] = useState(false)

		const value = {
				ageConfirmation,
				setAgeConfirmation: ageConfirmation => {
						setAgeConfirmation(ageConfirmation)
				}
		}

		return (
				<AgeConfirmationContext.Provider value={value}>
						{children}
				</AgeConfirmationContext.Provider>
		)
}

const useAgeConfirmationContext = () => {
		const context = useContext(AgeConfirmationContext)

		return context
}

export { AgeConfirmationContext, AgeConfirmationProvider, useAgeConfirmationContext }