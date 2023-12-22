import styled from 'styled-components'
import { useModalContext } from '../../Contexts'
import { C } from '../../Utils'

const ContactFormTrigger = ({ className }) => {
		const { setDisplayedModal } = useModalContext()
		const onEmailClick = e => {
				e.stopPropagation()
				e.preventDefault()
				return setDisplayedModal('ContactForm')
		}

		return (
				<StlContactFormTrigger
						className={className}
						onPointerDown={e => onEmailClick(e)}>
						info@sunsetroad.beer
				</StlContactFormTrigger>
		)
}

const StlContactFormTrigger = styled.h2`
		cursor: pointer;
		color: #FFF;
		text-align: center;
		${C.isDesktop} {
				&:hover {
						opacity: ${C.ACTIVE_UI_EL_OPACITY};
				};
		};
		${C.isMobile} {
				.blurred & {
						opacity: 0;
				};
				font-size: 26px;
				font-weight: 600;
				text-decoration: none;
				font-family: 'Orelega One';
				text-transform: lowercase;
				text-shadow: ${C.TEXT_OUTLINE};
				transition: opacity 0.5s ease-in-out;
				opacity: 1;
				margin-bottom: 20px;
		};
`

export { ContactFormTrigger }