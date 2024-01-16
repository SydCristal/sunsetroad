import styled, { css } from 'styled-components'
import { useLanguageContext, useModalContext } from '../../Contexts'
import { C, Ic } from '../../Utils'
import { Heading, Input } from '../Common'
import { l } from './'
import { useState, useMemo, forwardRef, memo, useEffect } from 'react'
import * as EmailValidator from 'email-validator'

const ContactForm = memo(forwardRef((props, ref) => {
		const { displayedModal, setDisplayedModal } = useModalContext()
		const { language } = useLanguageContext()
		const [name, setName] = useState('')
		const [email, setEmail] = useState('')
		const [message, setMessage] = useState('')
		const [invalidFields, setInvalidFields] = useState([])

		useMemo(() => l.setLanguage(language), [language])

		useEffect(() => {
				if (displayedModal !== 'ContactForm') return
				setName('')
				setEmail('')
				setMessage('')
				setInvalidFields([])
		}, [displayedModal])

		const close = () => setDisplayedModal(null)

		const highlight = (inputName, isValid) => {
				if (isValid && invalidFields.includes(inputName)) {
						setInvalidFields(invalidFields.filter(field => field !== inputName))
				}

				if (!isValid && !invalidFields.includes(inputName)) {
						setInvalidFields([...invalidFields, inputName])
				}
		}

		const onInputChange = (inputName, value, isValid) => {
				highlight(inputName, isValid)

				switch (inputName) {
						case 'email':
								setEmail(value)
								break
						case 'message':
								setMessage(value)
								break
						default:
								setName(value)
								break
				}
		}

		const submitButtonIsActive = invalidFields.length === 0 && name && email && message

		const onFormSubmit = e => {
				e.preventDefault()
				e.stopPropagation()

				if (window.Email) window.Email.send({
						SecureToken: C.EMAIL_SECURITY_KEY,
						To: C.RECEIVING_EMAIL,
						From: C.SENDER_EMAIL,
						Subject: email,
						Body: `${name} отправил(а) вам сообщение:<br /><br />${message}`
				}).then(close)
		}

		console.log('RENDER CONTACT FORM')

		return (
				<StlContactForm
						ref={ref}
						name='ContactForm'>
						<UpperBlock>
								<ModalHeader>
										<Heading $styles={headingStyles} />
										<CloseModalIcon
												src={Ic('close', false, 'svg')}
												alt='close'
												onPointerDown={close} />
								</ModalHeader>
								<InputContainer>
										<Input
												value={name}
												$isHighlighted={invalidFields.includes('name')}
												$setIsHighlighted={isValid => highlight('name', isValid)}
												onChange={(value, isValid) => onInputChange('name', value, isValid)}
												$validate={value => value?.length > 2}
												placeholder={l.name}
												$errorTip={l.nameIsInvalid} />
										<Input
												type='email'
												$isHighlighted={invalidFields.includes('email')}
												$setIsHighlighted={isValid => highlight('email', isValid)}
												value={email}
												onChange={(value, isValid) => onInputChange('email', value, isValid)}
												$validate={value => EmailValidator.validate(value)}
												placeholder={l.email}
												$errorTip={l.emailIsInvalid} />
								</InputContainer>
						</UpperBlock>
						<Textarea
								forwardedAs='textarea'
								$isHighlighted={invalidFields.includes('textarea')}
								$setIsHighlighted={isValid => highlight('textarea', isValid)}
								value={message}
								onChange={(value, isValid) => onInputChange('message', value, isValid)}
								$validate={value => value?.length > 2}
								placeholder={l.message}
								$errorTip={l.messageIsInvalid} />
						<FormControls>
								<ControlButton
										disabled={false}
										$opacity={1}
										onClick={close}>
										{l.cancel}
								</ControlButton>
								<ControlButton
										disabled={!submitButtonIsActive}
										$opacity={submitButtonIsActive ? 1 : 0.5}
										onClick={onFormSubmit}>
										{l.submit}
								</ControlButton>
						</FormControls>
				</StlContactForm>
		)
}))

const isFlipped = C.mediaAnd([C.isMobile, C.isHorizontal, C.isShort])

const StlContactForm = styled.form`
		width: ${C.MOBILE_CONTENT_WIDTH}px;
		opacity: 0;
		display: none;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: ${C.MODAL_SHADOW};
		min-height: 400px;
		height: 70%;
		border-radius: ${C.CONTENT_AREA_BORDER_RADIUS};
		border: none;
		flex-direction: column;
		align-items: center;
		padding: ${C.MODAL_PADDING};
		transition: opacity 0.5s ease-in-out;
		${isFlipped} {
				width: 70%;
				height: 80%;
				min-height: auto;
		};
		.blurred & {
				opacity: 1;
		};
`

const UpperBlock = styled.div`
		display: flex;
		width: 100%;
		flex-direction: column;
		${isFlipped} {
				flex-direction: row;
		};
`

const ModalHeader = styled.div`
		width: calc(100% + 20px);
		transform: translateX(-10px);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 20px;
		${isFlipped} {
				flex: 0;
		};
`

const CloseModalIcon = styled.img`
		height: 25px;
		cursor: pointer;
		${isFlipped} {
				display: none;
		};
`

const headingStyles = css`
		width: 250px;
		height: 96px;
		margin-bottom: 0;
		margin-right: 5px;
`

const InputContainer = styled.div`
		${isFlipped} {
				flex: 1;
		};
`

const Textarea = styled(Input)`
		flex: 1;
		width: 100%;
		> * {
			resize: none;
		};
`

const FormControls = styled.div`
		display: flex;
		flex-direction: row;
		width: 100%;
`

const ControlButton = styled.button`
		opacity: ${({ $opacity }) => $opacity};
		border: none;
		background-color: transparent;
		padding: 0;
		margin: 0px auto;
		display: none;
		font-family: 'Orelega One', serif;
		font-size: 40px;
		color: #fff;
		-webkit-text-stroke: 1.5px rgb(34, 30, 31);
		text-shadow: ${C.TEXT_OUTLINE};
		transition: opacity 0.3s ease-in-out;
		&:focus {
				outline: none;
		};
		&:not(:disabled) {
				cursor: pointer;
		};
		${isFlipped} {
				display: block;
		};
		&:not(:first-child) {
				display: block;
		};
`

export { ContactForm }