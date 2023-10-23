import Layout from './components/Layout'
import styled from 'styled-components'
import { useAgeConfirmationContext, useScaleContext } from './Contexts'
import { AgeFilter } from './components/Layout'

const StlApp = styled.div`
		min-height: 715px;
		height: 100%;
`

const AdultContent = styled.div`
		${({ $blur, $height }) => {
		if (!$blur) return ''
		return `
				filter: blur(${$blur}px);
				-webkit-filter: blur(${$blur}px);
				-moz-filter: blur(${$blur}px);
				-o-filter: blur(${$blur}px);
				-ms-filter: blur(${$blur}px);
				height: ${$blur ? $height : 0}px;
				overflow: hidden;
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
				const { clientWidth, clientHeight  } = document.documentElement
				setScale({ width: clientWidth, height: clientHeight })
		}))
		console.log(scale.height);

		return (
				<StlApp>
						<AgeFilter opacity={ageConfirmation ? 0 : 1} />
						<AdultContent $blur={ageConfirmation ? 0 : 5} $height={scale.height}>
								<Layout />
						</AdultContent>
				</StlApp>
		)
}

export default App
