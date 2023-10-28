import styled, { css } from 'styled-components'
import { useContactFormContext, useLanguageContext } from '../../Contexts'
import { S } from '../../Utils'
import { Heading } from '../Common'
import { l } from './'

const ContactFormContainer = styled.div`
		width: ${S.MOBILE_CONTENT_WIDTH}px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: ${S.MODAL_SHADOW};
		height: 400px;
		border-radius: ${S.CONTENT_AREA_BORDER_RADIUS};
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: ${S.CONTENT_AREA_PADDING};
		margin: -5px -5px 0;
		form {
				flex: 1;
				display: flex;
				flex-direction: column;
				width: 100%;
		};
`

const ModalHeader = styled.div`
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 20px;
		> div:first-child {
				width: 210px;
				height: 85px;
				margin-bottom: 0;
		}
`

const CloseModalIcon = styled.div`
		display: flex;
		height: 25px;
		justify-content: flex-end;
		font-family: 'Orelega One';
		font-size: 25px;
		font-weight: 400;
		text-shadow: ${S.TEXT_OUTLINE};
		cursor: pointer;
`

const inputTextStyles = css`
		color: #616161;
		font-family: Bitter;
		font-size: 14px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
`

const inputStyles = css`
		background-color: ${S.INPUT_BG_COLOR};
		border: ${S.INPUT_BORDER};
		border-radius: ${S.INPUT_BORDER_RADIUS};
		width: 100%;
		min-height: 35px;
		margin-bottom: 15px;
		color: rgba(97, 97, 97, 1);
		padding: 0 5px;
		${inputTextStyles};
		&:focus {
				outline: 3px solid #fd8228;
		};
		&::placeholder {
				${inputTextStyles};
		};
`

const Input = styled.input`
		${inputStyles};
`

const Textarea = styled.textarea`
		${inputStyles};
		flex: 1;
		padding: 5px;
		resize: none;
`


export function ContactForm() {
		const { setContactForm } = useContactFormContext()
		const { language } = useLanguageContext()
		const closeModal = e => {
				e.preventDefault()
				e.stopPropagation()
				setContactForm(false)
		}

		l.setLanguage(language)

		return (
				<ContactFormContainer>
						<ModalHeader>
								<Heading />
								<CloseModalIcon
										onPointerDown={closeModal}>
										X
								</CloseModalIcon>
						</ModalHeader>
						<form>
								<Input type='text' placeholder={l.name}/>
								<Input type='text' placeholder={l.email}/>
								<Textarea placeholder={l.message} />
						</form>
				</ContactFormContainer>
		)
}