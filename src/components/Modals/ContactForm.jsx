import styled, { css } from 'styled-components'
import { useContactFormContext, useLanguageContext } from '../../Contexts'
import { S, Ic } from '../../Utils'
import { Heading } from '../Common'
import { l } from './'
import { useState } from 'react'
import * as EmailValidator from 'email-validator'

const landscapeMobile = `@media (orientation: landscape) and (max-width: ${S.MAX_MOBILE_WIDTH}px)`

const ContactFormContainer = styled.div`
		width: ${S.MOBILE_CONTENT_WIDTH}px;
		position: absolute;
		bottom: 50%;
		left: 50%;
		transform: translate(-50%, 50%);
		background-color: ${S.MODAL_SHADOW};
		min-height: 400px;
		height: 70%;
		border-radius: ${S.CONTENT_AREA_BORDER_RADIUS};
		display: none;
		flex-direction: column;
		align-items: center;
		padding: ${S.CONTENT_AREA_PADDING};
		margin: -5px -5px 0;
		${landscapeMobile} {
				width: 70%;
				height: 80%;
				min-height: 0;
				bottom: 10%;
				transform: translate(-50%, 0);
				> div:first-child {
						height: 0px;
						padding: 0 20px;
						> * {
								margin-top: 20px;
						};
				}
		};
		form {
				flex: 1;
				display: flex;
				flex-direction: column;
				width: 100%;
				input, textarea {
						font-family: Bitter;
						font-size: 14px;
						font-style: normal;
						font-weight: 600;
						line-height: normal;
				};
				${landscapeMobile} {
						input, > p {
								margin: 0 15px 4px 225px;
								width: calc(100% - 225px);
						};
				};
				> div {
						height: 60px;
				};
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
		};
		${landscapeMobile} {
				padding: 20px;
				position: absolute;
				top: 0;
				width: 100%;
		};
`

const CloseModalIcon = styled.img`
		height: 25px;
		cursor: pointer;
		${landscapeMobile} {
				display: none;
		};
`

const inputStyles = css`
		background-color: ${S.INPUT_BG_COLOR};
		border: ${S.INPUT_BORDER};
		border-radius: ${S.INPUT_BORDER_RADIUS};
		width: 100%;
		min-height: 35px;
		margin: 3px auto;
		color: rgba(97, 97, 97, 1);
		padding: 0 5px;
		outline: ${({ $isInvalid }) => $isInvalid ? '3px solid red' : 'none'};
		color: #616161;
		&:focus {
				outline: 3px solid #fd8228;
		};
		&::placeholder {
				color: #616161;
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

const ErrorMessage = styled.p`
		color: red;
		height: 17px;
		margin: 0;
		font-size: 15px;
`

const FormControls = styled.div`
		display: flex;
		flex-direction: row;
`

const ControlButton = styled.button`
		opacity: ${({ $opacity }) => $opacity};
		border: none;
		background-color: transparent;
		padding: 0;
		margin: 0px auto;
		display: block;
		font-family: 'Orelega One', serif;
		font-size: 40px;
		color: #fff;
		-webkit-text-stroke: 1.5px rgb(34, 30, 31);
		text-shadow: ${S.TEXT_OUTLINE};
		&:focus {
				outline: none;
		};
		&:not(:disabled) {			
				cursor: pointer;
		};
		&:first-child {
				display: ${landscapeMobile ? 'block' : 'none'};
		};
`

export function ContactForm() {
		const [name, setName] = useState('')
		const [email, setEmail] = useState('')
		const [message, setMessage] = useState('')
		const [invalidFields, setInvalidFields] = useState([])
		const { setContactForm } = useContactFormContext()
		const { language } = useLanguageContext()
		const [highlightName, setHighlightName] = useState(false)
		const [highlightEmail, setHighlightEmail] = useState(false)
		const [highlightMessage, setHighlightMessage] = useState(false)
		const onCloseModal = e => {
				e.preventDefault()
				e.stopPropagation()
				setContactForm(false)
		}

		l.setLanguage(language)

		const validate = (value, inputName, highlightError) => {
				let isInvalid = false
				const wasInvalid = invalidFields.includes(inputName)

				switch (inputName) {
						case 'email':
								if (!EmailValidator.validate(value)) isInvalid = true
								break
						default:
								if (value.length < 2) isInvalid = true
				}

				if (isInvalid) {
						wasInvalid || setInvalidFields([...invalidFields, inputName])
				} else {
						wasInvalid && setInvalidFields(invalidFields.filter(field => field !== inputName))
				}

				if (highlightError) highlightError(isInvalid)
		}

		const onInputChange = (value, inputName, setValue, highlightError) => {
				validate(value, inputName)
				highlightError(false)
				setValue(value)
		}

		const onInputBlur = (value, inputName, setValue, highlightError) => {
				value = value.trim()
				validate(value, inputName, highlightError)
				setValue(value)
		}

		const onFormSubmit = e => {
				e.preventDefault()
				e.stopPropagation()
				const data = {
						name, email, message
				}

				console.log(data);
		}

		const submitButtonIsActive = (invalidFields.length === 0 && name && email && message)

		return (
				<ContactFormContainer id='contact-form'>
						<ModalHeader>
								<Heading />
								<CloseModalIcon
										src={Ic('close', false, 'svg')}
										alt='close'
										onPointerDown={onCloseModal} />
						</ModalHeader>
						<form>
								<Input
										type='text'
										placeholder={l.name}
										onChange={({ target: { value } }) => onInputChange(value, 'name', setName, setHighlightName)}
										$isInvalid={highlightName}
										onBlur={({ target: { value } }) => onInputBlur(value, 'name', setName, setHighlightName)}
										value={name} />
								<ErrorMessage>{highlightName && l.nameIsInvalid}</ErrorMessage>
								<Input
										type='text'
										placeholder={l.email}
										onChange={({ target: { value } }) => onInputChange(value, 'email', setEmail, setHighlightEmail)}
										$isInvalid={highlightEmail}
										onBlur={({ target: { value } }) => onInputBlur(value, 'email', setEmail, setHighlightEmail)}
										value={email} />
								<ErrorMessage>{highlightEmail && l.emailIsInvalid}</ErrorMessage>
								<Textarea
										placeholder={l.message}
										onChange={({ target: { value } }) => onInputChange(value, 'message', setMessage, setHighlightMessage)}
										$isInvalid={highlightMessage}
										onBlur={({ target: { value } }) => onInputBlur(value, 'message', setMessage, setHighlightMessage)}
										value={message} />
								<div>
										<ErrorMessage>{highlightMessage && l.messageIsInvalid}</ErrorMessage>
										<FormControls>
												<ControlButton
														disabled={false}
														$opacity={1}
														onClick={onCloseModal}>
														{l.cancel}
												</ControlButton>
												<ControlButton
														disabled={!submitButtonIsActive}
														$opacity={submitButtonIsActive ? 1 : 0.5}
														onClick={onFormSubmit}>
														{l.submit}
												</ControlButton>
										</FormControls>
								</div>
						</form>
				</ContactFormContainer>
		)
}