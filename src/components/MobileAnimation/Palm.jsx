import styled from 'styled-components'
import { memo } from 'react'
import { Bg } from '../../Utils'

const RenderPalm = memo(({ $position = 0, $coefX = 0 }) => {
		console.log('RENDER PALM');
		return (
				<StlPalm $position={$position} $coefX={$coefX}>
						<img src={Bg('palm', false)} alt='palm' />
				</StlPalm>
		)
})

const Palm = () => {
		return {
				render: (position, coefX) => <RenderPalm key='palm' $position={position} $coefX={coefX} />,
				milestones
		}
}

const milestones = [780]

const StlPalm = styled.div`
		bottom: 610px;
  right: 65%;
  width: 200px;
		rotate: 10deg;
		position: absolute;
		z-index: 4;
		img {
				width: 100%;
				transform: ${({ $position, $coefX }) => {
						//let shiftX = 100 + (60 * $coefX)
						//let shiftY = -10 * $coefX
						//let scale = 0.75
						//let rotate = 25 + (10 * $coefX)

						let shiftX = 115 + (60 * $coefX)
						let shiftY = -1 * $coefX
						let scale = 0.85
						let rotate = 14 + (10 * $coefX)

						if ($position > 0) {
								shiftX = 0
								shiftY = 0
								scale = 1
								rotate = 0
						}

						return `translate(${shiftX}%, ${shiftY}%) scale(${scale}) rotate(${rotate}deg)`
				}};
				transition: transform 2s ease;
				position: absolute;
		};
`

export { Palm }