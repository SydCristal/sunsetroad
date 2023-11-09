import styled from 'styled-components'
import { LanguageSwitch } from '../Header'
import { useScreenContext, useContactFormContext, useAgeConfirmationContext } from '../../Contexts'
import { S } from '../../Utils'
import { AgeFilter, ContactForm } from './'
import { useEffect } from 'react'

const StlModalMask = styled.div`
		position: fixed;
		top: 0;
		overflow: auto;
		left: 0;
		width: 100%;
		height: 100vh;
		min-height: 350px;
		z-index: 100;
		display: flex;
		background-color: rgba(0, 0, 0, 0.3);
		transition: opacity 0.3s ease-in-out;
		opacity: 1;
`

const LanguageSwitchContainer = styled.div`
		${({ $styles }) => ({ ...$styles })};
		position: absolute;
		right: 0;
`

export function ModalMask() {
		const { screen } = useScreenContext()
		const { contactForm, setContactForm } = useContactFormContext()
		const { ageConfirmation } = useAgeConfirmationContext()
		const isMobile = screen.width <= S.MAX_MOBILE_WIDTH
		let languageSwitchContainerStyles = {
				padding: isMobile ? '25px 40px' : '5px 30px',
				height: isMobile ? '85px' : '35px'
		}

		useEffect(() => {
				const modalMaskEl = document.getElementById('modal-mask')
				const ageFilterEl = document.getElementById('age-filter')
				const contactFormEl = document.getElementById('contact-form')

				if (contactForm && contactFormEl) {
						contactFormEl.style.display = 'flex'
				}

				if (!ageConfirmation && ageFilterEl) {
						ageFilterEl.style.display = 'flex'
				}

				if (ageConfirmation && !contactForm) {
						modalMaskEl.style.opacity = 0
						setTimeout(() => {
								modalMaskEl.style.display = 'none'
								if (!contactForm && contactFormEl) contactFormEl.style.display = 'none'
								if (ageConfirmation && ageFilterEl) ageFilterEl.style.display = 'none'
						}, 300)
				} else {
						modalMaskEl.style.display = 'flex'
						setTimeout(() => {
								modalMaskEl.style.opacity = 1
						}, 0)
				}
		}, [contactForm, ageConfirmation])

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
						<LanguageSwitchContainer $styles={{...languageSwitchContainerStyles }}>
								<LanguageSwitch isMobile={isMobile} />
						</LanguageSwitchContainer>
						<AgeFilter/>
						<ContactForm/>
				</StlModalMask>
		)
}