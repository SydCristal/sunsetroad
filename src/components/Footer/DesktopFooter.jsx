import styled from 'styled-components'
import { S } from '../../Utils'
import { Contacts	} from './Contacts'

const Footer = styled.footer`
		width: 100%;
		height: 40px;
		background-color: ${S.SHADOW_BG};
		z-index: ${S.LAYOUT_EL_ZINDEX};
		display: flex;
		position: relative;
		flex-direction: column;
		align-items: center;
		padding: 15px 0;
		margin-top: 20px;
		> div {
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				> ul {
					margin-top:20px;
				};
		};
`

export default function DesktopFooter() {
		return (
				<Footer>
						<Contacts />
				</Footer>
		)
}