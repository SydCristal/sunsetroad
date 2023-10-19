import styled from 'styled-components'
import { LanguageSwitch, Navigation } from './'
import { S } from '../../Utils'

const StlHeader = styled.header`
		width: 100%;
		height: 45px;
		background-color: ${S.SHADOW_BG};
		z-index: ${S.LAYOUT_EL_ZINDEX};
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 30px;
		align-items: center;
`
export default function Header() {
		return (
				<StlHeader>
						<Navigation />
						{document.documentElement.clientWidth}
						<LanguageSwitch />
				</StlHeader>
		)
}