import styled from 'styled-components'
import { memo } from 'react'
import	{ Bg } from '../../Utils'

const RenderSun = memo(({ $position = 0 }) => {
		//console.log('RENDER SUN');
		return (
				<StlSun $position={$position}>
						<img src={Bg('sun', false)} alt='sun' />
				</StlSun>
		)
})

const Sun = () => {
		return {
				render: position => <RenderSun key='sun' $position={position} />,
				milestones
		}
}

const milestones = [630]

const StlSun = styled.div`
		bottom: 535px;
		width: 100px;
		left: 50%;
		height: 92px;
		position: absolute;
		img {
			transform: translateY(${({ $position }) => $position * 340}%);
			transition: transform 2s ease;
		};
`

export { Sun }