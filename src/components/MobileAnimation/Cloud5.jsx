import styled from 'styled-components'
import { memo } from 'react'
import { Bg } from '../../Utils'

const RenderCloud = memo(({ $position = 0 }) => {
		return (
				<StlCloud $position={$position}>
						<img src={Bg('cloud5', false)} alt='cloud5' />
				</StlCloud>
		)
})

const Cloud5 = () => {
		return {
				render: position => <RenderCloud key='cloud5' $position={position} />,
				milestones
		}
}

const milestones = [400, 750]

const StlCloud = styled.div`
		top: 35%;
  right: 75%;
  width: 280px;
		position: absolute;
		img {
				transform: ${({ $position }) => {
				let shiftX = 0
				let shiftY = 0
				let scale = 0.75
				if ($position > 1) {
						shiftX = -25
						shiftY = 750
						scale = 0.75
				} else if ($position > 0) {
						shiftX = 75
						shiftY = 300
						scale = 1
				}
				return `translate(${shiftX}%, ${shiftY}%) scale(${scale})`
		}};
				transition: transform 2s ease;
				position: absolute;
		};
`

export { Cloud5 }