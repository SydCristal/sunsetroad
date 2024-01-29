import styled, { css } from 'styled-components'
import { useLanguageContext, useModalContext } from '../../Contexts'
import { C, Ic } from '../../Utils'
import { Heading, Input, Localizer } from '../Common'
import { l } from './'
import { useState, forwardRef, memo, useEffect } from 'react'
import * as EmailValidator from 'email-validator'

const ContactForm = memo(forwardRef((props, ref) => {
		const { displayedModal, setDisplayedModal } = useModalContext()
		const { language } = useLanguageContext()
		const [name, setName] = useState('')
		const [email, setEmail] = useState('')
		const [message, setMessage] = useState('')
		const [invalidFields, setInvalidFields] = useState([])
		const [notificationMode, setNotificationMode] = useState('')

		const clearForm = () => {
				setName('')
				setEmail('')
				setMessage('')
				setInvalidFields([])
				setNotificationMode('')
		}

		useEffect(() => {
				if (displayedModal !== 'ContactForm') return
				clearForm()
		}, [displayedModal])

		const close = e => {
				e?.preventDefault()
				e?.stopPropagation()
				setDisplayedModal(null)
				setTimeout(() => clearForm(), 500)
		}

		const highlight = (inputName, isValid) => {
				if (isValid && invalidFields.includes(inputName)) {
						setInvalidFields(invalidFields.filter(field => field !== inputName))
				}

				if (!isValid && !invalidFields.includes(inputName)) {
						setInvalidFields([...invalidFields, inputName])
				}
		}

		const onInputChange = (inputName, value, isValid) => {
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
				}).then(res => {
						if (res === 'OK') {
								setNotificationMode('success')
						} else {
								setNotificationMode('error')
						}
				})
		}

		return (
				<StlContactForm
						ref={ref}
						name='ContactForm'
						className={notificationMode}>
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
												placeholder={l.name[language]}
												$errorTip={l.nameIsInvalid} />
										<Input
												type='email'
												$isHighlighted={invalidFields.includes('email')}
												$setIsHighlighted={isValid => highlight('email', isValid)}
												value={email}
												onChange={(value, isValid) => onInputChange('email', value, isValid)}
												$validate={value => EmailValidator.validate(value)}
												placeholder='Email'
												$errorTip={l.emailIsInvalid} />
								</InputContainer>
						</UpperBlock>
						<MessageBlock>
								<Localizer localization={notificationMode === 'success' ? l.sucessHeading : l.errorHeading} tag='h2' />
								<Localizer localization={notificationMode === 'success' ? l.sucessMessage : l.errorMessage} tag='p' />
						</MessageBlock>
						<Textarea
								forwardedAs='textarea'
								$isHighlighted={invalidFields.includes('textarea')}
								$setIsHighlighted={isValid => highlight('textarea', isValid)}
								value={message}
								onChange={(value, isValid) => onInputChange('message', value, isValid)}
								$validate={value => value?.length > 2}
								placeholder={l.message[language]}
								$errorTip={l.messageIsInvalid} />
						<FormControls>
								<ControlButton
										disabled={false}
										$opacity={1}
										onClick={close}>
										<Localizer localization={l.cancel}/>
								</ControlButton>
								<ControlButton
										disabled={false}
										$opacity={0}
										onClick={close}>
										Ok
								</ControlButton>
								<ControlButton
										disabled={!submitButtonIsActive}
										$opacity={submitButtonIsActive ? 1 : 0.5}
										onClick={onFormSubmit}>
										<Localizer localization={l.submit} />
								</ControlButton>
						</FormControls>
				</StlContactForm>
		)
}))

const isFlipped = C.mediaAnd([C.isMobile, C.isHorizontal, C.isShort])

const StlContactForm = styled.form`
		min-width: ${C.MOBILE_CONTENT_WIDTH}px;
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
		transition: opacity 0.5s ease-in-out, width 0.5s ease-in-out, height 0.5s ease-in-out;
		${isFlipped} {
				width: 70%;
				height: 80%;
				min-height: auto;
		};
		.blurred & {
				opacity: 1;
		};
		&.error,
		&.success {
				width: 0;
				height: 300px;
				min-height: 300px;
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
		.error &,
		.success & {
				flex: 1;
		};
`

const CloseModalIcon = styled.img`
		position: absolute;
		right: 0;
		top: 0;
		height: 25px;
		cursor: pointer;
		${isFlipped} {
				pointer-events: none;
				opacity: 0;
		};
		transition: opacity 0.5s ease-in-out 0.5s;
		.error &,
		.success & {
				opacity: 1;
				pointer-events: all;
		};

`

const headingStyles = css`
		width: 250px;
		height: 96px;
		margin-bottom: 0;
		transition: margin 0.5s ease-in-out, width 0.5s ease-in-out, height 0.5s ease-in-out;
		${isFlipped} {
				margin-right: 5px;
		};
		.error &,
		.success & {
				margin-right: 0;
				width: 100%;
				height: 65px;
		};
`

const visibilityStyles = `
		opacity: 1;
		transition: opacity 0.5s ease-in-out, width 0.5s ease-in-out, flex 0s ease-in-out 0.5s, height 0s ease-in-out 0.5s;
		.error &,
		.success & {
				opacity: 0;
				pointer-events: none;
		};
`

const shrinkStyles = `
		.error &,
		.success & {
				flex: 0;		
				width: 0;
				min-width: 0;
		};
`

const InputContainer = styled.div`
		${visibilityStyles};
		${isFlipped} {
				flex: 1;
				${shrinkStyles};
		};
		.error &,
		.success & {
				height: 0;
		};
`		

const Textarea = styled(Input)`
		${visibilityStyles};
		flex: 1;
		width: 100%;
		> * {
			resize: none;
		};
		.error &,
		.success & {
				height: 0;
		};
`

const MessageBlock = styled.div`
		height: 0;
		opacity: 0;
		text-align: center;
		transition: opacity 0.5s ease-in-out 0.5s, height 0s ease-in-out 0.5s;
		.error &,
		.success & {
				height: 100%;
				opacity: 1;
		};
		h2 {
				font-size: 24px;
				margin: 5px 0 10px;
		};
`

const FormControls = styled.div`
		display: flex;
		flex-direction: row;
		width: 100%;
`

const ControlButton = styled.button`
		opacity: ${({ $opacity }) => $opacity};
		min-width: 150px;
		border: none;
		background-color: transparent;
		padding: 0;
		margin: 0px auto;
		display: block;
		font-family: 'Orelega One', serif;
		font-size: 40px;
		color: #fff;
		-webkit-text-stroke: 1.5px rgb(34, 30, 31);
		text-shadow: ${C.TEXT_OUTLINE};
		transition: opacity 0.3s ease-in-out, width 0s ease-in-out 0.5s, flex 0s ease-in-out 0.5s;
		flex: 1;		
		&:focus {
				outline: none;
		};
		&:not(:disabled) {
				cursor: pointer;
		};
		&:first-child {
				display: none;
				${isFlipped} {
						display: block;
				};
		};
		&:last-child,
		&:first-child {
				${visibilityStyles};
				${shrinkStyles};
		};
		&:nth-child(2) {
				min-width: 0;
				width: 0;
				flex: 0;
				pointer-events: none;
				transition: opacity 0.5s ease-in-out 0.5s, width 0s ease-in-out 0.5s, flex 0s ease-in-out 0.5s;
				.error &,
				.success & {
						flex: 1;
						pointer-events: all;
						opacity: 1;
				};
		};
		> *,
		> * span {
				display: inline-block;
				width: 100%;
		};
`

export { ContactForm }