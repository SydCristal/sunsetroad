import styled from 'styled-components'
import { SocialMediaList } from './'
import { ContactFormTrigger } from '../Common'

const MobileFooter = () => {
		return (
				<StlMobileFooter>
						<ContactFormTrigger />
						<SocialMediaList />
				</StlMobileFooter>
		)
}

const StlMobileFooter = styled.footer`
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: center;
		z-index: 5;
		bottom: -225px;
		left: 50%;
		transform: translateX(-50%);
`

export { MobileFooter }