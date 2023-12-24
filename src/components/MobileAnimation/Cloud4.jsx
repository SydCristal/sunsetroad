import styled from 'styled-components'
import { memo } from 'react'
import { Bg } from '../../Utils'

const RenderCloud = memo(({ $position = 0 }) => {
		console.log('RENDER CLOUD 4')
		return (
				<StlCloud $position={$position}>
						<img src={Bg('cloud4', false)} alt='cloud4' />
				</StlCloud>
		)
})

const Cloud4 = () => {
		return {
				render: position => <RenderCloud key='cloud4' $position={position} />,
				milestones
		}
}

const milestones = [450, 800]

const StlCloud = styled.div`
		top: 32%;
  left: 60%;
  width: 420px;
		position: absolute;
		img {
				transform: ${({ $position }) => {
				let shiftX = 0
				let shiftY = 0
				let scale = 0.75
				if ($position > 1) {
						shiftX = 20
						shiftY = 700
						scale = 0.75
				} else if ($position > 0) {
						shiftX = -50
						shiftY = 250
						scale = 1
				}
				return `translate(${shiftX}%, ${shiftY}%) scale(${scale})`
		}};
				transition: transform 2s ease;
				position: absolute;
		};
`

export { Cloud4 }