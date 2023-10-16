import Layout from './components/Layout'
import styled from 'styled-components'
import { useAgeConfirmationContext } from './Contexts'
import { AgeFilter as MobileAgeFilter } from './components/Mobile'

const StlApp = styled.div``

const AgeConfirmationDialog = styled.div`
		position: absolute;
  right: 0;
  top: 0;
  padding: 25px 40px;
		z-index: 1;
`

const AdultContent = styled.div`
		${({ $blur }) => {
		if (!$blur) return ''
		return `
				filter: blur(${$blur}px);
				-webkit-filter: blur(${$blur}px);
				-moz-filter: blur(${$blur}px);
				-o-filter: blur(${$blur}px);
				-ms-filter: blur(${$blur}px);
				height: 100vh;
				overflow: hidden;
				header {
						opacity: 0;
				};
				main {
					 opacity: 0;
				};
				footer {
						opacity: 0;
				};
`}}`

function App() {
		const { ageConfirmation } = useAgeConfirmationContext()

		return (
				<StlApp>
						<MobileAgeFilter />
						<AdultContent $blur={ageConfirmation ? 0 : 5}>
								<Layout />
						</AdultContent>
				</StlApp>
		)
}

export default App
