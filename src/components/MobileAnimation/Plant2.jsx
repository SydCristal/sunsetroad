import styled from 'styled-components'
import { memo } from 'react'
import { Bg } from '../../Utils'

const RenderPlant = memo(({ $position = 0, $coefX = 0 }) => {
		console.log('RENDER PLANT 2');
		return (
				<StlPlant $position={$position} $coefX={$coefX}>
						<img src={Bg('plant2', false)} alt='plant2' />
				</StlPlant>
		)
})

const Plant2 = () => {
		return {
				render: (position, coefX) => <RenderPlant key='plant2' $position={position} $coefX={coefX} />,
				milestones
		}
}

const milestones = []

const StlPlant = styled.div`
		bottom: -5%;
		right: -1%;
		width: 200px;
		rotate: -37deg;
		position: absolute;
		z-index: 4;
		img {
				width: 100%;
				transform: ${({ $position, $coefX }) => {
						let rotate = 0
						if ($coefX < 0.38) {
								rotate = 20 * (0.38 - ($coefX > 0.2 ? $coefX : 0.2))
								return `translate(15%, 5%) rotate(${rotate}deg)`
						}

						return ``
				}};
				transition: transform 2s ease;
				z-index: 3;
		};
`

export { Plant2 }