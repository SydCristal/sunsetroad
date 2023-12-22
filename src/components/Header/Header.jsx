import styled from 'styled-components'
import { Navigation } from './'
import { C } from '../../Utils'

const Header = () => {
		console.log('RENDER DESKTOP HEADER')

		return (
				<StlHeader>
						<Navigation />
				</StlHeader>
		)
}

const StlHeader = styled.header`
		width: 100%;
		height: 45px;
		background-color: ${C.SHADOW_BG};
		z-index: ${C.LAYOUT_EL_ZINDEX};
		display: flex;
		flex-direction: row;
		padding: 0 30px;
		align-items: center;
`

export default Header