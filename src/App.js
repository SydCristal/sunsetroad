import Layout from './components/Layout'
import styled from 'styled-components'
import { useAgeConfirmationContext, useScaleContext, useContactFormContext } from './Contexts'
import { ModalMask, AgeFilter, ContactForm } from './components/Modals'
import { useEffect } from 'react'
import { S } from './Utils'

const StlApp = styled.div`
		min-height: 100%;
		height: 100%;
`

const AdultContent = styled.div`
		${({ $blur, overflow, $contentScrollTop }) => {
		if (!$blur) return `
				min-height: 100%;
		`

		return `
				filter: blur(${$blur}px);
				-webkit-filter: blur(${$blur}px);
				-moz-filter: blur(${$blur}px);
				-o-filter: blur(${$blur}px);
				-ms-filter: blur(${$blur}px);
				height: 100vh;
				min-height: 100%;
				overflow: ${overflow};
				> div {
						height: 100%;
						transform: translateY(-${$contentScrollTop}px);
				};
				header > div {
						opacity: 0;
				};
				main {
						opacity: 0;
						transition: opacity 0.3s ease-in-out;
				};
				footer > div > a {
						opacity: 0 !important;
				};	
`}}`

export default function App() {
		const { ageConfirmation } = useAgeConfirmationContext()
		const { contactForm, scrollTop } = useContactFormContext()
		const { scale, setScale } = useScaleContext()
		if (!ageConfirmation) window.scrollTo(0, 0)
		const displayModalFilter = !ageConfirmation || contactForm

		const AdultContentProps = {
				$blur: displayModalFilter ? 5 : 0,
				overflow: displayModalFilter ? 'hidden' : 'inherit',
				$contentScrollTop: (scale.width <= S.MAX_MOBILE_WIDTH && scrollTop) || 0
		}

		const debounce = f => {
				let timer
				return e => {
						if (timer) clearTimeout(timer)
						timer = setTimeout(f, 100, e)
				}
		}

		window.addEventListener('resize', debounce(() => {
				setScale({ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight })
		}))

		useEffect(() => {
				if (!contactForm) window.scrollTo(0, scrollTop)
		}, [contactForm, scrollTop])

		return (
				<StlApp>
						<ModalMask />
						<AdultContent {...AdultContentProps}>
								<Layout />
						</AdultContent>
				</StlApp>
		)
}
