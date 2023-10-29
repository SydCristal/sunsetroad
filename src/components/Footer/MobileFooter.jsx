import styled from 'styled-components'
import { Contacts	} from './Contacts'

const Footer = styled.footer`
		transition: opacity 0.5s ease-in-out;
		width: 260px;
		height: 165px;
		position: relative;
		margin: 0 auto;
		z-index: 3;
		> div {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 666;
		}
`

export function MobileFooter() {
		return (
				<Footer>
						<Contacts className='mobile-contacts' />
				</Footer>
		)
}