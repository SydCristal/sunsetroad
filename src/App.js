import styled from 'styled-components'
import { Sky } from './components/MobileLayout'
import LanguageSwitch from './components/LanguageSwitch'
import { useEffect, useRef } from 'react'
import { C } from './Utils'
import DesktopLayout from './components/DesktopLayout'
import MobileLayout from './components/MobileLayout'
import { useScrollTopContext, useScreenContext } from './Contexts'
import Modal from './components/Modals/'

const App = () => {
		const appRef = useRef(null)
		const shadowRef = useRef(null)
		const { setScrollTop } = useScrollTopContext()
		const { setScreenWidth } = useScreenContext()
		const isDesktop = document.documentElement.clientWidth > C.MAX_MOBILE_WIDTH
		const desktopLayoutRef = useRef(isDesktop ? <DesktopLayout /> : null)
		const mobileLayoutRef = useRef(isDesktop ? null : <MobileLayout />)

		console.log('RENDER APP')

		useEffect(() => {
				appRef.current?.scrollTo(0, 0)

				const onScroll = ({ target }) => {
						setScrollTop(target.scrollTop)
				}

				if (!isDesktop) appRef.current.addEventListener('scroll', onScroll)
				const handleResize = () => {
						const { clientWidth } = document.documentElement
						const isCurrentlyDesktop = clientWidth > C.MAX_MOBILE_WIDTH
						setScreenWidth(clientWidth)

						console.log('ON RESIZE')

						if (isCurrentlyDesktop) {
								setScrollTop(0)
								appRef.current?.scrollTo(0, 0)
								const shadowEl = shadowRef.current
								if (shadowEl) shadowEl.style.transform = 'translateY(0)'

								if (!desktopLayoutRef.current) {
										desktopLayoutRef.current = <DesktopLayout />
								}
								appRef.current.removeEventListener('scroll', onScroll)
						} else {
								if (!mobileLayoutRef.current) mobileLayoutRef.current = <MobileLayout />
								appRef.current.addEventListener('scroll', onScroll)
								const { scrollTop, clientHeight, lastChild } = appRef.current
								const { scrollHeight } = lastChild
								if (scrollTop + clientHeight >= scrollHeight) appRef.current?.scrollTo(0, scrollHeight - clientHeight)
						}
				}

				window.addEventListener('resize', handleResize)
				return () => {
						window.removeEventListener('resize', handleResize)
				}
		}, [])

		return (
				<StlApp
						id='app'
						ref={appRef}
						className='blurred'>
						<Sky />
						<LanguageSwitch />
						<Modal appRef={appRef} ref={shadowRef} />
						{desktopLayoutRef.current}
						{mobileLayoutRef.current}
				</StlApp>
		)
}

const StlApp = styled.div`
		height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
		perspective: 2px;
		width: 100%;
		position: relative;
		transform-style: preserve-3d;
		&.blurred {
				overflow: hidden;
		}
`

export default App