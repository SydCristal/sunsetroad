import styled from 'styled-components'
import { memo } from 'react'
import { Bg } from '../../Utils'

const RenderPalm = memo(({ $position = 0, $coefX = 0 }) => {
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
		bottom: 650px;
  right: 68%;
  width: 200px;
		rotate: -5deg;
		position: absolute;
		z-index: 4;
		img {
				width: 100%;
				transform: ${({ $position, $coefX }) => {
						let shiftX = 45 + (60 * $coefX)
						let shiftY = 8 + -1 * $coefX
						let scale = 0.85
						let rotate = 25 + (10 * $coefX)

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