import Layout from './components/Layout'
import styled from 'styled-components'
import { useAgeConfirmationContext, useScreenContext, useContactFormContext } from './Contexts'
import { ModalMask } from './components/Modals'
import { useEffect, useRef } from 'react'

const StlApp = styled.div`
		min-height: 100vh;
		height: 100vh;
`

const AdultContent = styled.div`
		${({ $blur, overflow, $shiftContentY }) => {
		if (!$blur) return `
				min-height: 100%;
		`

		return `
				filter: blur(${$blur}px);
				-webkit-filter: blur(${$blur}px);
				-moz-filter: blur(${$blur}px);
				-o-filter: blur(${$blur}px);
				-ms-filter: blur(${$blur}px);
				transition: filter 0.3s ease-in-out;
				height: 100vh;
				min-height: 350px;
				overflow: ${overflow};
				> div {
						height: 100%;
						transform: translateY(-${$shiftContentY}px);
				};
				header > div {
						opacity: 0;
				};
				main {
						opacity: 0;
				};
				footer > div > a {
						opacity: 0 !important;
				};	
`}}`

export default function App() {
		const { ageConfirmation } = useAgeConfirmationContext()
		const { contactForm } = useContactFormContext()
		const { screen, setScreen } = useScreenContext()
		const contentRef = useRef(null)
		const displayModalFilter = !ageConfirmation || contactForm
		let prevScrollTop = screen?.scrollTop
		const displayModalMask = screen?.scrollTop !== null && displayModalFilter
		const shiftContentY = (displayModalMask && screen?.scrollTop) || 0

		const adultContentProps = {
				$blur: displayModalFilter ? 5 : 0,
				overflow: displayModalMask ? 'hidden' : 'inherit',
				$shiftContentY: shiftContentY,
				shiftcontenty: shiftContentY,
				ref: contentRef
		}

		useEffect(() => {
				if (!displayModalFilter) {
						setScreen({ ...screen, scrollTop: null })
						if (prevScrollTop) window.scrollTo(0, prevScrollTop)
				} else {
						const scrollTop = document.documentElement.scrollTop || prevScrollTop
						if (!scrollTop) return
						setScreen({ ...screen, scrollTop })
						prevScrollTop = scrollTop
				}
		}, [displayModalFilter, screen?.scrollTop])
		
		useEffect(() => {
				const debounce = f => {
						let timer
						return e => {
								if (timer) clearTimeout(timer)
								timer = setTimeout(f, 100, e)
						}
				}

				const onResize = () => {
						const { clientHeight, clientWidth, scrollHeight } = document.documentElement
						let contentShiftY = +contentRef?.current?.attributes?.getNamedItem('shiftcontenty')?.value
						const contentHeight = document.getElementsByClassName('react-parallax')[0]?.clientHeight || scrollHeight
						const scrollTopMax = contentHeight - clientHeight
						if (contentShiftY > scrollTopMax) {
								contentShiftY = scrollTopMax
						}
						alert(`contentShiftY: ${contentShiftY}, contentHeight: ${contentHeight}, clientHeight: ${clientHeight}, scrollTopMax: ${scrollTopMax}`)
						setScreen({ scrollTop: contentShiftY, width: clientWidth, height: clientHeight })
						if (contentShiftY) prevScrollTop = contentShiftY
				}

				window.addEventListener('resize', debounce(onResize))
				return () => {
						window.removeEventListener('resize', debounce(onResize))
				}
		}, [])

		return (
				<StlApp>
						<ModalMask />
						<AdultContent {...adultContentProps}>
								<Layout $contentOpacity={displayModalFilter ? 0 : 1} />
						</AdultContent>
				</StlApp>
		)
}
