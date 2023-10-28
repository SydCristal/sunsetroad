import styled from 'styled-components'
import { LanguageSwitch } from '../Header'
import { useScaleContext, useContactFormContext } from '../../Contexts'
import { S } from '../../Utils'

const StlModalMask = styled.div`
		position: fixed;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		background-color: rgba(0, 0, 0, 0.3);
		display: flex;
`

const LanguageSwitchContainer = styled.div`
		${({ styles }) => ({ ...styles })};
		position: absolute;
		right: 0;
`

export function ModalMask({ children }) {
		const { scale } = useScaleContext()
		const { contactForm, setContactForm } = useContactFormContext()
		children = children.filter(child => child)
		if (!children?.length) return null
		const isMobile = scale.width <= S.MAX_MOBILE_WIDTH
		let languageSwitchContainerStyles = {
				padding: isMobile ? '25px 40px' : '5px 30px',
				height: isMobile ? '85px' : '35px'
		}

		const onMaskClick = e => {
				if (contactForm && e?.target?.id === 'modal-mask') {
						e.preventDefault()
						e.stopPropagation()
						setContactForm(false)
				}
		}

		return (
				<StlModalMask
						id='modal-mask'
						onPointerDown={onMaskClick}>
						<LanguageSwitchContainer styles={languageSwitchContainerStyles}>
								<LanguageSwitch isMobile={isMobile} />
						</LanguageSwitchContainer>
						{children}
				</StlModalMask>
		)
}