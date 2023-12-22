import styled from 'styled-components'
import { memo } from 'react'
import { Bg } from '../../Utils'

const RenderCloud = memo(({ $position = 0 }) => {
		console.log('RENDER CLOUD 3');
		return (
				<StlCloud $position={$position}>
						<img src={Bg('cloud3', false)} alt='cloud3' />
				</StlCloud>
		)
})

const Cloud3 = () => {
		return {
				render: position => <RenderCloud key='cloud3' $position={position} />,
				milestones
		}
}

const milestones = [150, 200]

const StlCloud = styled.div`
		top: 10%;
  left: 70%;
  width: 350px;
		position: absolute;
		img {
				z-index: 3;
				transform: ${({ $position }) => {
				let shiftX = 0
				let shiftY = 0
				let scale = 1
				if ($position > 1) {
						shiftX = 20
						shiftY = 500
						scale = 0.75
				} else if ($position > 0) {
						shiftX = 40
						shiftY = 250
						scale = 0.825
				}
				return `translate(${shiftX}%, ${shiftY}%) scale(${scale})`
		}};
				transition: transform 2s ease;
				position: absolute;
		};
`

export { Cloud3 }