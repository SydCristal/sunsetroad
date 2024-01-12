import styled from 'styled-components'
import { Bg, C } from '../../Utils'

const Sky = props => {
		return (
				<StlSky>
						<SkyContainer>
								<img src={Bg('sky', false, 'jpg')} alt='sky' />
						</SkyContainer>
				</StlSky>
		)
}

const StlSky = styled.div`
		${C.isDesktop} {
				display: none;
		};
		width: 100%;
		height: 100vh;
		position: absolute;
		transform-style: preserve-3d;
		display: contents;
`

const SkyContainer = styled.div`
		width: 100%;
		position: absolute;
		top: 125px;
		right: 0;
		left: 0;
		transform: translateZ(-1.5px) scale(1.75);
		z-index: -1;
		${C.isHorizontal} {
				top: auto;
		};
`

export { Sky }