import Layout from './components/Layout'
import styled from 'styled-components'
import { useAgeConfirmationContext } from './Contexts'
import { AgeFilter as MobileAgeFilter } from './components/Mobile'
import { useState } from 'react'

const StlApp = styled.div``

const AdultContent = styled.div`
		${({ $blur }) => {
		if (!$blur) return ''
		return `
				filter: blur(${$blur}px);
				-webkit-filter: blur(${$blur}px);
				-moz-filter: blur(${$blur}px);
				-o-filter: blur(${$blur}px);
				-ms-filter: blur(${$blur}px);
				height: ${$blur ? 100 : 0}vh;
				overflow: hidden;
				header {
						opacity: 0;
				};
				footer {
						opacity: 0;
				};
`}}`

function App() {
		const { ageConfirmation } = useAgeConfirmationContext()
		const [width, setWidth] = useState(document.documentElement.clientWidth)
		const [height, setHeight] = useState(document.documentElement.clientHeight)

		window.addEventListener('resize', () => {
				setWidth(document.documentElement.clientWidth)
				setHeight(document.documentElement.clientHeight)
		})

		return (
				<StlApp>
						<MobileAgeFilter opacity={ageConfirmation ? 0 : 1} />
						<AdultContent $blur={ageConfirmation ? 0 : 5}>
								<Layout />
						</AdultContent>
				</StlApp>
		)
}

export default App
