import styled from 'styled-components'
import { C } from '../../Utils'
import { SocialMediaList } from './'

const DesktopFooter = () => {
		return (
				<StlDesktopFooter>
						<SocialMediaList/>
				</StlDesktopFooter>
		)
}

const StlDesktopFooter = styled.footer`
		height: 40px;
		background-color: ${C.SHADOW_BG};
		z-index: ${C.LAYOUT_EL_ZINDEX};
		margin-top: 20px;
`

export { DesktopFooter }