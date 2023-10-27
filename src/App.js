import Layout from './components/Layout'
import styled from 'styled-components'
import { useAgeConfirmationContext, useScaleContext } from './Contexts'
import { AgeFilter, ContactForm } from './components/Modals'
import { useLayoutEffect } from 'react'

const StlApp = styled.div.attrs(({ $height }) => {
		return {
				style: {
						minHeight: `100%`,
						height: '100%'
				}
		}
})``

const AdultContent = styled.div`
		${({ $blur }) => {
		if (!$blur) return `
				min-height: 100%;
		`

		return `
				filter: blur(${$blur}px);
				-webkit-filter: blur(${$blur}px);
				-moz-filter: blur(${$blur}px);
				-o-filter: blur(${$blur}px);
				-ms-filter: blur(${$blur}px);
				height: 100%;
				min-height: 100%;
				overflow: hidden;
				> div {
						height: 100%;
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

		window.addEventListener('resize', debounce(() => {
				setScale({ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight })
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
