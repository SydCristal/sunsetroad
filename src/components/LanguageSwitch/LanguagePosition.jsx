import { useState, useEffect } from 'react'
import { useScrollTopContext, useModalContext } from '../../Contexts/'
import { LanguageSwitch } from './'
import { C }	from '../../Utils'
import styled from 'styled-components'

const LanguagePosition = () => {
		const { displayedModal } = useModalContext()
		const { scrollTop } = useScrollTopContext()
		const [translateY, setTranslateY] = useState(0)

		useEffect(() => {
				if (displayedModal) {
						setTranslateY(scrollTop)
				} else {
						setTranslateY(0)
				}
		}, [displayedModal, scrollTop])

		return (
				<StlLanguagePosition $translateY={translateY}>
						<LanguageSwitch />
				</StlLanguagePosition>
		)
}

const StlLanguagePosition = styled.div`
		position: absolute;
		cursor: pointer;
		list-style: none;
		margin: 0;
		z-index: 7;
		${C.isDesktop} {
				top: 5px;
				right: 30px;
		};
		${C.isMobile} {
				transform: translateY(${({ $translateY }) => $translateY}px);
				transition: transform 0.5s ease-in-out;
				top: 25px;
				right: 40px;
				width: 100%;
				height: 30px;
				text-transform: uppercase;
		};
`

export default LanguagePosition