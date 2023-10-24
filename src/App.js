import Layout from './components/Layout'
import styled from 'styled-components'
import { useAgeConfirmationContext, useScaleContext } from './Contexts'
import { AgeFilter } from './components/Layout'
import { useLayoutEffect } from 'react'

const StlApp = styled.div`
`

const AdultContent = styled.div`
		${({ $blur, $height }) => {
		if (!$blur) return `
				height: 100%;
				min-height: 100%;
		`

		const height = $blur ? $height : 0

		return `
				filter: blur(${$blur}px);
				-webkit-filter: blur(${$blur}px);
				-moz-filter: blur(${$blur}px);
				-o-filter: blur(${$blur}px);
				-ms-filter: blur(${$blur}px);
				height: ${height}px;
				overflow: hidden;
				> div {
						height: ${height}px;
				};
				header > div {
						opacity: 0;
				};
				footer > div > a {
						opacity: 0;
				};	
`}}`

function App() {
		const { ageConfirmation } = useAgeConfirmationContext()
		const { scale, setScale } = useScaleContext()
		if (!ageConfirmation) window.scrollTo(0, 0)

		const debounce = f => {
				let timer
				return e => {
						if (timer) clearTimeout(timer)
						timer = setTimeout(f, 100, e)
				}
		}

		useLayoutEffect(debounce(() => {
				const { clientHeight, clientWidth } = document.documentElement
				console.log(clientHeight, clientWidth);
				setScale({ width: clientWidth, height: clientHeight })
		}), [document.documentElement.clientHeight, document.documentElement.clientWidth])

		window.addEventListener('resize', debounce(() => {
				const { clientWidth, clientHeight } = document.documentElement
				console.log(document.documentElement);
				setScale({ width: clientWidth, height: clientHeight })
		}))

		return (
				<StlApp $height={scale.height} >
						<AgeFilter opacity={ageConfirmation ? 0 : 1} />
						<AdultContent $blur={ageConfirmation ? 0 : 5} $height={scale.height}>
								<Layout  />
						</AdultContent>
				</StlApp>
		)
}

export default App
