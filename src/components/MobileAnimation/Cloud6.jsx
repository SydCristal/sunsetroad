import styled from 'styled-components'
import { memo } from 'react'
import { Bg } from '../../Utils'

const RenderCloud = memo(({ $position = 0, $coefX = 0 }) => {
		//console.log('RENDER CLOUD 6');
		return (
				<StlCloud $position={$position} $coefX={$coefX}>
						<img src={Bg('cloud6', false)} alt='cloud6' />
				</StlCloud>
		)
})

const Cloud6 = () => {
		return {
				render: (position, coefX) => <RenderCloud key='cloud6' $position={position} $coefX={coefX} />,
				milestones
		}
}

const milestones = [630]

const StlCloud = styled.div`
		top: 68%;
  left: 55%;
  width: 230px;
		position: absolute;
		img {
				z-index: 1;
				transform: ${({ $position, $coefX }) => {
				let shiftX = 0
				let shiftY = 0
				let scale = 1
				if ($position > 0) {
						shiftX = 50 + (50 * $coefX)
						shiftY = 300
						scale = 0.75
				}
				return `translate(${shiftX}%, ${shiftY}%) scale(${scale})`
		}};
				transition: transform 2s ease;
				position: absolute;
		};
`

export { Cloud6 }