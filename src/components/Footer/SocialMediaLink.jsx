import { Ic, C } from '../../Utils'
import styled from 'styled-components'

const SocialMediaLink = ({ href, contact }) => {
		return (
				<li>
						<a
								href={href}
								target='_blank'
								rel='noreferrer'>
								<Icon
										src={Ic(contact, false)}
										alt={contact} />
						</a>
				</li>
		)
}

const Icon = styled.img`
		${C.isDesktop} {
				width: 45px;
				height: 45px;
				opacity: 0.6;
				transition: opacity 0.2s ease-in-out;
				&:hover {
						opacity: ${C.ACTIVE_UI_EL_OPACITY};
				};
		};
		${C.isMobile} {
				width: 52px;
				height: 52px;
				opacity: 1;
		};
`

export { SocialMediaLink }