import styled from 'styled-components'
import { memo } from 'react'
import { Bg } from '../../Utils'

const RenderPlant = memo(({ $position = 0, $coefX }) => {
		//console.log('RENDER PLANT');
		return (
				<StlPlant $position={$position} $coefX={$coefX}>
						<img src={Bg('plant', false)} alt='plant' />
				</StlPlant>
		)
})

const Plant = () => {
		return {
				render: (position, coefX) => <RenderPlant key='plant' $position={position} $coefX={coefX} />,
				milestones
		}
}

const milestones = []

const StlPlant = styled.div`
		bottom: -2%;
		left: -2%;
		width: 398px;
		rotate: 10deg;
		position: absolute;
		z-index: 5;
		img {
				width: 100%;
				transform: ${({ $position, $coefX }) => {
						const shiftX = -(35 - 50 * $coefX)
						const shiftY = 5 + 5 * $coefX
						const rotate = -5 * $coefX

						if ($coefX < 0.38) {
								return `translate(${shiftX}%, ${shiftY}%) rotate(${rotate}deg)`
						}

						return ``
				}};
				transition: transform 2s ease;
				z-index: 3;
		};
`

export { Plant }