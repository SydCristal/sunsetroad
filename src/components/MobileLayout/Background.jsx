import styled from 'styled-components'
import { Landscape } from './'
import { useScrollTopContext } from '../../Contexts'
import MobileAnimation from '../MobileAnimation'

const Background = () => {
		const { scrollTop } = useScrollTopContext()

		console.log('RENDER BACKGROUND')

		return (
				<StlBackground>
						<MobileAnimation />
						<Landscape	/>
				</StlBackground>
		)
}

const StlBackground = styled.div`
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		overflow: hidden;
`

export { Background }