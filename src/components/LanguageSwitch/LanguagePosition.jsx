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

		console.log('RENDER LANGUAGE SWITCH POSITION');

		return (
				<StlLanguagePosition $translateY={translateY}>
						<LanguageSwitch />
				</StlLanguagePosition>
		)
}

const StlLanguagePosition = styled.div`
		transform: translateY(${({ $translateY }) => $translateY}px);
		position: absolute;
		cursor: pointer;
		list-style: none;
		margin: 0;
		z-index: 7;
		transition: transform 0.5s ease-in-out;
		${C.isDesktop} {
				top: 5px;
				right: 30px;
		};
		${C.isMobile} {
				top: 25px;
				right: 40px;
				width: 100%;
				height: 30px;
				text-transform: uppercase;
		};
`

export default LanguagePosition