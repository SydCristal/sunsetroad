import styled from 'styled-components'
import { Disclaimer, ContactForm, DistributorMap } from './'
import { useModalContext, useScrollTopContext } from '../../Contexts'
import { memo, useRef, useEffect, useState, forwardRef } from 'react'
import { C } from '../../Utils'


const Modal = memo(forwardRef(({ appRef }, shadowRef) => {
		const { displayedModal, setDisplayedModal } = useModalContext()
		const { scrollTop } = useScrollTopContext()
		const disclaimerRef = useRef(null)
		const contactFormRef = useRef(null)
		const distributorMapRef = useRef(null)
		const [contactForm, setContactForm] = useState(null)
		const [distributorMap, setDistributorMap] = useState(null)
		//const shadowRef = useRef(null)
		const modalRef = useRef('Disclaimer')
		const close = () => setDisplayedModal(null)

		useEffect(() => {
				setContactForm(<ContactForm ref={contactFormRef} />)
				setDistributorMap(<DistributorMap ref={distributorMapRef} />)
		}, [])

		const onShadowClick = ({ target }) => {
				if (target !== shadowRef.current || !displayedModal || displayedModal === 'Disclaimer') return

				console.log('ON MASK CLICK')

				setDisplayedModal(null)
		}

		useEffect(() => {
				const shadowEl = shadowRef.current

				if (!shadowEl || displayedModal === modalRef.current) return

				let targetModal = displayedModal || modalRef.current

				switch (targetModal) {
						case 'ContactForm':
								targetModal = contactFormRef.current
								break
						case 'DistributorMap':
								targetModal = distributorMapRef.current
								break
						default:
								targetModal = disclaimerRef.current
				}

				if (displayedModal) {
						modalRef.current = displayedModal
						targetModal.style.display = 'flex'
						shadowEl.style.transform = `translateY(${scrollTop}px)`
						shadowEl.style.height = '100vh'
						setTimeout(() => appRef.current.classList.add('blurred'), 1)
				} else {
						modalRef.current = null
						appRef.current.classList.remove('blurred')
						setTimeout(() => {
								shadowEl.style.transform = `translateY(0)`
								shadowEl.style.height = 0
								targetModal.style.display = 'none'
						}, 500)
				}
		}, [displayedModal, scrollTop, appRef])

		console.log('RENDER MASK')

		return (
				<StlModal
						ref={shadowRef}
						onPointerDown={onShadowClick}>
						<Disclaimer ref={disclaimerRef} close={close} />
						{contactForm}
						{distributorMap}
				</StlModal>
		)
}))

//< Disclaimer ref = { disclaimerRef } />
//				<ContactForm ref={contactFormRef} />
//				<DistributorMap ref={distributorMapRef} />
const StlModal = styled.div`
		position: fixed;
		z-index: 6;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		transition: all 0.5s ease-in-out, height 0s, transform 0s;
		backdrop-filter: blur(0);
		-webkit-backdrop-filter: blur(0);
		-moz-backdrop-filter: blur(0);
		-o-backdrop-filter: blur(0);
		-ms-backdrop-filter: blur(0);
		background-color: rgba(0, 0, 0, 0);
		${C.isDesktop} {
				transform: translateY(0) !important;
		};
		.blurred & {
				min-height: 350px;
				backdrop-filter: blur(5px);
				-webkit-backdrop-filter: blur(5px);
				-moz-backdrop-filter: blur(5px);
				-o-backdrop-filter: blur(5px);
				-ms-backdrop-filter: blur(5px);
				background-color: rgba(0, 0, 0, 0.3);
		};
`

export default Modal