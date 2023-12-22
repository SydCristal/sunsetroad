import { createContext, useContext, useRef, useState } from 'react'

const ModalContext = createContext(null)

const ModalProvider = ({ children }) => {
		const [displayedModal, setDisplayedModal] = useState('Disclaimer')
		//const displayedModalRef = useRef('Disclaimer')
		//let app
		//let mask
		//let languageSwitch

		//const setDisplayedModal = modal => {
		//		let modalEl
		//		if (!app) app = document.getElementById('app')
		//		if (!mask) mask = document.getElementById('mask')
		//		if (!languageSwitch) languageSwitch = document.getElementById('language-switch')
		//		if (modal) {
		//				modalEl = document.getElementById(modal)
		//				if (!modalEl) return
		//				const { scrollTop } = app.dataset

		//				mask.style.top = `${scrollTop}px`
		//				mask.style.height = '100vh'
		//				modalEl.style.display = 'flex'
		//				languageSwitch.style.transform = `translateY(${scrollTop}px)`

		//				setTimeout(() => app.classList.add('blurred'), 1)
		//				setTimeout(() => mask.addEventListener('pointerdown', onMaskClick), 500)
		//				displayedModalRef.current	= modal
		//		} else {
		//				modalEl = document.getElementById(displayedModalRef.current)
		//				if (!modalEl) return
		//				languageSwitch.style.transform = `translateY(0px)`
		//				mask.removeEventListener('pointerdown', onMaskClick)
		//				app.classList.remove('blurred')
		//				setTimeout(() => {
		//						mask.style.height = 0
		//						modalEl.style.display = 'none'
		//						displayedModalRef.current = null
		//				}, 500)
		//		}
		//}

		//const onMaskClick = e => {
		//		if (e.target?.id !== 'mask' || displayedModalRef.current === 'Disclaimer') {

		//				return
		//		}
		//		e.preventDefault()
		//		e.stopPropagation()

		//		setDisplayedModal(null)
		//}

		//const value = {
		//		displayedModal: displayedModalRef.current,
		//		setDisplayedModal
		//}

		const value = {
				displayedModal,
				setDisplayedModal
		}

		return (
				<ModalContext.Provider value={value}>
						{children}
				</ModalContext.Provider>
		)
}

const useModalContext = () => {
		const context = useContext(ModalContext)

		return context
}

export { ModalContext, ModalProvider, useModalContext }