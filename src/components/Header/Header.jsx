import styled from 'styled-components'
import { LanguageSwitch, Navigation } from './'
import { S } from '../../Utils'

const StlHeader = styled.header`
		width: 100%;
		height: 50px;
		background-color: ${S.SHADOW_BG};
		z-index: ${S.LAYOUT_EL_ZINDEX};
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0 20px;
		align-items: center;
`
export default function Header() {
		return (
				<StlHeader>
						<Navigation />
						<LanguageSwitch />
				</StlHeader>
		)
}