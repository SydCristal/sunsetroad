import Layout from './components/Layout'
import styled from 'styled-components'
import { useAgeConfirmationContext, useScreenContext, useContactFormContext } from './Contexts'
import { ModalMask } from './components/Modals'
import { useEffect } from 'react'

const StlApp = styled.div`
		min-height: 100vh;
		height: 100vh;
`

const AdultContent = styled.div`
		${({ $blur, overflow, $translateContent }) => {
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
						transform: translateY(-${$translateContent}px);
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
		const displayModalFilter = !ageConfirmation || contactForm
		const displayModalMask = screen?.scrollTop !== null && displayModalFilter

		const adultContentProps = {
				$blur: displayModalMask ? 5 : 0,
				overflow: displayModalMask ? 'hidden' : 'inherit'
		}

		if (displayModalMask && screen?.scrollTop) adultContentProps.$translateContent	= screen?.scrollTop

		useEffect(() => {
				if (!displayModalFilter) {
						const prevScrollTop = screen?.scrollTop
						setScreen({ ...screen, scrollTop: null })
						if (prevScrollTop) window.scrollTo(0, prevScrollTop)
				} else {
						const { scrollTop } = document.documentElement
						if (scrollTop) setScreen({ ...screen, scrollTop })
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
						const top = screen?.scrollTop || 0
						const contentHeight = document.getElementsByClassName('react-parallax')[0]?.clientHeight || scrollHeight
						const scrollTopMax = contentHeight - clientHeight
						const scrollTop = top > scrollTopMax ? scrollTopMax : top
						setScreen({ scrollTop, width: clientWidth, height: clientHeight })
				}

				window.addEventListener('resize', debounce(onResize))
				return () => {
						window.removeEventListener('resize', debounce(onResize))
				}
		}, [screen?.scrollTop])

		return (
				<StlApp>
						<ModalMask />
						<AdultContent {...adultContentProps}>
								<Layout $contentOpacity={displayModalFilter ? 0 : 1} />
						</AdultContent>
				</StlApp>
		)
}
