import styled from 'styled-components'
import { memo } from 'react'
import { Bg } from '../../Utils'

const RenderCloud = memo(({ $position = 0 }) => {
		return (
				<StlCloud $position={$position}>
						<img src={Bg('cloud', false)} alt='cloud' />
				</StlCloud>
		)
})

const Cloud = () => {
		return {
				render: position => <RenderCloud key='cloud' $position={position} />,
				milestones
		}
}

const milestones = [100, 200]

const StlCloud = styled.div`
		top: -5px;
		width: 228px;
		right: 25%;
		position: absolute;
		img {
				z-index: 3;
				transform: ${({ $position }) => {
						let shiftX = 0
						let shiftY = 0
						let scale = 1
						if ($position > 1) {
								shiftX = 100
								shiftY = 250
								scale = 0.75
						} else if ($position > 0) {
								shiftX = 50
								shiftY = 125
								scale = 0.825
						}
						return `translate(${shiftX}%, ${shiftY}%) scale(${scale})`
				}};
				transition: transform 2s ease;
				position: absolute;
		};
`

export { Cloud }