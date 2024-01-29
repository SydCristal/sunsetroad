import styled from 'styled-components'
import { memo } from 'react'
import { Bg } from '../../Utils'

const RenderPalm = memo(({ $position = 0, $coefX = 0 }) => {
		return (
				<StlPalm $position={$position} $coefX={$coefX}>
						<img src={Bg('palm2', false)} alt='palm2' />
				</StlPalm>
		)
})

const Palm2 = () => {
		return {
				render: (position, coefX) => <RenderPalm key='palm2' $position={position} $coefX={coefX} />,
				milestones
		}
}

const milestones = [780]

const StlPalm = styled.div`
		bottom: 675px;
  left: 70%;
  width: 200px;
		rotate: 5deg;
		position: absolute;
		z-index: 4;
		img {
				width: 100%;
				transform: ${({ $position, $coefX }) => {
						let shiftX = -90 + 30 * (1 - $coefX)
						let shiftY = 5
						let scale = 0.75
						let rotate = -30 - (15 * $coefX)

						if ($position > 0) {
								shiftX = 0//65
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

export { Palm2 }