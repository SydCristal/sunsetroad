import styled from 'styled-components'
import { memo } from 'react'
import { Bg } from '../../Utils'

const RenderCloud = memo(({ $position = 0 }) => {
		return (
				<StlCloud $position={$position}>
						<img src={Bg('cloud2', false)} alt='cloud2' />
				</StlCloud>
		)
})

const Cloud2 = () => {
		return {
				render: position => <RenderCloud key='cloud2' $position={position} />,
				milestones
		}
}

const milestones = [125]

const StlCloud = styled.div`
		top: 7%;
  right: 70%;
  width: 390px;
		position: absolute;
		img {
				z-index: 3;
				transform: ${({ $position }) => {
				let shiftX = 0
				let shiftY = 0
				let scale = 1
				if ($position > 0) {
						shiftX = -20
						shiftY = 250
						scale = 0.75
				}
				return `translate(${shiftX}%, ${shiftY}%) scale(${scale})`
		}};
				transition: transform 2s ease;
				position: absolute;
		};
`

export { Cloud2 }